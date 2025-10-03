import React, { useEffect, useMemo, useState } from "react";
import {
  UsersIcon,
  UserIcon,
  HomeIcon,
  SearchIcon,
  FilterIcon,
  PrinterIcon,
  FileBoxIcon,
  DownloadIcon,
  CalendarDaysIcon,
  ClockIcon,
  BookOpenIcon,
  GraduationCapIcon,
  ChevronDownIcon,
} from "lucide-react";
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
  // Get icon based on view
  const getViewIcon = () => {
    if (view === "Program") return <UsersIcon size={16} />;
    if (view === "Faculty") return <UserIcon size={16} />;
    return <HomeIcon size={16} />;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
      {/* Page Header */}
      <div className="max-w-[1280px] mx-auto px-6 pb-6">
        <h1 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Timetables
        </h1>
        <p className="text-slate-400">
          View weekly schedules by Program/Cohort, Faculty, or Room; hover cells
          for details.
        </p>
      </div>
      <main className="max-w-[1280px] mx-auto px-6 pb-16 space-y-6">
        {/* Filters */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm"
          aria-labelledby="filters-title"
        >
          <h2
            id="filters-title"
            className="text-base font-bold mb-4 flex items-center gap-2"
          >
            <FilterIcon size={18} className="text-indigo-400" />
            <span>Filters</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                View By
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  {view === "Program" ? (
                    <UsersIcon size={16} />
                  ) : view === "Faculty" ? (
                    <UserIcon size={16} />
                  ) : (
                    <HomeIcon size={16} />
                  )}
                </div>
                <select
                  className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <ChevronDownIcon size={16} />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                {view} Selector
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  {getViewIcon()}
                </div>
                <select
                  className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                >
                  <option value="">All</option>
                  {entities.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <ChevronDownIcon size={16} />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">
                Search Course/Title
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <SearchIcon size={16} />
                </div>
                <input
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="e.g., EDU201 or Foundations"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end items-center">
              <button
                className="rounded-lg px-4 py-2.5 font-medium border border-slate-700 bg-slate-800/70 hover:bg-slate-800 transition-colors flex items-center gap-2"
                onClick={() => window.print()}
              >
                <PrinterIcon size={16} />
                <span>Export (PDF)</span>
              </button>
              <a
                className="rounded-lg px-4 py-2.5 font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-colors flex items-center gap-2"
                href="/exports"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.assign("/exports");
                }}
              >
                <DownloadIcon size={16} />
                <span>Exports</span>
              </a>
            </div>
          </div>
        </section>
        {/* Grid */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg backdrop-blur-sm"
          aria-labelledby="grid-title"
        >
          <div className="p-5 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-base font-bold flex items-center gap-2">
              <CalendarDaysIcon size={18} className="text-indigo-400" />
              <span>
                {view} Timetable {selectedEntity ? `— ${selectedEntity}` : ""}
              </span>
            </h2>
          </div>
          <div className="overflow-x-auto p-3">
            <table className="w-full border-collapse">
              <caption className="sr-only">
                Weekly timetable with days as columns and named slots as rows
              </caption>
              <thead className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <th scope="col" className="px-3 py-3 text-left font-medium">
                    <div className="flex items-center gap-2 text-indigo-300">
                      <ClockIcon size={16} />
                      <span>Time</span>
                    </div>
                  </th>
                  {teachingDays.map((d) => (
                    <th
                      key={d}
                      scope="col"
                      className="px-3 py-3 text-left font-medium"
                    >
                      <div className="flex items-center gap-2 text-indigo-300">
                        <span>{d}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {slots.map((slot) => (
                  <tr
                    key={slot}
                    className="hover:bg-slate-800/30 transition-colors"
                  >
                    <th
                      scope="row"
                      aria-current="time"
                      className="px-3 py-3 text-left font-mono text-indigo-200 whitespace-nowrap"
                    >
                      {slot}
                    </th>
                    {teachingDays.map((day) => {
                      const key = `${day}|${slot}`;
                      const cellSessions = grid[key] || [];
                      return (
                        <td key={key} className="px-3 py-3 align-top">
                          <div className="grid gap-2">
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
            className="border-t border-slate-800 p-4 flex flex-wrap items-center gap-5 text-slate-300"
            aria-label="Legend"
          >
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-extrabold shadow-inner">
                L
              </span>
              <span className="text-sm">Lecture</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-violet-400 to-violet-500 text-white text-xs font-extrabold shadow-inner">
                T
              </span>
              <span className="text-sm">Tutorial</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-xs font-extrabold shadow-inner">
                P
              </span>
              <span className="text-sm">Practical</span>
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
function SessionPill({ s }) {
  const kindStyles = {
    L: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      ring: "ring-blue-500/10",
      badge: "bg-gradient-to-r from-blue-500 to-blue-600",
      text: "text-blue-300",
    },
    T: {
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
      ring: "ring-violet-500/10",
      badge: "bg-gradient-to-r from-violet-400 to-violet-500",
      text: "text-violet-300",
    },
    P: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      ring: "ring-emerald-500/10",
      badge: "bg-gradient-to-r from-emerald-400 to-emerald-500",
      text: "text-emerald-300",
    },
  };
  const style = kindStyles[s.kind] || kindStyles.L;
  return (
    <div
      className={`rounded-lg border ${style.border} ${style.bg} p-2.5 ring-1 ${style.ring} hover:shadow-lg transition-shadow cursor-help`}
      title={`${s.course} ${s.title}\n${s.cohort || ""}\n${s.faculty} • ${
        s.room
      }`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${style.badge} text-white text-xs font-bold shadow-inner`}
        >
          {s.kind}
        </span>
        <span className="text-xs font-bold text-white">{s.course}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 text-slate-300">
          <HomeIcon size={12} />
          <span>{s.room}</span>
        </span>
        {s.durationSlots > 1 && (
          <span className={`${style.text} text-[10px]`}>
            {s.durationSlots} slots
          </span>
        )}
      </div>
    </div>
  );
}
