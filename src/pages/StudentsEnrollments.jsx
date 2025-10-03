import React, { useEffect, useMemo, useState, Component } from "react";
import {
  SearchIcon,
  FilterIcon,
  UsersIcon,
  BookOpenIcon,
  GraduationCapIcon,
  ClipboardListIcon,
  EditIcon,
  SaveIcon,
  XIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  CalendarIcon,
  BuildingIcon,
  LayersIcon,
  UserIcon,
  BarChartIcon,
  ChevronDownIcon,
  CheckIcon,
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
// Extract departments from programs
const DEPARTMENTS = ["Arts", "Education", "Science", "Commerce", "Engineering"];
// Extract years from cohorts
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
    program: "ITEP B.Ed.",
    semester: 3,
    size: 50,
    electiveBundles: [["EDU201", "MDC105"], ["SEC130"]],
    department: "Education",
    year: 2,
  },
  {
    code: "BSC-SEM4-B",
    program: "BSc Physics",
    semester: 4,
    size: 45,
    electiveBundles: [["PHY240", "MDC205"], ["SEC140"]],
    department: "Science",
    year: 2,
  },
  {
    code: "BCOM-SEM6-A",
    program: "BCom Honors",
    semester: 6,
    size: 55,
    electiveBundles: [["COM301", "AEC201"], ["SEC220"]],
    department: "Commerce",
    year: 3,
  },
  {
    code: "BTECH-SEM8-A",
    program: "BTech CSE",
    semester: 8,
    size: 40,
    electiveBundles: [["CSE401", "MDC305"], ["SEC330"]],
    department: "Engineering",
    year: 4,
  },
];
const seedStudents = [
  {
    rollNo: "S001",
    name: "Ananya",
    cohort: "FYUGP-SEM2-A",
    ABCId: "ABC-1234",
    electives: ["MDC105", "AEC101"],
    totalCredits: 22,
    department: "Arts",
    year: 1,
    semester: 2,
    program: "FYUGP BA",
  },
  {
    rollNo: "S002",
    name: "Rohan",
    cohort: "ITEP-SEM3-A",
    ABCId: "",
    electives: ["EDU201", "SEC130"],
    totalCredits: 20,
    department: "Education",
    year: 2,
    semester: 3,
    program: "ITEP B.Ed.",
  },
  {
    rollNo: "S003",
    name: "Priya",
    cohort: "BSC-SEM4-B",
    ABCId: "ABC-2345",
    electives: ["PHY240", "SEC140"],
    totalCredits: 24,
    department: "Science",
    year: 2,
    semester: 4,
    program: "BSc Physics",
  },
  {
    rollNo: "S004",
    name: "Arjun",
    cohort: "BCOM-SEM6-A",
    ABCId: "ABC-3456",
    electives: ["COM301", "AEC201"],
    totalCredits: 21,
    department: "Commerce",
    year: 3,
    semester: 6,
    program: "BCom Honors",
  },
  {
    rollNo: "S005",
    name: "Neha",
    cohort: "BTECH-SEM8-A",
    ABCId: "",
    electives: ["CSE401", "MDC305"],
    totalCredits: 25,
    department: "Engineering",
    year: 4,
    semester: 8,
    program: "BTech CSE",
  },
];
const seedCourses = [
  {
    code: "EDU201",
    title: "Foundations of Education",
    category: "Major",
  },
  {
    code: "MDC105",
    title: "Design Thinking",
    category: "MDC",
  },
  {
    code: "AEC101",
    title: "Academic Writing",
    category: "AEC",
  },
  {
    code: "SEC130",
    title: "Digital Skills",
    category: "SEC",
  },
  {
    code: "PHY240",
    title: "Quantum Mechanics",
    category: "Major",
  },
  {
    code: "MDC205",
    title: "Critical Thinking",
    category: "MDC",
  },
  {
    code: "SEC140",
    title: "Data Analysis",
    category: "SEC",
  },
  {
    code: "COM301",
    title: "Financial Accounting",
    category: "Major",
  },
  {
    code: "AEC201",
    title: "Professional Communication",
    category: "AEC",
  },
  {
    code: "SEC220",
    title: "Business Analytics",
    category: "SEC",
  },
  {
    code: "CSE401",
    title: "Machine Learning",
    category: "Major",
  },
  {
    code: "MDC305",
    title: "Innovation & Entrepreneurship",
    category: "MDC",
  },
  {
    code: "SEC330",
    title: "Cloud Computing",
    category: "SEC",
  },
];
// Category colors for badges
const CATEGORY_COLORS = {
  Major: "bg-blue-500/20 text-blue-300 border-blue-400/40",
  Minor: "bg-purple-500/20 text-purple-300 border-purple-400/40",
  MDC: "bg-green-500/20 text-green-300 border-green-400/40",
  AEC: "bg-amber-500/20 text-amber-300 border-amber-400/40",
  SEC: "bg-pink-500/20 text-pink-300 border-pink-400/40",
  VAC: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40",
  Internship: "bg-orange-500/20 text-orange-300 border-orange-400/40",
  Research: "bg-indigo-500/20 text-indigo-300 border-indigo-400/40",
};
// Category icons
const CATEGORY_ICONS = {
  Major: <BookOpenIcon size={14} />,
  Minor: <LayersIcon size={14} />,
  MDC: <GraduationCapIcon size={14} />,
  AEC: <ClipboardListIcon size={14} />,
  SEC: <BarChartIcon size={14} />,
  VAC: <CalendarIcon size={14} />,
  Internship: <BuildingIcon size={14} />,
  Research: <SearchIcon size={14} />,
};
function loadState() {
  const c = localStorage.getItem("cohorts");
  const s = localStorage.getItem("students");
  const e = localStorage.getItem("enrollments");
  // If we have cohorts but they don't have department and year, add those fields
  let cohorts = c ? JSON.parse(c) : seedCohorts;
  if (c) {
    cohorts = cohorts.map((cohort) => {
      if (!cohort.department || !cohort.year) {
        // Extract department and year from program or code if possible
        const deptMatch = cohort.program.match(
          /(Arts|Education|Science|Commerce|Engineering)/i
        );
        const yearMatch = cohort.code.match(/SEM(\d+)/i);
        return {
          ...cohort,
          department: deptMatch ? deptMatch[1] : "Other",
          year: yearMatch ? Math.ceil(parseInt(yearMatch[1]) / 2) : 1,
        };
      }
      return cohort;
    });
  }
  // If we have students but they don't have department, year, etc., add those fields
  let students = s ? JSON.parse(s) : seedStudents;
  if (s) {
    students = students.map((student) => {
      const cohort = cohorts.find((c) => c.code === student.cohort);
      if (cohort) {
        return {
          ...student,
          department: student.department || cohort.department,
          year: student.year || cohort.year,
          semester: student.semester || cohort.semester,
          program: student.program || cohort.program,
        };
      }
      return student;
    });
  }
  return {
    cohorts,
    students,
    enrollments: e
      ? JSON.parse(e)
      : [
          {
            courseCode: "EDU201",
            cohortCode: "ITEP-SEM3-A",
            count: 50,
          },
          {
            courseCode: "MDC105",
            cohortCode: "FYUGP-SEM2-A",
            count: 40,
          },
          {
            courseCode: "AEC101",
            cohortCode: "FYUGP-SEM2-A",
            count: 35,
          },
          {
            courseCode: "SEC130",
            cohortCode: "ITEP-SEM3-A",
            count: 20,
          },
          {
            courseCode: "PHY240",
            cohortCode: "BSC-SEM4-B",
            count: 45,
          },
          {
            courseCode: "SEC140",
            cohortCode: "BSC-SEM4-B",
            count: 30,
          },
          {
            courseCode: "COM301",
            cohortCode: "BCOM-SEM6-A",
            count: 55,
          },
          {
            courseCode: "SEC220",
            cohortCode: "BCOM-SEM6-A",
            count: 25,
          },
          {
            courseCode: "CSE401",
            cohortCode: "BTECH-SEM8-A",
            count: 40,
          },
          {
            courseCode: "SEC330",
            cohortCode: "BTECH-SEM8-A",
            count: 35,
          },
        ],
  };
}
export default function StudentsEnrollments() {
  const [{ cohorts, students, enrollments }, setState] = useState(loadState());
  const [filters, setFilters] = useState({
    q: "",
    cat: "All",
    abc: "All",
    year: "All",
    semester: "All",
    program: "All",
    department: "All",
  });
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [editCohort, setEditCohort] = useState(null);
  const [editCell, setEditCell] = useState(null); // { courseCode, cohortCode, count }
  // Extract unique programs from cohorts
  const programs = useMemo(() => {
    const uniquePrograms = new Set(cohorts.map((c) => c.program));
    return Array.from(uniquePrograms);
  }, [cohorts]);
  // Extract unique semesters from cohorts
  const semesters = useMemo(() => {
    const uniqueSemesters = new Set(cohorts.map((c) => c.semester));
    return Array.from(uniqueSemesters).sort((a, b) => a - b);
  }, [cohorts]);
  useEffect(() => {
    localStorage.setItem("cohorts", JSON.stringify(cohorts));
  }, [cohorts]);
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);
  useEffect(() => {
    localStorage.setItem("enrollments", JSON.stringify(enrollments));
  }, [enrollments]);
  const courseList = useMemo(() => seedCourses, []);
  const cohortMap = useMemo(
    () => Object.fromEntries(cohorts.map((c) => [c.code, c])),
    [cohorts]
  );
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const q = filters.q.trim().toLowerCase();
      const okQ =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.rollNo.toLowerCase().includes(q) ||
        s.cohort.toLowerCase().includes(q);
      const okABC =
        filters.abc === "All" ||
        (filters.abc === "HasABC" ? !!s.ABCId : !s.ABCId);
      const okCat =
        filters.cat === "All" ||
        s.electives.some(
          (e) => courseList.find((c) => c.code === e)?.category === filters.cat
        );
      const okYear =
        filters.year === "All" || s.year === parseInt(filters.year);
      const okSemester =
        filters.semester === "All" || s.semester === parseInt(filters.semester);
      const okProgram =
        filters.program === "All" || s.program === filters.program;
      const okDepartment =
        filters.department === "All" || s.department === filters.department;
      return (
        okQ &&
        okABC &&
        okCat &&
        okYear &&
        okSemester &&
        okProgram &&
        okDepartment
      );
    });
  }, [students, filters, courseList]);
  const matrixCourses = useMemo(
    () => courseList.map((c) => c.code),
    [courseList]
  );
  const matrixCohorts = useMemo(() => cohorts.map((c) => c.code), [cohorts]);
  const matrix = useMemo(() => {
    const map = {};
    enrollments.forEach((e) => {
      map[`${e.courseCode}|${e.cohortCode}`] = e.count;
    });
    return map;
  }, [enrollments]);
  const clashWarnings = useMemo(() => {
    const warn = new Set();
    cohorts.forEach((c) => {
      const codes = new Set((c.electiveBundles || []).flat());
      if (codes.size >= 3) warn.add(c.code);
    });
    return warn;
  }, [cohorts]);
  const openCohort = (c) => {
    setSelectedCohort(c);
    setEditCohort(JSON.parse(JSON.stringify(c)));
  };
  const saveCohort = () => {
    const errs = [];
    if (!editCohort.code.trim()) errs.push("Cohort code is required.");
    if (!editCohort.program.trim()) errs.push("Program is required.");
    if (!editCohort.semester || editCohort.semester < 1)
      errs.push("Semester must be at least 1.");
    if (!editCohort.size || editCohort.size < 1)
      errs.push("Cohort size must be positive.");
    if (!editCohort.department) errs.push("Department is required.");
    if (!editCohort.year || editCohort.year < 1)
      errs.push("Year must be at least 1.");
    if (errs.length) {
      alert(errs.join("\n"));
      return;
    }
    setState((s) => ({
      ...s,
      cohorts: s.cohorts.map((x) =>
        x.code === selectedCohort.code ? editCohort : x
      ),
    }));
    setSelectedCohort(null);
    setEditCohort(null);
  };
  const addBundle = () =>
    setEditCohort((c) => ({
      ...c,
      electiveBundles: [...(c.electiveBundles || []), []],
    }));
  const updateBundle = (i, arr) =>
    setEditCohort((c) => {
      const next = [...(c.electiveBundles || [])];
      next[i] = arr;
      return {
        ...c,
        electiveBundles: next,
      };
    });
  const removeBundle = (i) =>
    setEditCohort((c) => {
      const next = [...(c.electiveBundles || [])];
      next.splice(i, 1);
      return {
        ...c,
        electiveBundles: next,
      };
    });
  const openEditCell = (courseCode, cohortCode) => {
    const key = `${courseCode}|${cohortCode}`;
    setEditCell({
      courseCode,
      cohortCode,
      count: matrix[key] || 0,
    });
  };
  const saveCell = () => {
    setState((s) => {
      const key = `${editCell.courseCode}|${editCell.cohortCode}`;
      const others = s.enrollments.filter(
        (e) => `${e.courseCode}|${e.cohortCode}` !== key
      );
      return {
        ...s,
        enrollments: [
          ...others,
          {
            courseCode: editCell.courseCode,
            cohortCode: editCell.cohortCode,
            count: Number(editCell.count),
          },
        ],
      };
    });
    setEditCell(null);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
      
      {/* Page Header */}
      <div className="max-w-[1280px] mx-auto px-6 pb-6">
        <h1 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Students & Enrollments
        </h1>
        <p className="text-slate-400">
          Manage cohorts, elective bundles, ABC IDs, and view an enrollment
          matrix to spot clash risks.
        </p>
      </div>
      <main className="max-w-[1280px] mx-auto px-6 pb-16 space-y-6">
        {/* Advanced Filters */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm"
          aria-labelledby="filters-title"
        >
          <h2
            id="filters-title"
            className="text-base font-bold mb-4 flex items-center gap-2"
          >
            <FilterIcon size={18} className="text-indigo-400" />
            <span>Filter Students</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                <SearchIcon size={16} />
              </div>
              <input
                type="search"
                placeholder="Name, roll no, or cohort"
                value={filters.q}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    q: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={filters.cat}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    cat: e.target.value,
                  }))
                }
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>All</option>
                {CATEGORY_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <BookOpenIcon size={16} />
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <ChevronDownIcon size={16} />
              </div>
            </div>
            <div className="relative">
              <select
                value={filters.abc}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    abc: e.target.value,
                  }))
                }
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>All</option>
                <option value="HasABC">Has ABC ID</option>
                <option value="NoABC">No ABC ID</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <UserIcon size={16} />
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <ChevronDownIcon size={16} />
              </div>
            </div>
            <div className="relative">
              <select
                value={filters.year}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    year: e.target.value,
                  }))
                }
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>All</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    Year {y}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <CalendarIcon size={16} />
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <ChevronDownIcon size={16} />
              </div>
            </div>
            <div className="relative">
              <select
                value={filters.semester}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    semester: e.target.value,
                  }))
                }
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>All</option>
                {semesters.map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <BookOpenIcon size={16} />
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <ChevronDownIcon size={16} />
              </div>
            </div>
            <div className="relative">
              <select
                value={filters.program}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    program: e.target.value,
                  }))
                }
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>All</option>
                {programs.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <GraduationCapIcon size={16} />
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <ChevronDownIcon size={16} />
              </div>
            </div>
            <div className="relative">
              <select
                value={filters.department}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    department: e.target.value,
                  }))
                }
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>All</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <BuildingIcon size={16} />
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <ChevronDownIcon size={16} />
              </div>
            </div>
          </div>
        </section>
        {/* Cohorts */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg backdrop-blur-sm">
          <div className="p-5 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-base font-bold flex items-center gap-2">
              <UsersIcon size={18} className="text-indigo-400" />
              <span>Cohorts</span>
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-300">
                {cohorts.length} cohorts
              </span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <caption className="sr-only">
                Cohorts with elective bundles and sizes
              </caption>
              <thead className="text-slate-300 bg-slate-800/50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Cohort
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Program
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Year
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Semester
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Bundles
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {cohorts.map((c) => (
                  <tr
                    key={c.code}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-4 py-3.5 text-white font-medium">
                      {c.code}
                    </td>
                    <td className="px-4 py-3.5">{c.program}</td>
                    <td className="px-4 py-3.5">{c.department}</td>
                    <td className="px-4 py-3.5">{c.year}</td>
                    <td className="px-4 py-3.5">{c.semester}</td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-800 text-white font-medium">
                        {c.size}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {(c.electiveBundles || []).map((b, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-full bg-slate-800/70 px-2 py-0.5 text-xs"
                          >
                            {b.join(", ") || "-"}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-400/40 px-3 py-1.5 text-xs font-medium transition-colors"
                        onClick={() => openCohort(c)}
                        aria-haspopup="dialog"
                      >
                        <EditIcon size={14} />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Students */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg backdrop-blur-sm">
          <div className="p-5 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-base font-bold flex items-center gap-2">
              <GraduationCapIcon size={18} className="text-indigo-400" />
              <span>Students</span>
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-300">
                {filteredStudents.length} students
              </span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <caption className="sr-only">
                Student list with ABC IDs and electives
              </caption>
              <thead className="text-slate-300 bg-slate-800/50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Roll No
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Program
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Year/Sem
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    ABC ID
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Electives
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Credits
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s) => (
                    <tr
                      key={s.rollNo}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        !s.ABCId ? "bg-amber-500/10" : ""
                      }`}
                    >
                      <td className="px-4 py-3.5 font-medium">{s.rollNo}</td>
                      <td className="px-4 py-3.5 text-white">{s.name}</td>
                      <td className="px-4 py-3.5">{s.department}</td>
                      <td className="px-4 py-3.5">{s.program}</td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium bg-slate-800/70 border-slate-700">
                          Y{s.year}/S{s.semester}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        {s.ABCId ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium bg-green-500/20 text-green-300 border-green-400/40">
                            <CheckCircleIcon size={14} />
                            {s.ABCId}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium bg-amber-500/20 text-amber-300 border-amber-400/40">
                            <AlertTriangleIcon size={14} />
                            Missing
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {s.electives.map((code) => {
                            const course = courseList.find(
                              (c) => c.code === code
                            );
                            const category = course
                              ? course.category
                              : "Unknown";
                            const colorClass =
                              CATEGORY_COLORS[category] ||
                              "bg-slate-500/20 text-slate-300 border-slate-400/40";
                            const icon = CATEGORY_ICONS[category] || (
                              <BookOpenIcon size={14} />
                            );
                            return (
                              <span
                                key={code}
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${colorClass}`}
                                title={
                                  course
                                    ? `${course.title} (${category})`
                                    : code
                                }
                              >
                                {icon}
                                {code}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium bg-indigo-500/20 text-indigo-300 border-indigo-400/40">
                          {s.totalCredits}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-8 text-center text-slate-400"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertTriangleIcon
                          size={24}
                          className="text-slate-500"
                        />
                        <p>
                          No students match your filters. Try adjusting your
                          criteria.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        {/* Enrollment Matrix */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg backdrop-blur-sm">
          <div className="p-5 border-b border-slate-800">
            <h2 className="text-base font-bold flex items-center gap-2">
              <BarChartIcon size={18} className="text-indigo-400" />
              <span>Enrollment Matrix</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Course × Cohort enrollment counts with clash warnings
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <caption className="sr-only">
                Course × Cohort enrollment counts with clash warnings
              </caption>
              <thead className="text-slate-300 bg-slate-800/50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Course
                  </th>
                  {matrixCohorts.map((cc) => (
                    <th
                      scope="col"
                      key={cc}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      <span className="inline-flex items-center gap-1">
                        {cc}
                        {clashWarnings.has(cc) ? (
                          <span
                            className="text-amber-400"
                            title="Potential elective clashes"
                          >
                            <AlertTriangleIcon size={14} />
                          </span>
                        ) : null}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {matrixCourses.map((code) => {
                  const course = courseList.find((c) => c.code === code);
                  const category = course ? course.category : "Unknown";
                  const colorClass =
                    CATEGORY_COLORS[category] ||
                    "bg-slate-500/20 text-slate-300 border-slate-400/40";
                  return (
                    <tr
                      key={code}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <th scope="row" className="px-4 py-3.5 text-left">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${colorClass}`}
                        >
                          {CATEGORY_ICONS[category] || (
                            <BookOpenIcon size={14} />
                          )}
                          {code}
                        </span>
                      </th>
                      {matrixCohorts.map((cc) => {
                        const key = `${code}|${cc}`;
                        const val = matrix[key] || 0;
                        const cohort = cohortMap[cc];
                        const maxCapacity = cohort ? cohort.size : 0;
                        const capacityRatio =
                          maxCapacity > 0 ? val / maxCapacity : 0;
                        let bgColorClass = "bg-slate-800";
                        if (val > 0) {
                          if (capacityRatio > 0.9) {
                            bgColorClass = "bg-red-900/30";
                          } else if (capacityRatio > 0.7) {
                            bgColorClass = "bg-amber-900/30";
                          } else if (capacityRatio > 0.4) {
                            bgColorClass = "bg-green-900/30";
                          } else {
                            bgColorClass = "bg-blue-900/30";
                          }
                        }
                        return (
                          <td key={key} className="px-4 py-3.5">
                            <button
                              className={`w-full rounded border border-slate-700 ${bgColorClass} px-3 py-2 text-center hover:bg-slate-700/50 transition-colors`}
                              onClick={() => openEditCell(code, cc)}
                              aria-label={`Edit count for ${code} in ${cc}`}
                            >
                              {val}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        {/* Cohort Editor */}
        {editCohort && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={() => {
                setSelectedCohort(null);
                setEditCohort(null);
              }}
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <div className="w-screen max-w-2xl animate-fadeIn">
                <div className="h-full flex flex-col rounded-l-2xl border border-slate-700 bg-slate-900 shadow-xl">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400">
                          <UsersIcon size={16} />
                        </span>
                        <h2 className="text-lg font-bold">Edit Cohort</h2>
                      </div>
                      <p className="text-slate-300">{editCohort.code}</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCohort(null);
                        setEditCohort(null);
                      }}
                      className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-slate-800/70 text-slate-400 hover:text-white transition-colors"
                      aria-label="Close"
                    >
                      <XIcon size={18} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        saveCohort();
                      }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <LabeledInput
                          label="Cohort Code"
                          value={editCohort.code}
                          onChange={(v) =>
                            setEditCohort({
                              ...editCohort,
                              code: v,
                            })
                          }
                          icon={
                            <UsersIcon size={16} className="text-slate-400" />
                          }
                          required
                        />
                        <LabeledInput
                          label="Program"
                          value={editCohort.program}
                          onChange={(v) =>
                            setEditCohort({
                              ...editCohort,
                              program: v,
                            })
                          }
                          icon={
                            <GraduationCapIcon
                              size={16}
                              className="text-slate-400"
                            />
                          }
                          required
                        />
                        <div className="space-y-1.5">
                          <label className="block text-sm font-medium text-slate-300">
                            Department
                          </label>
                          <div className="relative">
                            <select
                              value={editCohort.department}
                              onChange={(e) =>
                                setEditCohort({
                                  ...editCohort,
                                  department: e.target.value,
                                })
                              }
                              className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                              required
                            >
                              <option value="">Select Department</option>
                              {DEPARTMENTS.map((d) => (
                                <option key={d} value={d}>
                                  {d}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                              <BuildingIcon size={16} />
                            </div>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                              <ChevronDownIcon size={16} />
                            </div>
                          </div>
                        </div>
                        <LabeledNumber
                          label="Year"
                          value={editCohort.year}
                          onChange={(v) =>
                            setEditCohort({
                              ...editCohort,
                              year: Number(v),
                            })
                          }
                          icon={
                            <CalendarIcon
                              size={16}
                              className="text-slate-400"
                            />
                          }
                          min={1}
                          max={4}
                        />
                        <LabeledNumber
                          label="Semester"
                          value={editCohort.semester}
                          onChange={(v) =>
                            setEditCohort({
                              ...editCohort,
                              semester: Number(v),
                            })
                          }
                          icon={
                            <BookOpenIcon
                              size={16}
                              className="text-slate-400"
                            />
                          }
                          min={1}
                          max={8}
                        />
                        <LabeledNumber
                          label="Size"
                          value={editCohort.size}
                          onChange={(v) =>
                            setEditCohort({
                              ...editCohort,
                              size: Number(v),
                            })
                          }
                          icon={
                            <UsersIcon size={16} className="text-slate-400" />
                          }
                          min={1}
                        />
                      </div>
                      <fieldset className="rounded-xl border border-slate-700 p-5 bg-slate-800/20">
                        <legend className="px-2 text-sm font-medium text-slate-300">
                          Elective Bundles
                        </legend>
                        <p className="text-sm text-slate-400 mb-4">
                          Group courses that can be selected together as
                          electives
                        </p>
                        {(editCohort.electiveBundles || []).map((bundle, i) => (
                          <div
                            key={i}
                            className="mb-4 grid grid-cols-1 gap-3 items-start border border-slate-800 rounded-lg p-3 bg-slate-800/30"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium text-slate-300">
                                Bundle {i + 1}
                              </h4>
                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/40 px-3 py-1 text-xs font-medium transition-colors"
                                onClick={() => removeBundle(i)}
                              >
                                <XIcon size={14} />
                                Remove
                              </button>
                            </div>
                            <ComboboxMulti
                              id={`bundle-${i}`}
                              options={courseList.map((c) => ({
                                value: c.code,
                                label: `${c.code} — ${c.title} (${c.category})`,
                              }))}
                              value={bundle}
                              onChange={(arr) => updateBundle(i, arr)}
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          className="mt-2 px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors flex items-center gap-2"
                          onClick={addBundle}
                        >
                          <PlusCircleIcon size={16} />
                          Add Bundle
                        </button>
                      </fieldset>
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCohort(null);
                            setEditCohort(null);
                          }}
                          className="px-5 py-2.5 rounded-lg border border-slate-700 text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
                        >
                          <XIcon size={16} />
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-lg shadow-indigo-900/30 hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center gap-2"
                        >
                          <SaveIcon size={16} />
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Edit Cell Dialog */}
        {editCell && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={() => setEditCell(null)}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
                <div className="border-b border-slate-800 px-5 py-4">
                  <h2 className="text-lg font-bold">Edit Enrollment Count</h2>
                  <div className="mt-1 flex items-center gap-2">
                    {(() => {
                      const course = courseList.find(
                        (c) => c.code === editCell.courseCode
                      );
                      const category = course ? course.category : "Unknown";
                      const colorClass =
                        CATEGORY_COLORS[category] ||
                        "bg-slate-500/20 text-slate-300 border-slate-400/40";
                      return (
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${colorClass}`}
                        >
                          {CATEGORY_ICONS[category] || (
                            <BookOpenIcon size={14} />
                          )}
                          {editCell.courseCode}
                        </span>
                      );
                    })()}
                    <span className="text-slate-400">×</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium bg-indigo-500/20 text-indigo-300 border-indigo-400/40">
                      <UsersIcon size={14} />
                      {editCell.cohortCode}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Enrollment Count
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <UsersIcon size={16} />
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={editCell.count}
                        onChange={(e) =>
                          setEditCell({
                            ...editCell,
                            count: Number(e.target.value),
                          })
                        }
                        className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      {(() => {
                        const cohort = cohortMap[editCell.cohortCode];
                        if (cohort) {
                          const maxCapacity = cohort.size;
                          const percentFilled = Math.round(
                            (editCell.count / maxCapacity) * 100
                          );
                          let statusText = "Low enrollment";
                          let statusClass = "text-blue-400";
                          if (percentFilled > 90) {
                            statusText = "Near capacity";
                            statusClass = "text-red-400";
                          } else if (percentFilled > 70) {
                            statusText = "High enrollment";
                            statusClass = "text-amber-400";
                          } else if (percentFilled > 40) {
                            statusText = "Moderate enrollment";
                            statusClass = "text-green-400";
                          }
                          return (
                            <>
                              <span className={statusClass}>{statusText}</span>:{" "}
                              {editCell.count} of {maxCapacity} seats (
                              {percentFilled}%)
                            </>
                          );
                        }
                        return null;
                      })()}
                    </p>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-lg border border-slate-700 text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
                      onClick={() => setEditCell(null)}
                    >
                      <XIcon size={16} />
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-lg shadow-indigo-900/30 hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center gap-2"
                      onClick={saveCell}
                    >
                      <SaveIcon size={16} />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
// Helper Components
function LabeledInput({
  label,
  value,
  onChange,
  icon,
  placeholder,
  required = false,
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border border-slate-700 bg-slate-800/70 ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all`}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
}
function LabeledNumber({ label, value, onChange, icon, min, max }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          className={`w-full rounded-lg border border-slate-700 bg-slate-800/70 ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all`}
          required
        />
      </div>
    </div>
  );
}
// Accessible multi-select combobox
function ComboboxMulti({ id, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      options.filter((o) => o.label.toLowerCase().includes(q.toLowerCase())),
    [options, q]
  );
  const toggle = (val) => {
    const set = new Set(value);
    if (set.has(val)) set.delete(val);
    else set.add(val);
    onChange(Array.from(set));
  };
  return (
    <div className="relative">
      <div
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-owns={`${id}-list`}
        aria-controls={`${id}-list`}
        aria-label="Select electives"
        className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2.5"
        onClick={() => setOpen((v) => !v)}
      >
        <input
          aria-label="Filter electives"
          className="flex-1 bg-transparent outline-none text-sm"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Type to filter courses"
        />
        <div className="flex flex-wrap gap-1.5">
          {value.map((v) => {
            const course = courseList.find((c) => c.code === v);
            const category = course ? course.category : "Unknown";
            const colorClass =
              CATEGORY_COLORS[category] ||
              "bg-slate-500/20 text-slate-300 border-slate-400/40";
            return (
              <span
                key={v}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium ${colorClass}`}
              >
                {CATEGORY_ICONS[category] || <BookOpenIcon size={14} />}
                {v}
              </span>
            );
          })}
        </div>
      </div>
      {open && (
        <ul
          id={`${id}-list`}
          role="listbox"
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-700 bg-slate-800 shadow-lg"
        >
          {filtered.length > 0 ? (
            filtered.map((o) => {
              const course = courseList.find((c) => c.code === o.value);
              const category = course ? course.category : "Unknown";
              const isSelected = value.includes(o.value);
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={isSelected}
                  className={`flex items-center gap-2 px-3 py-2 hover:bg-slate-700 cursor-pointer ${
                    isSelected ? "bg-slate-700/50" : ""
                  }`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggle(o.value)}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded border border-slate-600 bg-slate-700">
                    {isSelected && (
                      <CheckIcon size={12} className="text-indigo-400" />
                    )}
                  </span>
                  <div>
                    <div className="font-medium">{o.value}</div>
                    <div className="text-xs text-slate-400">
                      {course?.title}
                    </div>
                  </div>
                  {course && (
                    <span
                      className={`ml-auto inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${CATEGORY_COLORS[category]}`}
                    >
                      {CATEGORY_ICONS[category]}
                      {category}
                    </span>
                  )}
                </li>
              );
            })
          ) : (
            <li className="px-3 py-2 text-slate-400">
              No matching courses found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
