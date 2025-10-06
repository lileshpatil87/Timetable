import React, { useEffect, useMemo, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "../components/CustomDropdown";

import {
  FileText,
  File,
  Calendar,
  Users,
  User,
  Home,
  Download,
  Globe,
  Filter,
  Check,
  AlertTriangle,
  Printer,
  FileSpreadsheet,
  Clock,
  Info,
  ArrowRight,
  ChevronDown,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const AUDIENCES = ["Program/Cohort", "Faculty", "Room"];
const FORMATS = ["PDF", "CSV", "ICS"];

// Format icons mapping
const FORMAT_ICONS = {
  PDF: <FileText size={16} />,
  CSV: <FileSpreadsheet size={16} />,
  ICS: <Calendar size={16} />,
};

// Audience icons mapping
const AUDIENCE_ICONS = {
  "Program/Cohort": <Users size={16} />,
  Faculty: <User size={16} />,
  Room: <Home size={16} />,
};

// Load sessions from timetable seed/localStorage
function loadSessions() {
  const s = localStorage.getItem("sessions");
  return s
    ? JSON.parse(s)
    : [
        {
          course: "CSE101",
          title: "Introduction to Computer Science",
          kind: "Lecture",
          cohort: "FYUGP-SEM1-A",
          faculty: "Dr. Sharma",
          room: "LH-101",
          day: "Monday",
          slot: "09:00",
          durationSlots: 2,
        },
        {
          course: "MTH201",
          title: "Calculus",
          kind: "Lecture",
          cohort: "FYUGP-SEM1-A",
          faculty: "Dr. Gupta",
          room: "LH-102",
          day: "Tuesday",
          slot: "10:00",
          durationSlots: 1,
        },
        {
          course: "PHY101",
          title: "Physics Lab",
          kind: "Lab",
          cohort: "BSC-SEM2-B",
          faculty: "Dr. Patel",
          room: "LAB-201",
          day: "Wednesday",
          slot: "14:00",
          durationSlots: 3,
        },
      ];
}

function groupByAudience(sessions, audience) {
  const key =
    audience === "Program/Cohort"
      ? "cohort"
      : audience === "Faculty"
      ? "faculty"
      : "room";
  const map = {};
  sessions.forEach((s) => {
    const k = s[key] || "Unknown";
    (map[k] ||= []).push(s);
  });
  return map;
}

export default function ExportsPublishing() {
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
    tableBorder: isDark ? "border-gray-200" : "border-slate-800/60",
    tableHeader: isDark ? "bg-gray-50" : "bg-slate-800/40",
  };

  const theme = contextTheme || defaultTheme;

  const [sessions, setSessions] = useState(loadSessions());

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  const [audience, setAudience] = useState("Program/Cohort");
  const [entity, setEntity] = useState("");
  const [format, setFormat] = useState("CSV");
  const [tz, setTz] = useState("Asia/Kolkata");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [batchAll, setBatchAll] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState("Idle");

  const progressTimer = useRef(null);

  const groups = useMemo(
    () => groupByAudience(sessions, audience),
    [sessions, audience]
  );

  const entities = useMemo(() => Object.keys(groups).sort(), [groups]);

  useEffect(() => {
    if (!entity && entities.length) setEntity(entities[0]);
  }, [entities, entity]);

  const filteredSessions = useMemo(() => {
    const list = batchAll ? sessions : groups[entity] || [];
    if (!dateRange.start || !dateRange.end) return list;
    return list;
  }, [sessions, groups, entity, batchAll, dateRange]);

  const fileBase = `${audience.replace(/\W+/g, "_").toLowerCase()}_${
    entity ? entity.replace(/\W+/g, "_").toLowerCase() : "all"
  }`;

  const exportCSV = (rows, name) => {
    const header = [
      "Course",
      "Title",
      "Kind",
      "Cohort",
      "Faculty",
      "Room",
      "Day",
      "Slot",
      "DurationSlots",
    ];
    const csv = [header.join(",")]
      .concat(
        rows.map((r) =>
          [
            r.course,
            r.title,
            r.kind,
            r.cohort || "",
            r.faculty || "",
            r.room || "",
            r.day,
            r.slot,
            r.durationSlots,
          ]
            .map((v) => `"${String(v || "").replace(/"/g, '""')}"`)
            .join(",")
        )
      )
      .join("\n");
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8",
    });
    triggerDownload(blob, `${name}.csv`);
  };

  const exportICS = (rows, name) => {
    const lines = [];
    lines.push("BEGIN:VCALENDAR");
    lines.push("VERSION:2.0");
    lines.push("PRODID:-//Timely NEP//Exports//EN");
    rows.forEach((r, idx) => {
      const uid = `${r.course}-${r.day}-${r.slot}-${idx}@timelynep`;
      const dtStart = `20251001T${(r.slot || "09:00").replace(":", "")}00`;
      const endSlot =
        r.durationSlots > 1
          ? Number(r.slot.split(":")[0]) + r.durationSlots
          : Number(r.slot.split(":")[0]) + 1;
      const dtEnd = `20251001T${String(endSlot).padStart(2, "0")}0000`;
      lines.push("BEGIN:VEVENT");
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:20250930T120000Z`);
      lines.push(`DTSTART:${dtStart}`);
      lines.push(`DTEND:${dtEnd}`);
      lines.push(`SUMMARY:${r.course} ${r.title || ""}`.trim());
      lines.push(`LOCATION:${r.room || ""}`);
      lines.push("END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    const ics = lines.join("\r\n");
    const blob = new Blob([ics], {
      type: "text/calendar;charset=utf-8",
    });
    triggerDownload(blob, `${name}.ics`);
  };

  const triggerDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const runExport = async () => {
    setRunning(true);
    setProgress(0);
    setStatusMsg("Preparing export…");
    if (progressTimer.current) clearInterval(progressTimer.current);
    progressTimer.current = setInterval(
      () =>
        setProgress((p) =>
          Math.min(100, p + Math.floor(Math.random() * 18) + 7)
        ),
      600
    );

    const targets = batchAll ? entities : [entity];
    for (let i = 0; i < targets.length; i++) {
      const e = targets[i];
      const rows = groups[e] || [];
      setStatusMsg(
        `Exporting ${format} for ${e} (${i + 1}/${targets.length})…`
      );
      await new Promise((res) => setTimeout(res, 700));
      if (format === "CSV")
        exportCSV(
          rows,
          `${fileBase.replace("all", e.replace(/\W+/g, "_").toLowerCase())}`
        );
      if (format === "ICS")
        exportICS(
          rows,
          `${fileBase.replace("all", e.replace(/\W+/g, "_").toLowerCase())}`
        );
      if (format === "PDF") window.print();
    }
    setStatusMsg("Done");
    setProgress(100);
    clearInterval(progressTimer.current);
    setTimeout(() => setRunning(false), 800);
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
            <h1 className="text-3xl font-bold mb-2">Exports & Publishing</h1>
            <p className={`text-sm ${theme.mutedText}`}>
              Export audience-specific timetables as CSV/ICS or print as PDF
            </p>
          </div>
        </div>
      </motion.div>

      {/* Export Options */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-base font-bold mb-5 flex items-center gap-2">
          <Filter
            size={18}
            className={isDark ? "text-indigo-600" : "text-indigo-400"}
          />
          Export Options
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Audience */}
          <div className="space-y-2">
            <CustomDropdown
              label="Audience"
              name="audience"
              id="export-audience"
              value={audience}
              onChange={(e) => {
                setAudience(e.target.value);
                setEntity("");
              }}
              options={AUDIENCES}
              theme={isDark ? "dark" : "light"}
            />
          </div>

          {/* Entity Selector */}
          <div className="space-y-2">
            <CustomDropdown
              label={`${audience} Selector`}
              name="entity"
              id="export-entity"
              value={batchAll ? "All" : entity}
              onChange={(e) => setEntity(e.target.value)}
              options={batchAll ? ["All"] : entities}
              theme={isDark ? "dark" : "light"}
              error={entities.length === 0 ? "No entities available" : ""}
            />
          </div>
          {/* Format */}
          <div className="space-y-2">
            <CustomDropdown
              label="Format"
              name="format"
              id="export-format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              options={FORMATS}
              theme={isDark ? "dark" : "light"}
            />
          </div>
        </div>

        {/* Batch Export Checkbox */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            id="batchExport"
            checked={batchAll}
            onChange={(e) => setBatchAll(e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="batchExport" className="text-sm font-medium">
            Export each {audience.split("/")[0]} as a separate file
          </label>
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <motion.button
            className={`rounded-lg px-5 py-2.5 font-medium shadow-lg flex items-center gap-2 ${
              running
                ? `${theme.buttonBg} ${theme.buttonText} cursor-not-allowed`
                : `bg-gradient-to-r ${theme.gradient} text-white`
            }`}
            onClick={runExport}
            disabled={running}
            whileHover={!running ? { scale: 1.02 } : {}}
            whileTap={!running ? { scale: 0.98 } : {}}
          >
            <Download size={16} />
            {running ? "Exporting..." : "Export"}
          </motion.button>
        </div>
      </motion.section>

      {/* Progress Status */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-base font-bold mb-5 flex items-center gap-2">
          <Clock
            size={18}
            className={isDark ? "text-indigo-600" : "text-indigo-400"}
          />
          Export Status
        </h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex-1 ${theme.accentBg} rounded-full h-2.5 overflow-hidden`}
            >
              <motion.div
                className={`h-full bg-gradient-to-r ${theme.gradient}`}
                initial={{ width: "0%" }}
                animate={{ width: `${running ? progress : 0}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="font-mono text-sm font-semibold min-w-[50px] text-right">
              {running ? progress : 0}%
            </span>
          </div>

          <div
            className={`px-4 py-3 rounded-lg border flex items-center gap-2 ${
              statusMsg === "Done"
                ? isDark
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : statusMsg === "Idle"
                ? `${theme.accentBg} border ${theme.accentBorder} ${theme.mutedText}`
                : isDark
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
            }`}
          >
            {statusMsg === "Done" ? (
              <Check size={16} />
            ) : statusMsg === "Idle" ? (
              <Info size={16} />
            ) : (
              <div className="animate-spin h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full" />
            )}
            <span className="text-sm font-medium">{statusMsg}</span>
          </div>
        </div>
      </motion.section>

      {/* Format Information */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-base font-bold mb-5 flex items-center gap-2">
          <Info
            size={18}
            className={isDark ? "text-indigo-600" : "text-indigo-400"}
          />
          Export Format Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              format: "PDF",
              icon: <FileText size={18} />,
              color: isDark ? "bg-indigo-100" : "bg-indigo-500/20",
              iconColor: isDark ? "text-indigo-600" : "text-indigo-400",
              title: "PDF Export",
              description:
                "Uses browser's print dialog. Set landscape orientation for best results.",
              tip: "Perfect for printing physical copies",
              tipIcon: <Printer size={14} />,
            },
            {
              format: "CSV",
              icon: <FileSpreadsheet size={18} />,
              color: isDark ? "bg-emerald-100" : "bg-emerald-500/20",
              iconColor: isDark ? "text-emerald-600" : "text-emerald-400",
              title: "CSV Export",
              description:
                "Opens in Excel/Google Sheets with all session columns preserved.",
              tip: "Ideal for data analysis and sorting",
              tipIcon: <Filter size={14} />,
            },
            {
              format: "ICS",
              icon: <Calendar size={18} />,
              color: isDark ? "bg-amber-100" : "bg-amber-500/20",
              iconColor: isDark ? "text-amber-600" : "text-amber-400",
              title: "ICS Calendar",
              description:
                "Maps sessions to VEVENT with full calendar structure.",
              tip: "Import into calendar apps",
              tipIcon: <Globe size={14} />,
            },
          ].map((item, idx) => (
            <motion.div
              key={item.format}
              className={`rounded-xl border ${theme.cardBorder} ${theme.accentBg} p-4 ${theme.hoverBg} transition-all`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${item.color}`}>
                  <div className={item.iconColor}>{item.icon}</div>
                </div>
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <p className={`text-sm ${theme.mutedText} mb-3`}>
                {item.description}
              </p>
              <div
                className={`flex items-center gap-2 text-xs ${theme.mutedText}`}
              >
                {item.tipIcon}
                <span>{item.tip}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Preview Table */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm overflow-hidden shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className={`p-5 border-b ${theme.cardBorder}`}>
          <h2 className="text-base font-bold flex items-center gap-2">
            <File
              size={18}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            Export Preview
            <span
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${theme.accentBg} border ${theme.accentBorder}`}
            >
              {filteredSessions.length} sessions
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className={theme.tableHeader}>
              <tr>
                {[
                  "Course",
                  "Title",
                  "Type",
                  "Cohort",
                  "Faculty",
                  "Room",
                  "Day & Time",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b ${theme.tableBorder}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session, idx) => (
                  <motion.tr
                    key={idx}
                    className={`border-b ${theme.tableBorder} ${theme.hoverBg} transition-colors`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <td className="px-4 py-4 font-semibold">
                      {session.course}
                    </td>
                    <td className="px-4 py-4">{session.title}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium ${
                          isDark
                            ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                            : "bg-indigo-500/20 text-indigo-300 border-indigo-400/40"
                        }`}
                      >
                        {session.kind}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1.5 text-sm">
                        <Users size={14} className={theme.mutedText} />
                        {session.cohort || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1.5 text-sm">
                        <User size={14} className={theme.mutedText} />
                        {session.faculty || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1.5 text-sm">
                        <Home size={14} className={theme.mutedText} />
                        {session.room || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${theme.accentBg} border ${theme.accentBorder}`}
                        >
                          {session.day}
                        </span>
                        <span
                          className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${
                            isDark
                              ? "bg-amber-100 text-amber-700 border-amber-200"
                              : "bg-amber-500/20 text-amber-300 border-amber-400/40"
                          }`}
                        >
                          <Clock size={14} />
                          {session.slot}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className={`px-4 py-12 text-center ${theme.mutedText}`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <AlertTriangle size={32} className="opacity-50" />
                      <p className="text-sm">
                        No sessions available for the selected criteria
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}
