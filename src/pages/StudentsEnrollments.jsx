// src/pages/StudentsEnrollments.jsx
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

const seedCohorts = [
  {
    code: "FYUGP-SEM2-A",
    program: "FYUGP BA",
    semester: 2,
    size: 60,
    electiveBundles: [["MDC105", "AEC101"], ["SEC120"]],
  },
  {
    code: "ITEP-SEM3-A",
    program: "ITEP B.Ed.",
    semester: 3,
    size: 50,
    electiveBundles: [["EDU201", "MDC105"], ["SEC130"]],
  },
];
const seedStudents = [
  {
    rollNo: "S001",
    name: "Ananya",
    cohort: "FYUGP-SEM2-A",
    ABCId: "ABC-1234",
    electives: ["MDC105", "AEC101"],
    totalCredits: 22,
  },
  {
    rollNo: "S002",
    name: "Rohan",
    cohort: "ITEP-SEM3-A",
    ABCId: "",
    electives: ["EDU201", "SEC130"],
    totalCredits: 20,
  },
];
const seedCourses = [
  { code: "EDU201", title: "Foundations of Education", category: "Major" },
  { code: "MDC105", title: "Design Thinking", category: "MDC" },
  { code: "AEC101", title: "Academic Writing", category: "AEC" },
  { code: "SEC130", title: "Digital Skills", category: "SEC" },
];

function loadState() {
  const c = localStorage.getItem("cohorts");
  const s = localStorage.getItem("students");
  const e = localStorage.getItem("enrollments");
  return {
    cohorts: c ? JSON.parse(c) : seedCohorts,
    students: s ? JSON.parse(s) : seedStudents,
    enrollments: e
      ? JSON.parse(e)
      : [
          { courseCode: "EDU201", cohortCode: "ITEP-SEM3-A", count: 50 },
          { courseCode: "MDC105", cohortCode: "FYUGP-SEM2-A", count: 40 },
          { courseCode: "AEC101", cohortCode: "FYUGP-SEM2-A", count: 35 },
          { courseCode: "SEC130", cohortCode: "ITEP-SEM3-A", count: 20 },
        ],
  };
}

