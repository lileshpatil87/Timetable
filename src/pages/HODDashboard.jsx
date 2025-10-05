import React, { useState } from "react";
import { useOutletContext } from "react-router-dom"; // Add this import
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users, // Add this
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
} from "lucide-react";
import Modal from "../components/Modal";
// ... rest of imports

export default function HODDashboard() {
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

  // ... rest of the component code remains the same

  // Demo department context
  const dept = {
    name: "Computer Science",
    term: "AY 2025-26, Sem 3",
    programSets: ["FYUGP-CS", "Minor-CS", "MDC-CS"],
  };

  // KPIs (sample)
  const kpis = [
    {
      label: "Faculty load variance",
      value: "±2.1 hrs",
      help: "vs weekly targets",
      icon: <Users size={18} />,
      color: "indigo",
      trend: "+0.2",
    },
    {
      label: "Room utilization",
      value: "71%",
      help: "Mon–Fri 9–5",
      icon: <Building2 size={18} />,
      color: "emerald",
      trend: "+5%",
    },
    {
      label: "Elective clash risk",
      value: "Medium",
      help: "Popular combos",
      icon: <AlertCircle size={18} />,
      color: "amber",
      trend: "stable",
    },
    {
      label: "Pending approvals",
      value: 4,
      help: "Timetables/changes",
      icon: <AlertTriangle size={18} />,
      color: "rose",
      trend: "-2",
    },
  ];

  // Modals for each core function
  const [showProfile, setShowProfile] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [showGenerate, setShowGenerate] = useState(false);
  const [showPracticum, setShowPracticum] = useState(false);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [showSubstitution, setShowSubstitution] = useState(false);

  // Profile management (stub)
  const [profile, setProfile] = useState({
    displayName: "Department of Computer Science",
    contact: "hod.cs@university.edu",
  });

  function saveProfile() {
    alert("Profile changes saved (awaiting approval if required).");
    setShowProfile(false);
  }

  // Subjects & electives (stub)
  const [courses, setCourses] = useState([
    { code: "CS342", name: "AI & ML", type: "Elective", ltp: "3-0-0" },
    { code: "CS344", name: "Cloud Computing", type: "Elective", ltp: "3-0-0" },
    {
      code: "CS331",
      name: "Operating Systems Lab",
      type: "Major",
      ltp: "0-0-2",
    },
  ]);

  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    type: "Major",
    ltp: "3-0-0",
  });

  function addCourse() {
    if (!newCourse.code || !newCourse.name) {
      alert("Provide code and name");
      return;
    }
    setCourses((c) => [...c, newCourse]);
    setNewCourse({ code: "", name: "", type: "Major", ltp: "3-0-0" });
  }

  function removeCourse(code) {
    setCourses((c) => c.filter((x) => x.code !== code));
  }

  function saveCourses() {
    alert("Subjects and electives updated.");
    setShowSubjects(false);
  }

  // Generate timetables (scenario composer stub)
  const [scenario, setScenario] = useState({
    term: "Sem 3",
    profile: "Student-compact",
    timeBudget: 180,
  });

  function runScenario() {
    alert("Scenario queued. You will be notified when it completes.");
    setShowGenerate(false);
  }

  // Practicum / fieldwork management (ITEP)
  const [blocks, setBlocks] = useState([
    {
      cohort: "ITEP-S3",
      day: "Wed",
      start: "14:00",
      end: "16:30",
      label: "Practicum",
    },
    {
      cohort: "ITEP-S3",
      day: "Fri",
      start: "10:15",
      end: "12:15",
      label: "School internship",
    },
  ]);

  const [newBlock, setNewBlock] = useState({
    cohort: "ITEP-S3",
    day: "Wed",
    start: "14:00",
    end: "16:30",
    label: "Practicum",
  });

  function addBlock() {
    if (!newBlock.cohort || !newBlock.day || !newBlock.start || !newBlock.end) {
      alert("Complete all fields");
      return;
    }
    setBlocks((b) => [...b, { ...newBlock }]);
  }

  function removeBlock(idx) {
    setBlocks((b) => b.filter((_, i) => i !== idx));
  }

  function savePracticum() {
    alert("Teaching practice/fieldwork updated.");
    setShowPracticum(false);
  }

  // Enrollment statistics (stub)
  const enrollStats = [
    { code: "CS342", name: "AI & ML", cap: 60, enrolled: 58 },
    { code: "CS344", name: "Cloud Computing", cap: 60, enrolled: 61 },
    { code: "CS331", name: "OS Lab", cap: 30, enrolled: 29 },
  ];

  // Substitutions / emergency adjustments (same-day)
  const [sub, setSub] = useState({
    date: "",
    slot: "10:15",
    course: "",
    fromFaculty: "",
    toFaculty: "",
    room: "",
  });

  function submitSubstitution() {
    if (
      !sub.date ||
      !sub.slot ||
      !sub.course ||
      !sub.fromFaculty ||
      !sub.toFaculty
    ) {
      alert("Fill required fields.");
      return;
    }
    alert("Substitution request submitted for validation.");
    setShowSubstitution(false);
  }

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
    };
    return colors[color] || colors.indigo;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-8">
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
              <Building2 size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-1">{dept.name}</h1>
              <p className={`text-sm ${theme.mutedText}`}>{dept.term}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3
                className={`text-xs font-semibold uppercase tracking-wider mb-3 ${theme.mutedText}`}
              >
                Program Sets
              </h3>
              <div className="flex flex-wrap gap-2">
                {dept.programSets.map((p) => (
                  <span
                    key={p}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium border ${
                      isDark
                        ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                        : "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                    }`}
                  >
                    {p}
                  </span>
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
            Key Metrics
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
                  <p className={`text-xs ${theme.mutedText}`}>{k.help}</p>
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
        <motion.div
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
                Welcome to the HOD Dashboard
              </h2>
              <p className={`text-sm ${theme.mutedText} leading-relaxed`}>
                Manage your department's programs, courses, faculty assignments,
                and timetable generation. Use the action cards below to get
                started.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Core Actions */}
        <motion.div
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
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ActionCard
              icon={<Building2 size={20} />}
              title="Department Profile"
              description="Update department information"
              onClick={() => setShowProfile(true)}
              theme={theme}
              isDark={isDark}
            />
            <ActionCard
              icon={<BookOpen size={20} />}
              title="Subjects & Electives"
              description="Manage course catalog"
              onClick={() => setShowSubjects(true)}
              theme={theme}
              isDark={isDark}
            />
            <ActionCard
              icon={<Calendar size={20} />}
              title="Generate Timetables"
              description="Create optimized schedules"
              onClick={() => setShowGenerate(true)}
              primary
              theme={theme}
              isDark={isDark}
            />
            <ActionCard
              icon={<GraduationCap size={20} />}
              title="Teaching Practice"
              description="Manage fieldwork blocks"
              onClick={() => setShowPracticum(true)}
              theme={theme}
              isDark={isDark}
            />
            <ActionCard
              icon={<BarChart3 size={20} />}
              title="Enrollment Stats"
              description="View capacity metrics"
              onClick={() => setShowEnrollment(true)}
              theme={theme}
              isDark={isDark}
            />
            <ActionCard
              icon={<AlertTriangle size={20} />}
              title="Substitutions"
              description="Emergency adjustments"
              onClick={() => setShowSubstitution(true)}
              warning
              theme={theme}
              isDark={isDark}
            />
          </div>
        </motion.div>

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
                action: "Timetable generated",
                details: "FYUGP-CS Sem 3",
                time: "2 hours ago",
                status: "success",
              },
              {
                action: "Course added",
                details: "CS342 - AI & ML",
                time: "5 hours ago",
                status: "success",
              },
              {
                action: "Approval pending",
                details: "Room allocation change",
                time: "1 day ago",
                status: "pending",
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
                <span className={`text-xs ${theme.mutedText}`}>
                  {activity.time}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Modals - Include all modals with the same improved styling pattern */}
      <AnimatePresence>
        {showProfile && (
          <Modal
            title="Department Profile"
            onClose={() => setShowProfile(false)}
            theme={theme}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Display Name
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

        {/* Add other modals here following the same pattern */}
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
      <h3 className="font-semibold mb-1">{title}</h3>
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
