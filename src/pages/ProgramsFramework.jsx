import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  ClipboardList,
  Calendar,
  CheckCircle,
  Clock,
  LayoutGrid,
  ArrowLeft,
  Save,
  AlertTriangle,
  BookMarked,
  FlaskConical,
  Users,
  Puzzle,
  Briefcase,
  BarChart3,
  Globe,
  Microscope,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const FYUGP_TEMPLATE = {
  type: "FYUGP",
  semesters: 8,
  creditFramework: {
    Major: 80,
    Minor: 40,
    MDC: 12,
    AEC: 8,
    SEC: 12,
    VAC: 8,
    Internship: 4,
    Research: 4,
  },
};

const ITEP_TEMPLATE = {
  type: "ITEP",
  semesters: 8,
  creditFramework: {
    Major: 100,
    Minor: 20,
    MDC: 12,
    AEC: 8,
    SEC: 8,
    VAC: 8,
    Internship: 12,
    Research: 4,
  },
  practicum: {
    preInternshipCredits: 20,
    internshipCredits: 12,
    blackoutWeeks: 4,
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
  Major: { icon: <BookMarked size={16} />, color: "indigo" },
  Minor: { icon: <BookOpen size={16} />, color: "violet" },
  MDC: { icon: <Puzzle size={16} />, color: "blue" },
  AEC: { icon: <Globe size={16} />, color: "emerald" },
  SEC: { icon: <Users size={16} />, color: "amber" },
  VAC: { icon: <FlaskConical size={16} />, color: "pink" },
  Internship: { icon: <Briefcase size={16} />, color: "cyan" },
  Research: { icon: <Microscope size={16} />, color: "rose" },
};

export default function ProgramsFramework() {
  // Get theme from parent layout
  const outletContext = useOutletContext();
  const { theme: contextTheme, isDark: contextIsDark } = outletContext || {};

  const [localIsDark] = useState(true);
  const isDark = contextIsDark !== undefined ? contextIsDark : localIsDark;

  const defaultTheme = {
    bg: isDark ? "bg-gray-50" : "bg-slate-950",
    text: isDark ? "text-gray-900" : "text-slate-50",
    cardBg: isDark ? "bg-white" : "bg-slate-900/50",
    cardBorder: isDark ? "border-gray-200" : "border-slate-800/60",
    mutedText: isDark ? "text-gray-600" : "text-slate-400",
    gradient: isDark
      ? "from-indigo-600 via-purple-600 to-pink-600"
      : "from-indigo-400 via-purple-400 to-pink-400",
    accentBg: isDark ? "bg-gray-50" : "bg-slate-800/30",
    accentBorder: isDark ? "border-gray-200" : "border-slate-700/40",
    hoverBg: isDark ? "hover:bg-gray-50" : "hover:bg-slate-800/50",
    buttonBg: isDark ? "bg-gray-100" : "bg-slate-800/40",
    buttonBorder: isDark ? "border-gray-300" : "border-slate-700/60",
    buttonText: isDark ? "text-gray-900" : "text-slate-200",
    inputBg: isDark ? "bg-white" : "bg-slate-800/50",
    inputBorder: isDark ? "border-gray-300" : "border-slate-700",
    inputText: isDark ? "text-gray-900" : "text-slate-100",
  };

  const theme = contextTheme || defaultTheme;

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
    if (val === "ITEP") {
      setPracticum(ITEP_TEMPLATE.practicum);
    }
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

  const getIconColor = (color) => {
    const colors = {
      indigo: isDark ? "text-indigo-600" : "text-indigo-400",
      violet: isDark ? "text-violet-600" : "text-violet-400",
      blue: isDark ? "text-blue-600" : "text-blue-400",
      emerald: isDark ? "text-emerald-600" : "text-emerald-400",
      amber: isDark ? "text-amber-600" : "text-amber-400",
      pink: isDark ? "text-pink-600" : "text-pink-400",
      cyan: isDark ? "text-cyan-600" : "text-cyan-400",
      rose: isDark ? "text-rose-600" : "text-rose-400",
    };
    return colors[color] || colors.indigo;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`p-3 rounded-xl ${
              isDark ? "bg-indigo-100" : "bg-indigo-500/20"
            }`}
          >
            <Sparkles
              size={24}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Programs & Credit Framework
            </h1>
            <p className={`text-sm ${theme.mutedText}`}>
              Configure program structure, credit distribution, and L-T-P
              mapping for automated timetable generation
            </p>
          </div>
        </div>
      </motion.div>

      {/* Errors */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            className={`rounded-xl border p-4 ${
              isDark
                ? "bg-rose-50 border-rose-200"
                : "bg-rose-500/10 border-rose-500/30"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle
                size={18}
                className={isDark ? "text-rose-600" : "text-rose-400"}
              />
              <ul className="list-disc list-inside text-sm space-y-1">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Program Details */}
        <motion.section
          className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-base font-bold mb-5 flex items-center gap-2">
            <Shield
              size={18}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            Program Details
          </h2>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold">Template</label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={() => applyTemplate("FYUGP")}
                  className={`px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                    template === "FYUGP"
                      ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg`
                      : `border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText}`
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GraduationCap size={16} />
                  FYUGP
                </motion.button>
                <motion.button
                  onClick={() => applyTemplate("ITEP")}
                  className={`px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                    template === "ITEP"
                      ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg`
                      : `border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText}`
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BookOpen size={16} />
                  ITEP
                </motion.button>
              </div>
              <p className={`text-xs ${theme.mutedText} mt-2`}>
                FYUGP uses credit baskets; ITEP adds practicum requirements
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Program Name
              </label>
              <input
                type="text"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold">Semesters</label>
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-bold ${theme.accentBg} border ${theme.accentBorder}`}
                >
                  {semesters}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={semesters}
                onChange={(e) => setSemesters(Number(e.target.value))}
                className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                id="honours"
                type="checkbox"
                checked={honoursResearch}
                onChange={(e) => setHonoursResearch(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="honours" className="text-sm font-medium">
                Honours with Research
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Policy Pack Version
              </label>
              <input
                type="text"
                value={policyPackVersion}
                onChange={(e) => setPolicyPackVersion(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
              />
            </div>
          </div>
        </motion.section>

        {/* Credit Baskets */}
        <motion.section
          className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-base font-bold mb-5 flex items-center gap-2">
            <LayoutGrid
              size={18}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            Credit Baskets
          </h2>
          <div className="space-y-3">
            {Object.keys(creditFramework).map((k, i) => (
              <motion.div
                key={k}
                className={`flex justify-between items-center p-3 rounded-xl border ${theme.accentBorder} ${theme.accentBg} ${theme.hoverBg} transition-all`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className={getIconColor(CREDIT_ICONS[k].color)}>
                    {CREDIT_ICONS[k].icon}
                  </div>
                  <span className="text-sm font-medium">{k}</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={creditFramework[k]}
                  onChange={(e) => handleFrameworkChange(k, e.target.value)}
                  className={`w-20 px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-right text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                />
              </motion.div>
            ))}
          </div>
          <motion.div
            className={`mt-6 flex justify-between items-center p-4 rounded-xl ${
              isDark
                ? "bg-indigo-50 border border-indigo-200"
                : "bg-indigo-500/10 border border-indigo-500/30"
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span
              className={`text-sm font-semibold ${
                isDark ? "text-indigo-900" : "text-indigo-300"
              }`}
            >
              Total Credits
            </span>
            <span className="font-bold text-2xl">{totalCredits}</span>
          </motion.div>
        </motion.section>

        {/* LTP Mapping */}
        <motion.section
          className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-base font-bold mb-5 flex items-center gap-2">
            <ClipboardList
              size={18}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            L-T-P Mapping
          </h2>
          <div className="space-y-5">
            {[
              {
                key: "lectureCreditHours",
                label: "Lecture hours / credit / week",
              },
              {
                key: "tutorialCreditHours",
                label: "Tutorial hours / credit / week",
              },
              {
                key: "practicalCreditHours",
                label: "Practical hours / credit / week",
              },
            ].map((item) => (
              <div key={item.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">{item.label}</label>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${theme.accentBg} border ${theme.accentBorder}`}
                  >
                    {ltp[item.key]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={ltp[item.key]}
                  onChange={(e) => handleLtpChange(item.key, e.target.value)}
                  className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold">
                Slot Length (minutes)
              </label>
              <div className="flex items-center gap-2">
                <Clock
                  size={16}
                  className={isDark ? "text-indigo-600" : "text-indigo-400"}
                />
                <input
                  type="number"
                  min="15"
                  step="5"
                  value={ltp.slotLengthMinutes}
                  onChange={(e) =>
                    handleLtpChange("slotLengthMinutes", e.target.value)
                  }
                  className={`w-20 px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-right text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[30, 45, 50, 60, 75, 90, 120].map((minutes) => (
                <motion.button
                  key={minutes}
                  onClick={() => handleLtpChange("slotLengthMinutes", minutes)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                    ltp.slotLengthMinutes === minutes
                      ? `bg-gradient-to-r ${theme.gradient} text-white shadow-md`
                      : `${theme.buttonBg} border ${theme.buttonBorder} ${theme.buttonText}`
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {minutes} min
                </motion.button>
              ))}
            </div>
            <p className={`text-xs ${theme.mutedText}`}>
              Choose a common slot length for scheduling efficiency
            </p>
          </div>
        </motion.section>

        {/* Practicum (only ITEP) */}
        <AnimatePresence>
          {template === "ITEP" && (
            <motion.section
              className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-base font-bold mb-5 flex items-center gap-2">
                <Calendar
                  size={18}
                  className={isDark ? "text-indigo-600" : "text-indigo-400"}
                />
                Practicum & Internship
              </h2>
              <div className="space-y-5">
                {[
                  {
                    key: "preInternshipCredits",
                    label: "Pre-internship credits",
                    max: 30,
                  },
                  {
                    key: "internshipCredits",
                    label: "Internship credits",
                    max: 30,
                  },
                  { key: "blackoutWeeks", label: "Blackout weeks", max: 12 },
                ].map((item) => (
                  <div key={item.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        {item.label}
                      </label>
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold ${theme.accentBg} border ${theme.accentBorder}`}
                      >
                        {practicum[item.key]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={item.max}
                      value={practicum[item.key]}
                      onChange={(e) =>
                        handlePracticumChange(item.key, e.target.value)
                      }
                      className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                ))}
              </div>
              <div
                className={`mt-6 p-4 rounded-xl ${
                  isDark
                    ? "bg-indigo-50 border border-indigo-200"
                    : "bg-indigo-500/10 border border-indigo-500/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={16}
                    className={isDark ? "text-indigo-600" : "text-indigo-400"}
                  />
                  <p
                    className={`text-xs ${
                      isDark ? "text-indigo-900" : "text-indigo-300"
                    }`}
                  >
                    Practicum windows reserve time for school attachments and
                    field-based learning. These settings will create blackout
                    periods in the timetable.
                  </p>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <motion.div
        className="flex justify-end gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.button
          type="button"
          onClick={() => window.history.back()}
          className={`px-5 py-2.5 rounded-xl border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} text-sm font-medium transition-all flex items-center gap-2`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>
        <motion.button
          type="button"
          onClick={save}
          disabled={errors.length > 0}
          className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save size={16} />
          Save Framework
        </motion.button>
      </motion.div>
    </div>
  );
}
