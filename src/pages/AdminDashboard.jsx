// src/pages/AdminDashboard.jsx
import { Link } from "react-router-dom";

const kpis = [
  { label: "Total Offerings", value: 128, trend: "+6 this week" },
  { label: "Open Conflicts", value: 14, trend: "↓ resolving" },
  { label: "Room Utilization", value: "78%", trend: "+3%" },
  { label: "Elective Clash Risk", value: "Medium", trend: "watchlist" },
];

const conflicts = [
  {
    id: 1,
    type: "Faculty overlap",
    course: "EDU302 L",
    who: "Dr. Rao",
    when: "Tue 10:00–11:00",
    room: "A-204",
  },
  {
    id: 2,
    type: "Room double-book",
    course: "CSC214 P",
    who: "Lab",
    when: "Wed 14:00–16:00",
    room: "Lab-2",
  },
  {
    id: 3,
    type: "Student clash",
    course: "MDC105 L",
    who: "Cohort A+B",
    when: "Thu 11:00–12:00",
    room: "B-101",
  },
  {
    id: 4,
    type: "Faculty overlap",
    course: "ITEP210 Microteaching",
    who: "Ms. Mehta",
    when: "Fri 09:00–10:00",
    room: "Studio-1",
  },
];

const recentChanges = [
  {
    id: 101,
    change: "Added lab session",
    item: "CSC214 P",
    by: "Akash",
    time: "Today 10:42",
  },
  {
    id: 102,
    change: "Updated availability",
    item: "Dr. Rao",
    by: "Neha",
    time: "Today 09:15",
  },
  {
    id: 103,
    change: "New room added",
    item: "Studio-2",
    by: "Admin",
    time: "Yesterday",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/80 border-b border-slate-800 shadow-lg">
        <div className="mx-auto max-w-[1280px] px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold text-lg tracking-tight">
            <span aria-hidden="true">🗓️</span>
            <span>Timely NEP — Admin</span>
          </div>
          <nav aria-label="Top navigation">
            <ul className="flex items-center gap-6 text-slate-300">
              <li>
                <Link
                  to="/scenarios"
                  className="hover:text-indigo-400 transition"
                >
                  Scenarios
                </Link>
              </li>
              <li>
                <Link
                  to="/timetables"
                  className="hover:text-indigo-400 transition"
                >
                  Timetables
                </Link>
              </li>
              <li>
                <Link
                  to="/exports"
                  className="hover:text-indigo-400 transition"
                >
                  Exports
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:block border-r border-slate-800 bg-slate-900/60 w-60">
          <nav
            aria-label="Primary"
            className="px-4 py-6 space-y-2 text-sm font-medium"
          >
            {[
              { path: "/admin", label: "Dashboard", active: true },
              { path: "/programs", label: "Programs" },
              { path: "/courses", label: "Courses" },
              { path: "/faculties", label: "Faculty" },
              { path: "/rooms", label: "Rooms" },
              { path: "/students", label: "Students" },
              { path: "/calendars", label: "Calendars" },
              { path: "/scenarios", label: "Scenarios" },
              { path: "/timetables", label: "Timetables" },
              { path: "/exports", label: "Exports" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={link.active ? "page" : undefined}
                className={`block rounded-lg px-3 py-2 transition ${
                  link.active
                    ? "bg-indigo-500 text-white shadow-md"
                    : "hover:bg-slate-800 hover:text-indigo-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main
          id="main"
          className="flex-1 mx-auto w-full max-w-[1100px] px-6 py-6"
        >
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          {/* KPI cards */}
          <section aria-labelledby="kpi-title" className="mb-6">
            <h2
              id="kpi-title"
              className="text-sm font-semibold text-slate-400 mb-3"
            >
              Key Indicators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {kpis.map((k) => (
                <article
                  key={k.label}
                  aria-label={k.label}
                  className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-800/60 p-5 shadow hover:shadow-indigo-500/20 transition"
                >
                  <div className="text-3xl font-extrabold text-indigo-400">
                    {k.value}
                  </div>
                  <div className="text-slate-300">{k.label}</div>
                  <div className="text-emerald-400 text-sm">{k.trend}</div>
                </article>
              ))}
            </div>
          </section>

          {/* Quick actions */}
          <section aria-labelledby="qa-title" className="mb-6">
            <h2
              id="qa-title"
              className="text-sm font-semibold text-slate-400 mb-3"
            >
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/scenarios/new"
                className="inline-flex items-center rounded-xl bg-indigo-500 text-white font-medium px-4 py-2 shadow hover:bg-indigo-600 transition"
              >
                Create Scenario
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center rounded-xl border border-slate-700 px-4 py-2 hover:border-indigo-400 transition"
              >
                Manage Courses
              </Link>
              <Link
                to="/timetables"
                className="inline-flex items-center rounded-xl border border-slate-700 px-4 py-2 hover:border-indigo-400 transition"
              >
                View Timetables
              </Link>
              <Link
                to="/exports"
                className="inline-flex items-center rounded-xl border border-slate-700 px-4 py-2 hover:border-indigo-400 transition"
              >
                Export
              </Link>
            </div>
          </section>

          {/* Two-column: Conflicts + Utilization */}
          <section
            className="grid lg:grid-cols-2 gap-6 mb-6"
            aria-label="Overview"
          >
            {/* Conflicts */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow">
              <h2 className="text-sm font-semibold text-slate-400 mb-3">
                Open Conflicts
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full table-fixed text-sm">
                  <thead className="text-slate-400 bg-slate-800/50">
                    <tr>
                      <th className="px-2 py-2 text-left">Type</th>
                      <th className="px-2 py-2 text-left">Course</th>
                      <th className="px-2 py-2 text-left">Resource</th>
                      <th className="px-2 py-2 text-left">When</th>
                      <th className="px-2 py-2 text-left">Room</th>
                      <th className="px-2 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {conflicts.map((c) => (
                      <tr
                        key={c.id}
                        className="hover:bg-slate-800/40 transition"
                      >
                        <td className="px-2 py-2">{c.type}</td>
                        <td className="px-2 py-2">{c.course}</td>
                        <td className="px-2 py-2">{c.who}</td>
                        <td className="px-2 py-2">{c.when}</td>
                        <td className="px-2 py-2">{c.room}</td>
                        <td className="px-2 py-2 space-x-2">
                          <Link
                            to={`/conflicts/${c.id}`}
                            className="text-indigo-400 hover:underline"
                          >
                            View
                          </Link>
                          <Link
                            to={`/conflicts/${c.id}/swap`}
                            className="text-indigo-400 hover:underline"
                          >
                            Swap
                          </Link>
                          <button className="text-indigo-400 hover:underline">
                            Resolve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end pt-3">
                <Link
                  to="/conflicts"
                  className="text-indigo-400 hover:underline"
                >
                  See all
                </Link>
              </div>
            </div>

            {/* Utilization */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow">
              <h2 className="text-sm font-semibold text-slate-400 mb-1">
                Room Utilization
              </h2>
              <p className="text-slate-400 text-xs mb-2">
                Estimated weekly utilization (demo data)
              </p>
              <div className="grid grid-cols-7 gap-1 py-3">
                {Array.from({ length: 35 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-4 rounded bg-gradient-to-b from-indigo-400 to-emerald-400"
                    style={{ opacity: 0.25 + (i % 7) * 0.1 }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <span>Low</span>
                <div className="h-2 w-32 rounded bg-gradient-to-r from-indigo-400/30 to-emerald-400/80" />
                <span>High</span>
              </div>
            </div>
          </section>

          {/* Recent Changes + Timetable Preview */}
          <section
            className="grid lg:grid-cols-2 gap-6"
            aria-label="Changes and Preview"
          >
            {/* Recent Changes */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow">
              <h2 className="text-sm font-semibold text-slate-400 mb-3">
                Recent Changes
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full table-fixed text-sm">
                  <thead className="text-slate-400 bg-slate-800/50">
                    <tr>
                      <th className="px-2 py-2 text-left">Change</th>
                      <th className="px-2 py-2 text-left">Item</th>
                      <th className="px-2 py-2 text-left">By</th>
                      <th className="px-2 py-2 text-left">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {recentChanges.map((r) => (
                      <tr
                        key={r.id}
                        className="hover:bg-slate-800/40 transition"
                      >
                        <td className="px-2 py-2">{r.change}</td>
                        <td className="px-2 py-2">{r.item}</td>
                        <td className="px-2 py-2">{r.by}</td>
                        <td className="px-2 py-2">{r.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timetable Preview */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow flex flex-col justify-center items-start">
              <h2 className="text-sm font-semibold text-slate-400 mb-2">
                Timetable Preview
              </h2>
              <p className="text-slate-400 text-sm mb-4">
                Open a read-only grid for a sample cohort.
              </p>
              <Link
                to="/demo"
                className="inline-flex items-center rounded-xl bg-indigo-500 text-white font-medium px-4 py-2 shadow hover:bg-indigo-600 transition"
              >
                Open Sample Timetable
              </Link>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/70 mt-6">
        <div className="mx-auto max-w-[1280px] px-6 py-4 flex items-center justify-between text-sm text-slate-400">
          <p>© 2025 Timely NEP</p>
          <nav aria-label="Footer">
            <ul className="flex items-center gap-4">
              <li>
                <a
                  href="/accessibility"
                  className="hover:text-indigo-400 transition"
                >
                  Accessibility
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-indigo-400 transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-indigo-400 transition">
                  Terms
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
