// src/pages/CoursesOfferings.jsx
import React, { useEffect, useMemo, useState } from "react";

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto max-w-[1200px] px-5 py-4">
          <h1 className="text-2xl font-bold">Courses & Offerings</h1>
          <p className="text-slate-300">
            Manage course catalog and create semester offerings for scheduling.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
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
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
            />
            <select
              value={filters.cat}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  filters: { ...s.filters, cat: e.target.value },
                }))
              }
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
            >
              <option>All</option>
              {CATEGORY_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
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
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
            />
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
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
            />
            <select
              value={filters.hasLab}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  filters: { ...s.filters, hasLab: e.target.value },
                }))
              }
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
            >
              <option>All</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </section>

        {/* Courses Table */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-x-auto">
          <table className="min-w-full table-fixed border-collapse">
            <caption className="sr-only">
              Course catalog with NEP categories and L–T–P
            </caption>
            <thead className="text-slate-300">
              <tr className="border-b border-slate-800">
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
                    className="px-4 py-2 text-left text-xs font-semibold uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((c) => (
                <tr key={c.code} className="hover:bg-slate-800/60">
                  <td className="px-4 py-3 text-white font-medium">{c.code}</td>
                  <td className="px-4 py-3 text-slate-300">{c.title}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 px-2 py-1 text-xs">
                      {c.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{c.credits}</td>
                  <td className="px-4 py-3 text-slate-300">
                    {c.l}-{c.t}-{c.p}
                  </td>
                  <td className="px-4 py-3 text-slate-300">{c.duration} min</td>
                  <td className="px-4 py-3 text-slate-300">
                    {c.lab ? (
                      <span className="inline-block rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-1 text-xs">
                        Lab
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="underline text-indigo-400"
                      onClick={() => openDrawer(c)}
                    >
                      Manage Offerings
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Drawer */}
        {drawerOpen && selected && (
          <section className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setDrawerOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <div className="w-screen max-w-2xl">
                <div className="h-full flex flex-col rounded-l-2xl border border-slate-800 bg-slate-900">
                  <div className="flex items-start justify-between px-5 py-4 border-b border-slate-800">
                    <h2 className="text-lg font-semibold">
                      {selected.code} — {selected.title}
                    </h2>
                    <button
                      onClick={() => setDrawerOpen(false)}
                      className="h-8 w-8 rounded border border-slate-700 bg-slate-800"
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    {/* Existing Offerings */}
                    {courseOfferings.length > 0 && (
                      <div>
                        <h3 className="text-base font-semibold mb-2">
                          Existing Offerings
                        </h3>
                        <div className="overflow-x-auto rounded border border-slate-800">
                          <table className="min-w-full table-fixed border-collapse">
                            <thead className="text-slate-300">
                              <tr className="border-b border-slate-800">
                                {[
                                  "Sem",
                                  "Expected",
                                  "Instructors",
                                  "Room",
                                  "Min Cap",
                                  "Equipment",
                                ].map((h) => (
                                  <th
                                    key={h}
                                    scope="col"
                                    className="px-3 py-2 text-left text-xs font-semibold uppercase"
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                              {courseOfferings.map((o) => (
                                <tr key={o.id}>
                                  <td className="px-3 py-2">{o.semester}</td>
                                  <td className="px-3 py-2">{o.expected}</td>
                                  <td className="px-3 py-2">
                                    {o.instructors.join(", ")}
                                  </td>
                                  <td className="px-3 py-2">{o.roomType}</td>
                                  <td className="px-3 py-2">{o.minCapacity}</td>
                                  <td className="px-3 py-2">
                                    {o.equipment.join(", ") || "—"}
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
                      className="grid gap-4"
                    >
                      <fieldset className="rounded-lg border border-slate-800 p-4 grid gap-3">
                        <legend className="px-1 text-slate-300">
                          Add / Update Offering
                        </legend>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <LabeledNumber
                            label="Semester"
                            value={form.semester}
                            onChange={(v) =>
                              setForm((f) => ({ ...f, semester: v }))
                            }
                          />
                          <LabeledNumber
                            label="Expected Enrollment"
                            value={form.expected}
                            onChange={(v) =>
                              setForm((f) => ({ ...f, expected: v }))
                            }
                          />
                          <LabeledNumber
                            label="Min Capacity"
                            value={form.minCapacity}
                            onChange={(v) =>
                              setForm((f) => ({ ...f, minCapacity: v }))
                            }
                          />
                          <label className="grid gap-1">
                            <span>Room Type</span>
                            <select
                              value={form.roomType}
                              onChange={(e) =>
                                setForm((f) => ({
                                  ...f,
                                  roomType: e.target.value,
                                }))
                              }
                              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                            >
                              <option>Lecture</option>
                              <option>Lab</option>
                              <option>Studio</option>
                            </select>
                          </label>
                          <label className="grid gap-1 sm:col-span-2">
                            <span>Instructors (comma-separated)</span>
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
                              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                            />
                          </label>
                          <label className="grid gap-1 sm:col-span-2">
                            <span>Equipment (comma-separated)</span>
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
                              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                            />
                          </label>
                        </div>
                      </fieldset>

                      <fieldset className="rounded-lg border border-slate-800 p-4">
                        <legend className="px-1 text-slate-300">
                          Sessions (per week)
                        </legend>
                        <div className="grid grid-cols-3 gap-3">
                          {["L", "T", "P"].map((k) => (
                            <label key={k} className="grid gap-1">
                              <span>{k}</span>
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
                                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                              />
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setDrawerOpen(false)}
                          className="rounded-lg border border-slate-700 px-3 py-2"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="rounded-lg bg-indigo-500 px-3 py-2 font-bold text-slate-900"
                        >
                          Save Offering
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function LabeledNumber({ label, value, onChange }) {
  return (
    <label className="grid gap-1">
      <span>{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
        required
      />
    </label>
  );
}
