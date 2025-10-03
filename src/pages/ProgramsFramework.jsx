import React, { useMemo, useState } from "react";
import {
  GraduationCapIcon,
  BookOpenIcon,
  ClipboardListIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  LayoutGridIcon,
  ArrowLeftIcon,
  SaveIcon,
  AlertTriangleIcon,
  BookIcon,
  FlaskConicalIcon,
  UsersIcon,
  PuzzleIcon,
  BriefcaseIcon,
  BarChartIcon,
  GlobeIcon,
  MicroscopeIcon,
  ShieldIcon,
} from "lucide-react";
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
// Credit basket icons mapping
const CREDIT_ICONS = {
  Major: <BookIcon size={16} className="text-indigo-400" />,
  Minor: <BookOpenIcon size={16} className="text-violet-400" />,
  MDC: <PuzzleIcon size={16} className="text-blue-400" />,
  AEC: <GlobeIcon size={16} className="text-emerald-400" />,
  SEC: <UsersIcon size={16} className="text-amber-400" />,
  VAC: <FlaskConicalIcon size={16} className="text-pink-400" />,
  Internship: <BriefcaseIcon size={16} className="text-cyan-400" />,
  Research: <MicroscopeIcon size={16} className="text-rose-400" />,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
      {/* Page Header */}
      <div className="max-w-[1280px] mx-auto px-6 pb-6">
        <h1 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Programs & Credit Framework
        </h1>
        <p className="text-slate-400">
          Manage course catalog and create semester offerings for scheduling.
        </p>
      </div>
      <main className="max-w-[1280px] mx-auto px-6 pb-16 space-y-8">
        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-4 mb-6 animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <AlertTriangleIcon size={18} className="text-red-400" />
              </div>
              <ul className="list-disc list-inside text-red-200 text-sm space-y-1">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Program Details */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <ShieldIcon size={18} className="text-indigo-400" />
              <span>Program details</span>
            </h2>
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Template
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => applyTemplate("FYUGP")}
                    className={`flex-1 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                      template === "FYUGP"
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
                        : "bg-slate-800/50 border border-slate-700 hover:border-indigo-400 hover:bg-indigo-500/10"
                    }`}
                  >
                    <GraduationCapIcon size={16} />
                    FYUGP
                  </button>
                  <button
                    onClick={() => applyTemplate("ITEP")}
                    className={`flex-1 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                      template === "ITEP"
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
                        : "bg-slate-800/50 border border-slate-700 hover:border-indigo-400 hover:bg-indigo-500/10"
                    }`}
                  >
                    <BookOpenIcon size={16} />
                    ITEP
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1.5">
                  FYUGP uses credit baskets; ITEP adds practicum requirements.
                </p>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Program name
                </label>
                <input
                  type="text"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Semesters
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={semesters}
                    onChange={(e) => setSemesters(Number(e.target.value))}
                    className="flex-1 h-2 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500"
                  />
                  <span className="ml-3 px-3 py-1 rounded-lg bg-slate-800 text-sm min-w-[40px] text-center">
                    {semesters}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 py-1">
                <div className="flex h-5 items-center">
                  <input
                    id="honours"
                    type="checkbox"
                    checked={honoursResearch}
                    onChange={(e) => setHonoursResearch(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                  />
                </div>
                <label
                  htmlFor="honours"
                  className="text-sm font-medium text-slate-300"
                >
                  Honours with Research
                </label>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Policy pack version
                </label>
                <input
                  type="text"
                  value={policyPackVersion}
                  onChange={(e) => setPolicyPackVersion(e.target.value)}
                  className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </section>
          {/* Credit Baskets */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <LayoutGridIcon size={18} className="text-indigo-400" />
              <span>Credit baskets</span>
            </h2>
            <div className="space-y-3">
              {Object.keys(creditFramework).map((k) => (
                <div
                  key={k}
                  className="flex justify-between items-center p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex-shrink-0">{CREDIT_ICONS[k]}</div>
                    <span className="text-sm font-medium">{k}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={creditFramework[k]}
                      onChange={(e) => handleFrameworkChange(k, e.target.value)}
                      className="w-20 rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-right text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center p-4 rounded-xl bg-indigo-900/20 border border-indigo-800/30">
              <span className="text-sm font-medium text-indigo-200">
                Total credits
              </span>
              <span className="font-bold text-lg text-white">
                {totalCredits}
              </span>
            </div>
          </section>
          {/* LTP Mapping */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <ClipboardListIcon size={18} className="text-indigo-400" />
              <span>L–T–P mapping</span>
            </h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Lecture hours / credit / week
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={ltp.lectureCreditHours}
                    onChange={(e) =>
                      handleLtpChange("lectureCreditHours", e.target.value)
                    }
                    className="flex-1 h-2 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={ltp.lectureCreditHours}
                    onChange={(e) =>
                      handleLtpChange("lectureCreditHours", e.target.value)
                    }
                    className="ml-3 w-16 rounded-lg bg-slate-800 border border-slate-700 px-2 py-1 text-right text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Tutorial hours / credit / week
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={ltp.tutorialCreditHours}
                    onChange={(e) =>
                      handleLtpChange("tutorialCreditHours", e.target.value)
                    }
                    className="flex-1 h-2 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={ltp.tutorialCreditHours}
                    onChange={(e) =>
                      handleLtpChange("tutorialCreditHours", e.target.value)
                    }
                    className="ml-3 w-16 rounded-lg bg-slate-800 border border-slate-700 px-2 py-1 text-right text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Practical hours / credit / week
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={ltp.practicalCreditHours}
                    onChange={(e) =>
                      handleLtpChange("practicalCreditHours", e.target.value)
                    }
                    className="flex-1 h-2 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={ltp.practicalCreditHours}
                    onChange={(e) =>
                      handleLtpChange("practicalCreditHours", e.target.value)
                    }
                    className="ml-3 w-16 rounded-lg bg-slate-800 border border-slate-700 px-2 py-1 text-right text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-300">
                  Slot length (minutes)
                </label>
                <div className="flex items-center gap-2">
                  <ClockIcon size={16} className="text-slate-400" />
                  <input
                    type="number"
                    min="15"
                    step="5"
                    value={ltp.slotLengthMinutes}
                    onChange={(e) =>
                      handleLtpChange("slotLengthMinutes", e.target.value)
                    }
                    className="w-16 rounded-lg bg-slate-800 border border-slate-700 px-2 py-1 text-right text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap mt-2">
                {[30, 45, 50, 60, 75, 90, 120].map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() =>
                      handleLtpChange("slotLengthMinutes", minutes)
                    }
                    className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
                      ltp.slotLengthMinutes === minutes
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    }`}
                  >
                    {minutes} min
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Choose a common slot length for scheduling efficiency.
              </p>
            </div>
          </section>
          {/* Practicum (only ITEP) */}
          {template === "ITEP" && (
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <CalendarIcon size={18} className="text-indigo-400" />
                <span>Practicum & Internship</span>
              </h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">
                    Pre-internship credits
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={practicum.preInternshipCredits}
                      onChange={(e) =>
                        handlePracticumChange(
                          "preInternshipCredits",
                          e.target.value
                        )
                      }
                      className="flex-1 h-2 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500"
                    />
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
                      className="ml-3 w-16 rounded-lg bg-slate-800 border border-slate-700 px-2 py-1 text-right text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">
                    Internship credits
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={practicum.internshipCredits}
                      onChange={(e) =>
                        handlePracticumChange(
                          "internshipCredits",
                          e.target.value
                        )
                      }
                      className="flex-1 h-2 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500"
                    />
                    <input
                      type="number"
                      min="0"
                      value={practicum.internshipCredits}
                      onChange={(e) =>
                        handlePracticumChange(
                          "internshipCredits",
                          e.target.value
                        )
                      }
                      className="ml-3 w-16 rounded-lg bg-slate-800 border border-slate-700 px-2 py-1 text-right text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">
                    Blackout weeks
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="12"
                      value={practicum.blackoutWeeks}
                      onChange={(e) =>
                        handlePracticumChange("blackoutWeeks", e.target.value)
                      }
                      className="flex-1 h-2 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500"
                    />
                    <input
                      type="number"
                      min="0"
                      value={practicum.blackoutWeeks}
                      onChange={(e) =>
                        handlePracticumChange("blackoutWeeks", e.target.value)
                      }
                      className="ml-3 w-16 rounded-lg bg-slate-800 border border-slate-700 px-2 py-1 text-right text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 p-3 rounded-lg bg-indigo-900/20 border border-indigo-800/30">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircleIcon size={16} className="text-indigo-400" />
                  </div>
                  <p className="text-xs text-slate-300">
                    Practicum windows reserve time for school attachments and
                    field-based learning. These settings will create blackout
                    periods in the timetable.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-5 py-2.5 rounded-xl border border-slate-700 text-sm hover:border-slate-500 transition-colors flex items-center gap-2"
          >
            <ArrowLeftIcon size={16} />
            Back
          </button>
          <button
            type="button"
            onClick={save}
            disabled={errors.length > 0}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-lg shadow-indigo-900/30 hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
          >
            <SaveIcon size={16} />
            Save Framework
          </button>
        </div>
      </main>
    </div>
  );
}
