import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  BookOpen,
  CalendarDays,
  GraduationCap,
  BarChart3,
  AlertTriangle,
  Building2,
  AlertCircle,
  Settings,
  TrendingUp,
  CheckCircle,
  XCircle,
  Plus,
  ChevronRight,
  Sparkles,
  School,
  Brain,
  ClipboardCheck,
  Target,
  UserCheck,
  Briefcase,
  Award,
  FileText,
  Clock,
  MapPin,
  Trash2,
  X,
} from "lucide-react";
import Modal from "../components/Modal";
import CustomDropdown from "../components/CustomDropdown";

export default function TeacherEducationHODDashboard() {
  // Get theme and isDark from parent layout via Outlet context
  const outletContext = useOutletContext();
  const { theme: contextTheme, isDark: contextIsDark } = outletContext || {};

  // Use context values or fallback to defaults
  const [localIsDark] = useState(true);
  const isDark = contextIsDark !== undefined ? contextIsDark : localIsDark;

  // Create default theme if not provided
  const defaultTheme = {
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
    inputBg: isDark ? "bg-white" : "bg-slate-800/50",
    inputBorder: isDark ? "border-gray-300" : "border-slate-700",
    inputText: isDark ? "text-gray-900" : "text-slate-100",
    modalBg: isDark ? "bg-white" : "bg-slate-900",
    modalOverlay: isDark ? "bg-gray-900/40" : "bg-slate-950/70",
  };

  const theme = contextTheme || defaultTheme;

  // Department context for ITEP/B.Ed./M.Ed.
  const dept = {
    name: "School of Education",
    term: "AY 2025-26, Semester 3",
    programs: ["ITEP (4-Year)", "B.Ed. (2-Year)", "M.Ed. (2-Year)"],
    specializations: [
      "Pre-Primary (Foundational)",
      "Primary Stage (Classes 1-5)",
      "Middle Stage (Classes 6-8)",
      "Secondary Stage (Classes 9-12)",
    ],
  };

  // KPIs specific to teacher education
  const kpis = [
    {
      label: "Faculty Teaching Load",
      value: "±1.8 hrs",
      help: "vs 16hrs/week target",
      icon: <Users size={18} />,
      color: "indigo",
      trend: "+0.3",
      target: "15-16 hrs/week",
    },
    {
      label: "Practicum Supervision",
      value: "96%",
      help: "Students with supervisors",
      icon: <School size={18} />,
      color: "emerald",
      trend: "+4%",
      target: "100%",
    },
    {
      label: "Field Work Coverage",
      value: "125 hrs",
      help: "Across all programs",
      icon: <ClipboardCheck size={18} />,
      color: "rose",
      trend: "+15",
      target: "120+ hrs/sem",
    },
    {
      label: "Dual-Major Balance",
      value: "Good",
      help: "Education + Subject hours",
      icon: <Brain size={18} />,
      color: "purple",
      trend: "stable",
      target: "50:50 split",
    },
    {
      label: "Pedagogy Labs",
      value: "18/20",
      help: "Scheduled sessions",
      icon: <Award size={18} />,
      color: "amber",
      trend: "-2",
      target: "20 sessions",
    },
    {
      label: "M.Ed. Research",
      value: "24 students",
      help: "Thesis supervision",
      icon: <FileText size={18} />,
      color: "cyan",
      trend: "+6",
      target: "20-25",
    },
  ];

  // Modal states
  const [showProfile, setShowProfile] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showGenerate, setShowGenerate] = useState(false);
  const [showPracticum, setShowPracticum] = useState(false);
  const [showSupervision, setShowSupervision] = useState(false);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [showFieldWork, setShowFieldWork] = useState(false);
  const [showStageSpecialization, setShowStageSpecialization] = useState(false);

  // Profile management
  const [profile, setProfile] = useState({
    displayName: "School of Education",
    contact: "hod.education@university.edu",
    hodName: "Dr. Rajesh Kumar",
    establishedYear: "1965",
    accreditation: "NCTE Approved",
  });

  function saveProfile() {
    alert("Department profile updated successfully.");
    setShowProfile(false);
  }

  // Course management for teacher education
  const [courses, setCourses] = useState([
    {
      code: "ED201",
      name: "Learning & Teaching",
      type: "Education Core",
      ltp: "4-0-0",
      programs: ["ITEP-Y2", "B.Ed-S1"],
      credits: 4,
    },
    {
      code: "ED342",
      name: "Computer Science Pedagogy",
      type: "Subject Pedagogy",
      ltp: "2-0-2",
      programs: ["ITEP-Y3"],
      credits: 4,
    },
    {
      code: "ED331",
      name: "School Internship I",
      type: "Practicum",
      ltp: "0-0-4",
      programs: ["ITEP-Y2", "B.Ed-S2"],
      credits: 2,
    },
    {
      code: "ED215",
      name: "Educational Psychology",
      type: "Education Elective",
      ltp: "4-0-0",
      programs: ["ITEP-Y2", "B.Ed-S1"],
      credits: 4,
    },
    {
      code: "ED501",
      name: "Research Methodology",
      type: "M.Ed. Core",
      ltp: "4-0-0",
      programs: ["M.Ed-S1"],
      credits: 4,
    },
  ]);

  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    type: "Education Core",
    ltp: "4-0-0",
    programs: [],
    credits: 4,
  });

  function addCourse() {
    if (!newCourse.code || !newCourse.name) {
      alert("Provide course code and name");
      return;
    }
    setCourses((c) => [...c, { ...newCourse }]);
    setNewCourse({
      code: "",
      name: "",
      type: "Education Core",
      ltp: "4-0-0",
      programs: [],
      credits: 4,
    });
  }

  function removeCourse(code) {
    setCourses((c) => c.filter((x) => x.code !== code));
  }

  function saveCourses() {
    alert("Course catalog updated successfully.");
    setShowCourses(false);
  }

  // Practicum management
  const [practicumBlocks, setPracticumBlocks] = useState([
    {
      program: "ITEP-Y2",
      cohort: "ITEP-Y2-A",
      school: "Delhi Public School",
      supervisor: "Dr. Priya Sharma",
      day: "Mon",
      startTime: "14:00",
      endTime: "17:00",
      students: 15,
      type: "School Observation",
    },
    {
      program: "B.Ed-S3",
      cohort: "B.Ed-S3-B",
      school: "Kendriya Vidyalaya",
      supervisor: "Prof. Anita Desai",
      day: "Wed",
      startTime: "09:00",
      endTime: "12:00",
      students: 20,
      type: "Teaching Practice",
    },
    {
      program: "ITEP-Y3",
      cohort: "ITEP-Y3-A",
      school: "Sarvodaya School",
      supervisor: "Dr. Vikram Singh",
      day: "Fri",
      startTime: "10:00",
      endTime: "15:00",
      students: 12,
      type: "Extended Internship",
    },
  ]);

  const [newPracticumBlock, setNewPracticumBlock] = useState({
    program: "ITEP-Y2",
    cohort: "",
    school: "",
    supervisor: "",
    day: "Mon",
    startTime: "09:00",
    endTime: "12:00",
    students: 0,
    type: "School Observation",
  });

  function addPracticumBlock() {
    if (!newPracticumBlock.cohort || !newPracticumBlock.school) {
      alert("Complete all required fields");
      return;
    }
    setPracticumBlocks((b) => [...b, { ...newPracticumBlock }]);
    setNewPracticumBlock({
      program: "ITEP-Y2",
      cohort: "",
      school: "",
      supervisor: "",
      day: "Mon",
      startTime: "09:00",
      endTime: "12:00",
      students: 0,
      type: "School Observation",
    });
  }

  function removePracticumBlock(idx) {
    setPracticumBlocks((b) => b.filter((_, i) => i !== idx));
  }

  function savePracticum() {
    alert("Practicum schedule updated successfully.");
    setShowPracticum(false);
  }

  // Supervision assignments
  const [supervisionAssignments, setSupervisionAssignments] = useState([
    {
      faculty: "Dr. Priya Sharma",
      students: 8,
      schools: ["DPS", "KV-1"],
      hoursAllocated: 16,
      specialization: "CS Pedagogy",
    },
    {
      faculty: "Prof. Anita Desai",
      students: 10,
      schools: ["Sarvodaya", "Mother Mary"],
      hoursAllocated: 20,
      specialization: "Language Education",
    },
    {
      faculty: "Dr. Vikram Singh",
      students: 6,
      schools: ["KV-2", "Air Force School"],
      hoursAllocated: 12,
      specialization: "Mathematics Pedagogy",
    },
  ]);

  // Enrollment statistics for teacher education
  const enrollStats = [
    {
      code: "ED201",
      name: "Learning & Teaching",
      type: "Education Core",
      cap: 50,
      enrolled: 48,
      programs: "ITEP-Y2, B.Ed-S1",
    },
    {
      code: "ED342",
      name: "CS Pedagogy",
      type: "Subject Pedagogy",
      cap: 30,
      enrolled: 28,
      programs: "ITEP-Y3",
    },
    {
      code: "ED331",
      name: "School Internship I",
      type: "Practicum",
      cap: 40,
      enrolled: 40,
      programs: "ITEP-Y2, B.Ed-S2",
    },
    {
      code: "ED215",
      name: "Educational Psychology",
      type: "Elective",
      cap: 40,
      enrolled: 42,
      programs: "ITEP-Y2, B.Ed-S1",
    },
  ];

  // Timetable generation scenario
  const [scenario, setScenario] = useState({
    programs: ["ITEP", "B.Ed.", "M.Ed."],
    semester: "Semester 3",
    priorityMode: "Practicum-First",
    educationSubjectRatio: "50:50",
    timeBudget: 240,
  });

  function runScenario() {
    alert(
      "Timetable generation initiated. You will be notified when complete."
    );
    setShowGenerate(false);
  }

  // Field work scheduling
  const [fieldWorkSchedule, setFieldWorkSchedule] = useState([
    {
      week: "Week 8-12",
      program: "ITEP-Y2",
      activity: "Classroom Observation",
      hours: 20,
      schools: 5,
    },
    {
      week: "Week 10-14",
      program: "B.Ed-S3",
      activity: "Teaching Practice",
      hours: 40,
      schools: 8,
    },
    {
      week: "Ongoing",
      program: "ITEP-Y3",
      activity: "Extended Internship",
      hours: 60,
      schools: 6,
    },
  ]);

  // Stage specialization management
  const [stageAllocations, setStageAllocations] = useState([
    {
      stage: "Pre-Primary (Foundational)",
      faculty: 4,
      students: 25,
      courses: 6,
    },
    {
      stage: "Primary Stage (Classes 1-5)",
      faculty: 6,
      students: 40,
      courses: 8,
    },
    {
      stage: "Middle Stage (Classes 6-8)",
      faculty: 5,
      students: 35,
      courses: 7,
    },
    {
      stage: "Secondary Stage (Classes 9-12)",
      faculty: 8,
      students: 60,
      courses: 12,
    },
  ]);

  const getKPIColor = (color) => {
    const colors = {
      indigo: isDark
        ? "bg-indigo-100 text-indigo-700"
        : "bg-indigo-500/20 text-indigo-300",
      emerald: isDark
        ? "bg-emerald-100 text-emerald-700"
        : "bg-emerald-500/20 text-emerald-300",
      amber: isDark
        ? "bg-amber-100 text-amber-700"
        : "bg-amber-500/20 text-amber-300",
      rose: isDark
        ? "bg-rose-100 text-rose-700"
        : "bg-rose-500/20 text-rose-300",
      purple: isDark
        ? "bg-purple-100 text-purple-700"
        : "bg-purple-500/20 text-purple-300",
      cyan: isDark
        ? "bg-cyan-100 text-cyan-700"
        : "bg-cyan-500/20 text-cyan-300",
    };
    return colors[color] || colors.indigo;
  };

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const timeSlots = [
    "09:00",
    "10:15",
    "11:30",
    "12:45",
    "14:00",
    "15:15",
    "16:30",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px,1fr] gap-8">
      {/* Sidebar */}
      <aside className="self-start space-y-6">
        {/* Department Info */}
        <motion.div
          className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-3 mb-6">
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${theme.gradient}`}
            >
              <School size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-1">{dept.name}</h1>
              <p className={`text-sm ${theme.mutedText} mb-2`}>{dept.term}</p>
              <span
                className={`text-xs px-2 py-1 rounded-md ${
                  isDark
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                NCTE Approved
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3
                className={`text-xs font-semibold uppercase tracking-wider mb-3 ${theme.mutedText}`}
              >
                Programs Offered
              </h3>
              <div className="space-y-2">
                {dept.programs.map((p) => (
                  <div
                    key={p}
                    className={`text-xs px-3 py-2 rounded-lg font-medium border ${
                      isDark
                        ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                        : "bg-indigo-50 text-indigo-700 border-indigo-200"
                    }`}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3
                className={`text-xs font-semibold uppercase tracking-wider mb-3 ${theme.mutedText}`}
              >
                Stage Specializations
              </h3>
              <div className="space-y-1">
                {dept.specializations.map((s, i) => (
                  <div
                    key={i}
                    className={`text-xs px-3 py-1.5 rounded-lg ${theme.accentBg} border ${theme.accentBorder}`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3
            className={`text-xs font-semibold uppercase tracking-wider px-2 ${theme.mutedText}`}
          >
            Key Performance Indicators
          </h3>
          {kpis.map((k, i) => (
            <motion.div
              key={i}
              className={`rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-4 hover:shadow-md transition-all duration-200`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getKPIColor(k.color)}`}>
                  {k.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium mb-0.5">{k.label}</p>
                  <p className={`text-xs ${theme.mutedText} mb-1`}>{k.help}</p>
                  <p className={`text-xs ${theme.mutedText}`}>
                    Target: {k.target}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{k.value}</p>
                  {k.trend && (
                    <p
                      className={`text-xs ${
                        k.trend.startsWith("+")
                          ? "text-emerald-500"
                          : k.trend.startsWith("-")
                          ? "text-rose-500"
                          : theme.mutedText
                      }`}
                    >
                      {k.trend}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </aside>

      {/* Content */}
      <section className="space-y-6">
        {/* Welcome Message */}
        {/* <motion.div
          className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
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
              <h2 className="text-lg font-bold mb-2">
                Welcome to Teacher Education Management
              </h2>
              <p className={`text-sm ${theme.mutedText} leading-relaxed`}>
                Manage ITEP, B.Ed., and M.Ed. programs with integrated
                curriculum planning, practicum supervision, stage-based
                specializations, and dual-major coordination as per NEP 2020
                guidelines.
              </p>
            </div>
          </div>
        </motion.div> */}

        {/* Core Actions */}
        {/* <motion.div
          className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-base font-bold mb-5 flex items-center gap-2">
            <CalendarDays
              size={18}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            Management Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ActionCard
              icon={<School size={20} />}
              title="Department Profile"
              description="Update school information"
              onClick={() => setShowProfile(true)}
              theme={theme}
              isDark={isDark}
            />
            <ActionCard
              icon={<BookOpen size={20} />}
              title="Course Catalog"
              description="Education & pedagogy courses"
              onClick={() => setShowCourses(true)}
              theme={theme}
              isDark={isDark}
            />
            <ActionCard
              icon={<Calendar size={20} />}
              title="Generate Timetables"
              description="ITEP/B.Ed./M.Ed. schedules"
              onClick={() => setShowGenerate(true)}
              primary
              theme={theme}
              isDark={isDark}
            />
            <ActionCard
              icon={<Briefcase size={20} />}
              title="Practicum Management"
              description="Field work scheduling"
              onClick={() => setShowPracticum(true)}
              theme={theme}
              isDark={isDark}
            />
            <ActionCard
              icon={<UserCheck size={20} />}
              title="Supervision Assignments"
              description="Faculty-student allocation"
              onClick={() => setShowSupervision(true)}
              theme={theme}
              isDark={isDark}
            />
            <ActionCard
              icon={<Target size={20} />}
              title="Stage Specializations"
              description="5+3+3+4 structure alignment"
              onClick={() => setShowStageSpecialization(true)}
              theme={theme}
              isDark={isDark}
            />
            <ActionCard
              icon={<ClipboardCheck size={20} />}
              title="Field Work Schedule"
              description="School engagement calendar"
              onClick={() => setShowFieldWork(true)}
              theme={theme}
              isDark={isDark}
            />
            <ActionCard
              icon={<BarChart3 size={20} />}
              title="Enrollment Analytics"
              description="Program-wise capacity"
              onClick={() => setShowEnrollment(true)}
              theme={theme}
              isDark={isDark}
            />
            <ActionCard
              icon={<Brain size={20} />}
              title="Dual-Major Tracking"
              description="Education + Subject balance"
              onClick={() => alert("Dual-major balance viewer coming soon")}
              theme={theme}
              isDark={isDark}
            />
          </div>
        </motion.div> */}

        {/* Recent Activity */}
        <motion.div
          className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-base font-bold mb-4 flex items-center gap-2">
            <TrendingUp
              size={18}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {[
              {
                action: "Practicum schedule updated",
                details: "ITEP-Y2 - 15 students assigned",
                time: "1 hour ago",
                status: "success",
              },
              {
                action: "Course added",
                details: "ED342 - CS Pedagogy Lab",
                time: "3 hours ago",
                status: "success",
              },
              {
                action: "Supervision approval pending",
                details: "Dr. Sharma - 8 students",
                time: "5 hours ago",
                status: "pending",
              },
              {
                action: "Field work scheduled",
                details: "B.Ed-S3 - KV-1 School",
                time: "1 day ago",
                status: "success",
              },
              {
                action: "Stage specialization updated",
                details: "Secondary Stage - 12 courses",
                time: "2 days ago",
                status: "success",
              },
            ].map((activity, i) => (
              <motion.div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg ${theme.accentBg} border ${theme.accentBorder}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
              >
                <div
                  className={`p-2 rounded-lg ${
                    activity.status === "success"
                      ? isDark
                        ? "bg-emerald-100"
                        : "bg-emerald-500/20"
                      : isDark
                      ? "bg-amber-100"
                      : "bg-amber-500/20"
                  }`}
                >
                  {activity.status === "success" ? (
                    <CheckCircle
                      size={16}
                      className={
                        isDark ? "text-emerald-600" : "text-emerald-400"
                      }
                    />
                  ) : (
                    <AlertCircle
                      size={16}
                      className={isDark ? "text-amber-600" : "text-amber-400"}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className={`text-xs ${theme.mutedText}`}>
                    {activity.details}
                  </p>
                </div>
                <span className={`text-xs ${theme.mutedText} shrink-0`}>
                  {activity.time}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Program Statistics */}
        <motion.div
          className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-base font-bold mb-4 flex items-center gap-2">
            <Award
              size={18}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            Program Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`p-4 rounded-xl ${theme.accentBg} border ${theme.accentBorder}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`p-2 rounded-lg ${
                    isDark ? "bg-indigo-100" : "bg-indigo-500/20"
                  }`}
                >
                  <GraduationCap
                    size={18}
                    className={isDark ? "text-indigo-600" : "text-indigo-400"}
                  />
                </div>
                <div>
                  <p className={`text-xs ${theme.mutedText}`}>ITEP (4-Year)</p>
                  <p className="text-xl font-bold">125</p>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className={theme.mutedText}>Year 1</span>
                  <span className="font-medium">35</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.mutedText}>Year 2</span>
                  <span className="font-medium">32</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.mutedText}>Year 3</span>
                  <span className="font-medium">30</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.mutedText}>Year 4</span>
                  <span className="font-medium">28</span>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl ${theme.accentBg} border ${theme.accentBorder}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`p-2 rounded-lg ${
                    isDark ? "bg-emerald-100" : "bg-emerald-500/20"
                  }`}
                >
                  <BookOpen
                    size={18}
                    className={isDark ? "text-emerald-600" : "text-emerald-400"}
                  />
                </div>
                <div>
                  <p className={`text-xs ${theme.mutedText}`}>B.Ed. (2-Year)</p>
                  <p className="text-xl font-bold">80</p>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className={theme.mutedText}>Semester 1</span>
                  <span className="font-medium">22</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.mutedText}>Semester 2</span>
                  <span className="font-medium">20</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.mutedText}>Semester 3</span>
                  <span className="font-medium">20</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.mutedText}>Semester 4</span>
                  <span className="font-medium">18</span>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl ${theme.accentBg} border ${theme.accentBorder}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`p-2 rounded-lg ${
                    isDark ? "bg-purple-100" : "bg-purple-500/20"
                  }`}
                >
                  <FileText
                    size={18}
                    className={isDark ? "text-purple-600" : "text-purple-400"}
                  />
                </div>
                <div>
                  <p className={`text-xs ${theme.mutedText}`}>M.Ed. (2-Year)</p>
                  <p className="text-xl font-bold">24</p>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className={theme.mutedText}>Semester 1</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.mutedText}>Semester 2</span>
                  <span className="font-medium">6</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.mutedText}>Semester 3</span>
                  <span className="font-medium">6</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.mutedText}>Semester 4</span>
                  <span className="font-medium">4</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {/* Department Profile Modal */}
        {showProfile && (
          <Modal
            title="School of Education Profile"
            onClose={() => setShowProfile(false)}
            theme={theme}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Department Name
                </label>
                <input
                  value={profile.displayName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, displayName: e.target.value }))
                  }
                  className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  HOD Name
                </label>
                <input
                  value={profile.hodName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, hodName: e.target.value }))
                  }
                  className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Contact Email
                </label>
                <input
                  value={profile.contact}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, contact: e.target.value }))
                  }
                  className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Established Year
                  </label>
                  <input
                    value={profile.establishedYear}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        establishedYear: e.target.value,
                      }))
                    }
                    className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Accreditation
                  </label>
                  <input
                    value={profile.accreditation}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        accreditation: e.target.value,
                      }))
                    }
                    className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  onClick={() => setShowProfile(false)}
                  className={`px-5 py-2.5 rounded-xl border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} text-sm font-medium transition-all`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={saveProfile}
                  className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg transition-all`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Changes
                </motion.button>
              </div>
            </div>
          </Modal>
        )}

        {/* Course Catalog Modal */}
        {showCourses && (
          <Modal
            title="Teacher Education Course Catalog"
            onClose={() => setShowCourses(false)}
            theme={theme}
            size="large"
          >
            <div className="space-y-6">
              {/* Add New Course */}
              <div
                className={`p-4 rounded-xl ${theme.accentBg} border ${theme.accentBorder}`}
              >
                <h3 className="text-sm font-bold mb-4">Add New Course</h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    placeholder="Course Code (e.g., ED401)"
                    value={newCourse.code}
                    onChange={(e) =>
                      setNewCourse((c) => ({ ...c, code: e.target.value }))
                    }
                    className={`px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  <input
                    placeholder="Course Name"
                    value={newCourse.name}
                    onChange={(e) =>
                      setNewCourse((c) => ({ ...c, name: e.target.value }))
                    }
                    className={`px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <select
                    value={newCourse.type}
                    onChange={(e) =>
                      setNewCourse((c) => ({ ...c, type: e.target.value }))
                    }
                    className={`px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  >
                    <option>Education Core</option>
                    <option>Subject Pedagogy</option>
                    <option>Practicum</option>
                    <option>Education Elective</option>
                    <option>M.Ed. Core</option>
                  </select>
                  <input
                    placeholder="L-T-P (e.g., 4-0-0)"
                    value={newCourse.ltp}
                    onChange={(e) =>
                      setNewCourse((c) => ({ ...c, ltp: e.target.value }))
                    }
                    className={`px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  <input
                    type="number"
                    placeholder="Credits"
                    value={newCourse.credits}
                    onChange={(e) =>
                      setNewCourse((c) => ({
                        ...c,
                        credits: parseInt(e.target.value),
                      }))
                    }
                    className={`px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                </div>
                <motion.button
                  onClick={addCourse}
                  className={`w-full px-4 py-2.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold flex items-center justify-center gap-2`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={16} />
                  Add Course
                </motion.button>
              </div>

              {/* Course List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {courses.map((course, i) => (
                  <motion.div
                    key={i}
                    className={`flex items-center justify-between p-4 rounded-xl border ${theme.cardBorder} ${theme.accentBg}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold">{course.code}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            course.type === "Education Core"
                              ? isDark
                                ? "bg-blue-100 text-blue-700"
                                : "bg-blue-500/20 text-blue-300"
                              : course.type === "Subject Pedagogy"
                              ? isDark
                                ? "bg-amber-100 text-amber-700"
                                : "bg-amber-500/20 text-amber-300"
                              : course.type === "Practicum"
                              ? isDark
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-emerald-500/20 text-emerald-300"
                              : course.type === "M.Ed. Core"
                              ? isDark
                                ? "bg-purple-100 text-purple-700"
                                : "bg-purple-500/20 text-purple-300"
                              : isDark
                              ? "bg-gray-100 text-gray-700"
                              : "bg-gray-500/20 text-gray-300"
                          }`}
                        >
                          {course.type}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-1">{course.name}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className={theme.mutedText}>
                          L-T-P: {course.ltp}
                        </span>
                        <span className={theme.mutedText}>
                          Credits: {course.credits}
                        </span>
                        {course.programs && (
                          <span className={theme.mutedText}>
                            Programs: {course.programs.join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                    <motion.button
                      onClick={() => removeCourse(course.code)}
                      className={`p-2 rounded-lg ${theme.hoverBg} text-rose-600`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-slate-800">
                <motion.button
                  onClick={() => setShowCourses(false)}
                  className={`px-5 py-2.5 rounded-xl border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} text-sm font-medium`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={saveCourses}
                  className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Catalog
                </motion.button>
              </div>
            </div>
          </Modal>
        )}

        {/* Timetable Generation Modal */}
        {showGenerate && (
          <Modal
            title="Generate Teacher Education Timetables"
            onClose={() => setShowGenerate(false)}
            theme={theme}
          >
            <div className="space-y-4">
              <div
                className={`p-4 rounded-xl ${
                  isDark
                    ? "bg-blue-50 border border-blue-200"
                    : "bg-blue-500/10 border border-blue-500/30"
                }`}
              >
                <p className="text-sm font-medium mb-2">Generation Mode</p>
                <p className={`text-xs ${theme.mutedText}`}>
                  This will create integrated schedules for ITEP, B.Ed., and
                  M.Ed. programs, ensuring practicum blocks, dual-major balance,
                  and stage-specific requirements are met.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Programs to Include
                </label>
                <div className="space-y-2">
                  {["ITEP", "B.Ed.", "M.Ed."].map((prog) => (
                    <label key={prog} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={scenario.programs.includes(prog)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setScenario((s) => ({
                              ...s,
                              programs: [...s.programs, prog],
                            }));
                          } else {
                            setScenario((s) => ({
                              ...s,
                              programs: s.programs.filter((p) => p !== prog),
                            }));
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{prog}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Semester
                </label>
                <select
                  value={scenario.semester}
                  onChange={(e) =>
                    setScenario((s) => ({ ...s, semester: e.target.value }))
                  }
                  className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  <option>Semester 1</option>
                  <option>Semester 2</option>
                  <option>Semester 3</option>
                  <option>Semester 4</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Priority Mode
                </label>
                <select
                  value={scenario.priorityMode}
                  onChange={(e) =>
                    setScenario((s) => ({ ...s, priorityMode: e.target.value }))
                  }
                  className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  <option>Practicum-First</option>
                  <option>Education-Core-First</option>
                  <option>Balanced</option>
                  <option>Faculty-Optimized</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Education:Subject Ratio (ITEP)
                </label>
                <select
                  value={scenario.educationSubjectRatio}
                  onChange={(e) =>
                    setScenario((s) => ({
                      ...s,
                      educationSubjectRatio: e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  <option>50:50</option>
                  <option>60:40</option>
                  <option>40:60</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Time Budget (seconds)
                </label>
                <input
                  type="number"
                  value={scenario.timeBudget}
                  onChange={(e) =>
                    setScenario((s) => ({
                      ...s,
                      timeBudget: parseInt(e.target.value),
                    }))
                  }
                  className={`w-full px-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  onClick={() => setShowGenerate(false)}
                  className={`px-5 py-2.5 rounded-xl border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} text-sm font-medium`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={runScenario}
                  className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Generate Timetables
                </motion.button>
              </div>
            </div>
          </Modal>
        )}

        {/* Practicum Management Modal */}
        {showPracticum && (
          <Modal
            title="Practicum & Field Work Management"
            onClose={() => setShowPracticum(false)}
            theme={theme}
            size="large"
          >
            <div className="space-y-6">
              {/* Add New Practicum Block */}
              <div
                className={`p-4 rounded-xl ${theme.accentBg} border ${theme.accentBorder}`}
              >
                <h3 className="text-sm font-bold mb-4">
                  Schedule New Practicum Block
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <select
                    value={newPracticumBlock.program}
                    onChange={(e) =>
                      setNewPracticumBlock((b) => ({
                        ...b,
                        program: e.target.value,
                      }))
                    }
                    className={`px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm`}
                  >
                    <option>ITEP-Y1</option>
                    <option>ITEP-Y2</option>
                    <option>ITEP-Y3</option>
                    <option>ITEP-Y4</option>
                    <option>B.Ed-S1</option>
                    <option>B.Ed-S2</option>
                    <option>B.Ed-S3</option>
                    <option>B.Ed-S4</option>
                  </select>
                  <input
                    placeholder="Cohort (e.g., ITEP-Y2-A)"
                    value={newPracticumBlock.cohort}
                    onChange={(e) =>
                      setNewPracticumBlock((b) => ({
                        ...b,
                        cohort: e.target.value,
                      }))
                    }
                    className={`px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    placeholder="School Name"
                    value={newPracticumBlock.school}
                    onChange={(e) =>
                      setNewPracticumBlock((b) => ({
                        ...b,
                        school: e.target.value,
                      }))
                    }
                    className={`px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm`}
                  />
                  <input
                    placeholder="Supervisor Name"
                    value={newPracticumBlock.supervisor}
                    onChange={(e) =>
                      setNewPracticumBlock((b) => ({
                        ...b,
                        supervisor: e.target.value,
                      }))
                    }
                    className={`px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm`}
                  />
                </div>
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <select
                    value={newPracticumBlock.day}
                    onChange={(e) =>
                      setNewPracticumBlock((b) => ({
                        ...b,
                        day: e.target.value,
                      }))
                    }
                    className={`px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm`}
                  >
                    {weekDays.map((day) => (
                      <option key={day}>{day}</option>
                    ))}
                  </select>
                  <select
                    value={newPracticumBlock.startTime}
                    onChange={(e) =>
                      setNewPracticumBlock((b) => ({
                        ...b,
                        startTime: e.target.value,
                      }))
                    }
                    className={`px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm`}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot}>{slot}</option>
                    ))}
                  </select>
                  <select
                    value={newPracticumBlock.endTime}
                    onChange={(e) =>
                      setNewPracticumBlock((b) => ({
                        ...b,
                        endTime: e.target.value,
                      }))
                    }
                    className={`px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm`}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot}>{slot}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Students"
                    value={newPracticumBlock.students}
                    onChange={(e) =>
                      setNewPracticumBlock((b) => ({
                        ...b,
                        students: parseInt(e.target.value),
                      }))
                    }
                    className={`px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm`}
                  />
                </div>
                <select
                  value={newPracticumBlock.type}
                  onChange={(e) =>
                    setNewPracticumBlock((b) => ({
                      ...b,
                      type: e.target.value,
                    }))
                  }
                  className={`w-full px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm mb-3`}
                >
                  <option>School Observation</option>
                  <option>Teaching Practice</option>
                  <option>Extended Internship</option>
                  <option>Peer Teaching</option>
                  <option>Micro Teaching</option>
                </select>
                <motion.button
                  onClick={addPracticumBlock}
                  className={`w-full px-4 py-2.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold flex items-center justify-center gap-2`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={16} />
                  Add Practicum Block
                </motion.button>
              </div>

              {/* Practicum Block List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {practicumBlocks.map((block, i) => (
                  <motion.div
                    key={i}
                    className={`flex items-center justify-between p-4 rounded-xl border ${theme.cardBorder} ${theme.accentBg}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            isDark
                              ? "bg-rose-100 text-rose-700"
                              : "bg-rose-500/20 text-rose-300"
                          }`}
                        >
                          {block.type}
                        </span>
                        <span className="font-semibold">{block.cohort}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <School size={14} className={theme.mutedText} />
                          <span>{block.school}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck size={14} className={theme.mutedText} />
                          <span>{block.supervisor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className={theme.mutedText} />
                          <span>
                            {block.day} {block.startTime}-{block.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={14} className={theme.mutedText} />
                          <span>{block.students} students</span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => removePracticumBlock(i)}
                      className={`p-2 rounded-lg ${theme.hoverBg} text-rose-600`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-slate-800">
                <motion.button
                  onClick={() => setShowPracticum(false)}
                  className={`px-5 py-2.5 rounded-xl border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} text-sm font-medium`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={savePracticum}
                  className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Practicum Schedule
                </motion.button>
              </div>
            </div>
          </Modal>
        )}

        {/* Supervision Assignments Modal */}
        {showSupervision && (
          <Modal
            title="Faculty Supervision Assignments"
            onClose={() => setShowSupervision(false)}
            theme={theme}
          >
            <div className="space-y-3">
              {supervisionAssignments.map((assignment, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${theme.cardBorder} ${theme.accentBg}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{assignment.faculty}</p>
                      <p className={`text-xs ${theme.mutedText}`}>
                        {assignment.specialization}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        isDark
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-indigo-500/20 text-indigo-300"
                      }`}
                    >
                      {assignment.students} students
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className={`text-xs ${theme.mutedText} mb-1`}>
                        Schools
                      </p>
                      <p>{assignment.schools.join(", ")}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${theme.mutedText} mb-1`}>
                        Hours/Week
                      </p>
                      <p>{assignment.hoursAllocated}h</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <motion.button
                  onClick={() => setShowSupervision(false)}
                  className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </Modal>
        )}

        {/* Enrollment Statistics Modal */}
        {showEnrollment && (
          <Modal
            title="Course Enrollment Statistics"
            onClose={() => setShowEnrollment(false)}
            theme={theme}
          >
            <div className="space-y-3">
              {enrollStats.map((stat, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${theme.cardBorder} ${theme.accentBg}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{stat.code}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            stat.type === "Education Core"
                              ? isDark
                                ? "bg-blue-100 text-blue-700"
                                : "bg-blue-500/20 text-blue-300"
                              : stat.type === "Subject Pedagogy"
                              ? isDark
                                ? "bg-amber-100 text-amber-700"
                                : "bg-amber-500/20 text-amber-300"
                              : stat.type === "Practicum"
                              ? isDark
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-emerald-500/20 text-emerald-300"
                              : isDark
                              ? "bg-gray-100 text-gray-700"
                              : "bg-gray-500/20 text-gray-300"
                          }`}
                        >
                          {stat.type}
                        </span>
                      </div>
                      <p className="text-sm">{stat.name}</p>
                      <p className={`text-xs ${theme.mutedText} mt-1`}>
                        {stat.programs}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-2xl font-bold ${
                          stat.enrolled > stat.cap
                            ? "text-rose-500"
                            : stat.enrolled === stat.cap
                            ? "text-amber-500"
                            : "text-emerald-500"
                        }`}
                      >
                        {stat.enrolled}
                      </p>
                      <p className={`text-xs ${theme.mutedText}`}>
                        / {stat.cap} capacity
                      </p>
                    </div>
                  </div>
                  <div
                    className={`h-2 rounded-full ${
                      isDark ? "bg-gray-200" : "bg-slate-800"
                    }`}
                  >
                    <div
                      className={`h-full rounded-full ${
                        stat.enrolled > stat.cap
                          ? "bg-rose-500"
                          : stat.enrolled === stat.cap
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          (stat.enrolled / stat.cap) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <motion.button
                  onClick={() => setShowEnrollment(false)}
                  className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </Modal>
        )}

        {/* Field Work Schedule Modal */}
        {showFieldWork && (
          <Modal
            title="Field Work & School Engagement Schedule"
            onClose={() => setShowFieldWork(false)}
            theme={theme}
          >
            <div className="space-y-3">
              {fieldWorkSchedule.map((schedule, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${theme.cardBorder} ${theme.accentBg}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          isDark
                            ? "bg-rose-100 text-rose-700"
                            : "bg-rose-500/20 text-rose-300"
                        }`}
                      >
                        {schedule.week}
                      </span>
                      <p className="font-semibold mt-2">{schedule.program}</p>
                      <p className="text-sm">{schedule.activity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{schedule.hours}h</p>
                      <p className={`text-xs ${theme.mutedText}`}>
                        {schedule.schools} schools
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <motion.button
                  onClick={() => setShowFieldWork(false)}
                  className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </Modal>
        )}

        {/* Stage Specialization Modal */}
        {showStageSpecialization && (
          <Modal
            title="Stage-Based Specialization Allocation"
            onClose={() => setShowStageSpecialization(false)}
            theme={theme}
          >
            <div
              className={`p-4 rounded-xl ${
                isDark
                  ? "bg-blue-50 border border-blue-200"
                  : "bg-blue-500/10 border border-blue-500/30"
              } mb-4`}
            >
              <p className="text-sm font-medium mb-2">NEP 2020 Structure</p>
              <p className={`text-xs ${theme.mutedText}`}>
                Stage-based teacher specialization aligned with the 5+3+3+4
                school structure for focused pedagogical training.
              </p>
            </div>
            <div className="space-y-3">
              {stageAllocations.map((stage, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${theme.cardBorder} ${theme.accentBg}`}
                >
                  <p className="font-semibold mb-3">{stage.stage}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className={`text-xs ${theme.mutedText} mb-1`}>
                        Faculty
                      </p>
                      <p className="text-lg font-bold">{stage.faculty}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${theme.mutedText} mb-1`}>
                        Students
                      </p>
                      <p className="text-lg font-bold">{stage.students}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${theme.mutedText} mb-1`}>
                        Courses
                      </p>
                      <p className="text-lg font-bold">{stage.courses}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <motion.button
                  onClick={() => setShowStageSpecialization(false)}
                  className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// Action Card Component
function ActionCard({
  icon,
  title,
  description,
  onClick,
  primary = false,
  warning = false,
  theme,
  isDark,
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`group p-5 rounded-xl border text-left transition-all duration-200 ${
        primary
          ? `bg-gradient-to-br ${theme.gradient} border-transparent text-white shadow-lg hover:shadow-xl`
          : warning
          ? isDark
            ? "border-amber-300 bg-amber-50 hover:bg-amber-100"
            : "border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20"
          : `${theme.cardBorder} ${theme.cardBg} hover:shadow-md`
      }`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`inline-flex p-2.5 rounded-lg mb-3 ${
          primary
            ? "bg-white/20"
            : warning
            ? isDark
              ? "bg-amber-100"
              : "bg-amber-500/20"
            : isDark
            ? "bg-indigo-100"
            : "bg-indigo-500/20"
        }`}
      >
        <div
          className={
            primary
              ? "text-white"
              : warning
              ? isDark
                ? "text-amber-600"
                : "text-amber-400"
              : isDark
              ? "text-indigo-600"
              : "text-indigo-400"
          }
        >
          {icon}
        </div>
      </div>
      <h3 className="font-semibold mb-1 text-sm">{title}</h3>
      <p
        className={`text-xs ${
          primary
            ? "text-white/80"
            : warning
            ? isDark
              ? "text-amber-700"
              : "text-amber-300"
            : theme.mutedText
        }`}
      >
        {description}
      </p>
      <ChevronRight
        size={16}
        className={`mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${
          primary
            ? "text-white/80"
            : warning
            ? isDark
              ? "text-amber-600"
              : "text-amber-400"
            : theme.mutedText
        }`}
      />
    </motion.button>
  );
}
