// src/pages/ScenarioComposer.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CustomDropdown from "../components/CustomDropdown";

function loadFramework() {
  const s = localStorage.getItem("programsFramework");
  return s ? JSON.parse(s) : null;
}
function loadCohorts() {
  const s = localStorage.getItem("cohorts");
  return s ? JSON.parse(s) : [];
}
function loadCalConstraints() {
  const s = localStorage.getItem("calendarsConstraints");
  return s ? JSON.parse(s) : null;
}

const STEP_IDS = ["define", "weights", "review", "run"];

export default function ScenarioComposer() {
  const framework = loadFramework();
  const cohorts = loadCohorts();
  const cal = loadCalConstraints();

  const [step, setStep] = useState(0);
  const [name, setName] = useState("Demo Scenario");
  const [term, setTerm] = useState(cal?.term || { start: "", end: "" });
  const [programs, setPrograms] = useState(
    framework ? [framework.program.name] : []
  );
  const [selCohorts, setSelCohorts] = useState(
    cohorts.map((c) => c.code).slice(0, 1)
  );
  const [weights, setWeights] = useState(
    cal?.constraints?.soft || {
      studentCompactness: 3,
      facultyFairness: 3,
      roomMatch: 2,
      electiveClashMin: 3,
    }
  );
  const [profile, setProfile] = useState("Student-centric");
  const [timeBudgetMin, setTimeBudgetMin] = useState(2);

  const [errors, setErrors] = useState([]);
  const [runs, setRuns] = useState([]);
  const progressTimers = useRef({});

  const stepTo = (i) => setStep(Math.max(0, Math.min(STEP_IDS.length - 1, i)));

  const validate = () => {
    const e = [];
    if (!name.trim()) e.push("Scenario name is required.");
    if (!term?.start || !term?.end) e.push("Term start and end must be set.");
    if (!programs.length) e.push("Select at least one program.");
    if (!selCohorts.length) e.push("Select at least one cohort.");
    if (!timeBudgetMin || timeBudgetMin < 1)
      e.push("Time budget must be at least 1 minute.");
    setErrors(e);
    return e.length === 0;
  };

  useEffect(() => {
    if (step === 2) validate();
    // eslint-disable-next-line
  }, [step, name, term, programs, selCohorts, timeBudgetMin]);

  const runsRef = () => {
    let val;
    setRuns((prev) => {
      val = prev;
      return prev;
    });
    return val || [];
  };

  const updateRun = (id, patch) => {
    setRuns((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const cancelRun = (id) => {
    if (progressTimers.current[id]) clearInterval(progressTimers.current[id]);
    updateRun(id, { status: "Canceled", note: "Canceled by user" });
  };

  const startMockRun = () => {
    if (!validate()) {
      setStep(2);
      return;
    }
    const id = `run-${Date.now()}`;
    const run = {
      id,
      name,
      status: "Queued",
      progress: 0,
      startedAt: new Date().toISOString(),
      profile,
      timeBudgetMin,
      weights,
    };
    setRuns((prev) => [run, ...prev]);
    setStep(3);

    setTimeout(
      () =>
        updateRun(id, {
          status: "Running",
          progress: 5,
          note: "Preprocessing inputs…",
        }),
      300
    );
    const interval = setInterval(() => {
      setRuns((prev) =>
        prev.map((r) => {
          if (r.id !== id) return r;
          const inc = Math.random() * 18 + 7;
          const next = Math.min(100, Math.floor(r.progress + inc));
          return {
            ...r,
            progress: next,
            status: next >= 100 ? "Completed" : "Running",
            note: next >= 100 ? "Best solution found" : "Optimizing…",
          };
        })
      );
    }, 700);
    progressTimers.current[id] = interval;

    const stopWatch = setInterval(() => {
      const current = runsRef();
      const me = current.find((x) => x.id === id);
      if (me && me.progress >= 100) {
        clearInterval(interval);
        clearInterval(stopWatch);
      }
    }, 800);
  };

  const programName = framework?.program?.name || "Program";
  const cohortOptions = cohorts.map((c) => c.code);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto max-w-[1200px] px-5 py-4">
          <h1 className="text-2xl font-bold">Scenario Composer</h1>
          <p className="text-slate-300">
            Pick term, cohorts, and weights, then run a demo solve with
            accessible progress and status updates.
          </p>
        </div>
      </header>

      {/* Stepper */}
      <nav
        className="bg-slate-900/60 border-b border-slate-800"
        aria-label="Scenario steps"
      >
        <ol className="mx-auto max-w-[1200px] px-5 py-3 flex gap-2">
          {["Define", "Weights", "Review", "Run"].map((label, i) => (
            <li key={label}>
              <button
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 ${
                  step === i
                    ? "bg-indigo-500 text-slate-900 border-indigo-400"
                    : "bg-slate-800 border-slate-700"
                }`}
                aria-current={step === i ? "step" : undefined}
                aria-disabled={i > step ? "true" : "false"}
                onClick={() => stepTo(i)}
              >
                <span className="font-extrabold">{i + 1}</span>
                <span className="font-semibold">{label}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <main className="mx-auto max-w-[1200px] px-5 py-4 space-y-4">
        {/* Define */}
        {step === 0 && (
          <section
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
            aria-labelledby="define-title"
          >
            <h2
              id="define-title"
              className="text-sm font-semibold text-slate-300 mb-2"
            >
              Define
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="grid gap-1">
                <span>Scenario name</span>
                <input
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="grid gap-1 md:col-span-2">
                <span>Program(s)</span>
                <input
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                  value={programs.join(", ")}
                  onChange={(e) =>
                    setPrograms(
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                  placeholder={programName}
                />
              </label>
              <label className="grid gap-1">
                <span>Term start</span>
                <input
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                  type="date"
                  value={term.start || ""}
                  onChange={(e) =>
                    setTerm((t) => ({ ...t, start: e.target.value }))
                  }
                />
              </label>
              <label className="grid gap-1">
                <span>Term end</span>
                <input
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                  type="date"
                  value={term.end || ""}
                  onChange={(e) =>
                    setTerm((t) => ({ ...t, end: e.target.value }))
                  }
                />
              </label>
              <label className="grid gap-1 md:col-span-2">
                <span>Cohorts (comma‑separated)</span>
                <input
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                  value={selCohorts.join(", ")}
                  onChange={(e) =>
                    setSelCohorts(
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                  placeholder={cohortOptions.slice(0, 3).join(", ")}
                />
              </label>
              <label className="grid gap-1">
                <span>Time budget (minutes)</span>
                <input
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                  type="number"
                  min="1"
                  value={timeBudgetMin}
                  onChange={(e) => setTimeBudgetMin(Number(e.target.value))}
                />
              </label>
              <div>
                <CustomDropdown
                  label="Profile"
                  name="profile"
                  id="scenario-profile"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  options={[
                    "Student-centric",
                    "Faculty fairness",
                    "Infrastructure utilization",
                  ]}
                  theme="dark"
                />
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                className="rounded-lg border border-slate-700 px-3 py-2"
                onClick={() => stepTo(1)}
              >
                Next
              </button>
            </div>
          </section>
        )}

        {/* Weights */}
        {step === 1 && (
          <section
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
            aria-labelledby="weights-title"
          >
            <h2
              id="weights-title"
              className="text-sm font-semibold text-slate-300 mb-2"
            >
              Weights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <RangeField
                label="Student compactness"
                value={weights.studentCompactness}
                onChange={(v) =>
                  setWeights((w) => ({ ...w, studentCompactness: v }))
                }
              />
              <RangeField
                label="Faculty fairness"
                value={weights.facultyFairness}
                onChange={(v) =>
                  setWeights((w) => ({ ...w, facultyFairness: v }))
                }
              />
              <RangeField
                label="Room match"
                value={weights.roomMatch}
                onChange={(v) => setWeights((w) => ({ ...w, roomMatch: v }))}
              />
              <RangeField
                label="Minimize elective clashes"
                value={weights.electiveClashMin}
                onChange={(v) =>
                  setWeights((w) => ({ ...w, electiveClashMin: v }))
                }
              />
            </div>
            <div className="mt-3 flex justify-between">
              <button
                className="rounded-lg border border-slate-700 px-3 py-2"
                onClick={() => stepTo(0)}
              >
                Back
              </button>
              <button
                className="rounded-lg bg-indigo-500 px-3 py-2 font-bold text-slate-900"
                onClick={() => stepTo(2)}
              >
                Next
              </button>
            </div>
          </section>
        )}

        {/* Review */}
        {step === 2 && (
          <section
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
            aria-labelledby="review-title"
          >
            <h2
              id="review-title"
              className="text-sm font-semibold text-slate-300 mb-2"
            >
              Review
            </h2>

            {errors.length > 0 && (
              <div
                className="rounded-lg border border-red-800 bg-red-900/30 p-3 mb-2"
                role="alert"
                aria-live="assertive"
              >
                <ul className="list-disc pl-5 text-red-200">
                  {errors.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            )}

            <ul className="grid gap-2">
              <li>
                <strong>Name:</strong> {name}
              </li>
              <li>
                <strong>Programs:</strong> {programs.join(", ") || "—"}
              </li>
              <li>
                <strong>Term:</strong> {term.start || "—"} to {term.end || "—"}
              </li>
              <li>
                <strong>Cohorts:</strong> {selCohorts.join(", ") || "—"}
              </li>
              <li>
                <strong>Time budget:</strong> {timeBudgetMin} min
              </li>
              <li>
                <strong>Profile:</strong> {profile}
              </li>
              <li>
                <strong>Weights:</strong> SC {weights.studentCompactness}, FF{" "}
                {weights.facultyFairness}, RM {weights.roomMatch}, EC{" "}
                {weights.electiveClashMin}
              </li>
            </ul>

            <div className="mt-3 flex justify-between">
              <button
                className="rounded-lg border border-slate-700 px-3 py-2"
                onClick={() => stepTo(1)}
              >
                Back
              </button>
              <button
                className="rounded-lg bg-indigo-500 px-3 py-2 font-bold text-slate-900"
                onClick={startMockRun}
              >
                Run Mock
              </button>
            </div>
          </section>
        )}

        {/* Run */}
        {step === 3 && (
          <section
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
            aria-labelledby="run-title"
          >
            <h2
              id="run-title"
              className="text-sm font-semibold text-slate-300 mb-2"
            >
              Runs
            </h2>

            <div className="grid gap-3">
              {runs.map((r) => (
                <article
                  key={r.id}
                  className="rounded-lg border border-slate-800 bg-slate-900 p-3"
                  aria-labelledby={`${r.id}-title`}
                >
                  <h3 id={`${r.id}-title`} className="text-base font-semibold">
                    {r.name}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Profile: {r.profile} • Budget: {r.timeBudgetMin} min
                  </p>

                  <div className="mt-2 grid grid-cols-[1fr_auto] items-center gap-2">
                    <progress
                      className="w-full h-3"
                      value={r.progress}
                      max={100}
                      aria-valuenow={r.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Progress for ${r.name}`}
                    />
                    <span className="font-mono">{r.progress}%</span>
                  </div>

                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-1 text-slate-300"
                  >
                    {r.status}: {r.note || "Queued"}
                  </div>

                  <div className="mt-2 flex gap-2">
                    {r.status === "Running" && (
                      <button
                        className="underline text-indigo-400"
                        onClick={() => cancelRun(r.id)}
                      >
                        Cancel
                      </button>
                    )}
                    {r.status === "Completed" && (
                      <>
                        <Link
                          to="/timetables"
                          className="rounded-lg bg-indigo-500 px-3 py-2 font-bold text-slate-900"
                        >
                          View Timetables
                        </Link>
                        <Link
                          to={`/scenarios/${r.id}/explain`}
                          className="rounded-lg border border-slate-700 px-3 py-2"
                        >
                          Open Explain
                        </Link>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-3 flex justify-start">
              <button
                className="rounded-lg border border-slate-700 px-3 py-2"
                onClick={() => stepTo(0)}
              >
                New Scenario
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function RangeField({ label, value, onChange }) {
  return (
    <label className="grid gap-1">
      <span>{label}</span>
      <input
        type="range"
        min="0"
        max="5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="text-xs text-slate-400">Weight: {value}</div>
    </label>
  );
}
