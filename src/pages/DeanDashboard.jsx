import React, { useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "../components/CustomDropdown";

import {
  LogOut,
  Building2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ClipboardCheck,
  GraduationCap,
  BarChart3,
  Calendar,
  AlertCircle,
  DoorOpen,
  Check,
  X,
  FileUp,
  BookOpen,
  Shield,
  Sparkles,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

// Modal Component with theme support
const Modal = ({ title, onClose, children, theme, isDark }) => {
  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme.modalOverlay} backdrop-blur-sm`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`relative ${theme.modalBg} rounded-2xl border ${theme.cardBorder} shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto`}
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`sticky top-0 border-b ${theme.cardBorder} px-6 py-4 flex items-center justify-between backdrop-blur-md ${theme.headerBg}`}
        >
          <h3 className="text-lg font-bold">{title}</h3>
          <motion.button
            onClick={onClose}
            className={`p-2 rounded-lg ${theme.hoverBg} transition-all`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
          </motion.button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default function DeanDashboard() {
  // CHANGED: Get theme from Outlet context instead of props
  const outletContext = useOutletContext();
  const { theme: contextTheme, isDark: contextIsDark } = outletContext || {};

  const [localIsDark] = useState(false);
  const isDark = contextIsDark !== undefined ? contextIsDark : localIsDark;

  const defaultTheme = {
    bg: isDark ? "bg-slate-950" : "bg-gray-50",
    text: isDark ? "text-slate-100" : "text-gray-900",
    cardBg: isDark ? "bg-slate-900/60" : "bg-white",
    cardBorder: isDark ? "border-slate-800" : "border-gray-200",
    headerBg: isDark
      ? "bg-slate-900/70 backdrop-blur-sm"
      : "bg-white/80 backdrop-blur-sm",
    headerBorder: isDark ? "border-slate-800" : "border-gray-200",
    mutedText: isDark ? "text-slate-400" : "text-gray-600",
    gradient: isDark
      ? "from-indigo-400 via-purple-400 to-pink-400"
      : "from-indigo-600 via-purple-600 to-pink-600",
    accentBg: isDark ? "bg-slate-800/50" : "bg-gray-100",
    accentBorder: isDark ? "border-slate-700" : "border-gray-200",
    hoverBg: isDark ? "hover:bg-slate-800" : "hover:bg-gray-100",
    buttonBg: isDark
      ? "bg-slate-800 hover:bg-slate-700"
      : "bg-gray-100 hover:bg-gray-200",
    buttonBorder: isDark ? "border-slate-700" : "border-gray-300",
    buttonText: isDark ? "text-slate-100" : "text-gray-900",
    inputBg: isDark ? "bg-slate-800/70" : "bg-white",
    inputBorder: isDark ? "border-slate-700" : "border-gray-300",
    inputText: isDark ? "text-slate-100" : "text-gray-900",
    inputPlaceholder: isDark
      ? "placeholder:text-slate-500"
      : "placeholder:text-gray-500",
    modalBg: isDark ? "bg-slate-900" : "bg-white",
    modalOverlay: isDark ? "bg-slate-950/80" : "bg-gray-900/40",
    tableBorder: isDark ? "border-slate-800" : "border-gray-200",
    tableHeader: isDark ? "bg-slate-800/60" : "bg-gray-50",
  };

  const theme = contextTheme || defaultTheme;

  const context = {
    college: "School of Engineering",
    term: "AY 2025-26, Sem 3",
  };

  const kpis = [
    {
      label: "Load variance (p95)",
      value: "±3.2 hrs",
      help: "Faculty distribution",
      icon: <BarChart3 size={18} />,
      color: isDark ? "bg-indigo-500/20" : "bg-indigo-100",
      iconColor: isDark ? "text-indigo-400" : "text-indigo-600",
    },
    {
      label: "Room utilization",
      value: "76%",
      help: "By type (peak)",
      icon: <DoorOpen size={18} />,
      color: isDark ? "bg-emerald-500/20" : "bg-emerald-100",
      iconColor: isDark ? "text-emerald-400" : "text-emerald-600",
    },
    {
      label: "Cross-dept clashes",
      value: 2,
      help: "Current unresolved",
      icon: <AlertTriangle size={18} />,
      color: isDark ? "bg-amber-500/20" : "bg-amber-100",
      iconColor: isDark ? "text-amber-400" : "text-amber-600",
    },
    {
      label: "Approval SLA",
      value: "1.5 days",
      help: "Median decision time",
      icon: <ClipboardCheck size={18} />,
      color: isDark ? "bg-purple-500/20" : "bg-purple-100",
      iconColor: isDark ? "text-purple-400" : "text-purple-600",
    },
  ];

  // College timetable approvals
  const [ttApprovals, setTtApprovals] = useState([
    {
      id: "CT-7001",
      dept: "CS",
      scope: "FYUGP-CS Sem 3",
      impact: "0 hard, -7% idle, +4% lab util",
      status: "Awaiting Dean",
    },
    {
      id: "CT-7002",
      dept: "EE",
      scope: "FYUGP-EE Sem 5",
      impact: "0 hard, -3% idle",
      status: "Awaiting Dean",
    },
  ]);

  function actTtApproval(id, action) {
    setTtApprovals((list) =>
      list.map((x) => (x.id === id ? { ...x, status: action } : x))
    );
  }

  // Cross-department conflicts
  const [conflicts, setConflicts] = useState([
    {
      id: "XCF-221",
      type: "Shared lab",
      detail: "CS-Lab-2 Wed 11:30 CS vs ECE elective",
      status: "New",
    },
    {
      id: "XCF-222",
      type: "Common elective",
      detail: "AI & ML vs Data Viz cross-school",
      status: "Investigating",
    },
  ]);

  function resolveConflict(id) {
    setConflicts((list) =>
      list.map((x) => (x.id === id ? { ...x, status: "Resolved" } : x))
    );
  }

  // Capacity governance
  const [capacity, setCapacity] = useState([
    {
      code: "CS344",
      name: "Cloud Computing",
      dept: "CS",
      cap: 60,
      enrolled: 61,
      room: "CS-201",
    },
    {
      code: "EE312",
      name: "Power Systems",
      dept: "EE",
      cap: 60,
      enrolled: 31,
      room: "EE-101",
    },
  ]);

  function suggestAction(row) {
    const util = row.enrolled / row.cap;
    if (util > 1) return "Increase capacity / Larger room";
    if (util < 0.6) return "Merge/Close section";
    return "OK";
  }

  // Policy packs
  const [policy, setPolicy] = useState({
    fyugpLTP: "Lecture: 1 credit = 1 hr/week; Practicum: 1 credit = 2 hrs/week",
    itepPracticum: "Protected Wed 14:00–16:30; Min 20 hrs/term",
    calendar: "15 teaching weeks; Exam weeks excluded",
    status: "Awaiting Dean",
  });

  function approvePolicy() {
    setPolicy((p) => ({ ...p, status: "Approved" }));
  }

  // ITEP practicum
  const [practicum, setPracticum] = useState([
    {
      dept: "ITEP",
      cohort: "ITEP-S3",
      day: "Wed",
      start: "14:00",
      end: "16:30",
      school: "City High School",
      status: "Awaiting Dean",
    },
    {
      dept: "ITEP",
      cohort: "ITEP-S3",
      day: "Fri",
      start: "10:15",
      end: "12:15",
      school: "Riverdale School",
      status: "Awaiting Dean",
    },
  ]);

  function approvePracticum(idx) {
    setPracticum((list) =>
      list.map((x, i) => (i === idx ? { ...x, status: "Approved" } : x))
    );
  }

  // Exceptions
  const [exceptions, setExceptions] = useState([
    {
      id: "EX-9001",
      type: "Cross-college elective",
      detail: "Mgmt elective slot request for CS cohort",
      status: "Awaiting Dean",
    },
    {
      id: "EX-9002",
      type: "Availability change",
      detail: "Adjunct Thu 14:00 now unavailable",
      status: "Awaiting Dean",
    },
  ]);

  function actException(id, action) {
    setExceptions((list) =>
      list.map((x) => (x.id === id ? { ...x, status: action } : x))
    );
  }

  // Rooms management
  const [showRooms, setShowRooms] = useState(false);
  const [rooms, setRooms] = useState([
    {
      code: "CS-201",
      type: "Lecture",
      capacity: 70,
      equipment: "Projector",
      owner: "Central",
      status: "Catalog",
    },
    {
      code: "CS-Lab-2",
      type: "Lab",
      capacity: 40,
      equipment: "Computers x40",
      owner: "CS Dept",
      status: "Catalog",
    },
  ]);

  const [newRoom, setNewRoom] = useState({
    code: "",
    type: "Lecture",
    capacity: 60,
    equipment: "",
    owner: "Central",
  });

  const [pendingRooms, setPendingRooms] = useState([
    {
      code: "EE-Lab-3",
      type: "Lab",
      capacity: 35,
      equipment: "PSU, Scopes",
      owner: "EE Dept",
      status: "Pending",
    },
  ]);

  function addRoom() {
    if (!newRoom.code || !newRoom.type || !newRoom.capacity) {
      alert("Fill code, type, capacity");
      return;
    }
    setPendingRooms((list) => [...list, { ...newRoom, status: "Pending" }]);
    setNewRoom({
      code: "",
      type: "Lecture",
      capacity: 60,
      equipment: "",
      owner: "Central",
    });
  }

  function approveRoom(idx) {
    const item = pendingRooms[idx];
    setRooms((list) => [...list, { ...item, status: "Catalog" }]);
    setPendingRooms((list) => list.filter((_, i) => i !== idx));
  }

  function rejectRoom(idx) {
    setPendingRooms((list) => list.filter((_, i) => i !== idx));
  }

  function importCSV(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    alert(`Imported: ${file.name} (parsed into pending list)`);
  }

  return (
    <div className="space-y-8 p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-xl ${
                isDark ? "bg-indigo-500/20" : "bg-indigo-100"
              }`}
            >
              <Sparkles
                size={24}
                className={isDark ? "text-indigo-400" : "text-indigo-600"}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{context.college}</h1>
              <p className={`text-sm ${theme.mutedText}`}>{context.term}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={idx}
            className={`rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-5 shadow-sm`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${kpi.color}`}>
                <div className={kpi.iconColor}>{kpi.icon}</div>
              </div>
            </div>
            <div className="space-y-1">
              <p className={`text-xs ${theme.mutedText}`}>{kpi.label}</p>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className={`text-xs ${theme.mutedText}`}>{kpi.help}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <button
          onClick={() => setShowRooms(true)}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl border ${theme.cardBorder} ${theme.cardBg} ${theme.hoverBg} transition-all flex items-center justify-center gap-2 font-medium`}
        >
          <DoorOpen size={18} />
          Rooms & Labs Management
        </button>
      </motion.div>

      {/* College Timetable Approvals */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold flex items-center gap-2">
            <ClipboardCheck
              size={18}
              className={isDark ? "text-indigo-400" : "text-indigo-600"}
            />
            College Timetable Approvals
            <span
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${theme.accentBg} border ${theme.accentBorder}`}
            >
              {ttApprovals.filter((a) => a.status === "Awaiting Dean").length}
            </span>
          </h2>
        </div>

        <div className="space-y-3">
          {ttApprovals.map((a, idx) => (
            <motion.div
              key={a.id}
              className={`rounded-xl border ${theme.cardBorder} ${theme.accentBg} p-4 ${theme.hoverBg} transition-all`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={`text-xs font-mono px-2.5 py-1 rounded-lg ${theme.accentBg} border ${theme.accentBorder} font-semibold`}
                    >
                      {a.id}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                        isDark
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {a.dept}
                    </span>
                    <p className="font-semibold">{a.scope}</p>
                  </div>
                  <p
                    className={`text-sm flex items-center gap-1.5 ${
                      isDark ? "text-emerald-400" : "text-emerald-700"
                    }`}
                  >
                    <TrendingUp size={14} />
                    Impact: {a.impact}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => actTtApproval(a.id, "Approved")}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isDark
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                        : "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CheckCircle size={14} />
                    Approve
                  </motion.button>
                  <motion.button
                    onClick={() => actTtApproval(a.id, "Sent back")}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isDark
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                        : "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AlertCircle size={14} />
                    Send Back
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Cross-Department Conflicts */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold flex items-center gap-2">
            <AlertTriangle
              size={18}
              className={isDark ? "text-amber-400" : "text-amber-600"}
            />
            Cross-Department Conflicts
            <span
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${theme.accentBg} border ${theme.accentBorder}`}
            >
              {conflicts.filter((c) => c.status !== "Resolved").length}
            </span>
          </h2>
        </div>

        <div className="space-y-3">
          {conflicts.map((c, idx) => (
            <motion.div
              key={c.id}
              className={`rounded-xl border ${theme.cardBorder} ${theme.accentBg} p-4 ${theme.hoverBg} transition-all`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-mono px-2.5 py-1 rounded-lg ${theme.accentBg} border ${theme.accentBorder} font-semibold`}
                    >
                      {c.id}
                    </span>
                    <p className="font-semibold">{c.type}</p>
                  </div>
                  <p className={`text-sm ${theme.mutedText}`}>{c.detail}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 border font-medium ${
                      c.status === "New"
                        ? isDark
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                          : "bg-rose-100 text-rose-700 border-rose-200"
                        : c.status === "Investigating"
                        ? isDark
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : "bg-amber-100 text-amber-700 border-amber-200"
                        : isDark
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-emerald-100 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    <AlertCircle size={12} />
                    {c.status}
                  </span>
                  {c.status !== "Resolved" && (
                    <motion.button
                      onClick={() => resolveConflict(c.id)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                        isDark
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                          : "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Check size={14} />
                      Resolve
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Capacity Governance */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm overflow-hidden shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className={`p-5 border-b ${theme.cardBorder}`}>
          <h2 className="text-base font-bold flex items-center gap-2">
            <BarChart3
              size={18}
              className={isDark ? "text-indigo-400" : "text-indigo-600"}
            />
            Capacity Governance
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className={`${isDark ? "bg-slate-800/40" : "bg-gray-50"}`}>
              <tr>
                {["Code", "Name", "Dept", "Cap", "Enrolled", "Suggestion"].map(
                  (h) => (
                    <th
                      key={h}
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b ${theme.cardBorder}`}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {capacity.map((row, idx) => {
                const util = row.enrolled / row.cap;
                const sugg = suggestAction(row);
                const suggClass = sugg.includes("Increase")
                  ? isDark
                    ? "text-amber-300"
                    : "text-amber-700"
                  : sugg.includes("Merge")
                  ? isDark
                    ? "text-rose-300"
                    : "text-rose-700"
                  : isDark
                  ? "text-emerald-300"
                  : "text-emerald-700";

                return (
                  <motion.tr
                    key={row.code}
                    className={`border-b ${theme.cardBorder} ${theme.hoverBg} transition-colors`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <td className="px-4 py-4 font-mono font-semibold">
                      {row.code}
                    </td>
                    <td className="px-4 py-4 font-medium">{row.name}</td>
                    <td className="px-4 py-4">{row.dept}</td>
                    <td className="px-4 py-4">{row.cap}</td>
                    <td className="px-4 py-4">{row.enrolled}</td>
                    <td className={`px-4 py-4 ${suggClass} font-medium`}>
                      <div className="flex items-center gap-2">
                        {sugg.includes("Increase") && <AlertCircle size={14} />}
                        {sugg.includes("Merge") && <AlertTriangle size={14} />}
                        {sugg === "OK" && <CheckCircle size={14} />}
                        {sugg}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Policy Packs */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-base font-bold mb-5 flex items-center gap-2">
          <Shield
            size={18}
            className={isDark ? "text-indigo-400" : "text-indigo-600"}
          />
          Policy Packs & Compliance
        </h2>

        <div className="space-y-3">
          <div
            className={`p-4 rounded-xl ${theme.accentBg} border ${theme.accentBorder}`}
          >
            <dt className={`text-xs ${theme.mutedText} mb-1`}>
              FYUGP L–T–P mapping
            </dt>
            <dd className="text-sm">{policy.fyugpLTP}</dd>
          </div>
          <div
            className={`p-4 rounded-xl ${theme.accentBg} border ${theme.accentBorder}`}
          >
            <dt className={`text-xs ${theme.mutedText} mb-1`}>
              ITEP practicum
            </dt>
            <dd className="text-sm">{policy.itepPracticum}</dd>
          </div>
          <div
            className={`p-4 rounded-xl ${theme.accentBg} border ${theme.accentBorder}`}
          >
            <dt className={`text-xs ${theme.mutedText} mb-1`}>
              Academic calendar
            </dt>
            <dd className="text-sm">{policy.calendar}</dd>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span
            className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 border font-medium ${
              policy.status === "Approved"
                ? isDark
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  : "bg-emerald-100 text-emerald-700 border-emerald-200"
                : isDark
                ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                : "bg-amber-100 text-amber-700 border-amber-200"
            }`}
          >
            <AlertCircle size={12} />
            {policy.status}
          </span>
          {policy.status !== "Approved" && (
            <motion.button
              onClick={approvePolicy}
              className={`px-4 py-2 rounded-xl font-medium text-sm shadow-lg flex items-center gap-2 bg-gradient-to-r ${theme.gradient} text-white`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CheckCircle size={16} />
              Approve
            </motion.button>
          )}
        </div>
      </motion.section>

      {/* ITEP Practicum */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h2 className="text-base font-bold mb-5 flex items-center gap-2">
          <GraduationCap
            size={18}
            className={isDark ? "text-indigo-400" : "text-indigo-600"}
          />
          ITEP Practicum Oversight
        </h2>

        <div className="space-y-3">
          {practicum.map((p, i) => (
            <motion.div
              key={`${p.cohort}-${i}`}
              className={`rounded-xl border ${theme.cardBorder} ${theme.accentBg} p-4 ${theme.hoverBg} transition-all`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-lg ${
                        isDark
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {p.dept}
                    </span>
                    <p className="font-semibold">
                      {p.cohort}: {p.school}
                    </p>
                  </div>
                  <p
                    className={`text-xs ${theme.mutedText} flex items-center gap-1`}
                  >
                    <Calendar size={12} />
                    {p.day} {p.start}–{p.end}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 border font-medium ${
                      p.status === "Approved"
                        ? isDark
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : isDark
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        : "bg-amber-100 text-amber-700 border-amber-200"
                    }`}
                  >
                    {p.status === "Approved" ? (
                      <CheckCircle size={12} />
                    ) : (
                      <AlertCircle size={12} />
                    )}
                    {p.status}
                  </span>
                  {p.status !== "Approved" && (
                    <motion.button
                      onClick={() => approvePracticum(i)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                        isDark
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                          : "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CheckCircle size={14} />
                      Approve
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Exception Approvals */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold flex items-center gap-2">
            <AlertCircle
              size={18}
              className={isDark ? "text-amber-400" : "text-amber-600"}
            />
            Exception Approvals
            <span
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${theme.accentBg} border ${theme.accentBorder}`}
            >
              {exceptions.filter((e) => e.status === "Awaiting Dean").length}
            </span>
          </h2>
        </div>

        <div className="space-y-3">
          {exceptions.map((ex, idx) => (
            <motion.div
              key={ex.id}
              className={`rounded-xl border ${theme.cardBorder} ${theme.accentBg} p-4 ${theme.hoverBg} transition-all`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-mono px-2.5 py-1 rounded-lg ${theme.accentBg} border ${theme.accentBorder} font-semibold`}
                    >
                      {ex.id}
                    </span>
                    <p className="font-semibold">{ex.type}</p>
                  </div>
                  <p className={`text-sm ${theme.mutedText}`}>{ex.detail}</p>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => actException(ex.id, "Approved")}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isDark
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                        : "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CheckCircle size={14} />
                    Approve
                  </motion.button>
                  <motion.button
                    onClick={() => actException(ex.id, "Rejected")}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isDark
                        ? "border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                        : "border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <XCircle size={14} />
                    Reject
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Rooms & Labs Modal */}
      <AnimatePresence>
        {showRooms && (
          <Modal
            title="Rooms & Labs Management"
            onClose={() => setShowRooms(false)}
            theme={theme}
            isDark={isDark}
          >
            <div className="space-y-6">
              {/* Add New Room Form */}
              <div
                className={`grid sm:grid-cols-5 gap-3 ${theme.accentBg} p-4 rounded-xl border ${theme.accentBorder}`}
              >
                <input
                  placeholder="Code (e.g., CS-201)"
                  value={newRoom.code}
                  onChange={(e) =>
                    setNewRoom((r) => ({ ...r, code: e.target.value }))
                  }
                  className={`rounded-lg border ${theme.cardBorder} ${theme.cardBg} px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                />
                <CustomDropdown
                  name="type"
                  id="room-type"
                  value={newRoom.type}
                  onChange={(e) =>
                    setNewRoom((r) => ({ ...r, type: e.target.value }))
                  }
                  options={["Lecture", "Lab", "Studio", "Seminar"]}
                  theme={isDark ? "dark" : "light"}
                  placeholder="Room type"
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  value={newRoom.capacity}
                  onChange={(e) =>
                    setNewRoom((r) => ({
                      ...r,
                      capacity: Number(e.target.value),
                    }))
                  }
                  className={`rounded-lg border ${theme.cardBorder} ${theme.cardBg} px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                />
                <input
                  placeholder="Equipment"
                  value={newRoom.equipment}
                  onChange={(e) =>
                    setNewRoom((r) => ({ ...r, equipment: e.target.value }))
                  }
                  className={`rounded-lg border ${theme.cardBorder} ${theme.cardBg} px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                />
                <CustomDropdown
                  name="owner"
                  id="room-owner"
                  value={newRoom.owner}
                  onChange={(e) =>
                    setNewRoom((r) => ({ ...r, owner: e.target.value }))
                  }
                  options={["Central", "CS Dept", "EE Dept", "ME Dept"]}
                  theme={isDark ? "dark" : "light"}
                  placeholder="Owner"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <motion.button
                  onClick={addRoom}
                  className={`px-4 py-2.5 rounded-xl border ${theme.cardBorder} ${theme.hoverBg} text-sm transition-all flex items-center gap-2`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <DoorOpen size={16} />
                  Add Pending
                </motion.button>
                <div className="flex items-center gap-3">
                  <label
                    className={`text-sm flex items-center gap-2 cursor-pointer`}
                  >
                    <FileUp
                      size={16}
                      className={isDark ? "text-indigo-400" : "text-indigo-600"}
                    />
                    <span>Bulk import CSV</span>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={importCSV}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Pending Rooms */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <BookOpen
                      size={16}
                      className={isDark ? "text-indigo-400" : "text-indigo-600"}
                    />
                    Pending Merge
                  </h4>
                  <div
                    className={`border ${theme.cardBorder} rounded-xl overflow-hidden`}
                  >
                    <div className="max-h-64 overflow-auto">
                      {pendingRooms.map((r, i) => (
                        <div
                          key={`${r.code}-${i}`}
                          className={`p-4 border-b ${theme.cardBorder} ${theme.hoverBg} flex items-center justify-between`}
                        >
                          <div className="flex-1">
                            <p className="font-semibold">{r.code}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-md ${theme.accentBg} border ${theme.accentBorder}`}
                              >
                                {r.type}
                              </span>
                              <span className={`text-xs ${theme.mutedText}`}>
                                Cap: {r.capacity}
                              </span>
                              <span className={`text-xs ${theme.mutedText}`}>
                                {r.owner}
                              </span>
                            </div>
                            {r.equipment && (
                              <p className={`text-xs ${theme.mutedText} mt-1`}>
                                {r.equipment}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2 ml-3">
                            <button
                              onClick={() => approveRoom(i)}
                              className={`text-xs px-2 py-1 rounded-md transition-colors flex items-center gap-1 ${
                                isDark
                                  ? "text-emerald-300 hover:bg-emerald-500/10"
                                  : "text-emerald-700 hover:bg-emerald-100"
                              }`}
                            >
                              <Check size={12} />
                            </button>
                            <button
                              onClick={() => rejectRoom(i)}
                              className={`text-xs px-2 py-1 rounded-md transition-colors flex items-center gap-1 ${
                                isDark
                                  ? "text-rose-300 hover:bg-rose-500/10"
                                  : "text-rose-700 hover:bg-rose-100"
                              }`}
                            >
                              <X size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                      {pendingRooms.length === 0 && (
                        <div
                          className={`p-4 text-sm ${theme.mutedText} italic text-center`}
                        >
                          No pending rooms
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Room Catalog */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <DoorOpen
                      size={16}
                      className={isDark ? "text-indigo-400" : "text-indigo-600"}
                    />
                    Room Catalog
                  </h4>
                  <div
                    className={`border ${theme.cardBorder} rounded-xl overflow-hidden`}
                  >
                    <div className="max-h-64 overflow-auto">
                      {rooms.map((r, i) => (
                        <div
                          key={`${r.code}-${i}`}
                          className={`p-4 border-b ${theme.cardBorder} ${theme.hoverBg}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-semibold">{r.code}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-md ${theme.accentBg} border ${theme.accentBorder}`}
                                >
                                  {r.type}
                                </span>
                                <span className={`text-xs ${theme.mutedText}`}>
                                  Cap: {r.capacity}
                                </span>
                                <span className={`text-xs ${theme.mutedText}`}>
                                  {r.owner}
                                </span>
                              </div>
                              {r.equipment && (
                                <p
                                  className={`text-xs ${theme.mutedText} mt-1`}
                                >
                                  {r.equipment}
                                </p>
                              )}
                            </div>
                            <span
                              className={`text-xs px-2.5 py-1 rounded-lg ${
                                isDark
                                  ? "bg-indigo-500/20 text-indigo-300"
                                  : "bg-indigo-100 text-indigo-700"
                              }`}
                            >
                              Catalog
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowRooms(false)}
                  className={`px-4 py-2 rounded-xl border ${theme.cardBorder} text-sm ${theme.hoverBg} transition-colors`}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
