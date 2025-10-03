import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SearchIcon,
  FilterIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XIcon,
  ExternalLinkIcon,
  RefreshCwIcon,
  LayoutGridIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  GraduationCapIcon,
  FileWarningIcon,
  TrendingUpIcon,
} from "lucide-react";

const seedConflicts = [
  {
    id: 1,
    type: "Faculty overlap",
    severity: "High",
    status: "Open",
    course: "EDU201 L",
    who: "Dr. Rao",
    when: "Tue 10:00–11:00",
    day: "Tue",
    slot: "10:00",
    room: "A-204",
    cohort: "ITEP-SEM3-A",
    note: "Overlaps with ITEP210",
  },
  {
    id: 2,
    type: "Room double-book",
    severity: "High",
    status: "Open",
    course: "CSC214 P",
    who: "Lab",
    when: "Wed 14:00–16:00",
    day: "Wed",
    slot: "14:00",
    room: "Lab-2",
    cohort: "FYUGP-SEM3-A",
    note: "Lab-2 used by two sessions",
  },
  {
    id: 3,
    type: "Student clash",
    severity: "Medium",
    status: "Open",
    course: "MDC105 L",
    who: "Cohort A+B",
    when: "Thu 11:00–12:00",
    day: "Thu",
    slot: "11:00",
    room: "B-101",
    cohort: "FYUGP-SEM2-A",
    note: "Popular elective overlap",
  },
  {
    id: 4,
    type: "Capacity overflow",
    severity: "Low",
    status: "Open",
    course: "AEC101 L",
    who: "B-101 (80)",
    when: "Mon 10:00–11:00",
    day: "Mon",
    slot: "10:00",
    room: "B-101",
    cohort: "FYUGP-SEM2-A",
    note: "Expected 95 > 80 seats",
  },
];

const TYPES = [
  "All",
  "Faculty overlap",
  "Room double-book",
  "Student clash",
  "Capacity overflow",
];
const SEVERITIES = ["All", "High", "Medium", "Low"];
const STATUSES = ["All", "Open", "Resolved", "Muted"];

