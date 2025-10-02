// src/pages/Timetables.jsx
import React, { useEffect, useMemo, useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DEFAULT_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
];

const seedSessions = [
  {
    id: "EDU201-A",
    kind: "L",
    course: "EDU201",
    title: "Foundations of Education",
    cohort: "ITEP-SEM3-A",
    faculty: "Dr. Rao",
    room: "A-204",
    day: "Tue",
    slot: "10:00",
    durationSlots: 1,
  },
  {
    id: "MDC105-A",
    kind: "L",
    course: "MDC105",
    title: "Design Thinking",
    cohort: "FYUGP-SEM2-A",
    faculty: "Dr. Sen",
    room: "B-101",
    day: "Thu",
    slot: "11:00",
    durationSlots: 1,
  },
  {
    id: "CSC214-P",
    kind: "P",
    course: "CSC214",
    title: "Data Structures Lab",
    cohort: "FYUGP-SEM3-A",
    faculty: "Mr. Khan",
    room: "Lab-2",
    day: "Wed",
    slot: "14:00",
    durationSlots: 2,
  },
  {
    id: "ITEP210-M",
    kind: "P",
    course: "ITEP210",
    title: "Microteaching",
    cohort: "ITEP-SEM3-A",
    faculty: "Ms. Mehta",
    room: "Studio-1",
    day: "Fri",
    slot: "09:00",
    durationSlots: 1,
  },
];

function loadCalendars() {
  const s = localStorage.getItem("calendarsConstraints");
  const cal = s ? JSON.parse(s) : null;
  return {
    slots: cal?.slots?.length ? cal.slots : DEFAULT_SLOTS,
    teachingDays: cal?.teachingDays?.length ? cal.teachingDays : DAYS,
  };
}

function loadSessions() {
  const s = localStorage.getItem("sessions");
  return s ? JSON.parse(s) : seedSessions;
}

export default function Timetables() {
  const { slots, teachingDays } = loadCalendars();
  const [view, setView] = useState("Program");
  const [sessions, setSessions] = useState(loadSessions());
  const [q, setQ] = useState("");
  const [selectedEntity, setSelectedEntity] = useState("");

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  const programCohorts = useMemo(
    () => Array.from(new Set(sessions.map((s) => s.cohort))),
    [sessions]
  );
  const facultyList = useMemo(
    () => Array.from(new Set(sessions.map((s) => s.faculty))),
    [sessions]
  );
  const rooms = useMemo(
    () => Array.from(new Set(sessions.map((s) => s.room))),
    [sessions]
  );

  const grid = useMemo(() => {
    const map = {};
    const list = sessions.filter((s) => {
      if (
        q &&
        !(
          s.course.toLowerCase().includes(q.toLowerCase()) ||
          s.title.toLowerCase().includes(q.toLowerCase())
        )
      )
        return false;
      if (!selectedEntity) return true;
      if (view === "Program") return s.cohort === selectedEntity;
      if (view === "Faculty") return s.faculty === selectedEntity;
      if (view === "Room") return s.room === selectedEntity;
      return true;
    });
    list.forEach((s) => {
      const key = `${s.day}|${s.slot}`;
      (map[key] ||= []).push(s);
    });
    return map;
  }, [sessions, view, selectedEntity, q]);

  const entities =
    view === "Program"
      ? programCohorts
      : view === "Faculty"
      ? facultyList
      : rooms;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto max-w-[1220px] px-5 py-4">
          <h1 className="text-2xl font-bold">Timetables</h1>
          <p className="text-slate-300">
            View weekly schedules by Program/Cohort, Faculty, or Room; hover
            cells for details.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1220px] px-5 py-4 space-y-4">
        {/* Filters */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="filters-title"
        >
          <h2
            id="filters-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <label className="grid gap-1">
              <span>View</span>
              <select
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                value={view}
                onChange={(e) => {
                  setView(e.target.value);
                  setSelectedEntity("");
                }}
              >
                <option>Program</option>
                <option>Faculty</option>
                <option>Room</option>
              </select>
            </label>
            <label className="grid gap-1">
              <span>{view} selector</span>
              <select
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
              >
                <option value="">All</option>
                {entities.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1">
              <span>Search course/title</span>
              <input
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="e.g., EDU201 or Foundations"
              />
            </label>
            <div className="flex gap-2 justify-end">
              <button
                className="rounded-lg border border-slate-700 px-3 py-2"
                onClick={() => window.print()}
              >
                Export (PDF)
              </button>
              <a
                className="rounded-lg border border-slate-700 px-3 py-2"
                href="/exports"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.assign("/exports");
                }}
              >
                Exports
              </a>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="grid-title"
        >
          <h2
            id="grid-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            {view} timetable {selectedEntity ? `— ${selectedEntity}` : ""}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <caption className="sr-only">
                Weekly timetable with days as columns and named slots as rows
              </caption>
              <thead className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <th scope="col" className="px-2 py-2 text-left">
                    Time
                  </th>
                  {teachingDays.map((d) => (
                    <th key={d} scope="col" className="px-2 py-2 text-left">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {slots.map((slot) => (
                  <tr key={slot}>
                    <th
                      scope="row"
                      aria-current="time"
                      className="px-2 py-2 text-left"
                    >
                      {slot}
                    </th>
                    {teachingDays.map((day) => {
                      const key = `${day}|${slot}`;
                      const cellSessions = grid[key] || [];
                      return (
                        <td key={key} className="px-2 py-2 align-top">
                          <div className="grid gap-1">
                            {cellSessions.map((s) => (
                              <SessionPill key={s.id} s={s} />
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div
            className="mt-3 flex items-center gap-4 text-slate-300"
            aria-label="Legend"
          >
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-slate-900 text-xs font-extrabold">
                L
              </span>
              Lecture
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-400 text-slate-900 text-xs font-extrabold">
                T
              </span>
              Tutorial
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-slate-900 text-xs font-extrabold">
                P
              </span>
              Practical
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

function SessionPill({ s }) {
  const kindStyles =
    s.kind === "L"
      ? "border-blue-400/50 ring-blue-400/20"
      : s.kind === "T"
      ? "border-violet-400/50 ring-violet-400/20"
      : "border-emerald-400/50 ring-emerald-400/20";

  return (
    <div
      className={`grid gap-0.5 rounded-lg border bg-slate-800/60 p-2 ring-1 ${kindStyles}`}
      title={`${s.course} ${s.title}\n${s.cohort || ""}\n${s.faculty} • ${
        s.room
      }`}
    >
      <span className="text-xs font-extrabold">{s.course}</span>
      <span className="text-xs text-slate-300">
        {s.kind} • {s.room}
      </span>
    </div>
  );
}
