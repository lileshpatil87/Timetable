// src/pages/ProgramsFramework.jsx
import React, { useMemo, useState } from "react";

const FYUGP_TEMPLATE = {
  type: "FYUGP",
  semesters: 8,
  creditFramework: {
    Major: 0,
    Minor: 0,
    MDC: 0,
    AEC: 0,
    SEC: 0,
    VAC: 0,
    Internship: 0,
    Research: 0,
  },
};

const ITEP_TEMPLATE = {
  type: "ITEP",
  semesters: 8,
  creditFramework: {
    Major: 0,
    Minor: 0,
    MDC: 0,
    AEC: 0,
    SEC: 0,
    VAC: 0,
    Internship: 0,
    Research: 0,
  },
  practicum: {
    preInternshipCredits: 0,
    internshipCredits: 0,
    blackoutWeeks: 0,
  },
};

const DEFAULT_LTP = {
  lectureCreditHours: 1,
  tutorialCreditHours: 1,
  practicalCreditHours: 2,
  slotLengthMinutes: 60,
};

export default function ProgramsFramework() {
  const [programName, setProgramName] = useState(
    "Bachelor of Education (ITEP)"
  );
  const [template, setTemplate] = useState("FYUGP");
  const [semesters, setSemesters] = useState(8);
  const [honoursResearch, setHonoursResearch] = useState(false);
  const [entryExitModes] = useState([
    "Year1Exit",
    "Year2Exit",
    "Year3Exit",
    "Year4Degree",
  ]);
  const [policyPackVersion, setPolicyPackVersion] = useState("UGC-CCFUGP-2022");

  const [creditFramework, setCreditFramework] = useState(
    FYUGP_TEMPLATE.creditFramework
  );
  const [ltp, setLtp] = useState(DEFAULT_LTP);
  const [practicum, setPracticum] = useState(ITEP_TEMPLATE.practicum);

  const totalCredits = useMemo(
    () =>
      Object.values(creditFramework).reduce((a, b) => a + (Number(b) || 0), 0),
    [creditFramework]
  );

  const handleFrameworkChange = (key, value) => {
    setCreditFramework((prev) => ({
      ...prev,
      [key]: Math.max(0, Number(value || 0)),
    }));
  };

  const handleLtpChange = (key, value) => {
    setLtp((prev) => ({ ...prev, [key]: Math.max(0, Number(value || 0)) }));
  };

  const handlePracticumChange = (key, value) => {
    setPracticum((prev) => ({
      ...prev,
      [key]: Math.max(0, Number(value || 0)),
    }));
  };

  const applyTemplate = (val) => {
    setTemplate(val);
    setCreditFramework(
      val === "FYUGP"
        ? FYUGP_TEMPLATE.creditFramework
        : ITEP_TEMPLATE.creditFramework
    );
  };

  const validate = () => {
    const errors = [];
    if (!programName.trim()) errors.push("Program name is required.");
    if (semesters < 1) errors.push("Semesters must be at least 1.");
    if (ltp.slotLengthMinutes <= 0)
      errors.push("Slot length must be positive.");
    const schedulable = [30, 45, 50, 60, 75, 90, 120];
    if (!schedulable.includes(ltp.slotLengthMinutes)) {
      errors.push("Choose a common slot length (30/45/50/60/75/90/120).");
    }
    if (
      template === "ITEP" &&
      practicum.preInternshipCredits + practicum.internshipCredits === 0
    ) {
      errors.push("For ITEP, configure practicum credits.");
    }
    return errors;
  };

  const errors = validate();

  const save = () => {
    if (errors.length) return;
    const payload = {
      program: {
        name: programName,
        type: template,
        semesters,
        honoursWithResearch: honoursResearch,
        entryExitModes,
        policyPackVersion,
      },
      creditFramework,
      ltp,
      practicum: template === "ITEP" ? practicum : null,
    };
    localStorage.setItem("programsFramework", JSON.stringify(payload));
    alert("Saved program framework for scenarios.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-extrabold mb-2">
          Programs & Credit Framework
        </h1>
        <p className="text-slate-400">
          Configure FYUGP/ITEP baskets, L–T–P mappings, and practicum windows
          for scenario use.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-900/40 border border-red-700 rounded-xl p-4 mb-6">
            <ul className="list-disc list-inside text-red-200 text-sm">
              {errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Program Details */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-indigo-400">
              Program details
            </h2>
            <label className="block mb-4">
              <span className="text-sm">Template</span>
              <select
                value={template}
                onChange={(e) => applyTemplate(e.target.value)}
                className="w-full mt-1 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
              >
                <option value="FYUGP">FYUGP</option>
                <option value="ITEP">ITEP</option>
              </select>
              <p className="text-xs text-slate-400 mt-1">
                FYUGP uses credit baskets; ITEP adds practicum requirements.
              </p>
            </label>

            <label className="block mb-4">
              <span className="text-sm">Program name</span>
              <input
                type="text"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="w-full mt-1 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
                required
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm">Semesters</span>
              <input
                type="number"
                min="1"
                value={semesters}
                onChange={(e) => setSemesters(Number(e.target.value))}
                className="w-full mt-1 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
              />
            </label>

            <label className="flex items-center gap-2 mb-4 text-sm">
              <input
                type="checkbox"
                checked={honoursResearch}
                onChange={(e) => setHonoursResearch(e.target.checked)}
                className="rounded bg-slate-800 border-slate-700"
              />
              Honours with Research
            </label>

            <label className="block">
              <span className="text-sm">Policy pack version</span>
              <input
                type="text"
                value={policyPackVersion}
                onChange={(e) => setPolicyPackVersion(e.target.value)}
                className="w-full mt-1 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
              />
            </label>
          </section>

          {/* Credit Baskets */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-indigo-400">
              Credit baskets
            </h2>
            <div className="space-y-3">
              {Object.keys(creditFramework).map((k) => (
                <label
                  key={k}
                  className="flex justify-between items-center text-sm"
                >
                  <span>{k}</span>
                  <input
                    type="number"
                    min="0"
                    value={creditFramework[k]}
                    onChange={(e) => handleFrameworkChange(k, e.target.value)}
                    className="w-20 rounded bg-slate-800 border border-slate-700 px-2 py-1 text-right text-sm"
                  />
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-slate-800 pt-3 text-sm">
              <span>Total credits</span>
              <strong>{totalCredits}</strong>
            </div>
          </section>

          {/* LTP Mapping */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-indigo-400">
              L–T–P mapping
            </h2>
            <div className="space-y-3 text-sm">
              <label className="flex justify-between items-center">
                <span>Lecture hours / credit / week</span>
                <input
                  type="number"
                  min="0"
                  value={ltp.lectureCreditHours}
                  onChange={(e) =>
                    handleLtpChange("lectureCreditHours", e.target.value)
                  }
                  className="w-20 rounded bg-slate-800 border border-slate-700 px-2 py-1 text-right"
                />
              </label>
              <label className="flex justify-between items-center">
                <span>Tutorial hours / credit / week</span>
                <input
                  type="number"
                  min="0"
                  value={ltp.tutorialCreditHours}
                  onChange={(e) =>
                    handleLtpChange("tutorialCreditHours", e.target.value)
                  }
                  className="w-20 rounded bg-slate-800 border border-slate-700 px-2 py-1 text-right"
                />
              </label>
              <label className="flex justify-between items-center">
                <span>Practical hours / credit / week</span>
                <input
                  type="number"
                  min="0"
                  value={ltp.practicalCreditHours}
                  onChange={(e) =>
                    handleLtpChange("practicalCreditHours", e.target.value)
                  }
                  className="w-20 rounded bg-slate-800 border border-slate-700 px-2 py-1 text-right"
                />
              </label>
            </div>
            <label className="flex justify-between items-center text-sm mt-4">
              <span>Slot length (minutes)</span>
              <input
                type="number"
                min="15"
                step="5"
                value={ltp.slotLengthMinutes}
                onChange={(e) =>
                  handleLtpChange("slotLengthMinutes", e.target.value)
                }
                className="w-20 rounded bg-slate-800 border border-slate-700 px-2 py-1 text-right"
              />
            </label>
            <p className="text-xs text-slate-400 mt-2">
              Choose a common slot (e.g., 60 or 90).
            </p>
          </section>

          {/* Practicum (only ITEP) */}
          {template === "ITEP" && (
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 text-indigo-400">
                Practicum & Internship
              </h2>
              <div className="space-y-3 text-sm">
                <label className="flex justify-between items-center">
                  <span>Pre-internship credits</span>
                  <input
                    type="number"
                    min="0"
                    value={practicum.preInternshipCredits}
                    onChange={(e) =>
                      handlePracticumChange(
                        "preInternshipCredits",
                        e.target.value
                      )
                    }
                    className="w-20 rounded bg-slate-800 border border-slate-700 px-2 py-1 text-right"
                  />
                </label>
                <label className="flex justify-between items-center">
                  <span>Internship credits</span>
                  <input
                    type="number"
                    min="0"
                    value={practicum.internshipCredits}
                    onChange={(e) =>
                      handlePracticumChange("internshipCredits", e.target.value)
                    }
                    className="w-20 rounded bg-slate-800 border border-slate-700 px-2 py-1 text-right"
                  />
                </label>
                <label className="flex justify-between items-center">
                  <span>Blackout weeks</span>
                  <input
                    type="number"
                    min="0"
                    value={practicum.blackoutWeeks}
                    onChange={(e) =>
                      handlePracticumChange("blackoutWeeks", e.target.value)
                    }
                    className="w-20 rounded bg-slate-800 border border-slate-700 px-2 py-1 text-right"
                  />
                </label>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Practicum windows reserve time for school attachments and
                field-based learning.
              </p>
            </section>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-5 py-2 rounded-xl border border-slate-700 text-sm hover:border-slate-500 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={errors.length > 0}
            className="px-5 py-2 rounded-xl bg-indigo-500 text-white text-sm font-medium shadow hover:bg-indigo-600 transition disabled:opacity-50"
          >
            Save Framework
          </button>
        </div>
      </main>
    </div>
  );
}
