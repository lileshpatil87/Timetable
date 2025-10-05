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
} from "lucide-react";
import LogoutButton from "../components/LogoutButton";
import RoomsResources from "./RoomsResources";

export default function StaffDashboard() {
  const [isDark, setIsDark] = useState(true);

  // Demo staff data
  const staff = {
    name: "Priya Sharma",
    id: "STAFF-ADM-042",
    email: "priya.sharma@university.edu",
    department: "Administration",
    role: "Academic Coordinator",
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
            {/* Notifications */}
            <motion.button
              className={`p-2 rounded-lg ${theme.buttonBg} border ${theme.buttonBorder} ${theme.buttonText} hover:scale-105 transition-all duration-200 relative`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Notifications"
            >
              <Bell size={16} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 rounded-full"></span>
            </motion.button>

            {/* Theme Toggle */}
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

      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <motion.div
          className={`mb-8 p-6 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} text-sm font-medium transition-all duration-200`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Settings size={16} />
                Settings
              </motion.button>
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
            <p className={`text-xs ${theme.mutedText}`}>Across all buildings</p>
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
                <BookOpen
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

        {/* Search and Filter Bar */}
        <motion.div
          className={`mb-6 p-4 rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search
                size={18}
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.mutedText}`}
              />
              <input
                type="text"
                placeholder="Search rooms, resources, or bookings..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
              />
            </div>
            <motion.button
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} text-sm font-medium transition-all duration-200`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter size={16} />
              Filters
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content - Rooms & Resources Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <RoomsResources theme={theme} isDark={isDark} />
        </motion.div>
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
