import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpenIcon,
  SearchIcon,
  FilterIcon,
  PlusCircleIcon,
  XIcon,
  SaveIcon,
  ArrowLeftIcon,
  ClipboardListIcon,
  LayoutGridIcon,
  CalendarIcon,
  UsersIcon,
  HomeIcon,
  BookIcon,
  FlaskConicalIcon,
  PuzzleIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  BarChartIcon,
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
// Category badge colors
const CATEGORY_COLORS = {
  Major: "bg-blue-500/20 text-blue-300 border-blue-400/40",
  Minor: "bg-violet-500/20 text-violet-300 border-violet-400/40",
  MDC: "bg-indigo-500/20 text-indigo-300 border-indigo-400/40",
  AEC: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
  SEC: "bg-amber-500/20 text-amber-300 border-amber-400/40",
  VAC: "bg-pink-500/20 text-pink-300 border-pink-400/40",
  Internship: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40",
  Research: "bg-rose-500/20 text-rose-300 border-rose-400/40",
};
// Category icons mapping
const CATEGORY_ICONS = {
  Major: <BookIcon size={14} />,
  Minor: <BookOpenIcon size={14} />,
  MDC: <PuzzleIcon size={14} />,
  AEC: <GraduationCapIcon size={14} />,
  SEC: <UsersIcon size={14} />,
  VAC: <FlaskConicalIcon size={14} />,
  Internship: <BriefcaseIcon size={14} />,
  Research: <BarChartIcon size={14} />,
};
const seedCourses = [
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
const seedOfferings = [
  {
    id: "EDU201-SEM3",
    course: "EDU201",
    semester: 3,
    expected: 80,
    instructors: ["Dr. Rao", "Ms. Nair"],
    roomType: "Lecture",
    minCapacity: 100,
    equipment: [],
    sessions: { L: 3, T: 0, P: 0 },
  },
  {
    id: "CSC214-SEM3",
    course: "CSC214",
    semester: 3,
    expected: 40,
    instructors: ["Mr. Khan"],
    roomType: "Lab",
    minCapacity: 25,
    equipment: ["PCs"],
    sessions: { L: 0, T: 0, P: 2 },
  },
  {
    id: "MDC105-SEM2",
    course: "MDC105",
    semester: 2,
    expected: 60,
    instructors: ["Dr. Sen"],
    roomType: "Lecture",
    minCapacity: 80,
    equipment: [],
    sessions: { L: 2, T: 1, P: 0 },
  },
];
function loadState() {
  const c = localStorage.getItem("courses");
  const o = localStorage.getItem("offerings");
  const f = localStorage.getItem("courseFilters");
  return {
    courses: c ? JSON.parse(c) : seedCourses,
    offerings: o ? JSON.parse(o) : seedOfferings,
    filters: f
      ? JSON.parse(f)
      : { q: "", cat: "All", minCr: "", maxCr: "", hasLab: "All" },
  };
}
export default function CoursesOfferings() {
  const [{ courses, offerings, filters }, setState] = useState(loadState());
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState(null);
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);
  useEffect(() => {
    localStorage.setItem("offerings", JSON.stringify(offerings));
  }, [offerings]);
  useEffect(() => {
    localStorage.setItem("courseFilters", JSON.stringify(filters));
  }, [filters]);
  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const q = filters.q.trim().toLowerCase();
      const okQ =
        !q ||
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q);
      const okCat = filters.cat === "All" || c.category === filters.cat;
      const okCrMin =
        filters.minCr === "" || c.credits >= Number(filters.minCr);
      const okCrMax =
        filters.maxCr === "" || c.credits <= Number(filters.maxCr);
      const okLab =
        filters.hasLab === "All" || (filters.hasLab === "Yes" ? c.lab : !c.lab);
      return okQ && okCat && okCrMin && okCrMax && okLab;
    });
  }, [courses, filters]);
  const courseOfferings = useMemo(() => {
    if (!selected) return [];
    return offerings
      .filter((o) => o.course === selected.code)
      .sort((a, b) => a.semester - b.semester);
  }, [offerings, selected]);
  const openDrawer = (course) => {
    setSelected(course);
    setForm({
      id: "",
      course: course.code,
      semester: "",
      expected: "",
      instructors: [],
      roomType: "Lecture",
      minCapacity: "",
      equipment: [],
      sessions: { L: course.l, T: course.t, P: course.p },
    });
    setDrawerOpen(true);
  };
  const saveOffering = () => {
    const errs = [];
    if (!form.semester) errs.push("Semester is required.");
    if (!form.expected) errs.push("Expected enrollment is required.");
    if (!form.minCapacity) errs.push("Minimum capacity is required.");
    if (errs.length) {
      alert(errs.join("\n"));
      return;
    }
    const id = `${form.course}-SEM${form.semester}`;
    const next = offerings
      .filter((o) => o.id !== id)
      .concat([
        {
          ...form,
          id,
          semester: Number(form.semester),
          expected: Number(form.expected),
          minCapacity: Number(form.minCapacity),
        },
      ]);
    setState((s) => ({ ...s, offerings: next }));
    setDrawerOpen(false);
  };
  const getSessionLabel = (sessions) => {
    const parts = [];
    if (sessions.L > 0) parts.push(`${sessions.L}L`);
    if (sessions.T > 0) parts.push(`${sessions.T}T`);
    if (sessions.P > 0) parts.push(`${sessions.P}P`);
    return parts.join(" + ") || "—";
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
      {/* Page Header */}
      <div className="max-w-[1280px] mx-auto px-6 pb-6">
        <h1 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Courses & Offerings
        </h1>
        <p className="text-slate-400">
          Manage course catalog and create semester offerings for scheduling.
        </p>
      </div>
      <main className="max-w-[1280px] mx-auto px-6 pb-16 space-y-6">
        {/* Filters */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm"
          aria-labelledby="filters-title"
        >
          <h2
            id="filters-title"
            className="text-base font-bold mb-4 flex items-center gap-2"
          >
            <FilterIcon size={18} className="text-indigo-400" />
            <span>Filter Courses</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                <SearchIcon size={16} />
              </div>
              <input
                type="search"
                placeholder="Search code/title"
                value={filters.q}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    filters: { ...s.filters, q: e.target.value },
                  }))
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={filters.cat}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    filters: { ...s.filters, cat: e.target.value },
                  }))
                }
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-4 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>All</option>
                {CATEGORY_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <LayoutGridIcon size={16} />
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Min credits"
                value={filters.minCr}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    filters: { ...s.filters, minCr: e.target.value },
                  }))
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Max credits"
                value={filters.maxCr}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    filters: { ...s.filters, maxCr: e.target.value },
                  }))
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={filters.hasLab}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    filters: { ...s.filters, hasLab: e.target.value },
                  }))
                }
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-4 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>All</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <FlaskConicalIcon size={16} />
              </div>
            </div>
          </div>
        </section>
        {/* Courses Table */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg backdrop-blur-sm">
          <div className="p-5 border-b border-slate-800">
            <h2 className="text-base font-bold flex items-center gap-2">
              <ClipboardListIcon size={18} className="text-indigo-400" />
              <span>Course Catalog</span>
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-300">
                {filtered.length} courses
              </span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <caption className="sr-only">
                Course catalog with NEP categories and L–T–P
              </caption>
              <thead className="text-slate-300 bg-slate-800/50">
                <tr>
                  {[
                    "Code",
                    "Title",
                    "Category",
                    "Credits",
                    "L–T–P",
                    "Duration",
                    "Tags",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.length === 0 ? (
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
                        <p>No courses match your filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr
                      key={c.code}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-4 py-3.5 text-white font-medium">
                        {c.code}
                      </td>
                      <td className="px-4 py-3.5 text-slate-200">{c.title}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                            CATEGORY_COLORS[c.category] || CATEGORY_COLORS.Major
                          }`}
                        >
                          {CATEGORY_ICONS[c.category]}
                          {c.category}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-800 text-white font-medium">
                          {c.credits}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          {c.l > 0 && (
                            <span className="flex items-center justify-center w-6 h-6 rounded bg-blue-900/30 text-blue-300 text-xs font-medium">
                              {c.l}L
                            </span>
                          )}
                          {c.t > 0 && (
                            <span className="flex items-center justify-center w-6 h-6 rounded bg-purple-900/30 text-purple-300 text-xs font-medium">
                              {c.t}T
                            </span>
                          )}
                          {c.p > 0 && (
                            <span className="flex items-center justify-center w-6 h-6 rounded bg-emerald-900/30 text-emerald-300 text-xs font-medium">
                              {c.p}P
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <ClockIcon size={14} />
                          {c.duration} min
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        {c.lab ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-1 text-xs font-medium">
                            <FlaskConicalIcon size={14} />
                            Lab
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-400/40 px-3 py-1.5 text-xs font-medium transition-colors"
                          onClick={() => openDrawer(c)}
                        >
                          <CalendarIcon size={14} />
                          Manage Offerings
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
        {/* Drawer */}
        {drawerOpen && selected && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={() => setDrawerOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <div className="w-screen max-w-2xl animate-fadeIn">
                <div className="h-full flex flex-col rounded-l-2xl border border-slate-700 bg-slate-900 shadow-xl">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400">
                          <BookOpenIcon size={16} />
                        </span>
                        <h2 className="text-lg font-bold">{selected.code}</h2>
                      </div>
                      <p className="text-slate-300">{selected.title}</p>
                    </div>
                    <button
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-slate-800/70 text-slate-400 hover:text-white transition-colors"
                      aria-label="Close"
                    >
                      <XIcon size={18} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Course Details */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="rounded-xl bg-slate-800/40 border border-slate-700/40 p-3 flex flex-col">
                        <span className="text-xs text-slate-400 mb-1">
                          Category
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium mt-auto self-start ${
                            CATEGORY_COLORS[selected.category]
                          }`}
                        >
                          {CATEGORY_ICONS[selected.category]}
                          {selected.category}
                        </span>
                      </div>
                      <div className="rounded-xl bg-slate-800/40 border border-slate-700/40 p-3 flex flex-col">
                        <span className="text-xs text-slate-400 mb-1">
                          Credits
                        </span>
                        <span className="text-xl font-bold">
                          {selected.credits}
                        </span>
                      </div>
                      <div className="rounded-xl bg-slate-800/40 border border-slate-700/40 p-3 flex flex-col">
                        <span className="text-xs text-slate-400 mb-1">
                          L–T–P
                        </span>
                        <div className="flex items-center gap-1.5 mt-auto">
                          {selected.l > 0 && (
                            <span className="flex items-center justify-center w-6 h-6 rounded bg-blue-900/30 text-blue-300 text-xs font-medium">
                              {selected.l}L
                            </span>
                          )}
                          {selected.t > 0 && (
                            <span className="flex items-center justify-center w-6 h-6 rounded bg-purple-900/30 text-purple-300 text-xs font-medium">
                              {selected.t}T
                            </span>
                          )}
                          {selected.p > 0 && (
                            <span className="flex items-center justify-center w-6 h-6 rounded bg-emerald-900/30 text-emerald-300 text-xs font-medium">
                              {selected.p}P
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="rounded-xl bg-slate-800/40 border border-slate-700/40 p-3 flex flex-col">
                        <span className="text-xs text-slate-400 mb-1">
                          Duration
                        </span>
                        <div className="flex items-center gap-1.5 mt-auto">
                          <ClockIcon size={16} className="text-indigo-400" />
                          <span>{selected.duration} minutes</span>
                        </div>
                      </div>
                    </div>
                    {/* Existing Offerings */}
                    {courseOfferings.length > 0 && (
                      <div className="rounded-xl border border-slate-800 bg-slate-800/30 overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                          <h3 className="text-sm font-semibold flex items-center gap-2">
                            <CalendarIcon
                              size={16}
                              className="text-indigo-400"
                            />
                            <span>Existing Offerings</span>
                          </h3>
                          <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-300">
                            {courseOfferings.length}
                          </span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead className="text-slate-300 bg-slate-800/50">
                              <tr>
                                {[
                                  "Sem",
                                  "Expected",
                                  "Instructors",
                                  "Room",
                                  "Min Cap",
                                  "Sessions",
                                  "Equipment",
                                ].map((h) => (
                                  <th
                                    key={h}
                                    scope="col"
                                    className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider"
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                              {courseOfferings.map((o) => (
                                <tr
                                  key={o.id}
                                  className="hover:bg-slate-800/30 transition-colors"
                                >
                                  <td className="px-3 py-2.5">
                                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-900/30 text-indigo-300 text-xs font-medium">
                                      {o.semester}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2.5">{o.expected}</td>
                                  <td className="px-3 py-2.5">
                                    <div className="flex flex-wrap gap-1">
                                      {o.instructors.map((instructor, idx) => (
                                        <span
                                          key={idx}
                                          className="inline-flex items-center gap-1 rounded-full bg-slate-800/70 px-2 py-0.5 text-xs"
                                        >
                                          <UsersIcon
                                            size={12}
                                            className="text-slate-400"
                                          />
                                          {instructor}
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="px-3 py-2.5">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/70 px-2 py-0.5 text-xs">
                                      <MapPinIcon
                                        size={12}
                                        className="text-slate-400"
                                      />
                                      {o.roomType}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2.5">
                                    {o.minCapacity}
                                  </td>
                                  <td className="px-3 py-2.5">
                                    <span className="text-xs font-medium">
                                      {getSessionLabel(o.sessions)}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2.5">
                                    {o.equipment.length > 0 ? (
                                      <div className="flex flex-wrap gap-1">
                                        {o.equipment.map((item, idx) => (
                                          <span
                                            key={idx}
                                            className="inline-flex items-center rounded-full bg-slate-800/70 px-2 py-0.5 text-xs"
                                          >
                                            {item}
                                          </span>
                                        ))}
                                      </div>
                                    ) : (
                                      <span className="text-slate-500">—</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {/* Add/Update Form */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        saveOffering();
                      }}
                      className="space-y-5"
                    >
                      <div className="flex items-center gap-2 text-lg font-bold">
                        <PlusCircleIcon size={20} className="text-indigo-400" />
                        <span>Add New Offering</span>
                      </div>
                      <fieldset className="rounded-xl border border-slate-700 p-5 grid gap-5 bg-slate-800/20">
                        <legend className="px-2 text-sm font-medium text-slate-300">
                          Offering Details
                        </legend>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <LabeledNumber
                            label="Semester"
                            value={form.semester}
                            onChange={(v) =>
                              setForm((f) => ({ ...f, semester: v }))
                            }
                            icon={
                              <CalendarIcon
                                size={16}
                                className="text-slate-400"
                              />
                            }
                          />
                          <LabeledNumber
                            label="Expected Enrollment"
                            value={form.expected}
                            onChange={(v) =>
                              setForm((f) => ({ ...f, expected: v }))
                            }
                            icon={
                              <UsersIcon size={16} className="text-slate-400" />
                            }
                          />
                          <LabeledNumber
                            label="Min Capacity"
                            value={form.minCapacity}
                            onChange={(v) =>
                              setForm((f) => ({ ...f, minCapacity: v }))
                            }
                            icon={
                              <LayoutGridIcon
                                size={16}
                                className="text-slate-400"
                              />
                            }
                          />
                          <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                              Room Type
                            </label>
                            <div className="relative">
                              <select
                                value={form.roomType}
                                onChange={(e) =>
                                  setForm((f) => ({
                                    ...f,
                                    roomType: e.target.value,
                                  }))
                                }
                                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                              >
                                <option>Lecture</option>
                                <option>Lab</option>
                                <option>Studio</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <MapPinIcon size={16} />
                              </div>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-1.5 sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-300">
                              Instructors (comma-separated)
                            </label>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <UsersIcon size={16} />
                              </div>
                              <input
                                type="text"
                                value={form.instructors.join(", ")}
                                onChange={(e) =>
                                  setForm((f) => ({
                                    ...f,
                                    instructors: e.target.value
                                      .split(",")
                                      .map((s) => s.trim())
                                      .filter(Boolean),
                                  }))
                                }
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="Dr. Smith, Prof. Johnson"
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5 sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-300">
                              Equipment (comma-separated)
                            </label>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <BookIcon size={16} />
                              </div>
                              <input
                                type="text"
                                value={form.equipment.join(", ")}
                                onChange={(e) =>
                                  setForm((f) => ({
                                    ...f,
                                    equipment: e.target.value
                                      .split(",")
                                      .map((s) => s.trim())
                                      .filter(Boolean),
                                  }))
                                }
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="Projector, Whiteboard, PCs"
                              />
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="rounded-xl border border-slate-700 p-5 bg-slate-800/20">
                        <legend className="px-2 text-sm font-medium text-slate-300">
                          Sessions (per week)
                        </legend>
                        <div className="grid grid-cols-3 gap-4">
                          {["L", "T", "P"].map((k, idx) => (
                            <div key={k} className="space-y-1.5">
                              <label className="block text-sm font-medium text-slate-300">
                                {k === "L"
                                  ? "Lectures"
                                  : k === "T"
                                  ? "Tutorials"
                                  : "Practicals"}
                              </label>
                              <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                  {idx === 0 ? (
                                    <BookOpenIcon size={16} />
                                  ) : idx === 1 ? (
                                    <UsersIcon size={16} />
                                  ) : (
                                    <FlaskConicalIcon size={16} />
                                  )}
                                </div>
                                <input
                                  type="number"
                                  min="0"
                                  value={form.sessions[k]}
                                  onChange={(e) =>
                                    setForm((f) => ({
                                      ...f,
                                      sessions: {
                                        ...f.sessions,
                                        [k]: Number(e.target.value),
                                      },
                                    }))
                                  }
                                  className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setDrawerOpen(false)}
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
                          Save Offering
                        </button>
                      </div>
                    </form>
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
function LabeledNumber({ label, value, onChange, icon }) {
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
          className={`w-full rounded-lg border border-slate-700 bg-slate-800/70 ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all`}
          required
        />
      </div>
    </div>
  );
}
