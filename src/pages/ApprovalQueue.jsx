import { useState } from "react";
import { CheckCircleIcon, XCircleIcon, AlertCircleIcon } from "lucide-react";

export default function ApprovalQueue() {
  const [approvals, setApprovals] = useState([
    {
      id: "APR-1024",
      type: "Program timetable",
      scope: "FYUGP-CS Sem 3",
      impact: "0 hard, -8% idle",
      status: "Awaiting HOD",
    },
    {
      id: "APR-1025",
      type: "Elective add",
      scope: "AI & ML seats +10",
      impact: "Lab load +5%",
      status: "Awaiting HOD",
    },
    {
      id: "APR-1026",
      type: "Room swap",
      scope: "OS Lab -> CS-Lab-2",
      impact: "Capacity +10",
      status: "Awaiting HOD",
    },
    {
      id: "APR-1027",
      type: "Faculty availability",
      scope: "Dr. Rao Wed 2–3 off",
      impact: "Repack 1 tutorial",
      status: "Awaiting HOD",
    },
  ]);

  function actApproval(id, action) {
    setApprovals((list) =>
      list.map((a) => (a.id === id ? { ...a, status: action } : a))
    );
    // TODO: POST action to backend
  }

  return (
    <div className="max-w-[1280px] px-6 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Approval Queue
        </h1>
        <p className="text-slate-400 mt-2">
          Review and approve pending timetable changes and requests
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold flex items-center gap-2">
            <CheckCircleIcon size={18} className="text-indigo-400" />
            Pending Approvals (
            {approvals.filter((a) => a.status === "Awaiting HOD").length})
          </h2>
        </div>

        <ul className="divide-y divide-slate-800/50">
          {approvals.map((a) => (
            <li
              key={a.id}
              className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 group hover:bg-slate-800/10 px-3 rounded-lg transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-2 py-1 rounded">
                    {a.id}
                  </span>
                  <p className="font-medium text-slate-100">{a.type}</p>
                </div>
                <p className="text-sm text-slate-400 mb-1">{a.scope}</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                  Impact: {a.impact}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-3 py-1.5 rounded-lg ${
                    a.status === "Approved"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : a.status === "Rejected"
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      : a.status === "Changes requested"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-slate-700/50 text-slate-300 border border-slate-600"
                  }`}
                >
                  {a.status}
                </span>
                {a.status === "Awaiting HOD" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => actApproval(a.id, "Approved")}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-emerald-400 hover:bg-emerald-500/10 text-xs transition-all flex items-center gap-1"
                      title="Approve"
                    >
                      <CheckCircleIcon size={14} className="text-emerald-400" />
                      Approve
                    </button>
                    <button
                      onClick={() => actApproval(a.id, "Changes requested")}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-amber-400 hover:bg-amber-500/10 text-xs transition-all flex items-center gap-1"
                      title="Request changes"
                    >
                      <AlertCircleIcon size={14} className="text-amber-400" />
                      Changes
                    </button>
                    <button
                      onClick={() => actApproval(a.id, "Rejected")}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-rose-400 hover:bg-rose-500/10 text-xs transition-all flex items-center gap-1"
                      title="Reject"
                    >
                      <XCircleIcon size={14} className="text-rose-400" />
                      Reject
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
