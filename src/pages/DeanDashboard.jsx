import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOutIcon,
  BuildingIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  ClipboardCheckIcon,
  GraduationCapIcon,
  BarChartIcon,
  CalendarIcon,
  AlertCircleIcon,
  DoorOpenIcon,
  CheckIcon,
  XIcon,
  FileUpIcon,
  BookOpenIcon,
  ShieldIcon,
} from "lucide-react";
import Modal from "../components/Modal";
export default function DeanDashboard() {
  const navigate = useNavigate();
  // Context
  const context = {
    college: "School of Engineering",
    term: "AY 2025-26, Sem 3",
  };
  // KPIs (demo)
  const kpis = [
    {
      label: "Load variance (p95)",
      value: "±3.2 hrs",
      help: "Faculty distribution",
      icon: <BarChartIcon size={16} className="text-indigo-400" />,
    },
    {
      label: "Room utilization",
      value: "76%",
      help: "By type (peak)",
      icon: <DoorOpenIcon size={16} className="text-emerald-400" />,
    },
    {
      label: "Cross-dept clashes",
      value: 2,
      help: "Current unresolved",
      icon: <AlertTriangleIcon size={16} className="text-amber-400" />,
    },
    {
      label: "Approval SLA (median)",
      value: "1.5 days",
      help: "Dean decisions",
      icon: <ClipboardCheckIcon size={16} className="text-violet-400" />,
    },
  ];
  // College timetable approvals
  const [ttApprovals, setTtApprovals] = useState([
    {
      id: "CT-7001",
      dept: "CS",
      scope: "FYUGP-CS Sem 3",
      impact: "0 hard, -7% idle, +4% lab util",
      status: "Awaiting Dean",
    },
    {
      id: "CT-7002",
      dept: "EE",
      scope: "FYUGP-EE Sem 5",
      impact: "0 hard, -3% idle",
      status: "Awaiting Dean",
    },
  ]);
  function actTtApproval(id, action) {
    setTtApprovals((list) =>
      list.map((x) => (x.id === id ? { ...x, status: action } : x))
    );
    // TODO: POST to backend
  }
  // Cross-department conflict board
  const [conflicts, setConflicts] = useState([
    {
      id: "XCF-221",
      type: "Shared lab",
      detail: "CS-Lab-2 Wed 11:30 CS vs ECE elective",
      status: "New",
    },
    {
      id: "XCF-222",
      type: "Common elective",
      detail: "AI & ML vs Data Viz cross-school",
      status: "Investigating",
    },
  ]);
  function resolveConflict(id) {
    setConflicts((list) =>
      list.map((x) => (x.id === id ? { ...x, status: "Resolved" } : x))
    );
    // TODO: action: mandate substitution/re-room and notify
  }
  // Capacity and low-enrollment governance
  const [capacity, setCapacity] = useState([
    {
      code: "CS344",
      name: "Cloud Computing",
      dept: "CS",
      cap: 60,
      enrolled: 61,
      room: "CS-201",
    },
    {
      code: "EE312",
      name: "Power Systems",
      dept: "EE",
      cap: 60,
      enrolled: 31,
      room: "EE-101",
    },
  ]);
  function suggestAction(row) {
    const util = row.enrolled / row.cap;
    if (util > 1) return "Increase capacity / Larger room";
    if (util < 0.6) return "Merge/Close section";
    return "OK";
  }
  // Policy packs & compliance
  const [policy, setPolicy] = useState({
    fyugpLTP: "Lecture: 1 credit = 1 hr/week; Practicum: 1 credit = 2 hrs/week",
    itepPracticum: "Protected Wed 14:00–16:30; Min 20 hrs/term",
    calendar: "15 teaching weeks; Exam weeks excluded",
    status: "Awaiting Dean",
  });
  function approvePolicy() {
    setPolicy((p) => ({ ...p, status: "Approved" }));
    // TODO: persist approval/version
  }
  // ITEP practicum oversight
  const [practicum, setPracticum] = useState([
    {
      dept: "ITEP",
      cohort: "ITEP-S3",
      day: "Wed",
      start: "14:00",
      end: "16:30",
      school: "City High School",
      status: "Awaiting Dean",
    },
    {
      dept: "ITEP",
      cohort: "ITEP-S3",
      day: "Fri",
      start: "10:15",
      end: "12:15",
      school: "Riverdale School",
      status: "Awaiting Dean",
    },
  ]);
  function approvePracticum(idx) {
    setPracticum((list) =>
      list.map((x, i) => (i === idx ? { ...x, status: "Approved" } : x))
    );
    // TODO: persist, enforce as blackout
  }
  // Exception approvals (post-HOD)
  const [exceptions, setExceptions] = useState([
    {
      id: "EX-9001",
      type: "Cross-college elective",
      detail: "Mgmt elective slot request for CS cohort",
      status: "Awaiting Dean",
    },
    {
      id: "EX-9002",
      type: "Availability change",
      detail: "Adjunct Thu 14:00 now unavailable",
      status: "Awaiting Dean",
    },
  ]);
  function actException(id, action) {
    setExceptions((list) =>
      list.map((x) => (x.id === id ? { ...x, status: action } : x))
    );
    // TODO: persist decision
  }
  // Rooms & Labs management (upload + edit + merge)
  const [showRooms, setShowRooms] = useState(false);
  const [rooms, setRooms] = useState([
    {
      code: "CS-201",
      type: "Lecture",
      capacity: 70,
      equipment: "Projector",
      owner: "Central",
      status: "Catalog",
    },
    {
      code: "CS-Lab-2",
      type: "Lab",
      capacity: 40,
      equipment: "Computers x40",
      owner: "CS Dept",
      status: "Catalog",
    },
  ]);
  const [newRoom, setNewRoom] = useState({
    code: "",
    type: "Lecture",
    capacity: 60,
    equipment: "",
    owner: "Central",
  });
  const [pendingRooms, setPendingRooms] = useState([
    {
      code: "EE-Lab-3",
      type: "Lab",
      capacity: 35,
      equipment: "PSU, Scopes",
      owner: "EE Dept",
      status: "Pending",
    },
  ]);
  function addRoom() {
    if (!newRoom.code || !newRoom.type || !newRoom.capacity) {
      alert("Fill code, type, capacity");
      return;
    }
    setPendingRooms((list) => [...list, { ...newRoom, status: "Pending" }]);
    setNewRoom({
      code: "",
      type: "Lecture",
      capacity: 60,
      equipment: "",
      owner: "Central",
    });
  }
  function approveRoom(idx) {
    const item = pendingRooms[idx];
    setRooms((list) => [...list, { ...item, status: "Catalog" }]);
    setPendingRooms((list) => list.filter((_, i) => i !== idx));
    // TODO: merge into master catalog
  }
  function rejectRoom(idx) {
    setPendingRooms((list) => list.filter((_, i) => i !== idx));
    // TODO: record rejection reason
  }
  function importCSV(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: parse CSV; push entries into pendingRooms
    alert(`Imported: ${file.name} (parsed into pending list)`);
  }
  // Logout-only header
  function handleLogout() {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      sessionStorage.clear();
    } finally {
      navigate("/login", { replace: true });
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
      {/* Main */}
      <main
        className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-8"
        aria-label="Dean dashboard main"
      >
        {/* Sidebar */}
        <aside aria-label="College" className="self-start space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-sm">
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {context.college}
            </h1>
            <p className="text-sm text-slate-400 mt-1">{context.term}</p>
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <BarChartIcon size={16} className="text-indigo-400" />
                Key metrics
              </h3>
              <ul className="grid grid-cols-1 gap-3">
                {kpis.map((k, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-xl bg-slate-800/40 px-4 py-3 border border-slate-700/50 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex-shrink-0">{k.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-200">
                        {k.label}
                      </p>
                      <p className="text-xs text-slate-400">{k.help}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-lg">{k.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setShowRooms(true)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 hover:border-indigo-400 hover:bg-indigo-500/10 text-sm transition-all flex items-center justify-center gap-2"
              >
                <DoorOpenIcon size={16} />
                Rooms & Labs Management
              </button>
            </div>
          </div>
        </aside>
        {/* Content */}
        <section className="space-y-8" aria-label="Content">
          {/* College timetable approvals */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold flex items-center gap-2">
                <ClipboardCheckIcon size={18} className="text-indigo-400" />
                College timetable approvals
              </h2>
            </div>
            <ul className="divide-y divide-slate-800/50">
              {ttApprovals.map((a) => (
                <li
                  key={a.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-800/10 px-3 rounded-lg transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">
                        {a.id}
                      </span>
                      <p className="font-medium text-slate-100">
                        {a.dept} — {a.scope}
                      </p>
                    </div>
                    <p className="text-xs text-emerald-400 mt-1.5 flex items-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                      Impact: {a.impact}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-2">{a.status}</p>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => actTtApproval(a.id, "Approved")}
                        className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-emerald-400 hover:bg-emerald-500/10 text-xs transition-all flex items-center gap-1"
                      >
                        <CheckCircleIcon
                          size={14}
                          className="text-emerald-400"
                        />
                        Approve
                      </button>
                      <button
                        onClick={() => actTtApproval(a.id, "Sent back")}
                        className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-amber-400 hover:bg-amber-500/10 text-xs transition-all flex items-center gap-1"
                      >
                        <AlertCircleIcon size={14} className="text-amber-400" />
                        Send back
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Cross-department conflict board */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold flex items-center gap-2">
                <AlertTriangleIcon size={18} className="text-amber-400" />
                Cross-department conflicts
              </h2>
            </div>
            <ul className="divide-y divide-slate-800/50">
              {conflicts.map((c) => (
                <li
                  key={c.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-800/10 px-3 rounded-lg transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">
                        {c.id}
                      </span>
                      <p className="font-medium text-slate-100">{c.type}</p>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{c.detail}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 ${
                        c.status === "New"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : c.status === "Investigating"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}
                    >
                      {c.status === "New" ? (
                        <AlertCircleIcon size={12} />
                      ) : c.status === "Investigating" ? (
                        <AlertCircleIcon size={12} />
                      ) : (
                        <CheckCircleIcon size={12} />
                      )}
                      {c.status}
                    </span>
                    <button
                      onClick={() => resolveConflict(c.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-emerald-400 hover:bg-emerald-500/10 text-xs transition-all flex items-center gap-1"
                    >
                      <CheckIcon size={14} className="text-emerald-400" />
                      Resolve
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Capacity & low-enrollment governance */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <BarChartIcon size={18} className="text-indigo-400" />
              Capacity governance
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-800/50 rounded-lg">
                  <tr className="text-left text-slate-300">
                    <th className="py-3 px-4 rounded-l-lg">Code</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Dept</th>
                    <th className="py-3 px-4">Cap</th>
                    <th className="py-3 px-4">Enrolled</th>
                    <th className="py-3 px-4 rounded-r-lg">Suggestion</th>
                  </tr>
                </thead>
                <tbody>
                  {capacity.map((row, idx) => {
                    const util = row.enrolled / row.cap;
                    const sugg = suggestAction(row);
                    const suggClass = sugg.includes("Increase")
                      ? "text-amber-300"
                      : sugg.includes("Merge")
                      ? "text-rose-300"
                      : "text-emerald-300";
                    return (
                      <tr
                        key={row.code}
                        className={`border-t border-slate-800/50 hover:bg-slate-800/20 ${
                          idx === capacity.length - 1 ? "rounded-b-lg" : ""
                        }`}
                      >
                        <td className="py-3 px-4 font-mono text-indigo-300">
                          {row.code}
                        </td>
                        <td className="py-3 px-4 font-medium">{row.name}</td>
                        <td className="py-3 px-4">{row.dept}</td>
                        <td className="py-3 px-4">{row.cap}</td>
                        <td className="py-3 px-4">{row.enrolled}</td>
                        <td className={`py-3 px-4 ${suggClass} font-medium`}>
                          <div className="flex items-center gap-2">
                            {sugg.includes("Increase") && (
                              <AlertCircleIcon size={14} />
                            )}
                            {sugg.includes("Merge") && (
                              <AlertTriangleIcon size={14} />
                            )}
                            {sugg === "OK" && <CheckCircleIcon size={14} />}
                            {sugg}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* Policy packs & compliance */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <ShieldIcon size={18} className="text-indigo-400" />
              Policy packs & compliance
            </h2>
            <dl className="text-sm space-y-3">
              <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                <dt className="text-slate-400 mb-1">FYUGP L–T–P mapping</dt>
                <dd className="text-slate-100">{policy.fyugpLTP}</dd>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                <dt className="text-slate-400 mb-1">ITEP practicum</dt>
                <dd className="text-slate-100">{policy.itepPracticum}</dd>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                <dt className="text-slate-400 mb-1">Academic calendar</dt>
                <dd className="text-slate-100">{policy.calendar}</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <AlertCircleIcon size={12} />
                {policy.status}
              </span>
              {policy.status !== "Approved" && (
                <button
                  onClick={approvePolicy}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/30 flex items-center gap-2"
                >
                  <CheckCircleIcon size={16} />
                  Approve
                </button>
              )}
            </div>
          </div>
          {/* ITEP practicum oversight */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <GraduationCapIcon size={18} className="text-indigo-400" />
              ITEP practicum oversight
            </h2>
            <ul className="divide-y divide-slate-800/50">
              {practicum.map((p, i) => (
                <li
                  key={`${p.cohort}-${i}`}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-800/10 px-3 rounded-lg transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                        {p.dept}
                      </span>
                      <p className="font-medium text-slate-100">
                        {p.cohort}: {p.school}
                      </p>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                      <CalendarIcon size={12} className="text-slate-400" />
                      {p.day} {p.start}–{p.end}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 ${
                        p.status === "Approved"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {p.status === "Approved" ? (
                        <CheckCircleIcon size={12} />
                      ) : (
                        <AlertCircleIcon size={12} />
                      )}
                      {p.status}
                    </span>
                    {p.status !== "Approved" && (
                      <button
                        onClick={() => approvePracticum(i)}
                        className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-emerald-400 hover:bg-emerald-500/10 text-xs transition-all flex items-center gap-1"
                      >
                        <CheckCircleIcon
                          size={14}
                          className="text-emerald-400"
                        />
                        Approve
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Exception approvals */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold flex items-center gap-2">
                <AlertCircleIcon size={18} className="text-amber-400" />
                Exception approvals
              </h2>
            </div>
            <ul className="divide-y divide-slate-800/50">
              {exceptions.map((ex) => (
                <li
                  key={ex.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-800/10 px-3 rounded-lg transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">
                        {ex.id}
                      </span>
                      <p className="font-medium text-slate-100">{ex.type}</p>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{ex.detail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs px-2.5 py-1 rounded-md inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      <AlertCircleIcon size={12} />
                      {ex.status}
                    </p>
                    <div className="mt-2 flex gap-2 justify-end">
                      <button
                        onClick={() => actException(ex.id, "Approved")}
                        className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-emerald-400 hover:bg-emerald-500/10 text-xs transition-all flex items-center gap-1"
                      >
                        <CheckCircleIcon
                          size={14}
                          className="text-emerald-400"
                        />
                        Approve
                      </button>
                      <button
                        onClick={() => actException(ex.id, "Rejected")}
                        className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-rose-400 hover:bg-rose-500/10 text-xs transition-all flex items-center gap-1"
                      >
                        <XCircleIcon size={14} className="text-rose-400" />
                        Reject
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      {/* Rooms & Labs modal */}
      {showRooms && (
        <Modal
          title="Rooms & Labs Management"
          onClose={() => setShowRooms(false)}
        >
          <div className="space-y-5">
            <div className="grid sm:grid-cols-5 gap-3 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
              <input
                placeholder="Code (e.g., CS-201)"
                value={newRoom.code}
                onChange={(e) =>
                  setNewRoom((r) => ({ ...r, code: e.target.value }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
              <select
                value={newRoom.type}
                onChange={(e) =>
                  setNewRoom((r) => ({ ...r, type: e.target.value }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>Lecture</option>
                <option>Lab</option>
                <option>Studio</option>
                <option>Seminar</option>
              </select>
              <input
                type="number"
                placeholder="Capacity"
                value={newRoom.capacity}
                onChange={(e) =>
                  setNewRoom((r) => ({
                    ...r,
                    capacity: Number(e.target.value),
                  }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
              <input
                placeholder="Equipment"
                value={newRoom.equipment}
                onChange={(e) =>
                  setNewRoom((r) => ({ ...r, equipment: e.target.value }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
              <select
                value={newRoom.owner}
                onChange={(e) =>
                  setNewRoom((r) => ({ ...r, owner: e.target.value }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>Central</option>
                <option>CS Dept</option>
                <option>EE Dept</option>
                <option>ME Dept</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={addRoom}
                className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-indigo-400 hover:bg-indigo-500/10 text-sm transition-all flex items-center gap-2"
              >
                <DoorOpenIcon size={16} />
                Add pending
              </button>
              <div className="flex items-center gap-3">
                <label className="text-sm text-slate-300 flex items-center gap-2">
                  <FileUpIcon size={16} className="text-indigo-400" />
                  Bulk import CSV
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={importCSV}
                  className="text-sm text-slate-300"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <BookOpenIcon size={16} className="text-indigo-400" />
                  Pending merge
                </h4>
                <div className="border border-slate-700/50 rounded-xl overflow-hidden">
                  <ul className="divide-y divide-slate-800/50 max-h-56 overflow-auto">
                    {pendingRooms.map((r, i) => (
                      <li
                        key={`${r.code}-${i}`}
                        className="py-3 px-4 flex items-center justify-between hover:bg-slate-800/20 group"
                      >
                        <div>
                          <p className="font-medium">{r.code}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                              {r.type}
                            </span>
                            <span className="text-xs text-slate-400">
                              Cap: {r.capacity}
                            </span>
                            <span className="text-xs text-slate-400">
                              {r.owner}
                            </span>
                          </div>
                          {r.equipment && (
                            <p className="text-xs text-slate-500 mt-1">
                              {r.equipment}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => approveRoom(i)}
                            className="text-xs text-emerald-400 hover:text-emerald-300 px-2 py-1 rounded-md hover:bg-emerald-500/10 flex items-center gap-1"
                          >
                            <CheckIcon size={12} />
                            Approve
                          </button>
                          <button
                            onClick={() => rejectRoom(i)}
                            className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded-md hover:bg-rose-500/10 flex items-center gap-1"
                          >
                            <XIcon size={12} />
                            Reject
                          </button>
                        </div>
                      </li>
                    ))}
                    {pendingRooms.length === 0 && (
                      <li className="py-4 px-4 text-sm text-slate-400 italic">
                        No pending rooms
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <DoorOpenIcon size={16} className="text-indigo-400" />
                  Room catalog
                </h4>
                <div className="border border-slate-700/50 rounded-xl overflow-hidden">
                  <ul className="divide-y divide-slate-800/50 max-h-56 overflow-auto">
                    {rooms.map((r, i) => (
                      <li
                        key={`${r.code}-${i}`}
                        className="py-3 px-4 flex items-center justify-between hover:bg-slate-800/20"
                      >
                        <div>
                          <p className="font-medium">{r.code}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                              {r.type}
                            </span>
                            <span className="text-xs text-slate-400">
                              Cap: {r.capacity}
                            </span>
                            <span className="text-xs text-slate-400">
                              {r.owner}
                            </span>
                          </div>
                          {r.equipment && (
                            <p className="text-xs text-slate-500 mt-1">
                              {r.equipment}
                            </p>
                          )}
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                          Catalog
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowRooms(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