export default function ConflictExplorer() {
  const [conflicts, setConflicts] = useState(() => {
    const s = localStorage.getItem("conflicts");
    return s ? JSON.parse(s) : seedConflicts;
  });
  const [filters, setFilters] = useState({
    q: "",
    type: "All",
    severity: "All",
    status: "All",
  });
  const [sort, setSort] = useState({ col: "severity", dir: "desc" });
  const [selected, setSelected] = useState(null);
  const [swapOpen, setSwapOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("conflicts", JSON.stringify(conflicts));
  }, [conflicts]);

  const filtered = useMemo(() => {
    const f = conflicts.filter((c) => {
      const q = filters.q.trim().toLowerCase();
      const okQ =
        !q ||
        [c.course, c.who, c.room, c.cohort, c.type].some((v) =>
          (v || "").toLowerCase().includes(q)
        );
      const okT = filters.type === "All" || c.type === filters.type;
      const okS = filters.severity === "All" || c.severity === filters.severity;
      const okSt = filters.status === "All" || c.status === filters.status;
      return okQ && okT && okS && okSt;
    });
    const dir = sort.dir === "asc" ? 1 : -1;
    return f.sort((a, b) => {
      const va = (a[sort.col] || "").toString().toLowerCase();
      const vb = (b[sort.col] || "").toString().toLowerCase();
      return va < vb ? -1 * dir : va > vb ? 1 * dir : 0;
    });
  }, [conflicts, filters, sort]);
  const onSort = (col) => {
    setSort((s) => ({
      col,
      dir: s.col === col ? (s.dir === "asc" ? "desc" : "asc") : "asc",
    }));
  };

  const mark = (id, status) => {
    setConflicts((list) =>
      list.map((c) => (c.id === id ? { ...c, status } : c))
    );
    if (selected?.id === id)
      setSelected((prev) => (prev ? { ...prev, status } : prev));
  };

  const viewOnTimetable = (c) => {
    navigate(
      `/timetables?view=Program&cohort=${encodeURIComponent(c.cohort)}&day=${
        c.day
      }&slot=${c.slot}`
    );
  };

  const suggestedSwaps = useMemo(() => {
    if (!selected) return [];
    const alts = [];
    if (
      selected.type === "Room double-book" ||
      selected.type === "Capacity overflow"
    ) {
      alts.push({ label: "Move to A-204 (120)", action: { room: "A-204" } });
      alts.push({ label: "Move to B-102 (100)", action: { room: "B-102" } });
    } else if (selected.type === "Faculty overlap") {
      alts.push({
        label: "Shift to Wed 11:00",
        action: { slot: "11:00", day: "Wed" },
      });
      alts.push({ label: "Assign Ms. Nair", action: { faculty: "Ms. Nair" } });
    } else if (selected.type === "Student clash") {
      alts.push({
        label: "Shift to Fri 12:00",
        action: { slot: "12:00", day: "Fri" },
      });
      alts.push({ label: "Alternate room B-103", action: { room: "B-103" } });
    }
    return alts;
  }, [selected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">

      {/* Page Header */}
      <div className="max-w-[1280px] mx-auto px-6 pb-6">
        <h1 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Conflict Explorer
        </h1>
        <p className="text-slate-400">
          Filter, sort, and resolve scheduling conflicts with suggested swaps
          and deep links to the timetable.
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
            <span>Filter Conflicts</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                <SearchIcon size={16} />
              </div>
              <input
                type="search"
                placeholder="Course, faculty, room..."
                value={filters.q}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, q: e.target.value }))
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, type: e.target.value }))
                }
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                {TYPES.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <LayoutGridIcon size={16} />
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
            <div className="relative">
              <select
                value={filters.severity}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, severity: e.target.value }))
                }
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                {SEVERITIES.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <TrendingUpIcon size={16} />
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
            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, status: e.target.value }))
                }
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                {STATUSES.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <CheckCircleIcon size={16} />
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
        </section>

        {/* Table */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg backdrop-blur-sm">
          <div className="p-5 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-base font-bold flex items-center gap-2">
              <FileWarningIcon size={18} className="text-indigo-400" />
              <span>Detected Conflicts</span>
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-300">
                {filtered.length} conflicts
              </span>
            </h2>
            <Link
              to="/timetables"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-lg shadow-indigo-900/30 hover:from-indigo-600 hover:to-purple-600 transition-all"
            >
              <ExternalLinkIcon size={16} />
              Open Timetables
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <caption className="sr-only">
                All detected conflicts with sortable columns and quick actions
              </caption>
              <thead className="text-slate-300 bg-slate-800/50">
                <tr>
                  <SortableTh
                    label="Type"
                    sort={sort}
                    col="type"
                    onSort={onSort}
                  />
                  <SortableTh
                    label="Severity"
                    sort={sort}
                    col="severity"
                    onSort={onSort}
                  />
                  <SortableTh
                    label="Status"
                    sort={sort}
                    col="status"
                    onSort={onSort}
                  />
                  <SortableTh
                    label="Course/Session"
                    sort={sort}
                    col="course"
                    onSort={onSort}
                  />
                  <SortableTh
                    label="Who/Resource"
                    sort={sort}
                    col="who"
                    onSort={onSort}
                  />
                  <SortableTh
                    label="When"
                    sort={sort}
                    col="when"
                    onSort={onSort}
                  />
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    Room
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-[300px]"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    className={
                      selected?.id === c.id
                        ? "bg-indigo-500/10 hover:bg-indigo-500/15"
                        : "hover:bg-slate-800/40"
                    }
                  >
                    <td className="px-4 py-3.5">
                      <SeverityChip s={c.severity} t={c.type} />
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                          c.severity === "High"
                            ? "bg-red-500/20 text-red-300 border-red-400/40"
                            : c.severity === "Medium"
                            ? "bg-amber-500/20 text-amber-300 border-amber-400/40"
                            : "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                        }`}
                      >
                        {c.severity === "High" ? (
                          <AlertTriangleIcon size={12} />
                        ) : c.severity === "Medium" ? (
                          <ClockIcon size={12} />
                        ) : (
                          <CheckCircleIcon size={12} />
                        )}
                        {c.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                          c.status === "Resolved"
                            ? "bg-green-500/20 text-green-300 border-green-400/40"
                            : c.status === "Muted"
                            ? "bg-slate-500/20 text-slate-300 border-slate-400/40"
                            : "bg-amber-500/20 text-amber-300 border-amber-400/40"
                        }`}
                      >
                        {c.status === "Resolved" ? (
                          <CheckCircleIcon size={12} />
                        ) : (
                          <AlertTriangleIcon size={12} />
                        )}
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 break-words font-medium text-white">
                      {c.course}
                    </td>
                    <td className="px-4 py-3.5 break-words">{c.who}</td>
                    <td className="px-4 py-3.5 break-words">
                      <div className="flex items-center gap-1.5">
                        <ClockIcon size={14} className="text-slate-400" />
                        {c.when}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 break-words">
                      <div className="flex items-center gap-1.5">
                        <MapPinIcon size={14} className="text-slate-400" />
                        {c.room}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-400/40 px-2.5 py-1.5 text-xs font-medium transition-colors"
                          onClick={() => setSelected(c)}
                          aria-haspopup="dialog"
                        >
                          Details
                        </button>
                        <button
                          className="inline-flex items-center gap-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/40 px-2.5 py-1.5 text-xs font-medium transition-colors"
                          onClick={() => {
                            setSelected(c);
                            setSwapOpen(true);
                          }}
                        >
                          <RefreshCwIcon size={12} />
                          Swap
                        </button>
                        <button
                          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/40 px-2.5 py-1.5 text-xs font-medium transition-colors"
                          onClick={() => viewOnTimetable(c)}
                        >
                          <ExternalLinkIcon size={12} />
                          View
                        </button>
                        {c.status !== "Resolved" && (
                          <button
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 px-2.5 py-1.5 text-xs font-medium transition-colors"
                            onClick={() => mark(c.id, "Resolved")}
                          >
                            <CheckCircleIcon size={12} />
                            Resolve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Details dialog */}
        {selected && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={() => setSelected(null)}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="details-title"
                className="w-full max-w-3xl max-h-[90vh] overflow-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400">
                      <FileWarningIcon size={20} />
                    </div>
                    <div>
                      <h2 id="details-title" className="text-lg font-bold">
                        Conflict Details
                      </h2>
                      <p className="text-sm text-slate-400">
                        {selected.course}
                      </p>
                    </div>
                  </div>
                  <button
                    className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-slate-800/70 text-slate-400 hover:text-white transition-colors"
                    aria-label="Close"
                    onClick={() => setSelected(null)}
                  >
                    <XIcon size={18} />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <div className="text-sm text-slate-400">Type</div>
                      <div className="font-medium">
                        <SeverityChip s={selected.severity} t={selected.type} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-400">Severity</div>
                      <div className="font-medium">{selected.severity}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-400">Status</div>
                      <div className="font-medium">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                            selected.status === "Resolved"
                              ? "bg-green-500/20 text-green-300 border-green-400/40"
                              : selected.status === "Muted"
                              ? "bg-slate-500/20 text-slate-300 border-slate-400/40"
                              : "bg-amber-500/20 text-amber-300 border-amber-400/40"
                          }`}
                        >
                          {selected.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-400">Course</div>
                      <div className="font-medium text-white">
                        {selected.course}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-400">Who/Resource</div>
                      <div className="font-medium flex items-center gap-1.5">
                        <UsersIcon size={14} className="text-slate-400" />
                        {selected.who}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-400">When</div>
                      <div className="font-medium flex items-center gap-1.5">
                        <ClockIcon size={14} className="text-slate-400" />
                        {selected.when}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-400">Room</div>
                      <div className="font-medium flex items-center gap-1.5">
                        <MapPinIcon size={14} className="text-slate-400" />
                        {selected.room}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-400">Cohort</div>
                      <div className="font-medium">{selected.cohort}</div>
                    </div>
                  </div>
                  <div className="pt-2 space-y-1 rounded-lg border border-slate-800 bg-slate-800/20 p-4">
                    <div className="text-sm text-slate-400">Note</div>
                    <div className="text-sm">{selected.note}</div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-800 px-6 py-4">
                  <button
                    className="px-5 py-2.5 rounded-lg border border-slate-700 text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
                    onClick={() => setSwapOpen(true)}
                  >
                    <RefreshCwIcon size={16} />
                    Suggest Swap
                  </button>
                  <button
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-lg shadow-indigo-900/30 hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center gap-2"
                    onClick={() => viewOnTimetable(selected)}
                  >
                    <ExternalLinkIcon size={16} />
                    View on Timetable
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Swap dialog */}
        {swapOpen && selected && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={() => setSwapOpen(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="swap-title"
                className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-xl"
              >
                <div className="border-b border-slate-800 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400">
                      <RefreshCwIcon size={20} />
                    </div>
                    <div>
                      <h2 id="swap-title" className="text-lg font-bold">
                        Suggested Alternatives
                      </h2>
                      <p className="text-sm text-slate-400">
                        Choose an option to resolve this conflict
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="grid gap-3">
                    {suggestedSwaps.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-800/30 hover:bg-slate-800/50 px-4 py-3 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400">
                            <RefreshCwIcon size={16} />
                          </div>
                          <div className="text-slate-200 font-medium">
                            {s.label}
                          </div>
                        </div>
                        <button
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-medium shadow-lg shadow-emerald-900/30 hover:from-emerald-600 hover:to-green-600 transition-all flex items-center gap-2"
                          onClick={() => {
                            mark(selected.id, "Resolved");
                            setSwapOpen(false);
                            setSelected(null);
                          }}
                        >
                          <CheckCircleIcon size={16} />
                          Accept
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-end gap-3 border-t border-slate-800 px-6 py-4">
                  <button
                    className="px-5 py-2.5 rounded-lg border border-slate-700 text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
                    onClick={() => setSwapOpen(false)}
                  >
                    <XIcon size={16} />
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
function SeverityChip({ s, t }) {
  const color =
    s === "High"
      ? "bg-red-500/20 text-red-300 border-red-400/40"
      : s === "Medium"
      ? "bg-amber-500/20 text-amber-300 border-amber-400/40"
      : "bg-blue-500/20 text-blue-300 border-blue-400/40";

  const icon =
    s === "High" ? (
      <AlertTriangleIcon size={14} />
    ) : s === "Medium" ? (
      <ClockIcon size={14} />
    ) : (
      <CheckCircleIcon size={14} />
    );

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${color}`}
      title={t}
    >
      {icon}
      {t}
    </span>
  );
}

function SortableTh({ label, col, sort, onSort }) {
  const active = sort.col === col;
  const ariaSort = active
    ? sort.dir === "asc"
      ? "ascending"
      : "descending"
    : undefined;
  return (
    <th
      scope="col"
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
    >
      <button
        className="inline-flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
        onClick={() => onSort(col)}
        aria-label={`Sort by ${label}`}
        aria-sort={ariaSort}
      >
        <span>{label}</span>
        {active && (
          <span aria-hidden="true" className="text-indigo-400">
            {sort.dir === "asc" ? "↑" : "↓"}
          </span>
        )}
      </button>
    </th>
  );
}
