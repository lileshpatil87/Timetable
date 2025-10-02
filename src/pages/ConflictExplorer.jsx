// src/pages/ConflictExplorer.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto max-w-[1200px] px-5 py-4">
          <h1 className="text-2xl font-bold">Conflict Explorer</h1>
          <p className="text-slate-300">
            Filter, sort, and resolve scheduling conflicts with suggested swaps
            and deep links to the timetable.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-5 py-4 space-y-4">
        {/* Filters */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="filters-title"
        >
          <h2
            id="filters-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <label className="grid gap-1">
              <span>Search</span>
              <input
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                type="search"
                placeholder="Course, faculty, room, cohort"
                value={filters.q}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, q: e.target.value }))
                }
              />
            </label>
            <label className="grid gap-1">
              <span>Type</span>
              <select
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                value={filters.type}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, type: e.target.value }))
                }
              >
                {TYPES.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1">
              <span>Severity</span>
              <select
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                value={filters.severity}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, severity: e.target.value }))
                }
              >
                {SEVERITIES.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1">
              <span>Status</span>
              <select
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                value={filters.status}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, status: e.target.value }))
                }
              >
                {STATUSES.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
          </div>
        </section>

        {/* Table */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="table-title"
        >
          <h2
            id="table-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            Conflicts
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <caption className="sr-only">
                All detected conflicts with sortable columns and quick actions
              </caption>
              <thead className="text-slate-300">
                <tr className="border-b border-slate-800">
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
                  <th scope="col" className="px-2 py-2 text-left">
                    Room
                  </th>
                  <th scope="col" className="px-2 py-2 text-left w-[300px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    className={
                      selected?.id === c.id ? "bg-indigo-500/10" : undefined
                    }
                  >
                    <td className="px-2 py-2">
                      <SeverityChip s={c.severity} t={c.type} />
                    </td>
                    <td className="px-2 py-2">{c.severity}</td>
                    <td className="px-2 py-2">
                      <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs">
                        {c.status}
                      </span>
                    </td>
                    <td className="px-2 py-2 break-words">{c.course}</td>
                    <td className="px-2 py-2 break-words">{c.who}</td>
                    <td className="px-2 py-2 break-words">{c.when}</td>
                    <td className="px-2 py-2 break-words">{c.room}</td>
                    <td className="px-2 py-2">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="underline text-indigo-400"
                          onClick={() => setSelected(c)}
                          aria-haspopup="dialog"
                        >
                          Details
                        </button>
                        <button
                          className="underline text-indigo-400"
                          onClick={() => {
                            setSelected(c);
                            setSwapOpen(true);
                          }}
                        >
                          Suggest swap
                        </button>
                        <button
                          className="underline text-indigo-400"
                          onClick={() => viewOnTimetable(c)}
                        >
                          View on timetable
                        </button>
                        {c.status !== "Resolved" && (
                          <button
                            className="underline text-emerald-400"
                            onClick={() => mark(c.id, "Resolved")}
                          >
                            Mark resolved
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex justify-end">
            <Link to="/timetables" className="underline text-indigo-400">
              Open Timetables
            </Link>
          </div>
        </section>

        {/* Details dialog */}
        {selected && (
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="details-title"
            className="fixed inset-0 z-20 grid place-items-center bg-black/50 p-2"
          >
            <div className="w-[min(900px,96vw)] max-h-[92vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                <h2 id="details-title" className="text-lg font-semibold">
                  Conflict details
                </h2>
                <button
                  className="h-8 w-8 rounded border border-slate-700 bg-slate-800"
                  aria-label="Close"
                  onClick={() => setSelected(null)}
                >
                  ×
                </button>
              </div>

              <div className="grid gap-2 p-4 md:grid-cols-2">
                <div>
                  <strong>Type:</strong> {selected.type}
                </div>
                <div>
                  <strong>Severity:</strong> {selected.severity}
                </div>
                <div>
                  <strong>Status:</strong> {selected.status}
                </div>
                <div>
                  <strong>Course:</strong> {selected.course}
                </div>
                <div>
                  <strong>Who/Resource:</strong> {selected.who}
                </div>
                <div>
                  <strong>When:</strong> {selected.when}
                </div>
                <div>
                  <strong>Room:</strong> {selected.room}
                </div>
                <div>
                  <strong>Cohort:</strong> {selected.cohort}
                </div>
                <div className="md:col-span-2">
                  <strong>Note:</strong> {selected.note}
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-slate-800 px-4 py-3">
                <button
                  className="rounded-lg border border-slate-700 px-3 py-2"
                  onClick={() => setSwapOpen(true)}
                >
                  Suggest swap
                </button>
                <button
                  className="rounded-lg bg-indigo-500 px-3 py-2 font-bold text-slate-900"
                  onClick={() => viewOnTimetable(selected)}
                >
                  View on timetable
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Swap dialog */}
        {swapOpen && selected && (
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="swap-title"
            className="fixed inset-0 z-20 grid place-items-center bg-black/50 p-2"
          >
            <div className="w-[min(560px,96vw)] max-h-[92vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4">
              <h2 id="swap-title" className="text-lg font-semibold">
                Suggested alternatives
              </h2>
              <ul className="mt-3 grid gap-2">
                {suggestedSwaps.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-2 rounded border border-slate-800 bg-slate-900/60 px-3 py-2"
                  >
                    <div className="text-slate-200">{s.label}</div>
                    <button
                      className="rounded-lg bg-emerald-500 px-3 py-1.5 font-bold text-slate-900"
                      onClick={() => {
                        mark(selected.id, "Resolved");
                        setSwapOpen(false);
                        setSelected(null);
                      }}
                    >
                      Accept
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-end">
                <button
                  className="rounded-lg border border-slate-700 px-3 py-2"
                  onClick={() => setSwapOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </section>
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
      : "bg-emerald-500/20 text-emerald-300 border-emerald-400/40";
  return (
    <span
      className={`inline-block rounded-full border px-2 py-1 text-xs font-medium ${color}`}
      title={t}
    >
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
    <th scope="col" className="px-2 py-2 text-left">
      <button
        className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-4 hover:text-slate-100"
        onClick={() => onSort(col)}
        aria-label={`Sort by ${label}`}
        aria-sort={ariaSort}
      >
        <span>{label}</span>
        {active && (
          <span aria-hidden="true">{sort.dir === "asc" ? "↑" : "↓"}</span>
        )}
      </button>
    </th>
  );
}
