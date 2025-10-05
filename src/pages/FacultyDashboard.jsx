import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  LogOut,
  Download,
  Clock,
  AlertTriangle,
  X,
  MapPin,
  Users,
  Building2,
  Target,
  CalendarDays,
  BookOpen,
  Shield,
  Plus,
  Trash2,
  Sun,
  Moon,
  GraduationCap,
  ChevronRight,
  FileText,
  TrendingUp,
  Award,
  BarChart3,
} from "lucide-react";

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [showExport, setShowExport] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [showClash, setShowClash] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("PDF");
  const [availabilityBlocks, setAvailabilityBlocks] = useState([]);

  // Demo faculty data
  const faculty = {
    name: "Dr. R. Rao",
    id: "FAC-CS-014",
    email: "r.rao@university.edu",
    department: "Computer Science",
    role: "Associate Professor",
    targetHours: 16,
    assignedHours: 14,
    daysOnCampus: 4,
  };

  // Week grid setup
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = ["09:00", "10:15", "11:30", "12:45", "14:00", "15:15", "16:30"];

  // Faculty sessions
  const sessions = {
    Mon: [
      {
        slotIndex: 0,
        len: 1,
        title: "Data Structures",
        type: "L",
        room: "CS-201",
        cohort: "FYUGP-CS-S3",
        code: "CS201",
      },
      {
        slotIndex: 2,
        len: 2,
        title: "OS Lab",
        type: "P",
        room: "CS-Lab-1",
        cohort: "FYUGP-CS-S3",
        code: "CS331",
      },
    ],
    Tue: [
      {
        slotIndex: 1,
        len: 1,
        title: "Algorithms",
        type: "L",
        room: "CS-105",
        cohort: "FYUGP-CS-S3",
        code: "CS301",
      },
      {
        slotIndex: 4,
        len: 2,
        title: "Database Lab",
        type: "P",
        room: "CS-Lab-2",
        cohort: "FYUGP-CS-S3",
        code: "CS302",
      },
    ],
    Wed: [
      {
        slotIndex: 0,
        len: 1,
        title: "Data Structures",
        type: "T",
        room: "CS-201",
        cohort: "FYUGP-CS-S3",
        code: "CS201",
      },
      {
        slotIndex: 3,
        len: 1,
        title: "Algorithms",
        type: "T",
        room: "CS-204",
        cohort: "FYUGP-CS-S3",
        code: "CS301",
      },
    ],
    Thu: [
      {
        slotIndex: 2,
        len: 1,
        title: "Research Seminar",
        type: "S",
        room: "Seminar Hall",
        cohort: "All",
        code: "RES101",
      },
    ],
    Fri: [
      {
        slotIndex: 1,
        len: 1,
        title: "Database Systems",
        type: "L",
        room: "CS-104",
        cohort: "FYUGP-CS-S3",
        code: "CS302",
      },
    ],
  };

  function handleLogout() {
    navigate("/login");
  }

  const handleExport = (format) => {
    alert(`Exporting timetable as ${format}...`);
    setShowExport(false);
  };

  const handleAddAvailability = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newBlock = {
      day: formData.get("day"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
    };
    setAvailabilityBlocks([...availabilityBlocks, newBlock]);
    e.target.reset();
  };

  const handleRemoveAvailability = (index) => {
    setAvailabilityBlocks(availabilityBlocks.filter((_, i) => i !== index));
  };

  const handleReportClash = (details) => {
    alert(`Clash reported: ${details}`);
    setShowClash(false);
  };

  // Session type colors
  const getSessionColor = (type) => {
    if (type === "L") {
      return isDark
        ? "bg-blue-50 border-blue-200 hover:border-blue-300"
        : "bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50";
    }
    if (type === "P") {
      return isDark
        ? "bg-emerald-50 border-emerald-200 hover:border-emerald-300"
        : "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50";
    }
    if (type === "T") {
      return isDark
        ? "bg-amber-50 border-amber-200 hover:border-amber-300"
        : "bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50";
    }
    return isDark
      ? "bg-purple-50 border-purple-200 hover:border-purple-300"
      : "bg-purple-500/10 border-purple-500/30 hover:border-purple-500/50";
  };

  const getTypeLabel = (type) => {
    if (type === "L")
      return { text: "L", color: isDark ? "bg-blue-600" : "bg-blue-500" };
    if (type === "P")
      return { text: "P", color: isDark ? "bg-emerald-600" : "bg-emerald-500" };
    if (type === "T")
      return { text: "T", color: isDark ? "bg-amber-600" : "bg-amber-500" };
    return { text: "S", color: isDark ? "bg-purple-600" : "bg-purple-500" };
  };

  // Theme classes
  const theme = {
    bg: isDark ? "bg-gray-50" : "bg-slate-950",
    text: isDark ? "text-gray-900" : "text-slate-50",
    cardBg: isDark ? "bg-white" : "bg-slate-900/50",
    cardBorder: isDark ? "border-gray-200" : "border-slate-800/60",
    headerBg: isDark ? "bg-white/80" : "bg-slate-900/60",
    headerBorder: isDark ? "border-gray-200" : "border-slate-800/60",
    mutedText: isDark ? "text-gray-600" : "text-slate-400",
    gradient: isDark
      ? "from-blue-600 via-indigo-600 to-purple-600"
      : "from-blue-400 via-indigo-400 to-purple-400",
    accentBg: isDark ? "bg-gray-50" : "bg-slate-800/30",
    accentBorder: isDark ? "border-gray-200" : "border-slate-700/40",
    hoverBg: isDark ? "hover:bg-gray-50" : "hover:bg-slate-800/50",
    buttonBg: isDark ? "bg-gray-100" : "bg-slate-800/40",
    buttonBorder: isDark ? "border-gray-300" : "border-slate-700/60",
    buttonText: isDark ? "text-gray-900" : "text-slate-200",
    buttonHoverBorder: isDark
      ? "hover:border-blue-400"
      : "hover:border-blue-500/70",
    modalBg: isDark ? "bg-white" : "bg-slate-900",
    modalOverlay: isDark ? "bg-gray-900/40" : "bg-slate-950/70",
    inputBg: isDark ? "bg-white" : "bg-slate-800/50",
    inputBorder: isDark ? "border-gray-300" : "border-slate-700",
    inputText: isDark ? "text-gray-900" : "text-slate-100",
    tableBorder: isDark ? "border-gray-200" : "border-slate-800/60",
    tableHeader: isDark ? "bg-gray-50" : "bg-slate-800/40",
  };

  return (
    <div
      className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300`}
    >
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div
          className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${theme.gradient} rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr ${theme.gradient} rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2`}
        ></div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-20 backdrop-blur-xl ${theme.headerBg} border-b ${theme.headerBorder}`}
      >
        <motion.div
          className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className={`p-1.5 rounded-lg bg-gradient-to-br ${theme.gradient}`}
            >
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-lg">Timely NEP</span>
          </Link>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg ${theme.buttonBg} border ${theme.buttonBorder} ${theme.buttonText} hover:scale-105 transition-all duration-200`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} transition-all duration-200`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut size={16} />
              <span className="text-sm font-medium">Logout</span>
            </motion.button>
          </div>
        </motion.div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <motion.div
          className={`mb-8 p-6 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className={`h-16 w-16 rounded-xl bg-gradient-to-br ${theme.gradient} grid place-content-center text-white font-bold text-xl shadow-lg shrink-0`}
              >
                {faculty.name
                  .split(" ")
                  .map((s) => s[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">{faculty.name}</h1>
                <p className={`text-sm ${theme.mutedText} mb-3`}>
                  {faculty.role} • {faculty.department}
                </p>
                <p className={`text-xs ${theme.mutedText}`}>
                  {faculty.id} • {faculty.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 lg:border-l lg:pl-6 border-gray-200 dark:border-slate-800">
              <div className="text-center">
                <p className={`text-xs ${theme.mutedText} mb-1`}>
                  Teaching Load
                </p>
                <p className="text-2xl font-bold">
                  {faculty.assignedHours}
                  <span className={`text-base ${theme.mutedText}`}>
                    /{faculty.targetHours}
                  </span>
                </p>
                <p className={`text-xs ${theme.mutedText}`}>hrs/week</p>
              </div>
              <div
                className={`h-12 w-px ${
                  isDark ? "bg-gray-200" : "bg-slate-800"
                }`}
              ></div>
              <div className="text-center">
                <p className={`text-xs ${theme.mutedText} mb-1`}>On Campus</p>
                <p className="text-2xl font-bold">{faculty.daysOnCampus}</p>
                <p className={`text-xs ${theme.mutedText}`}>days</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Cards */}
        <motion.div
          className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2.5 rounded-lg ${
                  isDark ? "bg-blue-100" : "bg-blue-500/20"
                }`}
              >
                <BookOpen
                  size={18}
                  className={isDark ? "text-blue-600" : "text-blue-400"}
                />
              </div>
              <div>
                <p className={`text-xs ${theme.mutedText}`}>Sections</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
            <p className={`text-xs ${theme.mutedText}`}>
              Total classes assigned
            </p>
          </div>

          <div
            className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2.5 rounded-lg ${
                  isDark ? "bg-emerald-100" : "bg-emerald-500/20"
                }`}
              >
                <Shield
                  size={18}
                  className={isDark ? "text-emerald-600" : "text-emerald-400"}
                />
              </div>
              <div>
                <p className={`text-xs ${theme.mutedText}`}>Conflicts</p>
                <p className="text-2xl font-bold text-emerald-600">0</p>
              </div>
            </div>
            <p className={`text-xs ${theme.mutedText}`}>No scheduling issues</p>
          </div>

          <div
            className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2.5 rounded-lg ${
                  isDark ? "bg-purple-100" : "bg-purple-500/20"
                }`}
              >
                <Users
                  size={18}
                  className={isDark ? "text-purple-600" : "text-purple-400"}
                />
              </div>
              <div>
                <p className={`text-xs ${theme.mutedText}`}>Students</p>
                <p className="text-2xl font-bold">180</p>
              </div>
            </div>
            <p className={`text-xs ${theme.mutedText}`}>Across all sections</p>
          </div>

          <div
            className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2.5 rounded-lg ${
                  isDark ? "bg-amber-100" : "bg-amber-500/20"
                }`}
              >
                <Award
                  size={18}
                  className={isDark ? "text-amber-600" : "text-amber-400"}
                />
              </div>
              <div>
                <p className={`text-xs ${theme.mutedText}`}>Completion</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </div>
            <p className={`text-xs ${theme.mutedText}`}>Load vs target</p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            onClick={() => setShowExport(true)}
            className={`group p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm text-left hover:shadow-lg transition-all duration-300`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${theme.gradient} mb-3`}
            >
              <Download size={18} className="text-white" />
            </div>
            <h3 className="font-semibold mb-1">Export Schedule</h3>
            <p className={`text-xs ${theme.mutedText}`}>
              Download timetable in multiple formats
            </p>
            <ChevronRight
              size={16}
              className={`mt-2 ${theme.mutedText} group-hover:translate-x-1 transition-transform`}
            />
          </motion.button>

          <motion.button
            onClick={() => setShowAvailability(true)}
            className={`group p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm text-left hover:shadow-lg transition-all duration-300`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`inline-flex p-2.5 rounded-lg ${
                isDark ? "bg-blue-100" : "bg-blue-500/20"
              } mb-3`}
            >
              <Clock
                size={18}
                className={isDark ? "text-blue-600" : "text-blue-400"}
              />
            </div>
            <h3 className="font-semibold mb-1">Availability</h3>
            <p className={`text-xs ${theme.mutedText}`}>
              Set preferred teaching slots
            </p>
            <ChevronRight
              size={16}
              className={`mt-2 ${theme.mutedText} group-hover:translate-x-1 transition-transform`}
            />
          </motion.button>

          <motion.button
            onClick={() => setShowClash(true)}
            className={`group p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm text-left hover:shadow-lg transition-all duration-300`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`inline-flex p-2.5 rounded-lg ${
                isDark ? "bg-rose-100" : "bg-rose-500/20"
              } mb-3`}
            >
              <AlertTriangle
                size={18}
                className={isDark ? "text-rose-600" : "text-rose-400"}
              />
            </div>
            <h3 className="font-semibold mb-1">Report Issue</h3>
            <p className={`text-xs ${theme.mutedText}`}>
              Flag scheduling conflicts
            </p>
            <ChevronRight
              size={16}
              className={`mt-2 ${theme.mutedText} group-hover:translate-x-1 transition-transform`}
            />
          </motion.button>
        </motion.div>

        {/* Weekly Timetable */}
        <motion.div
          className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 lg:p-8`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Weekly Teaching Schedule</h2>
            <div
              className={`px-3 py-1.5 rounded-lg ${theme.accentBg} border ${theme.accentBorder} text-xs font-medium`}
            >
              Current Week
            </div>
          </div>

          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th
                    className={`${theme.tableHeader} px-4 py-3 text-xs font-semibold text-left rounded-tl-lg border-b ${theme.tableBorder}`}
                  >
                    Time
                  </th>
                  {weekDays.map((day, i) => (
                    <th
                      key={day}
                      className={`${
                        theme.tableHeader
                      } px-3 py-3 text-xs font-semibold text-center border-b ${
                        theme.tableBorder
                      } ${i === weekDays.length - 1 ? "rounded-tr-lg" : ""}`}
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slots.map((slot, slotIdx) => (
                  <tr key={slotIdx}>
                    <td
                      className={`px-4 py-3 text-xs font-medium ${theme.mutedText} border-b ${theme.tableBorder}`}
                    >
                      {slot}
                    </td>
                    {weekDays.map((day) => {
                      const session = sessions[day]?.find(
                        (s) => s.slotIndex === slotIdx
                      );
                      if (!session) {
                        return (
                          <td
                            key={day}
                            className={`px-2 py-3 border-b ${theme.tableBorder}`}
                          ></td>
                        );
                      }
                      const typeLabel = getTypeLabel(session.type);
                      return (
                        <td
                          key={day}
                          rowSpan={session.len}
                          className={`px-2 py-3 border-b ${theme.tableBorder} align-top`}
                        >
                          <motion.div
                            className={`p-3 rounded-lg border transition-all cursor-pointer ${getSessionColor(
                              session.type
                            )}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <p className="font-semibold text-xs leading-tight">
                                {session.title}
                              </p>
                              <span
                                className={`shrink-0 px-1.5 py-0.5 rounded text-xs font-bold text-white ${typeLabel.color}`}
                              >
                                {typeLabel.text}
                              </span>
                            </div>
                            <div
                              className={`text-xs ${theme.mutedText} space-y-1`}
                            >
                              <p className="flex items-center gap-1">
                                <MapPin size={10} />
                                {session.room}
                              </p>
                              <p className="flex items-center gap-1">
                                <Users size={10} />
                                {session.cohort}
                              </p>
                            </div>
                            <span
                              className={`inline-block mt-2 px-2 py-0.5 rounded-md text-xs font-semibold ${
                                isDark
                                  ? "bg-gray-200 text-gray-700"
                                  : "bg-slate-700 text-slate-200"
                              }`}
                            >
                              {session.code}
                            </span>
                          </motion.div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className={`text-xs font-medium ${theme.mutedText}`}>
              Session Types:
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded text-xs font-bold text-white ${
                  isDark ? "bg-blue-600" : "bg-blue-500"
                }`}
              >
                L
              </span>
              <span className={`text-xs ${theme.mutedText}`}>Lecture</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded text-xs font-bold text-white ${
                  isDark ? "bg-amber-600" : "bg-amber-500"
                }`}
              >
                T
              </span>
              <span className={`text-xs ${theme.mutedText}`}>Tutorial</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded text-xs font-bold text-white ${
                  isDark ? "bg-emerald-600" : "bg-emerald-500"
                }`}
              >
                P
              </span>
              <span className={`text-xs ${theme.mutedText}`}>Practical</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded text-xs font-bold text-white ${
                  isDark ? "bg-purple-600" : "bg-purple-500"
                }`}
              >
                S
              </span>
              <span className={`text-xs ${theme.mutedText}`}>Seminar</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Export Modal */}
      <AnimatePresence>
        {showExport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 ${theme.modalOverlay} backdrop-blur-md flex items-center justify-center z-50 p-4`}
            onClick={() => setShowExport(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`${theme.modalBg} rounded-2xl p-6 w-full max-w-md shadow-2xl border ${theme.cardBorder}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Export Timetable</h3>
                <button
                  onClick={() => setShowExport(false)}
                  className={`p-1.5 rounded-lg ${theme.hoverBg} transition-colors`}
                >
                  <X size={18} />
                </button>
              </div>
              <p className={`text-sm ${theme.mutedText} mb-6`}>
                Choose your preferred format to download
              </p>
              <div className="space-y-3 mb-6">
                {["PDF", "Excel", "ICS"].map((format) => (
                  <button
                    key={format}
                    onClick={() => setSelectedFormat(format)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      selectedFormat === format
                        ? isDark
                          ? "border-blue-400 bg-blue-50 shadow-sm"
                          : "border-blue-500 bg-blue-500/10 shadow-sm"
                        : theme.accentBorder +
                          " " +
                          theme.accentBg +
                          " hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={18} />
                      <span className="font-medium text-sm">{format}</span>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleExport(selectedFormat)}
                className={`w-full px-4 py-3.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all`}
              >
                Download {selectedFormat}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Availability Modal */}
      <AnimatePresence>
        {showAvailability && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 ${theme.modalOverlay} backdrop-blur-md flex items-center justify-center z-50 p-4`}
            onClick={() => setShowAvailability(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`${theme.modalBg} rounded-2xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl border ${theme.cardBorder}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Set Availability</h3>
                <button
                  onClick={() => setShowAvailability(false)}
                  className={`p-1.5 rounded-lg ${theme.hoverBg} transition-colors`}
                >
                  <X size={18} />
                </button>
              </div>
              <p className={`text-sm ${theme.mutedText} mb-6`}>
                Mark your preferred time slots for course scheduling
              </p>

              <form onSubmit={handleAddAvailability} className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Day
                    </label>
                    <select
                      name="day"
                      required
                      className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    >
                      <option value="">Select day</option>
                      {weekDays.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Start Time
                    </label>
                    <select
                      name="startTime"
                      required
                      className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    >
                      <option value="">Select time</option>
                      {slots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      End Time
                    </label>
                    <select
                      name="endTime"
                      required
                      className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    >
                      <option value="">Select time</option>
                      {slots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`w-full px-4 py-3.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                >
                  <Plus size={18} />
                  Add Availability Block
                </button>
              </form>

              <div>
                <h4 className="text-sm font-bold mb-3">Current Blocks</h4>
                {availabilityBlocks.length === 0 ? (
                  <div
                    className={`text-center py-8 rounded-xl border ${theme.cardBorder} ${theme.accentBg}`}
                  >
                    <Clock
                      size={32}
                      className={`mx-auto mb-2 ${theme.mutedText}`}
                    />
                    <p className={`text-sm ${theme.mutedText}`}>
                      No availability blocks added yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {availabilityBlocks.map((block, idx) => (
                      <motion.div
                        key={idx}
                        className={`flex items-center justify-between p-4 rounded-xl border ${theme.cardBorder} ${theme.accentBg}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              isDark ? "bg-blue-100" : "bg-blue-500/20"
                            }`}
                          >
                            <Calendar
                              size={16}
                              className={
                                isDark ? "text-blue-600" : "text-blue-400"
                              }
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{block.day}</p>
                            <p className={`text-xs ${theme.mutedText}`}>
                              {block.startTime} - {block.endTime}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveAvailability(idx)}
                          className={`p-2 rounded-lg ${theme.hoverBg} text-rose-600 transition-colors`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Clash Modal */}
      <AnimatePresence>
        {showClash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 ${theme.modalOverlay} backdrop-blur-md flex items-center justify-center z-50 p-4`}
            onClick={() => setShowClash(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`${theme.modalBg} rounded-2xl p-6 w-full max-w-md shadow-2xl border ${theme.cardBorder}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Report Clash</h3>
                <button
                  onClick={() => setShowClash(false)}
                  className={`p-1.5 rounded-lg ${theme.hoverBg} transition-colors`}
                >
                  <X size={18} />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  handleReportClash(formData.get("details"));
                }}
              >
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Clash Type
                    </label>
                    <select
                      name="type"
                      className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    >
                      <option value="room">Room Conflict</option>
                      <option value="faculty">Faculty Overlap</option>
                      <option value="student">Student Group Clash</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Course/Session
                    </label>
                    <input
                      type="text"
                      name="course"
                      placeholder="e.g., CS201 - Mon 09:00"
                      className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Details
                    </label>
                    <textarea
                      name="details"
                      rows={4}
                      placeholder="Describe the clash in detail..."
                      className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all`}
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`w-full px-4 py-3.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all`}
                >
                  Submit Report
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
