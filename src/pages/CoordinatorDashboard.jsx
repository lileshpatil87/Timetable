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
  PlusCircle,
  BookMarked,
  Clock,
  MapPin,
  User,
  Grid3x3,
  GraduationCap,
  Building2,
  Layers,
  Award,
  Sun,
  Moon,
  Settings,
  Bell,
  Search,
  Filter,
  Users,
  CheckCircle,
  XCircle,
  TrendingUp,
  BarChart3,
  Wrench,
  Package,
  School,
  ClipboardCheck,
  FileCheck,
  Activity,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import LogoutButton from "../components/LogoutButton";
import RoomsResources from "./RoomsResources";

export default function StaffDashboard() {
  const [isDark, setIsDark] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  // Demo staff data
  const staff = {
    name: "Priya Sharma",
    id: "STAFF-ADM-042",
    email: "priya.sharma@university.edu",
    department: "Administration",
    role: "Academic Coordinator",
    joinDate: "January 2020",
    permissions: ["Room Management", "Resource Allocation", "Booking Approval"],
  };

  // Recent activities
  const recentActivities = [
    {
      type: "booking",
      action: "Approved room booking",
      details: "CS-Lab-1 for ITEP-Y2 Practicum",
      time: "2 hours ago",
      status: "success",
    },
    {
      type: "resource",
      action: "Added new equipment",
      details: "10 Smart Boards to ED Building",
      time: "5 hours ago",
      status: "success",
    },
    {
      type: "issue",
      action: "Resolved maintenance request",
      details: "Projector repair in Room 301",
      time: "1 day ago",
      status: "success",
    },
    {
      type: "alert",
      action: "Pending approval",
      details: "3 room booking requests",
      time: "2 days ago",
      status: "pending",
    },
  ];

  // Pending tasks
  const pendingTasks = [
    {
      id: 1,
      title: "Approve practicum room bookings",
      category: "Bookings",
      priority: "High",
      count: 3,
    },
    {
      id: 2,
      title: "Review equipment maintenance requests",
      category: "Maintenance",
      priority: "Medium",
      count: 2,
    },
    {
      id: 3,
      title: "Update room capacity for Pedagogy Labs",
      category: "Resources",
      priority: "Low",
      count: 5,
    },
    {
      id: 4,
      title: "Process semester room allocations",
      category: "Planning",
      priority: "High",
      count: 1,
    },
  ];

  // Building statistics
  const buildingStats = [
    {
      building: "Education Building",
      rooms: 18,
      capacity: 850,
      utilization: 78,
      equipment: 45,
    },
    {
      building: "Computer Science Block",
      rooms: 12,
      capacity: 520,
      utilization: 85,
      equipment: 38,
    },
    {
      building: "Pedagogy Labs Complex",
      rooms: 8,
      capacity: 280,
      utilization: 72,
      equipment: 32,
    },
    {
      building: "Research Wing",
      rooms: 7,
      capacity: 140,
      utilization: 45,
      equipment: 13,
    },
  ];

  // Notifications
  const notifications = [
    {
      id: 1,
      title: "New booking request",
      message: "Dr. Vikram Singh requested Demo School for Teaching Practice",
      time: "30 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Equipment maintenance completed",
      message: "Smart Boards in ED-301 and ED-302 are now operational",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "Semester planning reminder",
      message: "Room allocations for Semester 4 due by Oct 15",
      time: "5 hours ago",
      unread: false,
    },
  ];

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
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return isDark
          ? "bg-rose-100 text-rose-700 border-rose-200"
          : "bg-rose-500/20 text-rose-300 border-rose-400/40";
      case "Medium":
        return isDark
          ? "bg-amber-100 text-amber-700 border-amber-200"
          : "bg-amber-500/20 text-amber-300 border-amber-400/40";
      case "Low":
        return isDark
          ? "bg-blue-100 text-blue-700 border-blue-200"
          : "bg-blue-500/20 text-blue-300 border-blue-400/40";
      default:
        return "";
    }
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
                {staff.name
                  .split(" ")
                  .map((s) => s[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">{staff.name}</h1>
                <p className={`text-sm ${theme.mutedText} mb-2`}>
                  {staff.role} • {staff.department}
                </p>
                <p className={`text-xs ${theme.mutedText}`}>
                  {staff.id} • {staff.email}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {staff.permissions.map((perm, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2 py-1 rounded-md ${
                        isDark
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-indigo-500/20 text-indigo-300"
                      }`}
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            
          </div>
        </motion.div>

        {/* Quick Stats */}
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
                <Building2
                  size={18}
                  className={isDark ? "text-blue-600" : "text-blue-400"}
                />
              </div>
              <div>
                <p className={`text-xs ${theme.mutedText}`}>Total Rooms</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
            <p className={`text-xs ${theme.mutedText}`}>Across 4 buildings</p>
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
                <Package
                  size={18}
                  className={isDark ? "text-emerald-600" : "text-emerald-400"}
                />
              </div>
              <div>
                <p className={`text-xs ${theme.mutedText}`}>Resources</p>
                <p className="text-2xl font-bold">128</p>
              </div>
            </div>
            <p className={`text-xs ${theme.mutedText}`}>
              Equipment & facilities
            </p>
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
                <Calendar
                  size={18}
                  className={isDark ? "text-purple-600" : "text-purple-400"}
                />
              </div>
              <div>
                <p className={`text-xs ${theme.mutedText}`}>Bookings</p>
                <p className="text-2xl font-bold">32</p>
              </div>
            </div>
            <p className={`text-xs ${theme.mutedText}`}>Active this week</p>
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
                <AlertTriangle
                  size={18}
                  className={isDark ? "text-amber-600" : "text-amber-400"}
                />
              </div>
              <div>
                <p className={`text-xs ${theme.mutedText}`}>Issues</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
            <p className={`text-xs ${theme.mutedText}`}>Pending resolution</p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Pending Tasks */}
            <motion.div
              className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <ClipboardCheck
                  size={20}
                  className={isDark ? "text-indigo-600" : "text-indigo-400"}
                />
                Pending Tasks
              </h2>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    className={`p-4 rounded-xl border ${theme.accentBorder} ${theme.accentBg} cursor-pointer ${theme.hoverBg} transition-all`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm">{task.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-lg border font-medium ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded-md ${
                          isDark
                            ? "bg-gray-200 text-gray-700"
                            : "bg-slate-700 text-slate-200"
                        }`}
                      >
                        {task.category}
                      </span>
                      <span className={`text-xs ${theme.mutedText}`}>
                        {task.count} {task.count === 1 ? "item" : "items"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Building Statistics */}
            <motion.div
              className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <School
                  size={20}
                  className={isDark ? "text-indigo-600" : "text-indigo-400"}
                />
                Building Statistics
              </h2>
              <div className="space-y-4">
                {buildingStats.map((building, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border ${theme.accentBorder} ${theme.accentBg}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm">
                        {building.building}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-md ${
                          building.utilization > 80
                            ? isDark
                              ? "bg-rose-100 text-rose-700"
                              : "bg-rose-500/20 text-rose-300"
                            : building.utilization > 60
                            ? isDark
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-emerald-500/20 text-emerald-300"
                            : isDark
                            ? "bg-blue-100 text-blue-700"
                            : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {building.utilization}% utilized
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className={`text-xs ${theme.mutedText} mb-1`}>
                          Rooms
                        </p>
                        <p className="font-bold">{building.rooms}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${theme.mutedText} mb-1`}>
                          Capacity
                        </p>
                        <p className="font-bold">{building.capacity}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${theme.mutedText} mb-1`}>
                          Equipment
                        </p>
                        <p className="font-bold">{building.equipment}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div
                        className={`h-2 rounded-full ${
                          isDark ? "bg-gray-200" : "bg-slate-800"
                        }`}
                      >
                        <div
                          className={`h-full rounded-full ${
                            building.utilization > 80
                              ? "bg-rose-500"
                              : building.utilization > 60
                              ? "bg-emerald-500"
                              : "bg-blue-500"
                          }`}
                          style={{ width: `${building.utilization}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.div
              className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <Activity
                  size={20}
                  className={isDark ? "text-indigo-600" : "text-indigo-400"}
                />
                Recent Activity
              </h2>
              <div className="space-y-3">
                {recentActivities.map((activity, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-lg ${theme.accentBg} border ${theme.accentBorder}`}
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
                        <Clock
                          size={16}
                          className={
                            isDark ? "text-amber-600" : "text-amber-400"
                          }
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1">
                        {activity.action}
                      </p>
                      <p className={`text-xs ${theme.mutedText} mb-1`}>
                        {activity.details}
                      </p>
                      <p className={`text-xs ${theme.mutedText}`}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <Sparkles
                  size={20}
                  className={isDark ? "text-indigo-600" : "text-indigo-400"}
                />
                Quick Actions
              </h2>
              <div className="space-y-2">
                <motion.button
                  className={`w-full p-3 rounded-xl border ${theme.accentBorder} ${theme.accentBg} text-left text-sm font-medium ${theme.hoverBg} transition-all flex items-center justify-between group`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    <PlusCircle size={16} />
                    Add New Room
                  </span>
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.button>
                <motion.button
                  className={`w-full p-3 rounded-xl border ${theme.accentBorder} ${theme.accentBg} text-left text-sm font-medium ${theme.hoverBg} transition-all flex items-center justify-between group`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    <Wrench size={16} />
                    Report Maintenance
                  </span>
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.button>
                <motion.button
                  className={`w-full p-3 rounded-xl border ${theme.accentBorder} ${theme.accentBg} text-left text-sm font-medium ${theme.hoverBg} transition-all flex items-center justify-between group`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    <FileCheck size={16} />
                    Approve Bookings
                  </span>
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.button>
                <motion.button
                  className={`w-full p-3 rounded-xl border ${theme.accentBorder} ${theme.accentBg} text-left text-sm font-medium ${theme.hoverBg} transition-all flex items-center justify-between group`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    <BarChart3 size={16} />
                    View Reports
                  </span>
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Modal({ title, children, onClose, icon = null, theme }) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className={`absolute inset-0 ${
          theme?.modalOverlay || "bg-gray-900/40"
        } backdrop-blur-sm`}
        onClick={onClose}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className={`relative w-full max-w-lg rounded-2xl border ${
          theme?.cardBorder || "border-gray-200"
        } ${theme?.modalBg || "bg-white"} p-6 shadow-2xl backdrop-blur-sm`}
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            {icon && <span className="text-indigo-500">{icon}</span>}
            {title}
          </h3>
          <motion.button
            onClick={onClose}
            className={`rounded-lg p-1.5 ${
              theme?.hoverBg || "hover:bg-gray-50"
            } transition-colors`}
            aria-label="Close"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={18} />
          </motion.button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

export { Modal };
