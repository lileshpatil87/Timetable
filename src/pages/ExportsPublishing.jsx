// src/pages/ExportsPublishing.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

const AUDIENCES = ["Program/Cohort", "Faculty", "Room"];
const FORMATS = ["PDF", "CSV", "ICS"];

// Load sessions from timetable seed/localStorage
function loadSessions() {
  const s = localStorage.getItem("sessions");
  return s ? JSON.parse(s) : [];
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
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
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
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
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
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto max-w-[1200px] px-5 py-4">
          <h1 className="text-2xl font-bold">Exports & Publishing</h1>
          <p className="text-slate-300">
            Export audience‑specific timetables as CSV/ICS or print as PDF with
            accessible progress and status.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-5 py-4 space-y-4">
        {/* Options */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="options-title"
        >
          <h2
            id="options-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            Export options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <label className="grid gap-1">
              <span>Audience</span>
              <select
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
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
            </label>

            <label className="grid gap-1">
              <span>{audience} selector</span>
              <select
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                value={entity}
                onChange={(e) => setEntity(e.target.value)}
                disabled={batchAll}
              >
                {!batchAll && entities.map((x) => <option key={x}>{x}</option>)}
                {batchAll && <option>All</option>}
              </select>
            </label>

            <label className="grid gap-1">
              <span>Format</span>
              <select
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              >
                {FORMATS.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-1">
              <span>Time zone (for ICS)</span>
              <input
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                value={tz}
                onChange={(e) => setTz(e.target.value)}
              />
            </label>

            <label className="grid gap-1">
              <span>Date range (optional)</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange((r) => ({ ...r, start: e.target.value }))
                  }
                />
                <input
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange((r) => ({ ...r, end: e.target.value }))
                  }
                />
              </div>
            </label>

            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={batchAll}
                onChange={(e) => setBatchAll(e.target.checked)}
              />
              <span>
                Export each {audience.split("/")[0]} as a separate file
              </span>
            </label>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              className="rounded-lg bg-indigo-500 px-3 py-2 font-bold text-slate-900 disabled:opacity-60"
              onClick={runExport}
              disabled={running}
            >
              Export
            </button>
          </div>
        </section>

        {/* Status */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="status-title"
        >
          <h2
            id="status-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            Status
          </h2>

          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <label className="sr-only" htmlFor="export-progress">
              Export progress
            </label>
            <progress
              id="export-progress"
              className="w-full h-3"
              value={running ? progress : 0}
              max={100}
              aria-valuenow={running ? progress : 0}
              aria-valuemin={0}
              aria-valuemax={100}
            />
            <span className="font-mono">{running ? progress : 0}%</span>
          </div>

          <div role="status" aria-live="polite" className="mt-1 text-slate-300">
            {statusMsg}
          </div>
        </section>

        {/* Notes */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="tips-title"
        >
          <h2
            id="tips-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            Export notes
          </h2>
          <ul className="list-disc pl-5 text-slate-300">
            <li>
              PDF uses the browser’s print dialog; set landscape and fit to page
              for timetable grids.
            </li>
            <li>
              CSV opens in Excel/Sheets and preserves columns per session for
              simple analysis.
            </li>
            <li>
              ICS maps each session to VEVENT with
              DTSTART/DTEND/UID/SUMMARY/LOCATION under VCALENDAR.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
