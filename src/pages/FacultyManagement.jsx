// src/pages/FacultyManagement.jsx
import React, { useEffect, useMemo, useState } from "react";

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-[1200px] px-5 py-4">
          <h1 className="text-2xl font-bold text-white">Faculty Management</h1>
          <p className="text-slate-300 mt-1">
            Manage faculty availability, load limits, preferences, and ITEP
            supervision windows.
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-[1200px] px-5 py-6 space-y-6">
        {/* Faculty Roster */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="text-lg font-semibold text-slate-300 mb-3">
            Faculty Roster
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-sm">
              <thead className="text-slate-300 bg-slate-800">
                <tr>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Dept</th>
                  <th className="px-3 py-2 text-left">Expertise</th>
                  <th className="px-3 py-2 text-left">Max Load</th>
                  <th className="px-3 py-2 text-left">Assigned</th>
                  <th className="px-3 py-2 text-left">Preferences</th>
                  <th className="px-3 py-2 text-left w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {faculty.map((f) => (
                  <tr
                    key={f.id}
                    className={
                      selected?.id === f.id
                        ? "bg-indigo-500/10"
                        : "hover:bg-slate-800/50"
                    }
                  >
                    <td className="px-3 py-2">{f.name}</td>
                    <td className="px-3 py-2">{f.dept}</td>
                    <td className="px-3 py-2">
                      {f.expertise.map((e, i) => (
                        <span
                          key={i}
                          className="inline-block bg-indigo-700/50 text-slate-100 px-2 py-0.5 rounded mr-1 mb-1 text-xs"
                        >
                          {e}
                        </span>
                      ))}
                    </td>
                    <td className="px-3 py-2">{f.maxLoadHours}</td>
                    <td className="px-3 py-2">{assignedEstimate[f.id]} hrs</td>
                    <td className="px-3 py-2">
                      {[
                        f.preferences.morning && "Morning",
                        f.preferences.compactDays && "Compact Days",
                      ]
                        .filter(Boolean)
                        .map((p, i) => (
                          <span
                            key={i}
                            className="inline-block bg-emerald-700/40 text-slate-100 px-2 py-0.5 rounded mr-1 text-xs"
                          >
                            {p}
                          </span>
                        ))}
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => openEdit(f)}
                        className="text-indigo-400 underline text-sm"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Edit Drawer */}
        {edit && (
          <section
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-20 grid place-items-center bg-black/50 p-3"
          >
            <div className="w-[min(980px,96vw)] max-h-[92vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                <h2 className="text-lg font-semibold">Edit Faculty</h2>
                <button
                  onClick={cancel}
                  className="h-8 w-8 flex items-center justify-center rounded border border-slate-700 bg-slate-800"
                >
                  ×
                </button>
              </div>

              {/* Form */}
              <form
                className="grid gap-4 p-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  save();
                }}
              >
                {/* Profile */}
                <fieldset className="border border-dashed border-slate-700 rounded-lg p-4">
                  <legend className="text-slate-300">Profile</legend>
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="grid gap-1">
                      <span>Name</span>
                      <input
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                        value={edit.name}
                        onChange={(e) =>
                          setEdit({ ...edit, name: e.target.value })
                        }
                        required
                      />
                    </label>
                    <label className="grid gap-1">
                      <span>Department</span>
                      <input
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                        value={edit.dept}
                        onChange={(e) =>
                          setEdit({ ...edit, dept: e.target.value })
                        }
                        required
                      />
                    </label>
                    <label className="grid gap-1 md:col-span-2">
                      <span>Expertise (comma-separated)</span>
                      <input
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
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
                    </label>
                    <label className="grid gap-1">
                      <span>Max load (hrs/week)</span>
                      <input
                        type="number"
                        min="1"
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                        value={edit.maxLoadHours}
                        onChange={(e) =>
                          setEdit({
                            ...edit,
                            maxLoadHours: Number(e.target.value),
                          })
                        }
                        required
                      />
                    </label>
                    <div className="flex items-center gap-4 md:col-span-2">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
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
                        Prefers mornings
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
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
                        Prefers compact days
                      </label>
                    </div>
                  </div>
                </fieldset>

                {/* Availability */}
                <fieldset className="border border-dashed border-slate-700 rounded-lg p-4">
                  <legend className="text-slate-300">
                    Weekly Availability
                  </legend>
                  <div className="overflow-x-auto">
                    <div className="grid gap-1">
                      {/* Header */}
                      <div className="grid grid-cols-[120px_repeat(5,1fr)] gap-1">
                        <div className="bg-slate-800 border border-slate-700 text-center py-2 text-slate-300">
                          Time
                        </div>
                        {DAYS.map((d) => (
                          <div
                            key={d}
                            className="bg-slate-800 border border-slate-700 text-center py-2 text-slate-300"
                          >
                            {d}
                          </div>
                        ))}
                      </div>
                      {/* Rows */}
                      {SLOTS.map((slot) => (
                        <div
                          key={slot}
                          className="grid grid-cols-[120px_repeat(5,1fr)] gap-1"
                        >
                          <div className="bg-slate-800 border border-slate-700 text-center py-2 text-slate-300">
                            {slot}
                          </div>
                          {DAYS.map((day) => {
                            const key = `${day}-${slot}`;
                            const selected = edit.availability.includes(key);
                            return (
                              <button
                                key={day}
                                className={`h-10 rounded border ${
                                  selected
                                    ? "bg-emerald-500/25 border-emerald-500/50"
                                    : "bg-slate-800/60 border-slate-700"
                                } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleSlot(day, slot);
                                }}
                                aria-label={`${day} ${slot} ${
                                  selected ? "selected" : "not selected"
                                }`}
                              >
                                {selected ? "✓" : ""}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </fieldset>

                {/* Supervision */}
                <fieldset className="border border-dashed border-slate-700 rounded-lg p-4">
                  <legend className="text-slate-300">ITEP Supervision</legend>
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="grid gap-1">
                      <span>Pre‑internship window</span>
                      <input
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
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
                    </label>
                    <label className="grid gap-1">
                      <span>Internship window</span>
                      <input
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
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
                    </label>
                  </div>
                </fieldset>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="rounded-lg border border-slate-700 px-4 py-2"
                    onClick={cancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-500 px-4 py-2 font-bold text-slate-900"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
