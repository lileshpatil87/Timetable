// src/pages/ScenarioExplain.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

function loadRuns() {
  const s = localStorage.getItem("scenarioRuns");
  return s ? JSON.parse(s) : [];
}

function loadExplain(runId) {
  const s = localStorage.getItem(`explain:${runId}`);
  return s
    ? JSON.parse(s)
    : {
        summary: {
          name: "Demo Scenario",
          profile: "Student-centric",
          timeBudgetMin: 2,
        },
        constraints: {
          hard: {
            facultyOverlap: 0,
            roomDoubleBook: 0,
            capacity: 0,
            cohortNonOverlap: 0,
          },
          notes: ["Honored all blackouts", "Labs matched to equipment"],
        },
        objectives: {
          studentGaps: "−22%",
          facultyLoadVar: "−18%",
          roomMatch: "↑",
          electiveClash: "−12%",
        },
        decisions: [
          {
            id: "d1",
            title: "Fixed cores first",
            why: "Major cores prioritized then labs",
            trade: "Slightly higher Friday load",
          },
          {
            id: "d2",
            title: "Aligned labs with equipment",
            why: "Lab-2 and Studio-1 availability bound placements",
            trade: "Shifted one lecture to 12:00",
          },
        ],
        conflictsResolved: [
          { id: 1, type: "Faculty overlap", before: "2", after: "0" },
          { id: 2, type: "Room double-book", before: "1", after: "0" },
        ],
      };
}

export default function ScenarioExplain() {
  const { runId } = useParams();
  const [runs, setRuns] = useState(loadRuns());
  const [current, setCurrent] = useState(runId || (runs[0]?.id ?? ""));
  const ex = useMemo(() => (current ? loadExplain(current) : null), [current]);

  // Comparison
  const [compareA, setCompareA] = useState(current);
  const [compareB, setCompareB] = useState(runs[1]?.id ?? "");
  const exA = useMemo(
    () => (compareA ? loadExplain(compareA) : null),
    [compareA]
  );
  const exB = useMemo(
    () => (compareB ? loadExplain(compareB) : null),
    [compareB]
  );
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    setStatus("Recomputing metrics…");
    const t = setTimeout(() => setStatus("Ready"), 600);
    return () => clearTimeout(t);
  }, [current, compareA, compareB]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/80 backdrop-blur-lg">
        <div className="mx-auto max-w-[1200px] px-6 py-4">
          <h1 className="text-3xl font-bold">Scenario Explain</h1>
          <p className="text-slate-300 mt-1">
            Understand constraint satisfaction, objectives, and trade-offs;
            compare runs below.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-6 space-y-6">
        {/* Toolbar */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row md:gap-4">
            <label className="flex flex-col">
              <span className="text-sm text-slate-300 mb-1">Run</span>
              <select
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
              >
                {runs.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} • {r.profile}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-center mt-2 md:mt-0 text-slate-400">
              {status}
            </div>
          </div>
          <Link
            className="underline text-indigo-400 self-start md:self-auto"
            to="/timetables"
          >
            Open Timetables
          </Link>
        </section>

        {ex && (
          <>
            {/* Summary */}
            <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800 rounded-lg p-4 shadow-md">
                <h2 className="text-lg font-semibold text-slate-300 mb-2">
                  Name
                </h2>
                <p>{ex.summary.name}</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 shadow-md">
                <h2 className="text-lg font-semibold text-slate-300 mb-2">
                  Profile
                </h2>
                <p>{ex.summary.profile}</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 shadow-md">
                <h2 className="text-lg font-semibold text-slate-300 mb-2">
                  Time Budget
                </h2>
                <p>{ex.summary.timeBudgetMin} min</p>
              </div>
            </section>

            {/* Details Accordion */}
            <section className="space-y-3">
              <AccordionItem title="Constraints" defaultOpen>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(ex.constraints.hard).map(([key, val]) => (
                    <div
                      key={key}
                      className="bg-slate-800 p-3 rounded-lg shadow-md flex justify-between"
                    >
                      <span className="text-slate-300 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="font-bold">{val}</span>
                    </div>
                  ))}
                  <ul className="list-disc pl-5 text-slate-300 mt-2">
                    {ex.constraints.notes.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </div>
              </AccordionItem>

              <AccordionItem title="Objectives">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(ex.objectives).map(([key, val]) => (
                    <div
                      key={key}
                      className="bg-slate-800 p-3 rounded-lg shadow-md flex justify-between"
                    >
                      <span className="text-slate-300 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="font-bold">{val}</span>
                    </div>
                  ))}
                </div>
              </AccordionItem>

              <AccordionItem title="Decisions & Trade-offs">
                <div className="space-y-2">
                  {ex.decisions.map((d) => (
                    <div
                      key={d.id}
                      className="bg-slate-800 p-3 rounded-lg shadow-md"
                    >
                      <h3 className="font-semibold text-slate-200">
                        {d.title}
                      </h3>
                      <p className="text-slate-400">
                        <strong>Why:</strong> {d.why}
                      </p>
                      <p className="text-slate-400">
                        <strong>Trade-off:</strong> {d.trade}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionItem>

              <AccordionItem title="Conflicts Addressed">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ex.conflictsResolved.map((c) => (
                    <div
                      key={c.id}
                      className="bg-slate-800 p-3 rounded-lg shadow-md flex flex-col gap-1"
                    >
                      <span className="text-slate-300 font-semibold">
                        {c.type}
                      </span>
                      <span className="text-slate-400">Before: {c.before}</span>
                      <span className="text-slate-400">After: {c.after}</span>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            </section>

            {/* Compare Runs */}
            <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <h2 className="text-lg font-semibold text-slate-300 mb-3">
                Compare Runs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <label className="flex flex-col">
                  <span className="text-slate-300 mb-1">Run A</span>
                  <select
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
                    value={compareA}
                    onChange={(e) => setCompareA(e.target.value)}
                  >
                    <option value="">None</option>
                    {runs.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col">
                  <span className="text-slate-300 mb-1">Run B</span>
                  <select
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
                    value={compareB}
                    onChange={(e) => setCompareB(e.target.value)}
                  >
                    <option value="">None</option>
                    {runs.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {exA && exB && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="text-slate-300 border-b border-slate-700">
                      <tr>
                        <th className="px-2 py-2">Metric</th>
                        <th className="px-2 py-2">Run A</th>
                        <th className="px-2 py-2">Run B</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {[
                        "Student compactness",
                        "Faculty load variance",
                        "Room match",
                        "Elective clashes",
                      ].map((metric) => (
                        <tr key={metric}>
                          <td className="px-2 py-2">{metric}</td>
                          <td className="px-2 py-2">
                            {exA.objectives[camelCase(metric)] ?? sumHard(exA)}
                          </td>
                          <td className="px-2 py-2">
                            {exB.objectives[camelCase(metric)] ?? sumHard(exB)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

// Helpers
function sumHard(ex) {
  const h = ex.constraints.hard;
  return (
    (h.facultyOverlap || 0) +
    (h.roomDoubleBook || 0) +
    (h.capacity || 0) +
    (h.cohortNonOverlap || 0)
  );
}

function camelCase(str) {
  return str
    .toLowerCase()
    .replace(/ /g, "")
    .replace(/[^a-zA-Z0-9]/g, "");
}

function AccordionItem({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-800 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <span className="font-semibold text-slate-200">{title}</span>
        <span
          className={`text-slate-400 transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          ＋
        </span>
      </button>
      <div className={`p-4 bg-slate-900 ${open ? "block" : "hidden"}`}>
        {children}
      </div>
    </div>
  );
}
