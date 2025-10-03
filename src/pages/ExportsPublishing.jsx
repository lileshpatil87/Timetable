import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  createElement,
} from "react";
import {
  FileTextIcon,
  FileIcon,
  CalendarIcon,
  UsersIcon,
  UserIcon,
  HomeIcon,
  DownloadIcon,
  GlobeIcon,
  FilterIcon,
  CheckIcon,
  AlertTriangleIcon,
  PrinterIcon,
  FileSpreadsheetIcon,
  ClockIcon,
  InfoIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  FileBoxIcon,
} from "lucide-react";
const AUDIENCES = ["Program/Cohort", "Faculty", "Room"];
const FORMATS = ["PDF", "CSV", "ICS"];
// Format icons mapping
const FORMAT_ICONS = {
  PDF: <FileTextIcon size={16} />,
  CSV: <FileSpreadsheetIcon size={16} />,
  ICS: <CalendarIcon size={16} />,
};
// Audience icons mapping
const AUDIENCE_ICONS = {
  "Program/Cohort": <UsersIcon size={16} />,
  Faculty: <UserIcon size={16} />,
  Room: <HomeIcon size={16} />,
};
// Load sessions from timetable seed/localStorage
function loadSessions() {
  const s = localStorage.getItem("sessions");
  return s
    ? JSON.parse(s)
    : [
        // Default sample data if nothing exists
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
        {
          course: "ENG103",
          title: "Communication Skills",
          kind: "Workshop",
          cohort: "BCOM-SEM3-A",
          faculty: "Prof. Reddy",
          room: "SH-105",
          day: "Thursday",
          slot: "11:00",
          durationSlots: 2,
        },
        {
          course: "CHE202",
          title: "Organic Chemistry",
          kind: "Lecture",
          cohort: "BSC-SEM2-B",
          faculty: "Dr. Kumar",
          room: "LH-103",
          day: "Friday",
          slot: "13:00",
          durationSlots: 1,
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
    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);
    // Prototype: sessions lack absolute dates, so leave as-is if no mapping; in real build map week/slot to date
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
    // Minimal RFC 5545 ICS with VEVENT per session
    const lines = [];
    lines.push("BEGIN:VCALENDAR");
    lines.push("VERSION:2.0");
    lines.push("PRODID:-//Timely NEP//Exports//EN");
    rows.forEach((r, idx) => {
      const uid = `${r.course}-${r.day}-${r.slot}-${idx}@timelynep`;
      // Prototype DTSTART/DTEND placeholders; real build maps to absolute datetimes with TZID
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
    // Simulate batching
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
      
      {/* Page Header */}
      <div className="max-w-[1280px] mx-auto px-6 pb-6">
        <h1 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Exports & Publishing
        </h1>
        <p className="text-slate-400">
          Export audience-specific timetables as CSV/ICS or print as PDF with
          accessible progress tracking.
        </p>
      </div>
      <main className="max-w-[1280px] mx-auto px-6 pb-16 space-y-6">
        {/* Options */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm"
          aria-labelledby="options-title"
        >
          <h2
            id="options-title"
            className="text-base font-bold mb-4 flex items-center gap-2"
          >
            <FilterIcon size={18} className="text-indigo-400" />
            <span>Export Options</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                Audience
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  {AUDIENCE_ICONS[audience]}
                </div>
                <select
                  className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  value={audience}
                  onChange={(e) => {
                    setAudience(e.target.value);
                    setEntity("");
                  }}
                >
                  {AUDIENCES.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <ChevronDownIcon size={16} />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                {audience} Selector
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  {audience === "Program/Cohort" ? (
                    <UsersIcon size={16} />
                  ) : audience === "Faculty" ? (
                    <UserIcon size={16} />
                  ) : (
                    <HomeIcon size={16} />
                  )}
                </div>
                <select
                  className={`w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all ${
                    batchAll ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  value={entity}
                  onChange={(e) => setEntity(e.target.value)}
                  disabled={batchAll}
                >
                  {!batchAll &&
                    entities.map((x) => <option key={x}>{x}</option>)}
                  {batchAll && <option>All</option>}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <ChevronDownIcon size={16} />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                Format
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  {FORMAT_ICONS[format]}
                </div>
                <select
                  className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  {FORMATS.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <ChevronDownIcon size={16} />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                Time Zone (for ICS)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <GlobeIcon size={16} />
                </div>
                <input
                  className={`w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all ${
                    format !== "ICS" ? "opacity-60" : ""
                  }`}
                  value={tz}
                  onChange={(e) => setTz(e.target.value)}
                  disabled={format !== "ICS"}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                Date Range (optional)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <CalendarIcon size={16} />
                  </div>
                  <input
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    type="date"
                    value={dateRange.start}
                    onChange={(e) =>
                      setDateRange((r) => ({
                        ...r,
                        start: e.target.value,
                      }))
                    }
                    placeholder="Start date"
                  />
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <ArrowRightIcon size={16} />
                  </div>
                  <input
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    type="date"
                    value={dateRange.end}
                    onChange={(e) =>
                      setDateRange((r) => ({
                        ...r,
                        end: e.target.value,
                      }))
                    }
                    placeholder="End date"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={batchAll}
                    onChange={(e) => setBatchAll(e.target.checked)}
                  />
                  <div className="h-5 w-5 rounded border border-slate-700 bg-slate-800/70 peer-checked:border-indigo-400 peer-checked:bg-indigo-500"></div>
                  <CheckIcon
                    size={12}
                    className="absolute left-[5px] text-white opacity-0 peer-checked:opacity-100"
                  />
                </div>
                <span className="text-sm">
                  Export each {audience.split("/")[0]} as a separate file
                </span>
              </label>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              className={`rounded-lg px-5 py-2.5 font-medium shadow-lg flex items-center gap-2 ${
                running
                  ? "bg-slate-700 text-slate-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-colors"
              }`}
              onClick={runExport}
              disabled={running}
            >
              <DownloadIcon size={16} />
              {running ? "Exporting..." : "Export"}
            </button>
          </div>
        </section>
        {/* Status */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm"
          aria-labelledby="status-title"
        >
          <h2
            id="status-title"
            className="text-base font-bold mb-4 flex items-center gap-2"
          >
            <ClockIcon size={18} className="text-indigo-400" />
            <span>Status</span>
          </h2>
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
                style={{
                  width: `${running ? progress : 0}%`,
                }}
              ></div>
            </div>
            <span className="font-mono text-sm text-indigo-300">
              {running ? progress : 0}%
            </span>
          </div>
          <div
            role="status"
            aria-live="polite"
            className={`mt-3 px-4 py-3 rounded-lg border ${
              statusMsg === "Done"
                ? "bg-green-500/10 border-green-500/30 text-green-300"
                : statusMsg === "Idle"
                ? "bg-slate-800/50 border-slate-700 text-slate-400"
                : "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
            } flex items-center gap-2`}
          >
            {statusMsg === "Done" ? (
              <CheckIcon size={16} className="text-green-400" />
            ) : statusMsg === "Idle" ? (
              <InfoIcon size={16} className="text-slate-400" />
            ) : (
              <div className="animate-spin h-4 w-4 border-2 border-indigo-400 border-t-transparent rounded-full" />
            )}
            {statusMsg}
          </div>
        </section>
        {/* Format Info */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm"
          aria-labelledby="format-info-title"
        >
          <h2
            id="format-info-title"
            className="text-base font-bold mb-4 flex items-center gap-2"
          >
            <InfoIcon size={18} className="text-indigo-400" />
            <span>Export Format Information</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4 hover:bg-slate-800/40 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <FileTextIcon size={16} />
                </div>
                <h3 className="text-base font-medium">PDF</h3>
              </div>
              <p className="text-sm text-slate-300">
                Uses the browser's print dialog. For best results, set landscape
                orientation and fit to page for timetable grids.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                <PrinterIcon size={14} />
                <span>Perfect for printing physical copies</span>
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4 hover:bg-slate-800/40 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/20 text-green-400">
                  <FileSpreadsheetIcon size={16} />
                </div>
                <h3 className="text-base font-medium">CSV</h3>
              </div>
              <p className="text-sm text-slate-300">
                Opens in Excel/Google Sheets and preserves all columns per
                session for simple analysis and data manipulation.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                <FilterIcon size={14} />
                <span>Ideal for data analysis and sorting</span>
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4 hover:bg-slate-800/40 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400">
                  <CalendarIcon size={16} />
                </div>
                <h3 className="text-base font-medium">ICS</h3>
              </div>
              <p className="text-sm text-slate-300">
                Maps each session to VEVENT with
                DTSTART/DTEND/UID/SUMMARY/LOCATION under VCALENDAR structure.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                <GlobeIcon size={14} />
                <span>Import directly into calendar applications</span>
              </div>
            </div>
          </div>
          <div className="mt-5 p-4 rounded-lg border border-amber-500/30 bg-amber-500/10">
            <div className="flex items-start gap-3">
              <AlertTriangleIcon
                size={18}
                className="text-amber-400 mt-0.5 flex-shrink-0"
              />
              <div>
                <h3 className="font-medium text-amber-300 mb-1">
                  Important Note
                </h3>
                <p className="text-sm text-amber-200/80">
                  This is a prototype version. In the production build, sessions
                  will be mapped to absolute dates based on the academic
                  calendar, and time zone conversions will be fully supported.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Preview */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg backdrop-blur-sm">
          <div className="p-5 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-base font-bold flex items-center gap-2">
              <FileIcon size={18} className="text-indigo-400" />
              <span>Export Preview</span>
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-300">
                {filteredSessions.length} sessions
              </span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <caption className="sr-only">Sessions to be exported</caption>
              <thead className="text-slate-300 bg-slate-800/50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Course
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Cohort
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Faculty
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Room
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Day & Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-4 py-3.5 text-white font-medium">
                        {session.course}
                      </td>
                      <td className="px-4 py-3.5">{session.title}</td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 px-2.5 py-0.5 text-xs font-medium">
                          {session.kind}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1.5">
                          <UsersIcon size={14} className="text-slate-400" />
                          {session.cohort || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1.5">
                          <UserIcon size={14} className="text-slate-400" />
                          {session.faculty || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1.5">
                          <HomeIcon size={14} className="text-slate-400" />
                          {session.room || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium bg-slate-800/70 border-slate-700">
                            {session.day}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium bg-amber-500/20 text-amber-300 border-amber-400/40">
                            <ClockIcon size={14} />
                            {session.slot} ({session.durationSlots}{" "}
                            {session.durationSlots === 1 ? "slot" : "slots"})
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-slate-400"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertTriangleIcon
                          size={24}
                          className="text-slate-500"
                        />
                        <p>No sessions available for the selected criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
