import React, { useMemo, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  FileText,
  Download,
  BookOpen,
  AlertTriangle,
  X,
  BookMarked,
  MapPin,
  User,
  GraduationCap,
  Building2,
  Layers,
  Award,
  Moon,
  Sun,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import LogoutButton from "../components/LogoutButton";

export default function StudentDashboard() {
  const [isDark, setIsDark] = useState(true);

  // Demo student data
  const student = {
    name: "Alex Kumar",
    id: "STU23CS001",
    email: "alex.kumar@university.edu",
    department: "Computer Science",
    program: "FYUGP",
    semester: 3,
    creditsEnrolled: 22,
    electives: ["AI & ML", "Cloud Computing"],
  };

  // Timetable grid seed
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = ["09:00", "10:15", "11:30", "12:45", "14:00", "15:15", "16:30"];
  const sessions = {
    Mon: [
      {
        slotIndex: 0,
        len: 1,
        title: "Data Structures",
        type: "L",
        room: "CS-201",
        faculty: "Dr. Rao",
        code: "CS201",
      },
      {
        slotIndex: 2,
        len: 1,
        title: "AI & ML",
        type: "T",
        room: "CS-Lab-2",
        faculty: "Dr. Singh",
        code: "CS342",
        flags: ["Elective"],
      },
      {
        slotIndex: 5,
        len: 2,
        title: "OS Lab",
        type: "P",
        room: "CS-Lab-1",
        faculty: "Ms. Das",
        code: "CS331",
      },
    ],
    Tue: [
      {
        slotIndex: 1,
        len: 1,
        title: "Discrete Math",
        type: "L",
        room: "MATH-102",
        faculty: "Prof. Iyer",
        code: "MA203",
      },
    ],
    Wed: [
      {
        slotIndex: 0,
        len: 1,
        title: "Algorithms",
        type: "L",
        room: "CS-105",
        faculty: "Dr. Jain",
        code: "CS301",
      },
      {
        slotIndex: 2,
        len: 1,
        title: "Cloud Computing",
        type: "T",
        room: "CS-204",
        faculty: "Dr. Patil",
        code: "CS344",
        flags: ["Elective"],
      },
    ],
    Thu: [
      {
        slotIndex: 4,
        len: 2,
        title: "OS Lab",
        type: "P",
        room: "CS-Lab-1",
        faculty: "Ms. Das",
        code: "CS331",
      },
    ],
    Fri: [],
  };

  // Core actions modal state
  const [showExport, setShowExport] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);
  const [showElective, setShowElective] = useState(false);
  const [showClash, setShowClash] = useState(false);

  // Export handlers
  function downloadPDF() {
    alert("Downloading timetable PDF...");
  }
  function downloadExcel() {
    alert("Downloading timetable Excel...");
  }
  function downloadICS() {
    alert("Downloading timetable ICS...");
  }

  // Enrollment state
  const catalog = [
    {
      code: "CS351",
      name: "Computer Networks",
      type: "Major",
      seats: 60,
      filled: 52,
      ltp: "3-0-0",
    },
    {
      code: "CS372",
      name: "Database Systems",
      type: "Major",
      seats: 60,
      filled: 60,
      ltp: "3-0-0",
    },
    {
      code: "CS382",
      name: "Software Engg",
      type: "MDC",
      seats: 60,
      filled: 41,
      ltp: "3-0-0",
    },
  ];

  const [enrollCode, setEnrollCode] = useState("");
  const enrollCourse = useMemo(
    () => catalog.find((c) => c.code === enrollCode) || null,
    [enrollCode]
  );

  function submitEnroll() {
    if (!enrollCourse) return;
    if (enrollCourse.filled >= enrollCourse.seats) {
      alert("Course is full. Choose another.");
      return;
    }
    alert(`Enrollment requested for ${enrollCourse.code}`);
    setShowEnroll(false);
  }

  // Elective selection
  const electivePool = [
    {
      code: "CS342",
      name: "AI & ML",
      slots: ["Mon 11:30"],
      risk: "Low",
    },
    {
      code: "CS344",
      name: "Cloud Computing",
      slots: ["Wed 11:30"],
      risk: "Low",
    },
    {
      code: "CS346",
      name: "Cyber Security",
      slots: ["Mon 11:30"],
      risk: "Clash",
    },
  ];

  const [selectedElectives, setSelectedElectives] = useState(
    new Set(
      student.electives
        .map((e) => electivePool.find((x) => x.name === e)?.code)
        .filter(Boolean)
    )
  );

  function toggleElective(code) {
    setSelectedElectives((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  }

  function submitElectives() {
    const chosen = electivePool.filter((e) => selectedElectives.has(e.code));
    const slotsFlat = chosen.flatMap((e) => e.slots);
    const hasDup = new Set(slotsFlat).size !== slotsFlat.length;
    if (hasDup) {
      alert("Selected electives have a time clash. Please adjust.");
      return;
    }
    alert(`Saved electives: ${chosen.map((c) => c.name).join(", ")}`);
    setShowElective(false);
  }

  // Clash report
  const [clashType, setClashType] = useState("Student overlap");
  const [clashMessage, setClashMessage] = useState("");

  function submitClash() {
    if (!clashMessage.trim()) {
      alert("Please describe the clash.");
      return;
    }
    alert("Clash reported. The department will review it.");
    setShowClash(false);
    setClashMessage("");
  }

  // Session type colors
  const getSessionColor = (type, isElective) => {
    if (isElective) {
      return isDark
        ? "bg-violet-50 border-violet-200 hover:border-violet-300"
        : "bg-violet-500/10 border-violet-500/30 hover:border-violet-500/50";
    }
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
    return isDark
      ? "bg-amber-50 border-amber-200 hover:border-amber-300"
      : "bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50";
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
      ? "from-indigo-600 via-purple-600 to-pink-600"
      : "from-indigo-400 via-purple-400 to-pink-400",
    accentBg: isDark ? "bg-gray-50" : "bg-slate-800/30",
    accentBorder: isDark ? "border-gray-200" : "border-slate-700/40",
    hoverBg: isDark ? "hover:bg-gray-50" : "hover:bg-slate-800/50",
    buttonBg: isDark ? "bg-gray-100" : "bg-slate-800/40",
    buttonBorder: isDark ? "border-gray-300" : "border-slate-700/60",
    buttonText: isDark ? "text-gray-900" : "text-slate-200",
    buttonHoverBorder: isDark
      ? "hover:border-indigo-400"
      : "hover:border-indigo-500/70",
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

      {/* Header - Minimalist */}
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
            <LogoutButton />
          </div>
        </motion.div>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <motion.div
          className={`mb-8 p-6 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                Welcome back, {student.name.split(" ")[0]}
              </h1>
              <p className={`text-sm ${theme.mutedText}`}>
                Here's your academic overview for Semester {student.semester}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className={`text-xs ${theme.mutedText} mb-1`}>
                  Credits Enrolled
                </p>
                <p className="text-2xl font-bold">{student.creditsEnrolled}</p>
              </div>
              <div
                className={`h-12 w-px ${
                  isDark ? "bg-gray-200" : "bg-slate-800"
                }`}
              ></div>
              <div className="text-center">
                <p className={`text-xs ${theme.mutedText} mb-1`}>Electives</p>
                <p className="text-2xl font-bold">{student.electives.length}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions - Horizontal Cards */}
        <motion.div
          className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
            <h3 className="font-semibold mb-1">Export</h3>
            <p className={`text-xs ${theme.mutedText}`}>Download timetable</p>
            <ChevronRight
              size={16}
              className={`mt-2 ${theme.mutedText} group-hover:translate-x-1 transition-transform`}
            />
          </motion.button>

          <motion.button
            onClick={() => setShowElective(true)}
            className={`group p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm text-left hover:shadow-lg transition-all duration-300`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`inline-flex p-2.5 rounded-lg ${
                isDark ? "bg-blue-100" : "bg-blue-500/20"
              } mb-3`}
            >
              <BookOpen
                size={18}
                className={isDark ? "text-blue-600" : "text-blue-400"}
              />
            </div>
            <h3 className="font-semibold mb-1">Electives</h3>
            <p className={`text-xs ${theme.mutedText}`}>Choose courses</p>
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
            <h3 className="font-semibold mb-1">Report</h3>
            <p className={`text-xs ${theme.mutedText}`}>Flag timetable clash</p>
            <ChevronRight
              size={16}
              className={`mt-2 ${theme.mutedText} group-hover:translate-x-1 transition-transform`}
            />
          </motion.button>

          <motion.div
            className={`group p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm`}
            whileHover={{ y: -4 }}
          >
            <div
              className={`inline-flex p-2.5 rounded-lg ${
                isDark ? "bg-emerald-100" : "bg-emerald-500/20"
              } mb-3`}
            >
              <TrendingUp
                size={18}
                className={isDark ? "text-emerald-600" : "text-emerald-400"}
              />
            </div>
            <h3 className="font-semibold mb-1">Progress</h3>
            <p className={`text-xs ${theme.mutedText}`}>Track academics</p>
            <div className="mt-3 flex items-center gap-2">
              <div
                className={`flex-1 h-1.5 rounded-full ${
                  isDark ? "bg-gray-200" : "bg-slate-800"
                }`}
              >
                <div
                  className={`h-full w-3/4 rounded-full bg-gradient-to-r ${theme.gradient}`}
                ></div>
              </div>
              <span className="text-xs font-medium">75%</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
          {/* Timetable - Main Content */}
          <motion.div
            className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 lg:p-8`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Weekly Schedule</h2>
              <div
                className={`px-3 py-1.5 rounded-lg ${theme.accentBg} border ${theme.accentBorder} text-xs font-medium`}
              >
                Semester {student.semester}
              </div>
            </div>

            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full border-collapse min-w-[700px]">
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
                        const sess = sessions[day]?.find(
                          (s) => s.slotIndex === slotIdx
                        );
                        if (!sess) {
                          return (
                            <td
                              key={day}
                              className={`px-2 py-3 border-b ${theme.tableBorder}`}
                            ></td>
                          );
                        }
                        const isElective = sess.flags?.includes("Elective");
                        return (
                          <td
                            key={day}
                            rowSpan={sess.len}
                            className={`px-2 py-3 border-b ${theme.tableBorder} align-top`}
                          >
                            <motion.div
                              className={`p-3 rounded-lg border transition-all cursor-pointer ${getSessionColor(
                                sess.type,
                                isElective
                              )}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <p className="font-semibold text-xs leading-tight">
                                  {sess.title}
                                </p>
                                <span
                                  className={`shrink-0 px-1.5 py-0.5 rounded text-xs font-bold ${
                                    sess.type === "L"
                                      ? isDark
                                        ? "bg-blue-200 text-blue-700"
                                        : "bg-blue-500/30 text-blue-300"
                                      : sess.type === "P"
                                      ? isDark
                                        ? "bg-emerald-200 text-emerald-700"
                                        : "bg-emerald-500/30 text-emerald-300"
                                      : isDark
                                      ? "bg-amber-200 text-amber-700"
                                      : "bg-amber-500/30 text-amber-300"
                                  }`}
                                >
                                  {sess.type}
                                </span>
                              </div>
                              <p
                                className={`text-xs ${theme.mutedText} flex items-center gap-1 mb-1`}
                              >
                                <MapPin size={10} />
                                {sess.room}
                              </p>
                              <p className={`text-xs ${theme.mutedText}`}>
                                {sess.faculty}
                              </p>
                              {isElective && (
                                <span
                                  className={`inline-block mt-2 px-2 py-0.5 rounded-md text-xs font-semibold ${
                                    isDark
                                      ? "bg-violet-200 text-violet-700"
                                      : "bg-violet-500/30 text-violet-300"
                                  }`}
                                >
                                  Elective
                                </span>
                              )}
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
                Legend:
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    isDark
                      ? "bg-blue-200 text-blue-700"
                      : "bg-blue-500/30 text-blue-300"
                  }`}
                >
                  L
                </span>
                <span className={`text-xs ${theme.mutedText}`}>Lecture</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    isDark
                      ? "bg-amber-200 text-amber-700"
                      : "bg-amber-500/30 text-amber-300"
                  }`}
                >
                  T
                </span>
                <span className={`text-xs ${theme.mutedText}`}>Tutorial</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    isDark
                      ? "bg-emerald-200 text-emerald-700"
                      : "bg-emerald-500/30 text-emerald-300"
                  }`}
                >
                  P
                </span>
                <span className={`text-xs ${theme.mutedText}`}>Practical</span>
              </div>
            </div>
          </motion.div>

          {/* Sidebar - Student Profile */}
          <motion.aside
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Profile Card */}
            <div
              className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`h-16 w-16 rounded-xl bg-gradient-to-br ${theme.gradient} grid place-content-center text-white font-bold text-xl shadow-lg`}
                >
                  {student.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-base truncate">{student.name}</p>
                  <p
                    className={`text-xs ${theme.mutedText} flex items-center gap-1.5 mt-1`}
                  >
                    <User size={11} />
                    {student.id}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isDark ? "bg-indigo-100" : "bg-indigo-500/20"
                    }`}
                  >
                    <GraduationCap
                      size={14}
                      className={isDark ? "text-indigo-600" : "text-indigo-400"}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${theme.mutedText}`}>Program</p>
                    <p className="text-sm font-semibold">{student.program}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isDark ? "bg-purple-100" : "bg-purple-500/20"
                    }`}
                  >
                    <Building2
                      size={14}
                      className={isDark ? "text-purple-600" : "text-purple-400"}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${theme.mutedText}`}>Department</p>
                    <p className="text-sm font-semibold truncate">
                      {student.department}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isDark ? "bg-pink-100" : "bg-pink-500/20"
                    }`}
                  >
                    <Layers
                      size={14}
                      className={isDark ? "text-pink-600" : "text-pink-400"}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${theme.mutedText}`}>Semester</p>
                    <p className="text-sm font-semibold">
                      Semester {student.semester}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Electives */}
            <div
              className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6`}
            >
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                <BookMarked
                  size={16}
                  className={isDark ? "text-indigo-600" : "text-indigo-400"}
                />
                Current Electives
              </h3>
              <div className="space-y-2">
                {student.electives.map((e, i) => (
                  <motion.div
                    key={i}
                    className={`px-3 py-2.5 rounded-lg ${
                      isDark
                        ? "bg-indigo-50 border border-indigo-200"
                        : "bg-indigo-500/10 border border-indigo-500/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p
                      className={`text-xs font-semibold ${
                        isDark ? "text-indigo-700" : "text-indigo-300"
                      }`}
                    >
                      {e}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </main>

      {/* Modals - Unchanged logic, improved styling */}
      <AnimatePresence>
        {/* Export Modal */}
        {showExport && (
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme.modalOverlay} backdrop-blur-md`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowExport(false)}
          >
            <motion.div
              className={`${theme.modalBg} rounded-2xl p-6 max-w-md w-full shadow-2xl border ${theme.cardBorder}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
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
              <div className="space-y-3">
                <button
                  onClick={downloadPDF}
                  className={`w-full px-4 py-3.5 rounded-xl border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} hover:scale-[1.02] text-sm font-medium flex items-center justify-center gap-2.5 transition-all`}
                >
                  <FileText size={16} />
                  PDF Document
                </button>
                <button
                  onClick={downloadExcel}
                  className={`w-full px-4 py-3.5 rounded-xl border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} hover:scale-[1.02] text-sm font-medium flex items-center justify-center gap-2.5 transition-all`}
                >
                  <FileText size={16} />
                  Excel Spreadsheet
                </button>
                <button
                  onClick={downloadICS}
                  className={`w-full px-4 py-3.5 rounded-xl border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} hover:scale-[1.02] text-sm font-medium flex items-center justify-center gap-2.5 transition-all`}
                >
                  <Calendar size={16} />
                  Calendar (ICS)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Elective Modal */}
        {showElective && (
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme.modalOverlay} backdrop-blur-md`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowElective(false)}
          >
            <motion.div
              className={`${theme.modalBg} rounded-2xl p-6 max-w-lg w-full shadow-2xl border ${theme.cardBorder} max-h-[85vh] overflow-y-auto`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Choose Electives</h3>
                <button
                  onClick={() => setShowElective(false)}
                  className={`p-1.5 rounded-lg ${theme.hoverBg} transition-colors`}
                >
                  <X size={18} />
                </button>
              </div>
              <p className={`text-sm ${theme.mutedText} mb-6`}>
                Select your elective courses. Avoid time clashes for smooth
                enrollment.
              </p>
              <div className="space-y-3 mb-6">
                {electivePool.map((e) => (
                  <div
                    key={e.code}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedElectives.has(e.code)
                        ? isDark
                          ? "border-indigo-400 bg-indigo-50 shadow-sm"
                          : "border-indigo-500 bg-indigo-500/10 shadow-sm"
                        : theme.accentBorder +
                          " " +
                          theme.accentBg +
                          " hover:shadow-sm"
                    }`}
                    onClick={() => toggleElective(e.code)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">{e.name}</p>
                        <p className={`text-xs ${theme.mutedText} mb-1`}>
                          {e.code}
                        </p>
                        <p className={`text-xs ${theme.mutedText}`}>
                          {e.slots.join(", ")}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          e.risk === "Clash"
                            ? isDark
                              ? "bg-rose-100 text-rose-700"
                              : "bg-rose-500/20 text-rose-300"
                            : isDark
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-emerald-500/20 text-emerald-300"
                        }`}
                      >
                        {e.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={submitElectives}
                className={`w-full px-4 py-3.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all`}
              >
                Save Selection
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Clash Report Modal */}
        {showClash && (
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme.modalOverlay} backdrop-blur-md`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowClash(false)}
          >
            <motion.div
              className={`${theme.modalBg} rounded-2xl p-6 max-w-md w-full shadow-2xl border ${theme.cardBorder}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
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
              <div className="space-y-4 mb-6">
                <div>
                  <label className={`text-sm font-semibold mb-2 block`}>
                    Clash Type
                  </label>
                  <select
                    value={clashType}
                    onChange={(e) => setClashType(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                  >
                    <option>Student overlap</option>
                    <option>Room conflict</option>
                    <option>Faculty conflict</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className={`text-sm font-semibold mb-2 block`}>
                    Description
                  </label>
                  <textarea
                    value={clashMessage}
                    onChange={(e) => setClashMessage(e.target.value)}
                    placeholder="Describe the clash in detail..."
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all`}
                  />
                </div>
              </div>
              <button
                onClick={submitClash}
                className={`w-full px-4 py-3.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all`}
              >
                Submit Report
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
