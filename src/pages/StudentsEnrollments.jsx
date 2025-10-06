import React, { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "../components/CustomDropdown";

import {
  Search,
  Filter,
  Users,
  BookOpen,
  GraduationCap,
  ClipboardList,
  Edit,
  Save,
  X,
  PlusCircle,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Building2,
  Layers,
  User,
  BarChart3,
  ChevronDown,
  Check,
  Sparkles,
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

const DEPARTMENTS = ["Arts", "Education", "Science", "Commerce", "Engineering"];
const YEARS = [1, 2, 3, 4];

const seedCohorts = [
  {
    code: "FYUGP-SEM2-A",
    program: "FYUGP BA",
    semester: 2,
    size: 60,
    electiveBundles: [["MDC105", "AEC101"], ["SEC120"]],
    department: "Arts",
    year: 1,
  },
  {
    code: "ITEP-SEM3-A",
    program: "ITEP B.Ed",
    semester: 3,
    size: 40,
    electiveBundles: [["EDU312"]],
    department: "Education",
    year: 2,
  },
];

const seedStudents = [
  {
    rollNo: "STU001",
    name: "Alex Kumar",
    cohort: "FYUGP-SEM2-A",
    abcID: "ABC123456789",
    electives: ["MDC105", "SEC120"],
  },
  {
    rollNo: "STU002",
    name: "Priya Sharma",
    cohort: "FYUGP-SEM2-A",
    abcID: "",
    electives: ["AEC101", "SEC120"],
  },
  {
    rollNo: "STU003",
    name: "Rahul Mehta",
    cohort: "ITEP-SEM3-A",
    abcID: "ABC987654321",
    electives: ["EDU312"],
  },
];

function loadState() {
  const c = localStorage.getItem("cohorts");
  const s = localStorage.getItem("students");
  const f = localStorage.getItem("studentFilters");
  return {
    cohorts: c ? JSON.parse(c) : seedCohorts,
    students: s ? JSON.parse(s) : seedStudents,
    filters: f
      ? JSON.parse(f)
      : {
          q: "",
          cat: "All",
          dept: "All",
          year: "All",
          sem: "",
          abcOnly: false,
        },
  };
}

export default function StudentsEnrollments() {
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
    modalBg: isDark ? "bg-white" : "bg-slate-900",
    modalOverlay: isDark ? "bg-gray-900/40" : "bg-slate-950/70",
    tableBorder: isDark ? "border-gray-200" : "border-slate-800/60",
    tableHeader: isDark ? "bg-gray-50" : "bg-slate-800/40",
  };

  const theme = contextTheme || defaultTheme;

  // State management
  const [{ cohorts, students, filters }, setState] = useState(loadState());
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [editCohort, setEditCohort] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);

  // Update localStorage
  useEffect(() => {
    localStorage.setItem("cohorts", JSON.stringify(cohorts));
  }, [cohorts]);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("studentFilters", JSON.stringify(filters));
  }, [filters]);

  // Filters helper
  const setFilters = (updater) => {
    setState((s) => ({
      ...s,
      filters: typeof updater === "function" ? updater(s.filters) : updater,
    }));
  };

  // Filter students
  const filtered = useMemo(() => {
    return students.filter((st) => {
      const q = filters.q.trim().toLowerCase();
      const okQ =
        !q ||
        st.rollNo.toLowerCase().includes(q) ||
        st.name.toLowerCase().includes(q) ||
        st.cohort.toLowerCase().includes(q);

      const cohort = cohorts.find((c) => c.code === st.cohort);
      const okDept =
        filters.dept === "All" || cohort?.department === filters.dept;
      const okYear =
        filters.year === "All" || String(cohort?.year) === String(filters.year);
      const okSem =
        filters.sem === "" || cohort?.semester === Number(filters.sem);
      const okABC = !filters.abcOnly || st.abcID.trim() !== "";

      return okQ && okDept && okYear && okSem && okABC;
    });
  }, [students, cohorts, filters]);

  // Open cohort editor
  const openCohort = (c) => {
    setSelectedCohort(c);
    setEditCohort(JSON.parse(JSON.stringify(c)));
  };

  // Save cohort
  const saveCohort = () => {
    const errs = [];
    if (!editCohort.code.trim()) errs.push("Cohort code is required.");
    if (!editCohort.program.trim()) errs.push("Program is required.");
    if (editCohort.size <= 0) errs.push("Size must be positive.");
    if (errs.length) {
      alert(errs.join("\n"));
      return;
    }

    setState((s) => ({
      ...s,
      cohorts: s.cohorts.map((c) =>
        c.code === editCohort.code ? editCohort : c
      ),
    }));
    setSelectedCohort(null);
    setEditCohort(null);
  };

  // Open student editor
  const openStudent = (st) => {
    setSelectedStudent(st);
    setEditStudent(JSON.parse(JSON.stringify(st)));
  };

  // Save student
  const saveStudent = () => {
    const errs = [];
    if (!editStudent.rollNo.trim()) errs.push("Roll number is required.");
    if (!editStudent.name.trim()) errs.push("Name is required.");
    if (!editStudent.cohort.trim()) errs.push("Cohort is required.");
    if (errs.length) {
      alert(errs.join("\n"));
      return;
    }

    setState((s) => ({
      ...s,
      students: s.students.map((st) =>
        st.rollNo === editStudent.rollNo ? editStudent : st
      ),
    }));
    setSelectedStudent(null);
    setEditStudent(null);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Major: isDark
        ? "bg-blue-100 text-blue-700 border-blue-200"
        : "bg-blue-500/20 text-blue-300 border-blue-400/40",
      Minor: isDark
        ? "bg-purple-100 text-purple-700 border-purple-200"
        : "bg-purple-500/20 text-purple-300 border-purple-400/40",
      MDC: isDark
        ? "bg-green-100 text-green-700 border-green-200"
        : "bg-green-500/20 text-green-300 border-green-400/40",
      AEC: isDark
        ? "bg-amber-100 text-amber-700 border-amber-200"
        : "bg-amber-500/20 text-amber-300 border-amber-400/40",
    };
    return (
      colors[category] ||
      (isDark
        ? "bg-gray-100 text-gray-700 border-gray-200"
        : "bg-slate-500/20 text-slate-300 border-slate-400/40")
    );
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
            <h1 className="text-3xl font-bold mb-2">Students & Enrollments</h1>
            <p className={`text-sm ${theme.mutedText}`}>
              Manage cohorts, elective bundles, ABC IDs, and view enrollment
              matrix to spot clash risks
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-base font-bold mb-5 flex items-center gap-2">
          <Filter
            size={18}
            className={isDark ? "text-indigo-600" : "text-indigo-400"}
          />
          Filter Students
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search
              size={16}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.mutedText}`}
            />
            <input
              type="search"
              placeholder="Name, roll no, or cohort"
              value={filters.q}
              onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
            />
          </div>

          {/* Department Filter */}
          <CustomDropdown
            name="department"
            id="filter-department"
            value={filters.dept}
            onChange={(e) =>
              setFilters((f) => ({ ...f, dept: e.target.value }))
            }
            options={["All", ...DEPARTMENTS]}
            theme={isDark ? "dark" : "light"}
            placeholder="Department"
          />

          {/* Year Filter */}
          <CustomDropdown
            name="year"
            id="filter-year"
            value={filters.year}
            onChange={(e) =>
              setFilters((f) => ({ ...f, year: e.target.value }))
            }
            options={["All", ...YEARS.map(String)]}
            theme={isDark ? "dark" : "light"}
            placeholder="Year"
          />

          {/* ABC ID Filter */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.abcOnly}
              onChange={(e) =>
                setFilters((f) => ({ ...f, abcOnly: e.target.checked }))
              }
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium">ABC ID only</span>
          </label>
        </div>
      </motion.section>

      {/* Cohorts Table */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm overflow-hidden shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div
          className={`p-5 border-b ${theme.cardBorder} flex items-center justify-between`}
        >
          <h2 className="text-base font-bold flex items-center gap-2">
            <Users
              size={18}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            Cohorts
          </h2>
          <span
            className={`px-3 py-1 text-xs rounded-lg font-semibold ${theme.accentBg} border ${theme.accentBorder}`}
          >
            {cohorts.length} cohorts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className={theme.tableHeader}>
              <tr>
                {[
                  "Cohort",
                  "Program",
                  "Department",
                  "Year",
                  "Semester",
                  "Size",
                  "Bundles",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b ${theme.tableBorder}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohorts.map((c, idx) => (
                <motion.tr
                  key={c.code}
                  className={`border-b ${theme.tableBorder} ${theme.hoverBg} transition-colors`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <td className="px-4 py-4 font-semibold">{c.code}</td>
                  <td className="px-4 py-4">{c.program}</td>
                  <td className="px-4 py-4">{c.department}</td>
                  <td className="px-4 py-4">{c.year}</td>
                  <td className="px-4 py-4">{c.semester}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${theme.accentBg} border ${theme.accentBorder}`}
                    >
                      {c.size}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-sm ${theme.mutedText}`}>
                      {(c.electiveBundles || []).length} bundles
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <motion.button
                      onClick={() => openCohort(c)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                        !isDark
                          ? "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200"
                          : "bg-indigo-500/20 text-indigo-300 border-indigo-400/40 hover:bg-indigo-500/30"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit size={14} />
                      Edit
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Students Table */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm overflow-hidden shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div
          className={`p-5 border-b ${theme.cardBorder} flex items-center justify-between`}
        >
          <h2 className="text-base font-bold flex items-center gap-2">
            <User
              size={18}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            Students
          </h2>
          <span
            className={`px-3 py-1 text-xs rounded-lg font-semibold ${theme.accentBg} border ${theme.accentBorder}`}
          >
            {filtered.length} students
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className={theme.tableHeader}>
              <tr>
                {[
                  "Roll No",
                  "Name",
                  "Cohort",
                  "ABC ID",
                  "Electives",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b ${theme.tableBorder}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((st, idx) => (
                <motion.tr
                  key={st.rollNo}
                  className={`border-b ${theme.tableBorder} ${theme.hoverBg} transition-colors`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <td className="px-4 py-4 font-semibold">{st.rollNo}</td>
                  <td className="px-4 py-4">{st.name}</td>
                  <td className="px-4 py-4">{st.cohort}</td>
                  <td className="px-4 py-4">
                    {st.abcID ? (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${
                          isDark
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                        }`}
                      >
                        <CheckCircle size={14} />
                        {st.abcID}
                      </span>
                    ) : (
                      <span className={`text-sm ${theme.mutedText}`}>—</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-sm ${theme.mutedText}`}>
                      {st.electives.length} selected
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <motion.button
                      onClick={() => openStudent(st)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                        !isDark
                          ? "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200"
                          : "bg-indigo-500/20 text-indigo-300 border-indigo-400/40 hover:bg-indigo-500/30"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit size={14} />
                      Edit
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}
