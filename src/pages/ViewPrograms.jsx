import React, { useState, useEffect, useMemo } from "react";
import {
  SearchIcon,
  FilterIcon,
  ClipboardListIcon,
  AlertTriangleIcon,
  BookIcon,
  BookOpenIcon,
  PuzzleIcon,
  GraduationCapIcon,
  UsersIcon,
  FlaskConicalIcon,
  BriefcaseIcon,
  BarChartIcon,
  ClockIcon,
  LayoutGridIcon,
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

// Sample seed programs (could be replaced with API fetch)
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

// Load persisted filters or default
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
  const [programs] = useState(SEED_PROGRAMS);
  const [filters, setFilters] = useState(loadFilters());

  // Persist filters
  useEffect(() => {
    localStorage.setItem("programFilters", JSON.stringify(filters));
  }, [filters]);

  // Filter programs on dependencies
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
      <div className="max-w-[1280px] mx-auto px-6">
        <h1 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          View Programs
        </h1>
        <p className="text-slate-400 mb-6">
          Browse all academic programs with filtering options.
        </p>

        {/* Filters */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm mb-8"
          aria-labelledby="filters-title"
        >
          <h2
            id="filters-title"
            className="text-base font-bold mb-4 flex items-center gap-2"
          >
            <FilterIcon size={18} className="text-indigo-400" />
            Filter Programs
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
                  setFilters((f) => ({ ...f, q: e.target.value }))
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="relative">
              <select
                value={filters.cat}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, cat: e.target.value }))
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

            <input
              type="number"
              className="w-full rounded-lg border border-slate-700 bg-slate-800/70 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Min credits"
              value={filters.minCr}
              onChange={(e) =>
                setFilters((f) => ({ ...f, minCr: e.target.value }))
              }
            />

            <input
              type="number"
              className="w-full rounded-lg border border-slate-700 bg-slate-800/70 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Max credits"
              value={filters.maxCr}
              onChange={(e) =>
                setFilters((f) => ({ ...f, maxCr: e.target.value }))
              }
            />

            <div className="relative">
              <select
                value={filters.hasLab}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, hasLab: e.target.value }))
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

        {/* Program List */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg backdrop-blur-sm"
          aria-label="Programs list"
        >
          <div className="p-5 border-b border-slate-800">
            <h2 className="text-base font-bold flex items-center gap-2">
              <ClipboardListIcon size={18} className="text-indigo-400" />
              All Programs
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-300">
                {filtered.length} programs
              </span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">List of academic programs</caption>
              <thead className="text-slate-300 bg-slate-800/50">
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
                      scope="col"
                      className="px-4 py-3 uppercase tracking-wider font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-slate-400"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertTriangleIcon
                          size={24}
                          className="text-slate-500"
                        />
                        <p>No programs match the current filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr
                      key={p.code}
                      className="hover:bg-slate-800/40 transition-colors cursor-default"
                    >
                      <td className="px-4 py-3 font-mono font-semibold">
                        {p.code}
                      </td>
                      <td className="px-4 py-3">{p.title}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${
                            CATEGORY_COLORS[p.category] || ""
                          }`}
                        >
                          {CATEGORY_ICONS[p.category]} {p.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-semibold">
                        {p.credits}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {p.l > 0 && (
                            <span className="flex items-center justify-center w-6 h-6 rounded bg-blue-900/30 text-blue-300 text-xs font-medium">
                              {p.l}L
                            </span>
                          )}
                          {p.t > 0 && (
                            <span className="flex items-center justify-center w-6 h-6 rounded bg-purple-900/30 text-purple-300 text-xs font-medium">
                              {p.t}T
                            </span>
                          )}
                          {p.p > 0 && (
                            <span className="flex items-center justify-center w-6 h-6 rounded bg-emerald-900/30 text-emerald-300 text-xs font-medium">
                              {p.p}P
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 flex items-center gap-1 text-slate-400">
                        <ClockIcon size={14} />
                        {p.duration} min
                      </td>
                      <td className="px-4 py-3 text-center">
                        {p.lab ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-1 text-xs font-medium">
                            <FlaskConicalIcon size={14} />
                            Lab
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
