// In DashboardLayout.jsx
import React, { useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react";
import HODSidebar from "./HODSidebar";
import DeanSidebar from "./DeanSidebar";
import CoordinatorSidebar from "./CoordinatorSidebar"; // Add this import

export function DashboardLayout({ role = "hod" }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(false); // This is the main theme state

  function handleLogout() {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      sessionStorage.clear();
    } finally {
      navigate("/login", { replace: true });
    }
  }

  // Select sidebar component based on role
  const SidebarComponent =
    role === "dean"
      ? DeanSidebar
      : role === "coordinator"
      ? CoordinatorSidebar
      : HODSidebar;

  // Theme classes
  const theme = {
    bg: isDark ? "bg-slate-950" : "bg-gray-50", // App background
    text: isDark ? "text-slate-100" : "text-gray-900", // Primary text
    cardBg: isDark ? "bg-slate-900/60" : "bg-white", // Card / panel background
    cardBorder: isDark ? "border-slate-800" : "border-gray-200", // Card border
    headerBg: isDark
      ? "bg-slate-900/70 backdrop-blur-sm"
      : "bg-white/80 backdrop-blur-sm", // Sticky header
    headerBorder: isDark ? "border-slate-800" : "border-gray-200", // Header bottom border
    sidebarBg: isDark ? "bg-slate-900/60" : "bg-white", // Sidebar background
    sidebarBorder: isDark ? "border-slate-800" : "border-gray-200", // Sidebar border
    buttonBg: isDark
      ? "bg-slate-800 hover:bg-slate-700"
      : "bg-gray-100 hover:bg-gray-200", // Button background
    buttonBorder: isDark ? "border-slate-700" : "border-gray-300", // Button border
    buttonText: isDark ? "text-slate-100" : "text-gray-900", // Button text
    buttonHoverBorder: isDark
      ? "hover:border-indigo-500"
      : "hover:border-indigo-400", // Button hover effect
    gradient: isDark
      ? "from-indigo-400 via-purple-400 to-pink-400"
      : "from-indigo-600 via-purple-600 to-pink-600", // Accent gradient
    mutedText: isDark ? "text-slate-400" : "text-gray-600", // Secondary text
    accentBg: isDark ? "bg-slate-800/50" : "bg-gray-100", // Subtle highlight
    accentBorder: isDark ? "border-slate-700" : "border-gray-200", // Accent border
    hoverBg: isDark ? "hover:bg-slate-800" : "hover:bg-gray-100", // Hover states
    inputBg: isDark ? "bg-slate-800/70" : "bg-white", // Input background
    inputBorder: isDark ? "border-slate-700" : "border-gray-300", // Input border
    inputText: isDark ? "text-slate-100" : "text-gray-900", // Input text
    inputPlaceholder: isDark
      ? "placeholder:text-slate-500"
      : "placeholder:text-gray-500", // Input placeholder
    modalBg: isDark ? "bg-slate-900" : "bg-white", // Modal content background
    modalOverlay: isDark ? "bg-slate-950/80" : "bg-gray-900/40", // Modal overlay
    tableBorder: isDark ? "border-slate-800" : "border-gray-200", // Table border
    tableHeader: isDark ? "bg-slate-800/60" : "bg-gray-50", // Table header background
  };

  // Role display names
  const roleDisplay = {
    hod: "Head of Department",
    dean: "Dean",
    coordinator: "Timetable Coordinator", // Add coordinator display name
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
        className={`sticky top-0 z-30 backdrop-blur-xl ${theme.headerBg} border-b ${theme.headerBorder} shadow-sm`}
      >
        <motion.div
          className="px-6 lg:px-8 py-4 flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle */}
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg ${theme.buttonBg} border ${theme.buttonBorder} ${theme.buttonText} hover:scale-105 transition-all duration-200`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div
                className={`p-1.5 rounded-lg bg-gradient-to-br ${theme.gradient}`}
              >
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-base leading-none">
                  Timely NEP
                </span>
                <span
                  className={`text-xs ${theme.mutedText} leading-none mt-0.5`}
                >
                  {roleDisplay[role] || "Dashboard"}
                </span>
              </div>
            </Link>
          </div>

          {/* Right side actions */}
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

            {/* Settings */}
            <motion.button
              className={`p-2 rounded-lg ${theme.buttonBg} border ${theme.buttonBorder} ${theme.buttonText} hover:scale-105 transition-all duration-200`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Settings"
            >
              <Settings size={16} />
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

            {/* Logout */}
            <motion.button
              onClick={handleLogout}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} ${theme.buttonHoverBorder} text-sm font-medium transition-all duration-200`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </motion.div>
      </header>

      <div className="flex w-full h-[calc(100vh-73px)] relative">
        {/* Sidebar with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`shrink-0 border-r ${theme.sidebarBorder} ${theme.sidebarBg} backdrop-blur-sm`}
            >
              <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <SidebarComponent theme={theme} isDark={isDark} />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent relative z-10">
          <motion.div
            className="px-6 lg:px-8 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Pass theme and isDark to child routes */}
            <Outlet context={{ theme, isDark }} />
          </motion.div>
        </main>

        {/* Sidebar collapse indicator */}
        {!sidebarOpen && (
          <motion.button
            onClick={() => setSidebarOpen(true)}
            className={`fixed left-4 bottom-8 z-20 p-3 rounded-full ${theme.buttonBg} border ${theme.buttonBorder} shadow-lg hover:shadow-xl transition-all duration-200`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open sidebar"
          >
            <ChevronRight size={20} className={theme.buttonText} />
          </motion.button>
        )}
      </div>
    </div>
  );
}