export default function StudentsEnrollments() {
  const [{ cohorts, students, enrollments }, setState] = useState(loadState());
  const [filters, setFilters] = useState({ q: "", cat: "All", abc: "All" });
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [editCohort, setEditCohort] = useState(null);
  const [editCell, setEditCell] = useState(null); // { courseCode, cohortCode, count }

  useEffect(() => {
    localStorage.setItem("cohorts", JSON.stringify(cohorts));
  }, [cohorts]);
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);
  useEffect(() => {
    localStorage.setItem("enrollments", JSON.stringify(enrollments));
  }, [enrollments]);

  const courseList = useMemo(() => seedCourses, []);
  const cohortMap = useMemo(
    () => Object.fromEntries(cohorts.map((c) => [c.code, c])),
    [cohorts]
  );

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const q = filters.q.trim().toLowerCase();
      const okQ =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.rollNo.toLowerCase().includes(q) ||
        s.cohort.toLowerCase().includes(q);
      const okABC =
        filters.abc === "All" ||
        (filters.abc === "HasABC" ? !!s.ABCId : !s.ABCId);
      const okCat =
        filters.cat === "All" ||
        s.electives.some(
          (e) => courseList.find((c) => c.code === e)?.category === filters.cat
        );
      return okQ && okABC && okCat;
    });
  }, [students, filters, courseList]);

  const matrixCourses = useMemo(
    () => courseList.map((c) => c.code),
    [courseList]
  );
  const matrixCohorts = useMemo(() => cohorts.map((c) => c.code), [cohorts]);
  const matrix = useMemo(() => {
    const map = {};
    enrollments.forEach((e) => {
      map[`${e.courseCode}|${e.cohortCode}`] = e.count;
    });
    return map;
  }, [enrollments]);

  const clashWarnings = useMemo(() => {
    const warn = new Set();
    cohorts.forEach((c) => {
      const codes = new Set((c.electiveBundles || []).flat());
      if (codes.size >= 3) warn.add(c.code);
    });
    return warn;
  }, [cohorts]);

  const openCohort = (c) => {
    setSelectedCohort(c);
    setEditCohort(JSON.parse(JSON.stringify(c)));
  };

  const saveCohort = () => {
    const errs = [];
    if (!editCohort.code.trim()) errs.push("Cohort code is required.");
    if (!editCohort.program.trim()) errs.push("Program is required.");
    if (!editCohort.semester || editCohort.semester < 1)
      errs.push("Semester must be at least 1.");
    if (!editCohort.size || editCohort.size < 1)
      errs.push("Cohort size must be positive.");
    if (errs.length) {
      alert(errs.join("\n"));
      return;
    }
    setState((s) => ({
      ...s,
      cohorts: s.cohorts.map((x) =>
        x.code === selectedCohort.code ? editCohort : x
      ),
    }));
    setSelectedCohort(null);
    setEditCohort(null);
  };

  const addBundle = () =>
    setEditCohort((c) => ({
      ...c,
      electiveBundles: [...(c.electiveBundles || []), []],
    }));
  const updateBundle = (i, arr) =>
    setEditCohort((c) => {
      const next = [...(c.electiveBundles || [])];
      next[i] = arr;
      return { ...c, electiveBundles: next };
    });
  const removeBundle = (i) =>
    setEditCohort((c) => {
      const next = [...(c.electiveBundles || [])];
      next.splice(i, 1);
      return { ...c, electiveBundles: next };
    });

  const openEditCell = (courseCode, cohortCode) => {
    const key = `${courseCode}|${cohortCode}`;
    setEditCell({ courseCode, cohortCode, count: matrix[key] || 0 });
  };
  const saveCell = () => {
    setState((s) => {
      const key = `${editCell.courseCode}|${editCell.cohortCode}`;
      const others = s.enrollments.filter(
        (e) => `${e.courseCode}|${e.cohortCode}` !== key
      );
      return {
        ...s,
        enrollments: [
          ...others,
          {
            courseCode: editCell.courseCode,
            cohortCode: editCell.cohortCode,
            count: Number(editCell.count),
          },
        ],
      };
    });
    setEditCell(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto max-w-[1200px] px-5 py-4">
          <h1 className="text-2xl font-bold">Students & Enrollments</h1>
          <p className="text-slate-300">
            Manage cohorts, elective bundles, ABC IDs, and view an enrollment
            matrix to spot clash risks.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="grid gap-1">
              <span className="text-sm text-slate-300">Search</span>
              <input
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                type="search"
                placeholder="Name, roll no, or cohort"
                value={filters.q}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, q: e.target.value }))
                }
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-slate-300">Elective category</span>
              <select
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                value={filters.cat}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, cat: e.target.value }))
                }
              >
                <option>All</option>
                {CATEGORY_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-slate-300">ABC ID status</span>
              <select
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                value={filters.abc}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, abc: e.target.value }))
                }
              >
                <option>All</option>
                <option value="HasABC">Has ABC ID</option>
                <option value="NoABC">No ABC ID</option>
              </select>
            </label>
          </div>
        </section>

        {/* Cohorts */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="cohorts-title"
        >
          <h2
            id="cohorts-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            Cohorts
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <caption className="sr-only">
                Cohorts with elective bundles and sizes
              </caption>
              <thead className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <th scope="col" className="px-2 py-2 text-left">
                    Cohort
                  </th>
                  <th scope="col" className="px-2 py-2 text-left">
                    Program
                  </th>
                  <th scope="col" className="px-2 py-2 text-left">
                    Semester
                  </th>
                  <th scope="col" className="px-2 py-2 text-left">
                    Size
                  </th>
                  <th scope="col" className="px-2 py-2 text-left">
                    Bundles
                  </th>
                  <th scope="col" className="px-2 py-2 text-left w-[120px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {cohorts.map((c) => (
                  <tr key={c.code}>
                    <td className="px-2 py-2 break-words">{c.code}</td>
                    <td className="px-2 py-2 break-words">{c.program}</td>
                    <td className="px-2 py-2">{c.semester}</td>
                    <td className="px-2 py-2">{c.size}</td>
                    <td className="px-2 py-2">
                      <div className="flex flex-wrap gap-1">
                        {(c.electiveBundles || []).map((b, i) => (
                          <span
                            key={i}
                            className="inline-block rounded-full bg-slate-800 border border-slate-700 px-2 py-1 text-xs"
                          >
                            {b.join(", ") || "-"}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <button
                        className="underline text-indigo-400"
                        onClick={() => openCohort(c)}
                        aria-haspopup="dialog"
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

        {/* Students */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="students-title"
        >
          <h2
            id="students-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            Students
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <caption className="sr-only">
                Student list with ABC IDs and electives
              </caption>
              <thead className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <th scope="col" className="px-2 py-2 text-left">
                    Roll No
                  </th>
                  <th scope="col" className="px-2 py-2 text-left">
                    Name
                  </th>
                  <th scope="col" className="px-2 py-2 text-left">
                    Cohort
                  </th>
                  <th scope="col" className="px-2 py-2 text-left">
                    ABC ID
                  </th>
                  <th scope="col" className="px-2 py-2 text-left">
                    Electives
                  </th>
                  <th scope="col" className="px-2 py-2 text-left">
                    Credits
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredStudents.map((s) => (
                  <tr
                    key={s.rollNo}
                    className={!s.ABCId ? "bg-amber-500/10" : undefined}
                  >
                    <td className="px-2 py-2">{s.rollNo}</td>
                    <td className="px-2 py-2">{s.name}</td>
                    <td className="px-2 py-2">{s.cohort}</td>
                    <td className="px-2 py-2">{s.ABCId || "—"}</td>
                    <td className="px-2 py-2 break-words">
                      {s.electives.join(", ")}
                    </td>
                    <td className="px-2 py-2">{s.totalCredits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Enrollment Matrix */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="matrix-title"
        >
          <h2
            id="matrix-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            Enrollment Matrix
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <caption className="sr-only">
                Course × Cohort enrollment counts with clash warnings
              </caption>
              <thead className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <th scope="col" className="px-2 py-2 text-left">
                    Course
                  </th>
                  {matrixCohorts.map((cc) => (
                    <th scope="col" key={cc} className="px-2 py-2 text-left">
                      <span className="inline-flex items-center gap-1">
                        {cc}
                        {clashWarnings.has(cc) ? (
                          <span
                            className="text-amber-400"
                            title="Potential elective clashes"
                          >
                            ●
                          </span>
                        ) : null}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {matrixCourses.map((code) => (
                  <tr key={code}>
                    <th scope="row" className="px-2 py-2 text-left">
                      {code}
                    </th>
                    {matrixCohorts.map((cc) => {
                      const key = `${code}|${cc}`;
                      const val = matrix[key] || 0;
                      return (
                        <td key={key} className="px-2 py-2">
                          <button
                            className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1 text-left"
                            onClick={() => openEditCell(code, cc)}
                            aria-label={`Edit count for ${code} in ${cc}`}
                          >
                            {val}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cohort Editor */}
        {editCohort && (
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cohort-title"
            className="fixed inset-0 z-20 grid place-items-center bg-black/50 p-2"
          >
            <div className="w-[min(980px,96vw)] max-h-[92vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                <h2 id="cohort-title" className="text-lg font-semibold">
                  Edit Cohort
                </h2>
                <button
                  onClick={() => {
                    setSelectedCohort(null);
                    setEditCohort(null);
                  }}
                  className="h-8 w-8 rounded border border-slate-700 bg-slate-800"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <form
                className="grid gap-3 p-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  saveCohort();
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="grid gap-1">
                    <span>Cohort code</span>
                    <input
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                      value={editCohort.code}
                      onChange={(e) =>
                        setEditCohort({ ...editCohort, code: e.target.value })
                      }
                      required
                    />
                  </label>
                  <label className="grid gap-1">
                    <span>Program</span>
                    <input
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                      value={editCohort.program}
                      onChange={(e) =>
                        setEditCohort({
                          ...editCohort,
                          program: e.target.value,
                        })
                      }
                      required
                    />
                  </label>
                  <label className="grid gap-1">
                    <span>Semester</span>
                    <input
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                      type="number"
                      min="1"
                      value={editCohort.semester}
                      onChange={(e) =>
                        setEditCohort({
                          ...editCohort,
                          semester: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </label>
                  <label className="grid gap-1">
                    <span>Size</span>
                    <input
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                      type="number"
                      min="1"
                      value={editCohort.size}
                      onChange={(e) =>
                        setEditCohort({
                          ...editCohort,
                          size: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </label>
                </div>

                <fieldset className="border border-dashed border-slate-700 rounded-lg p-3">
                  <legend className="text-slate-300">Elective bundles</legend>
                  {(editCohort.electiveBundles || []).map((bundle, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 items-start"
                    >
                      <label className="grid gap-1">
                        <span>Bundle {i + 1}</span>
                        <ComboboxMulti
                          id={`bundle-${i}`}
                          options={courseList.map((c) => ({
                            value: c.code,
                            label: `${c.code} — ${c.title}`,
                          }))}
                          value={bundle}
                          onChange={(arr) => updateBundle(i, arr)}
                        />
                      </label>
                      <button
                        type="button"
                        className="underline text-red-400"
                        onClick={() => removeBundle(i)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="mt-2 rounded-lg border border-slate-700 px-3 py-2"
                    onClick={() => addBundle()}
                  >
                    Add bundle
                  </button>
                </fieldset>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-slate-700 px-3 py-2"
                    onClick={() => {
                      setSelectedCohort(null);
                      setEditCohort(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-500 px-3 py-2 font-bold text-slate-900"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* Edit Cell Dialog */}
        {editCell && (
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cell-title"
            className="fixed inset-0 z-20 grid place-items-center bg-black/50 p-2"
          >
            <div className="w-[min(420px,92vw)] rounded-xl border border-slate-800 bg-slate-900 p-4">
              <h2 id="cell-title" className="text-lg font-semibold">
                Edit Enrollment
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {editCell.courseCode} × {editCell.cohortCode}
              </p>
              <label className="grid gap-1 mt-3">
                <span>Count</span>
                <input
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                  type="number"
                  min="0"
                  value={editCell.count}
                  onChange={(e) =>
                    setEditCell({ ...editCell, count: Number(e.target.value) })
                  }
                />
              </label>
              <div className="mt-3 flex justify-end gap-2">
                <button
                  className="rounded-lg border border-slate-700 px-3 py-2"
                  onClick={() => setEditCell(null)}
                >
                  Cancel
                </button>
                <button
                  className="rounded-lg bg-indigo-500 px-3 py-2 font-bold text-slate-900"
                  onClick={saveCell}
                >
                  Save
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// Accessible multi-select combobox (prototype)
function ComboboxMulti({ id, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      options.filter((o) => o.label.toLowerCase().includes(q.toLowerCase())),
    [options, q]
  );
  const toggle = (val) => {
    const set = new Set(value);
    if (set.has(val)) set.delete(val);
    else set.add(val);
    onChange(Array.from(set));
  };
  return (
    <div className="relative">
      <div
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-owns={`${id}-list`}
        aria-controls={`${id}-list`}
        aria-label="Select electives"
        className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-2 py-2"
        onClick={() => setOpen((v) => !v)}
      >
        <input
          aria-label="Filter electives"
          className="flex-1 bg-transparent outline-none"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Type to filter"
        />
        <div className="flex flex-wrap gap-1">
          {value.map((v) => (
            <span
              key={v}
              className="inline-block rounded-full bg-slate-700 px-2 py-1 text-xs"
            >
              {v}
            </span>
          ))}
        </div>
      </div>
      {open && (
        <ul
          id={`${id}-list`}
          role="listbox"
          className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-slate-700 bg-slate-800"
        >
          {filtered.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={value.includes(o.value)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 cursor-pointer"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggle(o.value)}
            >
              <input
                type="checkbox"
                readOnly
                checked={value.includes(o.value)}
                aria-hidden="true"
              />
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
