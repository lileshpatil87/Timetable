import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "../components/CustomDropdown";
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
  School,
  ClipboardCheck,
  UserCheck,
  Brain,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Video,
  Eye,
  Star,
} from "lucide-react";

export default function TeacherEducationFacultyDashboard() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [showExport, setShowExport] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [showClash, setShowClash] = useState(false);
  const [showPracticumModal, setShowPracticumModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("PDF");
  const [availabilityBlocks, setAvailabilityBlocks] = useState([]);
  const [availabilityForm, setAvailabilityForm] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });
  const [clashType, setClashType] = useState("Timetable Conflict");

  // Faculty data for ITEP/B.Ed./M.Ed. programs
  const faculty = {
    name: "Dr. Priya Sharma",
    id: "FAC-ED-024",
    email: "priya.sharma@university.edu",
    department: "School of Education",
    role: "Associate Professor - Education",
    program: "ITEP & B.Ed.",

    // NEP 2020 Teaching Load (15-16 hours/week for teacher education)
    targetHours: 16,
    assignedHours: 14,
    daysOnCampus: 5,

    // Dual expertise
    educationSpecialization: "Pedagogy & Curriculum Design",
    subjectSpecialization: "Computer Science",
    stageSpecialization: "Secondary Stage (Classes 9-12)",

    // Practicum supervision
    practicumLoad: {
      studentsSupervised: 8,
      schoolVisitsPending: 3,
      nextVisit: "Oct 12, 2025",
      totalHoursSupervised: 120,
    },

    // Research & mentorship
    researchGuidance: {
      mEdThesis: 2,
      projects: 3,
    },
  };

  // Week grid setup
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = ["09:00", "10:15", "11:30", "12:45", "14:00", "15:15", "16:30"];

  // Faculty sessions - ITEP/B.Ed. specific
  const sessions = {
    Mon: [
      {
        slotIndex: 0,
        len: 1,
        title: "Learning & Teaching",
        type: "L",
        room: "ED-201",
        cohort: "ITEP-Y2",
        code: "ED201",
        category: "Education Core",
        students: 45,
      },
      {
        slotIndex: 2,
        len: 2,
        title: "CS Pedagogy Lab",
        type: "P",
        room: "ED-Lab-2",
        cohort: "ITEP-Y3",
        code: "ED342",
        category: "Subject Pedagogy",
        students: 30,
      },
      {
        slotIndex: 5,
        len: 1,
        title: "Practicum Supervision",
        type: "S",
        room: "DPS School",
        cohort: "ITEP-Y2 (Field)",
        code: "ED331",
        category: "Practicum",
        students: 8,
        isFieldWork: true,
      },
    ],
    Tue: [
      {
        slotIndex: 0,
        len: 1,
        title: "Curriculum Design",
        type: "L",
        room: "ED-105",
        cohort: "B.Ed-S2",
        code: "ED215",
        category: "Education Core",
        students: 40,
      },
      {
        slotIndex: 3,
        len: 2,
        title: "Teaching Practice",
        type: "P",
        room: "Demo School",
        cohort: "B.Ed-S3",
        code: "ED302",
        category: "Practicum",
        students: 25,
        isFieldWork: true,
      },
    ],
    Wed: [
      {
        slotIndex: 1,
        len: 1,
        title: "Assessment of Learning",
        type: "L",
        room: "ED-301",
        cohort: "ITEP-Y3",
        code: "ED344",
        category: "Education Core",
        students: 38,
      },
      {
        slotIndex: 3,
        len: 1,
        title: "Educational Psychology",
        type: "T",
        room: "ED-204",
        cohort: "ITEP-Y2",
        code: "ED225",
        category: "Education Core",
        students: 45,
      },
      {
        slotIndex: 5,
        len: 1,
        title: "M.Ed. Research Seminar",
        type: "S",
        room: "Research Lab",
        cohort: "M.Ed-S3",
        code: "ED501",
        category: "Research",
        students: 12,
      },
    ],
    Thu: [
      {
        slotIndex: 0,
        len: 2,
        title: "School Observation",
        type: "S",
        room: "Kendriya Vidyalaya",
        cohort: "ITEP-Y1 (Field)",
        code: "ED120",
        category: "Practicum",
        students: 15,
        isFieldWork: true,
      },
      {
        slotIndex: 4,
        len: 1,
        title: "Digital Pedagogy",
        type: "L",
        room: "ED-401",
        cohort: "B.Ed-S4",
        code: "ED425",
        category: "Education Elective",
        students: 30,
      },
    ],
    Fri: [
      {
        slotIndex: 1,
        len: 1,
        title: "Mathematics Pedagogy",
        type: "T",
        room: "ED-203",
        cohort: "ITEP-Y3",
        code: "ED345",
        category: "Subject Pedagogy",
        students: 35,
      },
      {
        slotIndex: 3,
        len: 2,
        title: "Practicum Review",
        type: "S",
        room: "ED-Conference",
        cohort: "All Programs",
        code: "ED390",
        category: "Practicum",
        students: 50,
      },
    ],
  };

  // Practicum students under supervision
  const practicumStudents = [
    {
      id: "STU23ITEP015",
      name: "Rahul Verma",
      program: "ITEP-Y2",
      school: "Delhi Public School",
      hoursCompleted: 45,
      totalHours: 120,
      nextVisit: "Oct 12, 2025",
      status: "On Track",
      lastFeedback: "Excellent classroom management",
    },
    {
      id: "STU23BED032",
      name: "Anjali Reddy",
      program: "B.Ed-S3",
      school: "Kendriya Vidyalaya",
      hoursCompleted: 32,
      totalHours: 80,
      nextVisit: "Oct 15, 2025",
      status: "Needs Support",
      lastFeedback: "Struggling with lesson planning",
    },
    {
      id: "STU23ITEP028",
      name: "Vikram Singh",
      program: "ITEP-Y3",
      school: "Sarvodaya School",
      hoursCompleted: 78,
      totalHours: 120,
      nextVisit: "Oct 18, 2025",
      status: "Excellent",
      lastFeedback: "Strong pedagogical skills",
    },
  ];

  function handleLogout() {
    navigate("/login");
  }

  const handleExport = (format) => {
    alert(`Exporting timetable as ${format}...`);
    setShowExport(false);
  };

  const handleAddAvailability = (e) => {
    e.preventDefault();
    if (
      availabilityForm.day &&
      availabilityForm.startTime &&
      availabilityForm.endTime
    ) {
      setAvailabilityBlocks([...availabilityBlocks, availabilityForm]);
      setAvailabilityForm({
        day: "",
        startTime: "",
        endTime: "",
      });
    }
  };

  const handleRemoveAvailability = (index) => {
    setAvailabilityBlocks(availabilityBlocks.filter((_, i) => i !== index));
  };

  const handleReportClash = (details) => {
    alert(`Clash reported: ${details}`);
    setShowClash(false);
  };

  // Session type colors - Enhanced for teacher education
  const getSessionColor = (category, isFieldWork) => {
    if (isFieldWork) {
      return isDark
        ? "bg-rose-50 border-rose-200 hover:border-rose-300"
        : "bg-rose-500/10 border-rose-500/30 hover:border-rose-500/50";
    }
    if (category === "Education Core") {
      return isDark
        ? "bg-blue-50 border-blue-200 hover:border-blue-300"
        : "bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50";
    }
    if (category === "Subject Pedagogy") {
      return isDark
        ? "bg-amber-50 border-amber-200 hover:border-amber-300"
        : "bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50";
    }
    if (category === "Practicum") {
      return isDark
        ? "bg-emerald-50 border-emerald-200 hover:border-emerald-300"
        : "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50";
    }
    if (category === "Research") {
      return isDark
        ? "bg-purple-50 border-purple-200 hover:border-purple-300"
        : "bg-purple-500/10 border-purple-500/30 hover:border-purple-500/50";
    }
    return isDark
      ? "bg-gray-50 border-gray-200 hover:border-gray-300"
      : "bg-gray-500/10 border-gray-500/30 hover:border-gray-500/50";
  };

  const getTypeLabel = (type) => {
    if (type === "L")
      return { text: "L", color: isDark ? "bg-blue-600" : "bg-blue-500" };
    if (type === "P")
      return { text: "P", color: isDark ? "bg-rose-600" : "bg-rose-500" };
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

  const loadPercentage = (faculty.assignedHours / faculty.targetHours) * 100;

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
              <p className={`text-xs ${theme.mutedText}`}>Faculty Dashboard</p>
            </div>
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
                <p className={`text-sm ${theme.mutedText} mb-2`}>
                  {faculty.role} • {faculty.department}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      isDark
                        ? "bg-blue-100 text-blue-700"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {faculty.program}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      isDark
                        ? "bg-purple-100 text-purple-700"
                        : "bg-purple-500/20 text-purple-300"
                    }`}
                  >
                    {faculty.stageSpecialization}
                  </span>
                </div>
                <p className={`text-xs ${theme.mutedText} mt-2`}>
                  {faculty.id} • {faculty.email}
                </p>
              </div>
            </div>
          </div>

          {/* Expertise Tags */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-800">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Brain size={14} className="text-blue-500" />
                <span className="text-xs font-medium">
                  <strong>Education:</strong> {faculty.educationSpecialization}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-emerald-500" />
                <span className="text-xs font-medium">
                  <strong>Subject:</strong> {faculty.subjectSpecialization}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={14} className="text-purple-500" />
                <span className="text-xs font-medium">
                  <strong>Research:</strong>{" "}
                  {faculty.researchGuidance.mEdThesis} M.Ed. Thesis,{" "}
                  {faculty.researchGuidance.projects} Projects
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Cards */}
        

        {/* Quick Actions */}
        <motion.div
          className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
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
            <h3 className="font-semibold mb-1 text-sm">Export Schedule</h3>
            <p className={`text-xs ${theme.mutedText}`}>Download timetable</p>
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
            <h3 className="font-semibold mb-1 text-sm">Availability</h3>
            <p className={`text-xs ${theme.mutedText}`}>Set preferences</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-6">
          {/* Weekly Timetable */}
          <motion.div
            className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 lg:p-8`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold">Weekly Teaching Schedule</h2>
                <p className={`text-xs ${theme.mutedText} mt-1`}>
                  ITEP, B.Ed., M.Ed. & Practicum Supervision
                </p>
              </div>
              <div
                className={`px-3 py-1.5 rounded-lg ${theme.accentBg} border ${theme.accentBorder} text-xs font-medium`}
              >
                {faculty.assignedHours}h/week
              </div>
            </div>

            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full border-collapse min-w-[900px]">
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
                                session.category,
                                session.isFieldWork
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
                                  {session.cohort} ({session.students})
                                </p>
                              </div>
                              <div className="flex items-center gap-1 flex-wrap mt-2">
                                <span
                                  className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                                    session.category === "Education Core"
                                      ? isDark
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-blue-500/20 text-blue-300"
                                      : session.category === "Subject Pedagogy"
                                      ? isDark
                                        ? "bg-amber-100 text-amber-700"
                                        : "bg-amber-500/20 text-amber-300"
                                      : session.category === "Practicum"
                                      ? isDark
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-emerald-500/20 text-emerald-300"
                                      : session.category === "Research"
                                      ? isDark
                                        ? "bg-purple-100 text-purple-700"
                                        : "bg-purple-500/20 text-purple-300"
                                      : isDark
                                      ? "bg-gray-100 text-gray-700"
                                      : "bg-gray-500/20 text-gray-300"
                                  }`}
                                >
                                  {session.category}
                                </span>
                                {session.isFieldWork && (
                                  <span
                                    className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                                      isDark
                                        ? "bg-rose-100 text-rose-700"
                                        : "bg-rose-500/20 text-rose-300"
                                    }`}
                                  >
                                    Field Work
                                  </span>
                                )}
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

            {/* Enhanced Legend */}
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <span className={`text-xs font-medium ${theme.mutedText}`}>
                  Session Type:
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
                      isDark ? "bg-rose-600" : "bg-rose-500"
                    }`}
                  >
                    P
                  </span>
                  <span className={`text-xs ${theme.mutedText}`}>
                    Practical/Field
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold text-white ${
                      isDark ? "bg-purple-600" : "bg-purple-500"
                    }`}
                  >
                    S
                  </span>
                  <span className={`text-xs ${theme.mutedText}`}>
                    Seminar/Supervision
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <span className={`text-xs font-medium ${theme.mutedText}`}>
                  Categories:
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
                      isDark ? "bg-emerald-400" : "bg-emerald-500"
                    }`}
                  ></div>
                  <span className={`text-xs ${theme.mutedText}`}>
                    Practicum
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded ${
                      isDark ? "bg-purple-400" : "bg-purple-500"
                    }`}
                  ></div>
                  <span className={`text-xs ${theme.mutedText}`}>Research</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded ${
                      isDark ? "bg-rose-400" : "bg-rose-500"
                    }`}
                  ></div>
                  <span className={`text-xs ${theme.mutedText}`}>
                    Field Work
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Modals remain the same as previous implementation */}
      <AnimatePresence>
        {/* Export Modal */}
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
                Download your teaching schedule and practicum supervision
                calendar
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

        {/* Practicum Modal */}
        {showPracticumModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 ${theme.modalOverlay} backdrop-blur-md flex items-center justify-center z-50 p-4`}
            onClick={() => setShowPracticumModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`${theme.modalBg} rounded-2xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl border ${theme.cardBorder}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Practicum Supervision</h3>
                <button
                  onClick={() => setShowPracticumModal(false)}
                  className={`p-1.5 rounded-lg ${theme.hoverBg} transition-colors`}
                >
                  <X size={18} />
                </button>
              </div>
              <p className={`text-sm ${theme.mutedText} mb-6`}>
                Manage student-teacher practicum placements and supervision
                schedules
              </p>
              <div className="space-y-3">
                {practicumStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-4 rounded-xl border ${theme.cardBorder} ${theme.accentBg}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className={`text-sm ${theme.mutedText}`}>
                          {student.id} • {student.program}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          student.status === "Excellent"
                            ? isDark
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-emerald-500/20 text-emerald-300"
                            : student.status === "On Track"
                            ? isDark
                              ? "bg-blue-100 text-blue-700"
                              : "bg-blue-500/20 text-blue-300"
                            : isDark
                            ? "bg-amber-100 text-amber-700"
                            : "bg-amber-500/20 text-amber-300"
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className={`text-xs ${theme.mutedText} mb-1`}>
                          Placement School
                        </p>
                        <p className="text-sm font-medium">{student.school}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${theme.mutedText} mb-1`}>
                          Next Visit
                        </p>
                        <p className="text-sm font-medium">
                          {student.nextVisit}
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className={theme.mutedText}>Hours Progress</span>
                        <span className="font-medium">
                          {student.hoursCompleted}/{student.totalHours}h (
                          {Math.round(
                            (student.hoursCompleted / student.totalHours) * 100
                          )}
                          %)
                        </span>
                      </div>
                      <div
                        className={`h-2 rounded-full ${
                          isDark ? "bg-gray-200" : "bg-slate-800"
                        }`}
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500"
                          style={{
                            width: `${
                              (student.hoursCompleted / student.totalHours) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className={`p-2 rounded-lg ${
                        isDark
                          ? "bg-blue-50 border border-blue-200"
                          : "bg-blue-500/10 border border-blue-500/30"
                      }`}
                    >
                      <p className={`text-xs ${theme.mutedText} mb-1`}>
                        Latest Feedback
                      </p>
                      <p className="text-xs font-medium">
                        {student.lastFeedback}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        className={`flex-1 px-3 py-2 rounded-lg border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} text-xs font-medium hover:scale-[1.02] transition-all flex items-center justify-center gap-2`}
                      >
                        <Eye size={14} />
                        View Log
                      </button>
                      <button
                        className={`flex-1 px-3 py-2 rounded-lg border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} text-xs font-medium hover:scale-[1.02] transition-all flex items-center justify-center gap-2`}
                      >
                        <MessageSquare size={14} />
                        Feedback
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Availability Modal - Same as before */}
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
                Mark preferred time slots for teaching and practicum supervision
              </p>

              <form onSubmit={handleAddAvailability} className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <CustomDropdown
                    label="Day"
                    name="day"
                    id="availability-day"
                    value={availabilityForm.day}
                    onChange={(e) =>
                      setAvailabilityForm({
                        ...availabilityForm,
                        day: e.target.value,
                      })
                    }
                    options={["", ...weekDays]}
                    theme={isDark ? "light" : "dark"}
                    placeholder="Select day"
                  />

                  <CustomDropdown
                    label="Start Time"
                    name="startTime"
                    id="availability-start"
                    value={availabilityForm.startTime}
                    onChange={(e) =>
                      setAvailabilityForm({
                        ...availabilityForm,
                        startTime: e.target.value,
                      })
                    }
                    options={["", ...slots]}
                    theme={isDark ? "light" : "dark"}
                    placeholder="Select time"
                  />

                  <CustomDropdown
                    label="End Time"
                    name="endTime"
                    id="availability-end"
                    value={availabilityForm.endTime}
                    onChange={(e) =>
                      setAvailabilityForm({
                        ...availabilityForm,
                        endTime: e.target.value,
                      })
                    }
                    options={["", ...slots]}
                    theme={isDark ? "light" : "dark"}
                    placeholder="Select time"
                  />
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

        {/* Report Clash Modal */}
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
                <h3 className="font-bold text-lg">Report Issue</h3>
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
                  <CustomDropdown
                    label="Issue Type"
                    name="type"
                    id="clash-type"
                    value={clashType}
                    onChange={(e) => setClashType(e.target.value)}
                    options={[
                      "Timetable Conflict",
                      "Practicum Scheduling",
                      "Room Unavailable",
                      "Student Group Clash",
                      "Other",
                    ]}
                    theme={isDark ? "light" : "dark"}
                  />
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Course/Session
                    </label>
                    <input
                      type="text"
                      name="course"
                      placeholder="e.g., ED201 - Mon 09:00"
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
                      placeholder="Describe the scheduling issue or conflict..."
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
