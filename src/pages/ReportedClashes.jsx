import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Search,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  Sparkles,
  FileWarning,
  TrendingDown,
  Clock,
} from "lucide-react";

export default function ReportedClashes() {
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
  };

  const theme = contextTheme || defaultTheme;

  const [clashes, setClashes] = useState([
    {
      id: "CL-3201",
      category: "Student overlap",
      detail: "AI & ML vs Cloud Wed 11:30",
      status: "New",
      affected: ["CS342", "CS344"],
      severity: "high",
      reportedBy: "System",
      date: "2025-10-05",
    },
    {
      id: "CL-3202",
      category: "Room double-booked",
      detail: "CS-Lab-1 Fri 10:15",
      status: "New",
      affected: ["CS331", "EE210"],
      severity: "critical",
      reportedBy: "Admin",
      date: "2025-10-05",
    },
    {
      id: "CL-3203",
      category: "Faculty unavailable",
      detail: "Dr. Rao Tue 14:00",
      status: "Investigating",
      affected: ["CS201"],
      severity: "medium",
      reportedBy: "Dr. Rao",
      date: "2025-10-04",
    },
    {
      id: "CL-3204",
      category: "Student overlap",
      detail: "Database vs Networks Mon 09:00",
      status: "Resolved",
      affected: ["CS301", "CS302"],
      severity: "low",
      reportedBy: "System",
      date: "2025-10-03",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("All");

  function updateClash(id, status) {
    setClashes((list) => list.map((c) => (c.id === id ? { ...c, status } : c)));
  }

  // Filter clashes
  const filtered = useMemo(() => {
    if (filterStatus === "All") return clashes;
    if (filterStatus === "Active") {
      return clashes.filter((c) => c.status !== "Resolved");
    }
    return clashes.filter((c) => c.status === filterStatus);
  }, [clashes, filterStatus]);

  // Statistics
  const stats = useMemo(() => {
    const newClashes = clashes.filter((c) => c.status === "New").length;
    const investigating = clashes.filter(
      (c) => c.status === "Investigating"
    ).length;
    const resolved = clashes.filter((c) => c.status === "Resolved").length;
    const critical = clashes.filter(
      (c) => c.severity === "critical" && c.status !== "Resolved"
    ).length;

    return { newClashes, investigating, resolved, critical };
  }, [clashes]);

  const getStatusColor = (status) => {
    if (status === "New") {
      return !isDark
        ? "bg-rose-100 text-rose-700 border-rose-200"
        : "bg-rose-500/20 text-rose-300 border-rose-500/30";
    }
    if (status === "Investigating") {
      return !isDark
        ? "bg-amber-100 text-amber-700 border-amber-200"
        : "bg-amber-500/20 text-amber-300 border-amber-500/30";
    }
    return !isDark
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
  };

  const getSeverityColor = (severity) => {
    if (severity === "critical") {
      return !isDark
        ? "bg-rose-100 text-rose-700"
        : "bg-rose-500/20 text-rose-300";
    }
    if (severity === "high") {
      return !isDark
        ? "bg-orange-100 text-orange-700"
        : "bg-orange-500/20 text-orange-300";
    }
    if (severity === "medium") {
      return !isDark
        ? "bg-amber-100 text-amber-700"
        : "bg-amber-500/20 text-amber-300";
    }
    return !isDark
      ? "bg-blue-100 text-blue-700"
      : "bg-blue-500/20 text-blue-300";
  };

  const getStatusIcon = (status) => {
    if (status === "New") return <AlertCircle size={14} />;
    if (status === "Investigating") return <Search size={14} />;
    return <CheckCircle size={14} />;
  };

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
              isDark ? "bg-amber-100" : "bg-amber-500/20"
            }`}
          >
            <Sparkles
              size={24}
              className={isDark ? "text-amber-600" : "text-amber-400"}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Reported Clashes</h1>
            <p className={`text-sm ${theme.mutedText}`}>
              Manage and resolve timetable conflicts and clashes
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
                isDark ? "bg-rose-100" : "bg-rose-500/20"
              }`}
            >
              <AlertTriangle
                size={18}
                className={isDark ? "text-rose-600" : "text-rose-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>New Clashes</p>
              <p className="text-xl font-bold">{stats.newClashes}</p>
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
                isDark ? "bg-amber-100" : "bg-amber-500/20"
              }`}
            >
              <Search
                size={18}
                className={isDark ? "text-amber-600" : "text-amber-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>Investigating</p>
              <p className="text-xl font-bold">{stats.investigating}</p>
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
              <CheckCircle
                size={18}
                className={isDark ? "text-emerald-600" : "text-emerald-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>Resolved</p>
              <p className="text-xl font-bold">{stats.resolved}</p>
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
                isDark ? "bg-red-100" : "bg-red-500/20"
              }`}
            >
              <XCircle
                size={18}
                className={isDark ? "text-red-600" : "text-red-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>Critical</p>
              <p className="text-xl font-bold">{stats.critical}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filter */}
      <motion.div
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold flex items-center gap-2">
            <Filter
              size={18}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            Filter by Status
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", "Active", "New", "Investigating", "Resolved"].map(
            (status) => (
              <motion.button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  filterStatus === status
                    ? `bg-gradient-to-r ${theme.gradient} text-white border-transparent shadow-lg`
                    : `${theme.buttonBg} border ${theme.buttonBorder} ${theme.buttonText}`
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status}
              </motion.button>
            )
          )}
        </div>
      </motion.div>

      {/* Clashes List */}
      <motion.div
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold flex items-center gap-2">
            <FileWarning
              size={18}
              className={isDark ? "text-amber-600" : "text-amber-400"}
            />
            Clash Reports
            <span
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${theme.accentBg} border ${theme.accentBorder}`}
            >
              {filtered.length}
            </span>
          </h2>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              className={`text-center py-12 ${theme.mutedText}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CheckCircle size={48} className="mx-auto mb-3 opacity-50" />
              <p>No clashes match your filter</p>
            </motion.div>
          ) : (
            <ul className="space-y-3">
              {filtered.map((c, idx) => (
                <motion.li
                  key={c.id}
                  className={`rounded-xl border ${theme.cardBorder} ${theme.accentBg} p-4 ${theme.hoverBg} transition-all`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className={`text-xs font-mono px-2.5 py-1 rounded-lg ${theme.accentBg} border ${theme.accentBorder} font-semibold`}
                        >
                          {c.id}
                        </span>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-lg font-medium ${getSeverityColor(
                            c.severity
                          )}`}
                        >
                          {c.severity.toUpperCase()}
                        </span>
                        <p className="font-semibold">{c.category}</p>
                      </div>
                      <p className={`text-sm mb-2`}>{c.detail}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className={theme.mutedText}>
                          Affected: {c.affected.join(", ")}
                        </span>
                        <span className={theme.mutedText}>
                          By: {c.reportedBy}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 ${getStatusColor(
                          c.status
                        )}`}
                      >
                        {getStatusIcon(c.status)}
                        {c.status}
                      </span>

                      {c.status !== "Resolved" && (
                        <div className="flex gap-2">
                          {c.status === "New" && (
                            <motion.button
                              onClick={() => updateClash(c.id, "Investigating")}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                                !isDark
                                  ? "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100"
                                  : "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Search size={14} />
                              Investigate
                            </motion.button>
                          )}
                          <motion.button
                            onClick={() => updateClash(c.id, "Resolved")}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                              !isDark
                                ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <CheckCircle size={14} />
                            Resolve
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
