import React, { useEffect, useMemo, useState } from "react";
import {
  UserIcon,
  Users2Icon,
  CalendarIcon,
  ClockIcon,
  BookOpenIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  BuildingIcon,
  SunIcon,
  LayoutGridIcon,
  CheckCircleIcon,
  XIcon,
  PencilIcon,
  SaveIcon,
  AlertTriangleIcon,
  BookIcon,
  ListChecksIcon,
  LucideCheckSquare,
  CheckSquareIcon,
  StarIcon,
  ClipboardCheckIcon,
  UserCogIcon,
  TimerIcon,
  MapPinIcon,
} from "lucide-react";
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];
const seedFaculty = [
  {
    id: "f1",
    name: "Dr. Rao",
    dept: "Education",
    expertise: ["Pedagogy", "Assessment"],
    maxLoadHours: 14,
    preferences: { morning: true, compactDays: true },
    availability: [
      "Mon-09:00",
      "Mon-10:00",
      "Tue-09:00",
      "Thu-10:00",
      "Fri-11:00",
    ],
    supervision: { preInternship: "Wed 10–12", internship: "Weeks 8–10" },
  },
  {
    id: "f2",
    name: "Ms. Mehta",
    dept: "Education",
    expertise: ["Microteaching", "School Internship"],
    maxLoadHours: 12,
    preferences: { morning: false, compactDays: true },
    availability: ["Tue-11:00", "Wed-09:00", "Thu-14:00", "Fri-15:00"],
    supervision: { preInternship: "Tue 11–13", internship: "Weeks 8–12" },
  },
  {
    id: "f3",
    name: "Mr. Khan",
    dept: "CS",
    expertise: ["Programming Labs"],
    maxLoadHours: 10,
    preferences: { morning: true, compactDays: false },
    availability: ["Mon-14:00", "Wed-14:00", "Wed-15:00", "Thu-16:00"],
    supervision: { preInternship: "", internship: "" },
  },
];
// Map departments to colors
const DEPT_COLORS = {
  Education: "bg-indigo-500/20 text-indigo-300 border-indigo-400/40",
  CS: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
  Mathematics: "bg-blue-500/20 text-blue-300 border-blue-400/40",
  Science: "bg-amber-500/20 text-amber-300 border-amber-400/40",
  Arts: "bg-pink-500/20 text-pink-300 border-pink-400/40",
  Languages: "bg-violet-500/20 text-violet-300 border-violet-400/40",
};
// Map expertise to icons (simplified mapping)
const getExpertiseIcon = (expertise) => {
  const lowerExpertise = expertise.toLowerCase();
  if (lowerExpertise.includes("teach") || lowerExpertise.includes("pedagogy")) {
    return <Users2Icon size={14} />;
  } else if (
    lowerExpertise.includes("assessment") ||
    lowerExpertise.includes("evaluation")
  ) {
    return <ClipboardCheckIcon size={14} />;
  } else if (
    lowerExpertise.includes("lab") ||
    lowerExpertise.includes("programming")
  ) {
    return <BookIcon size={14} />;
  } else if (
    lowerExpertise.includes("internship") ||
    lowerExpertise.includes("school")
  ) {
    return <GraduationCapIcon size={14} />;
  } else {
    return <StarIcon size={14} />;
  }
};
function loadState() {
  const f = localStorage.getItem("faculty");
  return f ? JSON.parse(f) : seedFaculty;
}
export default function FacultyManagement() {
  const [faculty, setFaculty] = useState(loadState());
  const [selected, setSelected] = useState(null);
  const [edit, setEdit] = useState(null);
  useEffect(() => {
    localStorage.setItem("faculty", JSON.stringify(faculty));
  }, [faculty]);
  const assignedEstimate = useMemo(() => {
    const map = {};
    faculty.forEach((f) => {
      map[f.id] = Math.min(
        f.maxLoadHours,
        Math.ceil(f.availability.length / 2)
      );
    });
    return map;
  }, [faculty]);
  const openEdit = (f) => {
    setSelected(f);
    setEdit(JSON.parse(JSON.stringify(f)));
  };
  const toggleSlot = (day, slot) => {
    const key = `${day}-${slot}`;
    setEdit((e) => {
      const has = e.availability.includes(key);
      const nextAvail = has
        ? e.availability.filter((k) => k !== key)
        : e.availability.concat(key);
      return { ...e, availability: nextAvail };
    });
  };
  const save = () => {
    const errs = [];
    if (!edit.name.trim()) errs.push("Name is required.");
    if (!edit.maxLoadHours || edit.maxLoadHours <= 0)
      errs.push("Max weekly load must be positive.");
    if (edit.dept.trim() === "") errs.push("Department is required.");
    const hasITEP = edit.expertise.some((x) =>
      /internship|microteaching|school/i.test(x)
    );
    if (hasITEP && !edit.supervision.internship)
      errs.push(
        "Provide internship supervision window for ITEP-related faculty."
      );
    if (errs.length) {
      alert(errs.join("\n"));
      return;
    }
    setFaculty((list) => list.map((f) => (f.id === edit.id ? edit : f)));
    setSelected(null);
    setEdit(null);
  };
  const cancel = () => {
    setSelected(null);
    setEdit(null);
  };
  // Calculate load percentage for progress bars
  const calculateLoadPercentage = (assigned, max) => {
    return (assigned / max) * 100;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
      
      {/* Page Header */}
      <div className="max-w-[1280px] mx-auto px-6 pb-6">
        <h1 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
          <UserCogIcon className="text-indigo-400" size={32} />
          Faculty Management
        </h1>
        <p className="text-slate-400">
          Manage faculty availability, teaching load limits, preferences, and
          ITEP supervision windows.
        </p>
      </div>
      {/* Main content */}
      <main className="max-w-[1280px] mx-auto px-6 pb-16">
        {/* Faculty Roster */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg backdrop-blur-sm">
          <div className="p-5 border-b border-slate-800">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Users2Icon size={18} className="text-indigo-400" />
              <span>Faculty Roster</span>
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-300">
                {faculty.length} members
              </span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="text-slate-300 bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Faculty
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Expertise
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Teaching Load
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Preferences
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Supervision
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-[100px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {faculty.map((f) => {
                  const loadPercentage = calculateLoadPercentage(
                    assignedEstimate[f.id],
                    f.maxLoadHours
                  );
                  const loadColor =
                    loadPercentage > 90
                      ? "bg-rose-500"
                      : loadPercentage > 75
                      ? "bg-amber-500"
                      : "bg-emerald-500";
                  return (
                    <tr
                      key={f.id}
                      className={
                        selected?.id === f.id
                          ? "bg-indigo-500/10"
                          : "hover:bg-slate-800/40 transition-colors"
                      }
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-400">
                            <UserIcon size={16} />
                          </div>
                          <div>
                            <div className="font-medium text-slate-200">
                              {f.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              ID: {f.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                            DEPT_COLORS[f.dept] ||
                            "bg-slate-500/20 text-slate-300 border-slate-400/40"
                          }`}
                        >
                          <BuildingIcon size={14} />
                          {f.dept}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {f.expertise.map((e, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2.5 py-0.5 text-xs font-medium"
                            >
                              {getExpertiseIcon(e)}
                              {e}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">
                              {assignedEstimate[f.id]} / {f.maxLoadHours} hrs
                            </span>
                            <span className="text-xs text-slate-400">
                              {Math.round(loadPercentage)}%
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-700 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${loadColor}`}
                              style={{ width: `${loadPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {f.preferences.morning && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 text-xs font-medium">
                              <SunIcon size={14} />
                              Morning
                            </span>
                          )}
                          {f.preferences.compactDays && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 text-xs font-medium">
                              <CalendarIcon size={14} />
                              Compact Days
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          {f.supervision.preInternship && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-300">
                              <ClockIcon
                                size={12}
                                className="text-violet-400"
                              />
                              <span>Pre: {f.supervision.preInternship}</span>
                            </div>
                          )}
                          {f.supervision.internship && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-300">
                              <GraduationCapIcon
                                size={12}
                                className="text-indigo-400"
                              />
                              <span>Int: {f.supervision.internship}</span>
                            </div>
                          )}
                          {!f.supervision.preInternship &&
                            !f.supervision.internship && (
                              <span className="text-slate-500 text-xs">—</span>
                            )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => openEdit(f)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-400/40 px-3 py-1.5 text-xs font-medium transition-colors"
                        >
                          <PencilIcon size={14} />
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        {/* Edit Modal */}
        {edit && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={cancel}
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <div className="w-screen max-w-3xl animate-fadeIn">
                <div className="h-full flex flex-col rounded-l-2xl border border-slate-700 bg-slate-900 shadow-xl">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400">
                        <UserIcon size={20} />
                      </div>
                      <h2 className="text-xl font-bold">
                        Edit Faculty Profile
                      </h2>
                    </div>
                    <button
                      onClick={cancel}
                      className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-slate-800/70 text-slate-400 hover:text-white transition-colors"
                      aria-label="Close"
                    >
                      <XIcon size={18} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        save();
                      }}
                      className="space-y-6"
                    >
                      {/* Profile Section */}
                      <fieldset className="rounded-xl border border-slate-700 bg-slate-800/20 p-5 space-y-5">
                        <legend className="px-2 text-sm font-medium text-indigo-300 flex items-center gap-1.5">
                          <UserIcon size={16} />
                          Profile Information
                        </legend>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                              Name
                            </label>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <UserIcon size={16} />
                              </div>
                              <input
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                value={edit.name}
                                onChange={(e) =>
                                  setEdit({ ...edit, name: e.target.value })
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                              Department
                            </label>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <BuildingIcon size={16} />
                              </div>
                              <input
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                value={edit.dept}
                                onChange={(e) =>
                                  setEdit({ ...edit, dept: e.target.value })
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5 sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-300">
                              Expertise (comma-separated)
                            </label>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <BookOpenIcon size={16} />
                              </div>
                              <input
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                value={edit.expertise.join(", ")}
                                onChange={(e) =>
                                  setEdit({
                                    ...edit,
                                    expertise: e.target.value
                                      .split(",")
                                      .map((s) => s.trim())
                                      .filter(Boolean),
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                              Max Load Hours/Week
                            </label>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <BriefcaseIcon size={16} />
                              </div>
                              <input
                                type="number"
                                min="1"
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                value={edit.maxLoadHours}
                                onChange={(e) =>
                                  setEdit({
                                    ...edit,
                                    maxLoadHours: Number(e.target.value),
                                  })
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="block text-sm font-medium text-slate-300">
                              Teaching Preferences
                            </label>
                            <div className="flex flex-wrap gap-4">
                              <label className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-2 cursor-pointer hover:bg-slate-800/70 transition-colors">
                                <input
                                  type="checkbox"
                                  className="rounded border-slate-600 text-indigo-500 focus:ring-indigo-500"
                                  checked={edit.preferences.morning}
                                  onChange={(e) =>
                                    setEdit({
                                      ...edit,
                                      preferences: {
                                        ...edit.preferences,
                                        morning: e.target.checked,
                                      },
                                    })
                                  }
                                />
                                <span className="flex items-center gap-1.5">
                                  <SunIcon
                                    size={16}
                                    className="text-amber-400"
                                  />
                                  Morning Classes
                                </span>
                              </label>
                              <label className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-2 cursor-pointer hover:bg-slate-800/70 transition-colors">
                                <input
                                  type="checkbox"
                                  className="rounded border-slate-600 text-indigo-500 focus:ring-indigo-500"
                                  checked={edit.preferences.compactDays}
                                  onChange={(e) =>
                                    setEdit({
                                      ...edit,
                                      preferences: {
                                        ...edit.preferences,
                                        compactDays: e.target.checked,
                                      },
                                    })
                                  }
                                />
                                <span className="flex items-center gap-1.5">
                                  <CalendarIcon
                                    size={16}
                                    className="text-emerald-400"
                                  />
                                  Compact Days
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      {/* Weekly Availability */}
                      <fieldset className="rounded-xl border border-slate-700 bg-slate-800/20 p-5 space-y-5">
                        <legend className="px-2 text-sm font-medium text-indigo-300 flex items-center gap-1.5">
                          <CalendarIcon size={16} />
                          Weekly Availability
                        </legend>
                        <div className="overflow-x-auto">
                          <div className="grid grid-cols-[100px_repeat(5,1fr)] gap-2 min-w-[600px]">
                            {/* Header */}
                            <div className="flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 p-2.5 font-medium text-slate-300">
                              <ClockIcon
                                size={16}
                                className="mr-2 text-indigo-400"
                              />
                              Time
                            </div>
                            {DAYS.map((day) => (
                              <div
                                key={day}
                                className="flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 p-2.5 font-medium text-slate-300"
                              >
                                {day}
                              </div>
                            ))}
                            {/* Slots */}
                            {SLOTS.map((slot) => (
                              <React.Fragment key={slot}>
                                <div className="flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 p-2.5 text-sm font-medium text-slate-300">
                                  {slot}
                                </div>
                                {DAYS.map((day) => {
                                  const key = `${day}-${slot}`;
                                  const selected =
                                    edit.availability.includes(key);
                                  return (
                                    <button
                                      key={`${day}-${slot}`}
                                      className={`rounded-lg border p-2.5 transition-all ${
                                        selected
                                          ? "bg-emerald-500/25 border-emerald-500/50 text-emerald-300"
                                          : "bg-slate-800/60 border-slate-700 text-slate-500 hover:bg-slate-800/80"
                                      } focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        toggleSlot(day, slot);
                                      }}
                                      aria-label={`${day} ${slot} ${
                                        selected ? "selected" : "not selected"
                                      }`}
                                    >
                                      {selected ? (
                                        <div className="flex items-center justify-center">
                                          <CheckCircleIcon size={18} />
                                        </div>
                                      ) : (
                                        <div className="flex items-center justify-center opacity-50">
                                          <ClockIcon size={18} />
                                        </div>
                                      )}
                                    </button>
                                  );
                                })}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400 mt-3">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-emerald-500/25 border border-emerald-500/50"></div>
                            <span>Available</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-slate-800/60 border border-slate-700"></div>
                            <span>Unavailable</span>
                          </div>
                        </div>
                      </fieldset>
                      {/* ITEP Supervision */}
                      <fieldset className="rounded-xl border border-slate-700 bg-slate-800/20 p-5 space-y-5">
                        <legend className="px-2 text-sm font-medium text-indigo-300 flex items-center gap-1.5">
                          <GraduationCapIcon size={16} />
                          ITEP Supervision
                        </legend>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                              Pre-Internship Window
                            </label>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <TimerIcon size={16} />
                              </div>
                              <input
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                value={edit.supervision.preInternship}
                                onChange={(e) =>
                                  setEdit({
                                    ...edit,
                                    supervision: {
                                      ...edit.supervision,
                                      preInternship: e.target.value,
                                    },
                                  })
                                }
                                placeholder="e.g., Wed 10–12"
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                              Internship Window
                            </label>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <MapPinIcon size={16} />
                              </div>
                              <input
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                value={edit.supervision.internship}
                                onChange={(e) =>
                                  setEdit({
                                    ...edit,
                                    supervision: {
                                      ...edit.supervision,
                                      internship: e.target.value,
                                    },
                                  })
                                }
                                placeholder="e.g., Weeks 8–10"
                              />
                            </div>
                          </div>
                        </div>
                        {edit.expertise.some((x) =>
                          /internship|microteaching|school/i.test(x)
                        ) &&
                          !edit.supervision.internship && (
                            <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-300">
                              <AlertTriangleIcon size={18} />
                              <span>
                                Internship supervision window is required for
                                ITEP-related faculty.
                              </span>
                            </div>
                          )}
                      </fieldset>
                      {/* Actions */}
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={cancel}
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
      </main>
    </div>
  );
}
