import React, { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  User,
  Home,
  Search,
  Filter,
  Printer,
  FileBox,
  Download,
  CalendarDays,
  Clock,
  BookOpen,
  GraduationCap,
  ChevronDown,
  Sparkles,
  Grid3x3,
  Eye,
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

  const getViewIcon = () => {
    if (view === "Program") return <Users size={16} />;
    if (view === "Faculty") return <User size={16} />;
    return <Home size={16} />;
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const filtered = sessions.filter((s) => {
      if (!selectedEntity) return true;
      if (view === "Program") return s.cohort === selectedEntity;
      if (view === "Faculty") return s.faculty === selectedEntity;
      if (view === "Room") return s.room === selectedEntity;
      return true;
    });

    const totalSessions = filtered.length;
    const lectures = filtered.filter((s) => s.kind === "L").length;
    const practicals = filtered.filter((s) => s.kind === "P").length;
    const tutorials = filtered.filter((s) => s.kind === "T").length;

    return { totalSessions, lectures, practicals, tutorials };
  }, [sessions, view, selectedEntity]);

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
            <h1 className="text-3xl font-bold mb-2">Timetables</h1>
            <p className={`text-sm ${theme.mutedText}`}>
              View weekly schedules by Program/Cohort, Faculty, or Room
            </p>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          className={`rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-4 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-indigo-100" : "bg-indigo-500/20"
              }`}
            >
              <Grid3x3
                size={18}
                className={isDark ? "text-indigo-600" : "text-indigo-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>Total Sessions</p>
              <p className="text-xl font-bold">{stats.totalSessions}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-4 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-blue-100" : "bg-blue-500/20"
              }`}
            >
              <BookOpen
                size={18}
                className={isDark ? "text-blue-600" : "text-blue-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>Lectures</p>
              <p className="text-xl font-bold">{stats.lectures}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-4 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-emerald-100" : "bg-emerald-500/20"
              }`}
            >
              <GraduationCap
                size={18}
                className={isDark ? "text-emerald-600" : "text-emerald-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>Practicals</p>
              <p className="text-xl font-bold">{stats.practicals}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-4 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-purple-100" : "bg-purple-500/20"
              }`}
            >
              <Users
                size={18}
                className={isDark ? "text-purple-600" : "text-purple-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>Tutorials</p>
              <p className="text-xl font-bold">{stats.tutorials}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
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
          Filters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* View By */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">View By</label>
            <div className="relative">
              <div
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.mutedText}`}
              >
                {getViewIcon()}
              </div>
              <select
                className={`w-full appearance-none pl-10 pr-10 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
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
              <ChevronDown
                size={16}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme.mutedText} pointer-events-none`}
              />
            </div>
          </div>

          {/* Entity Selector */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              {view} Selector
            </label>
            <div className="relative">
              <div
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.mutedText}`}
              >
                {getViewIcon()}
              </div>
              <select
                className={`w-full appearance-none pl-10 pr-10 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
              >
                <option value="">All</option>
                {entities.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme.mutedText} pointer-events-none`}
              />
            </div>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              Search Course/Title
            </label>
            <div className="relative">
              <Search
                size={16}
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.mutedText}`}
              />
              <input
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="e.g., EDU201"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Export</label>
            <div className="flex gap-2">
              <motion.button
                className={`flex-1 rounded-lg px-4 py-2.5 font-medium border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} transition-colors flex items-center justify-center gap-2 text-sm`}
                onClick={() => window.print()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Printer size={16} />
                PDF
              </motion.button>
              <motion.button
                className={`flex-1 rounded-lg px-4 py-2.5 font-medium bg-gradient-to-r ${theme.gradient} text-white transition-colors flex items-center justify-center gap-2 text-sm shadow-lg`}
                onClick={() => (window.location.href = "/hod/exports")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} />
                More
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Timetable Grid */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm overflow-hidden shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className={`p-5 border-b ${theme.cardBorder}`}>
          <h2 className="text-base font-bold flex items-center gap-2">
            <CalendarDays
              size={18}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            {view} Timetable {selectedEntity && `— ${selectedEntity}`}
          </h2>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full border-collapse">
            <thead className={theme.tableHeader}>
              <tr className={`border-b ${theme.tableBorder}`}>
                <th className="px-3 py-3 text-left">
                  <div className="flex items-center gap-2">
                    <Clock
                      size={16}
                      className={isDark ? "text-indigo-600" : "text-indigo-400"}
                    />
                    <span className="font-semibold text-sm">Time</span>
                  </div>
                </th>
                {teachingDays.map((d) => (
                  <th key={d} className="px-3 py-3 text-left">
                    <span className="font-semibold text-sm">{d}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slots.map((slot, idx) => (
                <motion.tr
                  key={slot}
                  className={`border-b ${theme.tableBorder} ${theme.hoverBg} transition-colors`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <th className="px-3 py-3 text-left font-mono text-sm font-semibold">
                    {slot}
                  </th>
                  {teachingDays.map((day) => {
                    const key = `${day}|${slot}`;
                    const cellSessions = grid[key] || [];
                    return (
                      <td key={key} className="px-3 py-3 align-top">
                        <div className="flex flex-col gap-2">
                          {cellSessions.map((s) => (
                            <SessionPill key={s.id} s={s} isDark={isDark} />
                          ))}
                        </div>
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div
          className={`border-t ${theme.tableBorder} p-4 flex flex-wrap items-center gap-5`}
        >
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold shadow">
              L
            </span>
            <span className="text-sm font-medium">Lecture</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-violet-600 text-white text-xs font-bold shadow">
              T
            </span>
            <span className="text-sm font-medium">Tutorial</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold shadow">
              P
            </span>
            <span className="text-sm font-medium">Practical</span>
          </span>
        </div>
      </motion.section>
    </div>
  );
}

function SessionPill({ s, isDark }) {
  const kindStyles = {
    L: {
      bg: isDark ? "bg-blue-50" : "bg-blue-500/10",
      border: isDark ? "border-blue-200" : "border-blue-500/30",
      badge: "bg-gradient-to-r from-blue-500 to-blue-600",
      text: isDark ? "text-blue-700" : "text-blue-300",
    },
    T: {
      bg: isDark ? "bg-violet-50" : "bg-violet-500/10",
      border: isDark ? "border-violet-200" : "border-violet-500/30",
      badge: "bg-gradient-to-r from-violet-500 to-violet-600",
      text: isDark ? "text-violet-700" : "text-violet-300",
    },
    P: {
      bg: isDark ? "bg-emerald-50" : "bg-emerald-500/10",
      border: isDark ? "border-emerald-200" : "border-emerald-500/30",
      badge: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      text: isDark ? "text-emerald-700" : "text-emerald-300",
    },
  };

  const style = kindStyles[s.kind] || kindStyles.L;

  return (
    <motion.div
      className={`rounded-lg border ${style.border} ${style.bg} p-2.5 hover:shadow-md transition-all cursor-help`}
      title={`${s.course} ${s.title}\n${s.cohort || ""}\n${s.faculty} • ${
        s.room
      }`}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${style.badge} text-white text-xs font-bold shadow`}
        >
          {s.kind}
        </span>
        <span className="text-xs font-bold">{s.course}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1">
          <Home size={12} />
          <span>{s.room}</span>
        </span>
        {s.durationSlots > 1 && (
          <span className={`${style.text} text-[10px] font-medium`}>
            {s.durationSlots} slots
          </span>
        )}
      </div>
    </motion.div>
  );
}
