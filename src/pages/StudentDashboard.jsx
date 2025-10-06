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
  School,
  Users,
  Clock,
  CheckCircle2,
  Brain,
  Briefcase,
  Target,
  BookOpenCheck,
  FlaskConical,
  Home,
  Bell,
  Settings,
} from "lucide-react";
import LogoutButton from "../components/LogoutButton";
import CustomDropdown from "../components/CustomDropdown";

export default function TeacherEducationDashboard() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // ITEP Student Data (4-Year Integrated Program)
  const student = {
    name: "Alex Kumar",
    id: "STU23ITEP001",
    email: "alex.kumar@university.edu",
    department: "School of Education",
    program: "ITEP",
    programFull: "Integrated Teacher Education Programme",
    semester: 3,
    year: 2,
    creditsEnrolled: 30,
    creditsCompleted: 60,
    totalCredits: 160,

    // ITEP Specific Fields
    educationMajor: "Education (Pedagogy & Teaching)",
    subjectMajor: "Computer Science",
    subjectMinor: "Mathematics",
    stageSpecialization: "Secondary Stage (Classes 9-12)",

    // Practical Components
    practicum: {
      internshipHours: 120,
      hoursCompleted: 45,
      currentSchool: "Delhi Public School",
      supervisorName: "Dr. Priya Sharma",
      nextVisit: "Oct 15, 2025",
    },

    // Electives
    electives: [
      "Educational Psychology",
      "Early Childhood Care and Education",
      "Foundational Literacy and Numeracy",
    ],

    // Performance Metrics
    performance: {
      cgpa: 8.7,
      attendance: 92,
      assignmentsCompleted: 18,
      assignmentsTotal: 20,
    },
  };

  // Timetable for ITEP (Mix of Education + Subject courses)
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = ["09:00", "10:15", "11:30", "12:45", "14:00", "15:15", "16:30"];

  const sessions = {
    Mon: [
      {
        slotIndex: 0,
        len: 1,
        title: "Learning & Teaching",
        type: "L",
        room: "ED-201",
        faculty: "Dr. Meera Rao",
        code: "ED201",
        category: "Education Core",
      },
      {
        slotIndex: 2,
        len: 1,
        title: "CS Pedagogy",
        type: "T",
        room: "CS-Lab-2",
        faculty: "Dr. Singh",
        code: "ED342",
        category: "Subject Pedagogy",
        flags: ["Specialization"],
      },
      {
        slotIndex: 4,
        len: 2,
        title: "School Internship",
        type: "P",
        room: "DPS School",
        faculty: "Ms. Das",
        code: "ED331",
        category: "Practicum",
        flags: ["Field Work"],
      },
    ],
    Tue: [
      {
        slotIndex: 0,
        len: 1,
        title: "Data Structures",
        type: "L",
        room: "CS-102",
        faculty: "Prof. Iyer",
        code: "CS203",
        category: "Subject Major",
      },
      {
        slotIndex: 3,
        len: 1,
        title: "Educational Psychology",
        type: "L",
        room: "ED-105",
        faculty: "Dr. Verma",
        code: "ED215",
        category: "Education Core",
        flags: ["Elective"],
      },
    ],
    Wed: [
      {
        slotIndex: 1,
        len: 1,
        title: "Mathematics Pedagogy",
        type: "T",
        room: "MATH-204",
        faculty: "Dr. Patil",
        code: "ED344",
        category: "Subject Pedagogy",
      },
      {
        slotIndex: 3,
        len: 2,
        title: "Curriculum Design Lab",
        type: "P",
        room: "ED-Lab-1",
        faculty: "Prof. Kumar",
        code: "ED355",
        category: "Education Core",
      },
    ],
    Thu: [
      {
        slotIndex: 0,
        len: 1,
        title: "Discrete Mathematics",
        type: "L",
        room: "MATH-201",
        faculty: "Dr. Jain",
        code: "MA301",
        category: "Subject Minor",
      },
      {
        slotIndex: 4,
        len: 2,
        title: "Teaching Practice",
        type: "P",
        room: "Demo School",
        faculty: "Ms. Reddy",
        code: "ED332",
        category: "Practicum",
        flags: ["Field Work"],
      },
    ],
    Fri: [
      {
        slotIndex: 1,
        len: 1,
        title: "Assessment of Learning",
        type: "L",
        room: "ED-301",
        faculty: "Dr. Kapoor",
        code: "ED401",
        category: "Education Core",
      },
    ],
  };

  // Modal States
  const [showExport, setShowExport] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);
  const [showElective, setShowElective] = useState(false);
  const [showClash, setShowClash] = useState(false);
  const [showPracticum, setShowPracticum] = useState(false);

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

  // Course Catalog (ITEP specific)
  const catalog = [
    {
      code: "ED351",
      name: "Inclusive Education",
      type: "Education Elective",
      seats: 40,
      filled: 32,
      ltp: "3-0-0",
      credits: 4,
    },
    {
      code: "ED372",
      name: "Digital Pedagogy",
      type: "Education Elective",
      seats: 40,
      filled: 40,
      ltp: "2-0-2",
      credits: 4,
    },
    {
      code: "CS382",
      name: "AI in Education",
      type: "Subject Elective",
      seats: 30,
      filled: 25,
      ltp: "3-0-0",
      credits: 4,
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
      code: "ED342",
      name: "Educational Psychology",
      slots: ["Tue 12:45"],
      risk: "Low",
      category: "Education",
      credits: 4,
    },
    {
      code: "ED344",
      name: "Early Childhood Care",
      slots: ["Wed 11:30"],
      risk: "Low",
      category: "Education",
      credits: 4,
    },
    {
      code: "ED346",
      name: "Special Education",
      slots: ["Tue 12:45"],
      risk: "Clash",
      category: "Education",
      credits: 4,
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
  const [clashType, setClashType] = useState("Timetable overlap");
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

  // Session type colors (Enhanced for ITEP categories)
  const getSessionColor = (category, flags) => {
    const isFieldWork = flags?.includes("Field Work");
    const isElective = flags?.includes("Elective");

    if (isFieldWork) {
      return isDark
        ? "bg-rose-50 border-rose-200 hover:border-rose-300"
        : "bg-rose-500/10 border-rose-500/30 hover:border-rose-500/50";
    }
    if (isElective) {
      return isDark
        ? "bg-violet-50 border-violet-200 hover:border-violet-300"
        : "bg-violet-500/10 border-violet-500/30 hover:border-violet-500/50";
    }
    if (category === "Education Core") {
      return isDark
        ? "bg-blue-50 border-blue-200 hover:border-blue-300"
        : "bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50";
    }
    if (category === "Subject Major") {
      return isDark
        ? "bg-emerald-50 border-emerald-200 hover:border-emerald-300"
        : "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50";
    }
    if (category === "Subject Minor") {
      return isDark
        ? "bg-cyan-50 border-cyan-200 hover:border-cyan-300"
        : "bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500/50";
    }
    if (category === "Subject Pedagogy") {
      return isDark
        ? "bg-amber-50 border-amber-200 hover:border-amber-300"
        : "bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50";
    }
    return isDark
      ? "bg-gray-50 border-gray-200 hover:border-gray-300"
      : "bg-gray-500/10 border-gray-500/30 hover:border-gray-500/50";
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
    sidebarBg: isDark ? "bg-white" : "bg-slate-900/70",
    sidebarActive: isDark
      ? "bg-indigo-50 text-indigo-700 border-indigo-200"
      : "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
  };

  // Calculate progress percentages
  const creditProgress =
    (student.creditsCompleted / student.totalCredits) * 100;
  const practicumProgress =
    (student.practicum.hoursCompleted / student.practicum.internshipHours) *
    100;
  const assignmentProgress =
    (student.performance.assignmentsCompleted /
      student.performance.assignmentsTotal) *
    100;

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
              <School className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-semibold text-lg">Timely NEP</span>
              <p className={`text-xs ${theme.mutedText}`}>Teacher Education</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <motion.button
              className={`p-2 rounded-lg ${theme.buttonBg} border ${theme.buttonBorder} ${theme.buttonText} hover:scale-105 transition-all duration-200 relative`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </motion.button>
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

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Welcome Banner with ITEP-specific info */}
        <motion.div
          className={`mb-8 p-6 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">
                  Welcome back, {student.name.split(" ")[0]}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    isDark
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-indigo-500/20 text-indigo-300"
                  }`}
                >
                  {student.program} - Year {student.year}
                </span>
              </div>
              <p className={`text-sm ${theme.mutedText} mb-3`}>
                {student.stageSpecialization} • {student.subjectMajor} Major •{" "}
                {student.subjectMinor} Minor
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions - ITEP Specific */}
        <motion.div
          className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
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
            <h3 className="font-semibold mb-1 text-sm">Export Schedule</h3>
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
            <h3 className="font-semibold mb-1 text-sm">Manage Electives</h3>
            <p className={`text-xs ${theme.mutedText}`}>
              {student.electives.length} selected
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
                isDark ? "bg-amber-100" : "bg-amber-500/20"
              } mb-3`}
            >
              <AlertTriangle
                size={18}
                className={isDark ? "text-amber-600" : "text-amber-400"}
              />
            </div>
            <h3 className="font-semibold mb-1 text-sm">Report Issue</h3>
            <p className={`text-xs ${theme.mutedText}`}>Flag conflicts</p>
            <ChevronRight
              size={16}
              className={`mt-2 ${theme.mutedText} group-hover:translate-x-1 transition-transform`}
            />
          </motion.button>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,340px] gap-6">
          {/* Timetable Section */}
          <motion.div
            className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 lg:p-8`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold">Weekly Schedule</h2>
                <p className={`text-xs ${theme.mutedText} mt-1`}>
                  Semester {student.semester} • Integrated Curriculum
                </p>
              </div>
              <div
                className={`px-3 py-1.5 rounded-lg ${theme.accentBg} border ${theme.accentBorder} text-xs font-medium`}
              >
                30 Credits
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
                        return (
                          <td
                            key={day}
                            rowSpan={sess.len}
                            className={`px-2 py-3 border-b ${theme.tableBorder} align-top`}
                          >
                            <motion.div
                              className={`p-3 rounded-lg border transition-all cursor-pointer ${getSessionColor(
                                sess.category,
                                sess.flags
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
                                        ? "bg-rose-200 text-rose-700"
                                        : "bg-rose-500/30 text-rose-300"
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
                              <p className={`text-xs ${theme.mutedText} mb-2`}>
                                {sess.faculty}
                              </p>
                              <div className="flex items-center gap-1 flex-wrap">
                                <span
                                  className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                                    sess.category === "Education Core"
                                      ? isDark
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-blue-500/20 text-blue-300"
                                      : sess.category === "Subject Major"
                                      ? isDark
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-emerald-500/20 text-emerald-300"
                                      : sess.category === "Subject Minor"
                                      ? isDark
                                        ? "bg-cyan-100 text-cyan-700"
                                        : "bg-cyan-500/20 text-cyan-300"
                                      : sess.category === "Subject Pedagogy"
                                      ? isDark
                                        ? "bg-amber-100 text-amber-700"
                                        : "bg-amber-500/20 text-amber-300"
                                      : isDark
                                      ? "bg-rose-100 text-rose-700"
                                      : "bg-rose-500/20 text-rose-300"
                                  }`}
                                >
                                  {sess.category}
                                </span>
                                {sess.flags?.map((flag, i) => (
                                  <span
                                    key={i}
                                    className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                                      flag === "Field Work"
                                        ? isDark
                                          ? "bg-rose-100 text-rose-700"
                                          : "bg-rose-500/20 text-rose-300"
                                        : isDark
                                        ? "bg-violet-100 text-violet-700"
                                        : "bg-violet-500/20 text-violet-300"
                                    }`}
                                  >
                                    {flag}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Enhanced Legend for ITEP */}
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <span className={`text-xs font-medium ${theme.mutedText}`}>
                  Session Type:
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
                        ? "bg-rose-200 text-rose-700"
                        : "bg-rose-500/30 text-rose-300"
                    }`}
                  >
                    P
                  </span>
                  <span className={`text-xs ${theme.mutedText}`}>
                    Practical/Field
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <span className={`text-xs font-medium ${theme.mutedText}`}>
                  Course Categories:
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded ${
                      isDark ? "bg-blue-400" : "bg-blue-500"
                    }`}
                  ></div>
                  <span className={`text-xs ${theme.mutedText}`}>
                    Education Core
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded ${
                      isDark ? "bg-emerald-400" : "bg-emerald-500"
                    }`}
                  ></div>
                  <span className={`text-xs ${theme.mutedText}`}>
                    Subject Major
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded ${
                      isDark ? "bg-cyan-400" : "bg-cyan-500"
                    }`}
                  ></div>
                  <span className={`text-xs ${theme.mutedText}`}>
                    Subject Minor
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded ${
                      isDark ? "bg-amber-400" : "bg-amber-500"
                    }`}
                  ></div>
                  <span className={`text-xs ${theme.mutedText}`}>
                    Subject Pedagogy
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded ${
                      isDark ? "bg-rose-400" : "bg-rose-500"
                    }`}
                  ></div>
                  <span className={`text-xs ${theme.mutedText}`}>
                    Practicum
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Sidebar */}
          <motion.aside
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Student Profile Card */}
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
                    <p className="text-sm font-semibold">
                      {student.programFull}
                    </p>
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
                    <p className={`text-xs ${theme.mutedText}`}>
                      Current Semester
                    </p>
                    <p className="text-sm font-semibold">
                      Semester {student.semester}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isDark ? "bg-emerald-100" : "bg-emerald-500/20"
                    }`}
                  >
                    <Brain
                      size={14}
                      className={
                        isDark ? "text-emerald-600" : "text-emerald-400"
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${theme.mutedText}`}>
                      Specialization
                    </p>
                    <p className="text-sm font-semibold truncate">
                      {student.stageSpecialization}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dual Major Info Card */}
            <div
              className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6`}
            >
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                <Award
                  size={16}
                  className={isDark ? "text-indigo-600" : "text-indigo-400"}
                />
                Dual-Major Structure
              </h3>
              <div className="space-y-3">
                <div>
                  <p className={`text-xs ${theme.mutedText} mb-1`}>
                    Education Major
                  </p>
                  <div
                    className={`px-3 py-2.5 rounded-lg ${
                      isDark
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-blue-500/10 border border-blue-500/30"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold ${
                        isDark ? "text-blue-700" : "text-blue-300"
                      }`}
                    >
                      {student.educationMajor}
                    </p>
                  </div>
                </div>
                <div>
                  <p className={`text-xs ${theme.mutedText} mb-1`}>
                    Subject Major
                  </p>
                  <div
                    className={`px-3 py-2.5 rounded-lg ${
                      isDark
                        ? "bg-emerald-50 border border-emerald-200"
                        : "bg-emerald-500/10 border border-emerald-500/30"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold ${
                        isDark ? "text-emerald-700" : "text-emerald-300"
                      }`}
                    >
                      {student.subjectMajor}
                    </p>
                  </div>
                </div>
                <div>
                  <p className={`text-xs ${theme.mutedText} mb-1`}>
                    Subject Minor
                  </p>
                  <div
                    className={`px-3 py-2.5 rounded-lg ${
                      isDark
                        ? "bg-cyan-50 border border-cyan-200"
                        : "bg-cyan-500/10 border border-cyan-500/30"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold ${
                        isDark ? "text-cyan-700" : "text-cyan-300"
                      }`}
                    >
                      {student.subjectMinor}
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
                        ? "bg-violet-50 border border-violet-200"
                        : "bg-violet-500/10 border border-violet-500/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p
                      className={`text-xs font-semibold ${
                        isDark ? "text-violet-700" : "text-violet-300"
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

      {/* Modals */}
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
                Download your complete ITEP schedule including practicum hours
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
                <h3 className="font-bold text-lg">Manage Electives</h3>
                <button
                  onClick={() => setShowElective(false)}
                  className={`p-1.5 rounded-lg ${theme.hoverBg} transition-colors`}
                >
                  <X size={18} />
                </button>
              </div>
              <p className={`text-sm ${theme.mutedText} mb-6`}>
                Select education electives that complement your ITEP major and
                minor choices. Avoid scheduling conflicts.
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
                          {e.code} • {e.category} • {e.credits} Credits
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
                Save Elective Selection
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Practicum Modal */}
        {showPracticum && (
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme.modalOverlay} backdrop-blur-md`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPracticum(false)}
          >
            <motion.div
              className={`${theme.modalBg} rounded-2xl p-6 max-w-md w-full shadow-2xl border ${theme.cardBorder}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Practicum Overview</h3>
                <button
                  onClick={() => setShowPracticum(false)}
                  className={`p-1.5 rounded-lg ${theme.hoverBg} transition-colors`}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-xl ${theme.accentBg} border ${theme.accentBorder}`}
                >
                  <p className={`text-xs ${theme.mutedText} mb-2`}>
                    Current Placement
                  </p>
                  <p className="font-semibold mb-1">
                    {student.practicum.currentSchool}
                  </p>
                  <p className={`text-sm ${theme.mutedText}`}>
                    Supervised by {student.practicum.supervisorName}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold">Hours Completed</p>
                    <p className="text-sm font-bold">
                      {student.practicum.hoursCompleted}/
                      {student.practicum.internshipHours}h
                    </p>
                  </div>
                  <div
                    className={`h-3 rounded-full ${
                      isDark ? "bg-gray-200" : "bg-slate-800"
                    }`}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500"
                      style={{ width: `${practicumProgress}%` }}
                    ></div>
                  </div>
                  <p className={`text-xs ${theme.mutedText} mt-2`}>
                    {Math.round(practicumProgress)}% complete
                  </p>
                </div>

                <div
                  className={`p-4 rounded-xl ${
                    isDark
                      ? "bg-rose-50 border border-rose-200"
                      : "bg-rose-500/10 border border-rose-500/30"
                  }`}
                >
                  <p
                    className={`text-xs ${
                      isDark ? "text-rose-600" : "text-rose-400"
                    } mb-1`}
                  >
                    Next Supervision Visit
                  </p>
                  <p
                    className={`font-semibold ${
                      isDark ? "text-rose-700" : "text-rose-300"
                    }`}
                  >
                    {student.practicum.nextVisit}
                  </p>
                </div>

                <button
                  className={`w-full px-4 py-3.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all`}
                >
                  View Practicum Log
                </button>
              </div>
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
                <h3 className="font-bold text-lg">Report Issue</h3>
                <button
                  onClick={() => setShowClash(false)}
                  className={`p-1.5 rounded-lg ${theme.hoverBg} transition-colors`}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-4 mb-6">
                <CustomDropdown
                  label="Issue Type"
                  name="clashType"
                  id="clash-type-select"
                  value={clashType}
                  onChange={(e) => setClashType(e.target.value)}
                  options={[
                    "Timetable overlap",
                    "Practicum scheduling conflict",
                    "Room unavailable",
                    "Faculty absence",
                    "Other",
                  ]}
                  theme={isDark ? "light" : "dark"}
                />

                <div>
                  <label className={`text-sm font-semibold mb-2 block`}>
                    Description
                  </label>
                  <textarea
                    value={clashMessage}
                    onChange={(e) => setClashMessage(e.target.value)}
                    placeholder="Provide details about the scheduling issue or conflict..."
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
