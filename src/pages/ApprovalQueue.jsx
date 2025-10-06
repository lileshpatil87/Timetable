import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Filter,
  Sparkles,
  FileCheck,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

export default function ApprovalQueue() {
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

  const [approvals, setApprovals] = useState([
    {
      id: "APR-1024",
      type: "Program timetable",
      scope: "FYUGP-CS Sem 3",
      impact: "0 hard, -8% idle",
      status: "Awaiting HOD",
      priority: "high",
      submittedBy: "System",
      date: "2025-10-05",
    },
    {
      id: "APR-1025",
      type: "Elective add",
      scope: "AI & ML seats +10",
      impact: "Lab load +5%",
      status: "Awaiting HOD",
      priority: "medium",
      submittedBy: "Dr. Kumar",
      date: "2025-10-05",
    },
    {
      id: "APR-1026",
      type: "Room swap",
      scope: "OS Lab -> CS-Lab-2",
      impact: "Capacity +10",
      status: "Awaiting HOD",
      priority: "low",
      submittedBy: "Admin",
      date: "2025-10-04",
    },
    {
      id: "APR-1027",
      type: "Faculty availability",
      scope: "Dr. Rao Wed 2–3 off",
      impact: "Repack 1 tutorial",
      status: "Awaiting HOD",
      priority: "high",
      submittedBy: "Dr. Rao",
      date: "2025-10-05",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("All");

  function actApproval(id, action) {
    setApprovals((list) =>
      list.map((a) => (a.id === id ? { ...a, status: action } : a))
    );
  }

  // Filter approvals
  const filtered = useMemo(() => {
    if (filterStatus === "All") return approvals;
    return approvals.filter((a) => a.status === filterStatus);
  }, [approvals, filterStatus]);

  // Statistics
  const stats = useMemo(() => {
    const pending = approvals.filter((a) => a.status === "Awaiting HOD").length;
    const approved = approvals.filter((a) => a.status === "Approved").length;
    const rejected = approvals.filter((a) => a.status === "Rejected").length;
    const changes = approvals.filter(
      (a) => a.status === "Changes requested"
    ).length;

    return { pending, approved, rejected, changes };
  }, [approvals]);

  const getStatusColor = (status) => {
    if (status === "Approved") {
      return !isDark
        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
        : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    }
    if (status === "Rejected") {
      return !isDark
        ? "bg-rose-100 text-rose-700 border-rose-200"
        : "bg-rose-500/20 text-rose-300 border-rose-500/30";
    }
    if (status === "Changes requested") {
      return !isDark
        ? "bg-amber-100 text-amber-700 border-amber-200"
        : "bg-amber-500/20 text-amber-300 border-amber-500/30";
    }
    return !isDark
      ? "bg-gray-100 text-gray-700 border-gray-200"
      : "bg-slate-700/50 text-slate-300 border-slate-600";
  };

  const getPriorityColor = (priority) => {
    if (priority === "high") {
      return !isDark
        ? "bg-rose-100 text-rose-700"
        : "bg-rose-500/20 text-rose-300";
    }
    if (priority === "medium") {
      return !isDark
        ? "bg-amber-100 text-amber-700"
        : "bg-amber-500/20 text-amber-300";
    }
    return !isDark
      ? "bg-blue-100 text-blue-700"
      : "bg-blue-500/20 text-blue-300";
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
              isDark ? "bg-indigo-100" : "bg-indigo-500/20"
            }`}
          >
            <Sparkles
              size={24}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Approval Queue</h1>
            <p className={`text-sm ${theme.mutedText}`}>
              Review and approve pending timetable changes and requests
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
                isDark ? "bg-amber-100" : "bg-amber-500/20"
              }`}
            >
              <Clock
                size={18}
                className={isDark ? "text-amber-600" : "text-amber-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>Pending</p>
              <p className="text-xl font-bold">{stats.pending}</p>
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
                isDark ? "bg-emerald-100" : "bg-emerald-500/20"
              }`}
            >
              <CheckCircle
                size={18}
                className={isDark ? "text-emerald-600" : "text-emerald-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>Approved</p>
              <p className="text-xl font-bold">{stats.approved}</p>
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
                isDark ? "bg-rose-100" : "bg-rose-500/20"
              }`}
            >
              <XCircle
                size={18}
                className={isDark ? "text-rose-600" : "text-rose-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>Rejected</p>
              <p className="text-xl font-bold">{stats.rejected}</p>
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
                isDark ? "bg-blue-100" : "bg-blue-500/20"
              }`}
            >
              <AlertCircle
                size={18}
                className={isDark ? "text-blue-600" : "text-blue-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>Changes</p>
              <p className="text-xl font-bold">{stats.changes}</p>
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
          {[
            "All",
            "Awaiting HOD",
            "Approved",
            "Rejected",
            "Changes requested",
          ].map((status) => (
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
          ))}
        </div>
      </motion.div>

      {/* Approvals List */}
      <motion.div
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold flex items-center gap-2">
            <FileCheck
              size={18}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            Approval Requests
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
              <p>No approvals match your filter</p>
            </motion.div>
          ) : (
            <ul className="space-y-3">
              {filtered.map((a, idx) => (
                <motion.li
                  key={a.id}
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
                          {a.id}
                        </span>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-lg font-medium ${getPriorityColor(
                            a.priority
                          )}`}
                        >
                          {a.priority.toUpperCase()}
                        </span>
                        <p className="font-semibold">{a.type}</p>
                      </div>
                      <p className={`text-sm mb-2`}>{a.scope}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span
                          className={`flex items-center gap-1.5 ${
                            isDark ? "text-emerald-700" : "text-emerald-400"
                          }`}
                        >
                          <TrendingUp size={12} />
                          Impact: {a.impact}
                        </span>
                        <span className={theme.mutedText}>
                          By: {a.submittedBy}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${getStatusColor(
                          a.status
                        )}`}
                      >
                        {a.status}
                      </span>
                      {a.status === "Awaiting HOD" && (
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => actApproval(a.id, "Approved")}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                              !isDark
                                ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <CheckCircle size={14} />
                            Approve
                          </motion.button>
                          <motion.button
                            onClick={() =>
                              actApproval(a.id, "Changes requested")
                            }
                            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                              !isDark
                                ? "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100"
                                : "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <AlertCircle size={14} />
                            Changes
                          </motion.button>
                          <motion.button
                            onClick={() => actApproval(a.id, "Rejected")}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                              !isDark
                                ? "border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100"
                                : "border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <XCircle size={14} />
                            Reject
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
