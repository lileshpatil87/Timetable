import React, { useState, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ClipboardList,
  AlertTriangle,
  BookIcon,
  BookOpen,
  Puzzle,
  GraduationCap,
  Users,
  FlaskConical,
  Briefcase,
  BarChart3,
  Clock,
  LayoutGrid,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const CATEGORY_OPTIONS = [
  "Major",
  "Minor",
  "MDC",
  "AEC",
  "SEC",
  "VAC",
  "Internship",
  "Research",
];

const CATEGORY_ICONS = {
  Major: <BookIcon size={14} />,
  Minor: <BookOpen size={14} />,
  MDC: <Puzzle size={14} />,
  AEC: <GraduationCap size={14} />,
  SEC: <Users size={14} />,
  VAC: <FlaskConical size={14} />,
  Internship: <Briefcase size={14} />,
  Research: <BarChart3 size={14} />,
};

const SEED_PROGRAMS = [
  {
    code: "EDU201",
    title: "Foundations of Education",
    category: "Major",
    credits: 3,
    l: 3,
    t: 0,
    p: 0,
    duration: 60,
    lab: false,
  },
  {
    code: "CSC214",
    title: "Data Structures Lab",
    category: "SEC",
    credits: 2,
    l: 0,
    t: 0,
    p: 2,
    duration: 120,
    lab: true,
  },
  {
    code: "MDC105",
    title: "Design Thinking",
    category: "MDC",
    credits: 3,
    l: 2,
    t: 1,
    p: 0,
    duration: 60,
    lab: false,
  },
  {
    code: "AEC101",
    title: "Academic Writing",
    category: "AEC",
    credits: 2,
    l: 2,
    t: 0,
    p: 0,
    duration: 60,
    lab: false,
  },
  {
    code: "ITEP210",
    title: "Microteaching",
    category: "Major",
    credits: 2,
    l: 1,
    t: 0,
    p: 1,
    duration: 60,
    lab: true,
  },
];

function loadFilters() {
  const f = localStorage.getItem("programFilters");
  return f
    ? JSON.parse(f)
    : {
        q: "",
        cat: "All",
        minCr: "",
        maxCr: "",
        hasLab: "All",
      };
}

export default function ViewPrograms() {
  // Get theme from parent layout
  const outletContext = useOutletContext();
  const { theme: contextTheme, isDark: contextIsDark } = outletContext || {};

  const [localIsDark] = useState(false);
  const isDark = contextIsDark !== undefined ? contextIsDark : localIsDark;

  const defaultTheme = {
    bg: isDark ? "bg-slate-950" : "bg-gray-50",
    text: isDark ? "text-slate-50" : "text-gray-900",
    cardBg: isDark ? "bg-slate-900/50" : "bg-white",
    cardBorder: isDark ? "border-slate-800/60" : "border-gray-200",
    mutedText: isDark ? "text-slate-400" : "text-gray-600",
    gradient: isDark
      ? "from-indigo-400 via-purple-400 to-pink-400"
      : "from-indigo-600 via-purple-600 to-pink-600",
    accentBg: isDark ? "bg-slate-800/30" : "bg-gray-50",
    accentBorder: isDark ? "border-slate-700/40" : "border-gray-200",
    hoverBg: isDark ? "hover:bg-slate-800/50" : "hover:bg-gray-50",
    inputBg: isDark ? "bg-slate-800/50" : "bg-white",
    inputBorder: isDark ? "border-slate-700" : "border-gray-300",
    inputText: isDark ? "text-slate-100" : "text-gray-900",
    tableBorder: isDark ? "border-slate-800/60" : "border-gray-200",
    tableHeader: isDark ? "bg-slate-800/40" : "bg-gray-50",
  };

  const theme = contextTheme || defaultTheme;

  // Category colors with theme support
  const getCategoryColor = (category) => {
    const colors = {
      Major: isDark
        ? "bg-blue-500/20 text-blue-300 border-blue-400/40"
        : "bg-blue-100 text-blue-700 border-blue-200",
      Minor: isDark
        ? "bg-violet-500/20 text-violet-300 border-violet-400/40"
        : "bg-violet-100 text-violet-700 border-violet-200",
      MDC: isDark
        ? "bg-indigo-500/20 text-indigo-300 border-indigo-400/40"
        : "bg-indigo-100 text-indigo-700 border-indigo-200",
      AEC: isDark
        ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
        : "bg-emerald-100 text-emerald-700 border-emerald-200",
      SEC: isDark
        ? "bg-amber-500/20 text-amber-300 border-amber-400/40"
        : "bg-amber-100 text-amber-700 border-amber-200",
      VAC: isDark
        ? "bg-pink-500/20 text-pink-300 border-pink-400/40"
        : "bg-pink-100 text-pink-700 border-pink-200",
      Internship: isDark
        ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/40"
        : "bg-cyan-100 text-cyan-700 border-cyan-200",
      Research: isDark
        ? "bg-rose-500/20 text-rose-300 border-rose-400/40"
        : "bg-rose-100 text-rose-700 border-rose-200",
    };
    return colors[category] || "";
  };

  const [programs] = useState(SEED_PROGRAMS);
  const [filters, setFilters] = useState(loadFilters());

  useEffect(() => {
    localStorage.setItem("programFilters", JSON.stringify(filters));
  }, [filters]);

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const q = filters.q.trim().toLowerCase();
      const okQ =
        !q ||
        p.code.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q);
      const okCat = filters.cat === "All" || p.category === filters.cat;
      const okCrMin =
        filters.minCr === "" || p.credits >= Number(filters.minCr);
      const okCrMax =
        filters.maxCr === "" || p.credits <= Number(filters.maxCr);
      const okLab =
        filters.hasLab === "All" ||
        (filters.hasLab === "Yes" ? p.lab === true : p.lab === false);
      return okQ && okCat && okCrMin && okCrMax && okLab;
    });
  }, [programs, filters]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: programs.length,
      filtered: filtered.length,
      withLab: filtered.filter((p) => p.lab).length,
      avgCredits:
        filtered.length > 0
          ? (
              filtered.reduce((sum, p) => sum + p.credits, 0) / filtered.length
            ).toFixed(1)
          : 0,
    };
  }, [programs, filtered]);

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
            <h1 className="text-3xl font-bold mb-2">View Programs</h1>
            <p className={`text-sm ${theme.mutedText}`}>
              Browse all academic programs with filtering options
            </p>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Programs",
            value: stats.total,
            icon: <ClipboardList size={18} />,
            color: isDark ? "bg-indigo-500/20" : "bg-indigo-100",
            iconColor: isDark ? "text-indigo-400" : "text-indigo-600",
          },
          {
            label: "Filtered Results",
            value: stats.filtered,
            icon: <Filter size={18} />,
            color: isDark ? "bg-emerald-500/20" : "bg-emerald-100",
            iconColor: isDark ? "text-emerald-400" : "text-emerald-600",
          },
          {
            label: "With Lab",
            value: stats.withLab,
            icon: <FlaskConical size={18} />,
            color: isDark ? "bg-purple-500/20" : "bg-purple-100",
            iconColor: isDark ? "text-purple-400" : "text-purple-600",
          },
          {
            label: "Avg Credits",
            value: stats.avgCredits,
            icon: <TrendingUp size={18} />,
            color: isDark ? "bg-amber-500/20" : "bg-amber-100",
            iconColor: isDark ? "text-amber-400" : "text-amber-600",
          },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className={`rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-5 shadow-sm`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${stat.color}`}>
                <div className={stat.iconColor}>{stat.icon}</div>
              </div>
            </div>
            <div className="space-y-1">
              <p className={`text-xs ${theme.mutedText}`}>{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-base font-bold mb-5 flex items-center gap-2">
          <Filter
            size={18}
            className={isDark ? "text-indigo-600" : "text-indigo-400"}
          />
          Filter Programs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.mutedText}`}
            />
            <input
              type="search"
              placeholder="Search code/title"
              value={filters.q}
              onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
            />
          </div>

          {/* Category */}
          <div className="relative">
            <select
              value={filters.cat}
              onChange={(e) =>
                setFilters((f) => ({ ...f, cat: e.target.value }))
              }
              className={`w-full appearance-none pl-4 pr-10 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
            >
              <option>All</option>
              {CATEGORY_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <LayoutGrid
              size={16}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme.mutedText} pointer-events-none`}
            />
          </div>

          {/* Min Credits */}
          <input
            type="number"
            placeholder="Min credits"
            value={filters.minCr}
            onChange={(e) =>
              setFilters((f) => ({ ...f, minCr: e.target.value }))
            }
            className={`w-full px-4 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
          />

          {/* Max Credits */}
          <input
            type="number"
            placeholder="Max credits"
            value={filters.maxCr}
            onChange={(e) =>
              setFilters((f) => ({ ...f, maxCr: e.target.value }))
            }
            className={`w-full px-4 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
          />

          {/* Has Lab */}
          <div className="relative">
            <select
              value={filters.hasLab}
              onChange={(e) =>
                setFilters((f) => ({ ...f, hasLab: e.target.value }))
              }
              className={`w-full appearance-none pl-4 pr-10 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
            >
              <option>All</option>
              <option>Yes</option>
              <option>No</option>
            </select>
            <FlaskConical
              size={16}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme.mutedText} pointer-events-none`}
            />
          </div>
        </div>
      </motion.section>

      {/* Programs Table */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm overflow-hidden shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className={`p-5 border-b ${theme.cardBorder}`}>
          <h2 className="text-base font-bold flex items-center gap-2">
            <ClipboardList
              size={18}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            All Programs
            <span
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${theme.accentBg} border ${theme.accentBorder}`}
            >
              {filtered.length} programs
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className={theme.tableHeader}>
              <tr>
                {[
                  "Code",
                  "Title",
                  "Category",
                  "Credits",
                  "L–T–P",
                  "Duration",
                  "Lab",
                ].map((header) => (
                  <th
                    key={header}
                    className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b ${theme.tableBorder}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className={`px-4 py-12 text-center ${theme.mutedText}`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <AlertTriangle size={32} className="opacity-50" />
                      <p className="text-sm">
                        No programs match the current filters
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((p, idx) => (
                  <motion.tr
                    key={p.code}
                    className={`border-b ${theme.tableBorder} ${theme.hoverBg} transition-colors`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                  >
                    <td className="px-4 py-4 font-mono font-semibold">
                      {p.code}
                    </td>
                    <td className="px-4 py-4">{p.title}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${getCategoryColor(
                          p.category
                        )}`}
                      >
                        {CATEGORY_ICONS[p.category]} {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center font-mono font-semibold">
                      {p.credits}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        {p.l > 0 && (
                          <span
                            className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-semibold ${
                              isDark
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {p.l}L
                          </span>
                        )}
                        {p.t > 0 && (
                          <span
                            className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-semibold ${
                              isDark
                                ? "bg-purple-500/20 text-purple-300"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {p.t}T
                          </span>
                        )}
                        {p.p > 0 && (
                          <span
                            className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-semibold ${
                              isDark
                                ? "bg-emerald-500/20 text-emerald-300"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {p.p}P
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`flex items-center gap-1.5 text-sm ${theme.mutedText}`}
                      >
                        <Clock size={14} />
                        {p.duration} min
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {p.lab ? (
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${
                            isDark
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                              : "bg-emerald-100 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          <FlaskConical size={14} />
                          Lab
                        </span>
                      ) : (
                        <span className={theme.mutedText}>—</span>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}
