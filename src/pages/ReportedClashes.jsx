import { useState } from "react";
import {
  AlertTriangleIcon,
  SearchIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";

export default function ReportedClashes() {
  const [clashes, setClashes] = useState([
    {
      id: "CL-3201",
      category: "Student overlap",
      detail: "AI & ML vs Cloud Wed 11:30",
      status: "New",
      affected: ["CS342", "CS344"],
    },
    {
      id: "CL-3202",
      category: "Room double-booked",
      detail: "CS-Lab-1 Fri 10:15",
      status: "New",
      affected: ["CS331", "EE210"],
    },
    {
      id: "CL-3203",
      category: "Faculty unavailable",
      detail: "Dr. Rao Tue 14:00",
      status: "Investigating",
      affected: ["CS201"],
    },
  ]);

  function updateClash(id, status) {
    setClashes((list) => list.map((c) => (c.id === id ? { ...c, status } : c)));
    // TODO: POST status update
  }

  return (
    <div className="max-w-[1280px] px-6 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Reported Clashes
        </h1>
        <p className="text-slate-400 mt-2">
          Manage and resolve timetable conflicts and clashes
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold flex items-center gap-2">
            <AlertTriangleIcon size={18} className="text-amber-400" />
            Active Clashes (
            {clashes.filter((c) => c.status !== "Resolved").length})
          </h2>
        </div>

        <ul className="divide-y divide-slate-800/50">
          {clashes.map((c) => (
            <li
              key={c.id}
              className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 group hover:bg-slate-800/10 px-3 rounded-lg transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-2 py-1 rounded">
                    {c.id}
                  </span>
                  <p className="font-medium text-slate-100">{c.category}</p>
                </div>
                <p className="text-sm text-slate-400 mb-1">{c.detail}</p>
                <p className="text-xs text-slate-500">
                  Affected: {c.affected.join(", ")}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
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
                    <SearchIcon size={12} />
                  ) : (
                    <CheckCircleIcon size={12} />
                  )}
                  {c.status}
                </span>

                {c.status !== "Resolved" && (
                  <div className="flex gap-2">
                    {c.status === "New" && (
                      <button
                        onClick={() => updateClash(c.id, "Investigating")}
                        className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-amber-400 hover:bg-amber-500/10 text-xs transition-all flex items-center gap-1"
                        title="Start investigation"
                      >
                        <SearchIcon size={14} className="text-amber-400" />
                        Investigate
                      </button>
                    )}
                    <button
                      onClick={() => updateClash(c.id, "Resolved")}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-emerald-400 hover:bg-emerald-500/10 text-xs transition-all flex items-center gap-1"
                      title="Mark as resolved"
                    >
                      <CheckCircleIcon size={14} className="text-emerald-400" />
                      Resolve
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
