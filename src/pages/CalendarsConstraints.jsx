// src/pages/CalendarsConstraints.jsx
import React, { useEffect, useMemo, useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DEFAULT_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
];
const VALID_SLOT_MINUTES = [30, 45, 50, 60, 75, 90, 120];

function loadState() {
  const s = localStorage.getItem("calendarsConstraints");
  return s
    ? JSON.parse(s)
    : {
        term: { start: "", end: "" },
        teachingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        slotLength: 60,
        slots: DEFAULT_SLOTS,
        holidays: [{ name: "Founders Day", date: "" }],
        exams: [{ name: "Midterm Week", start: "", end: "" }],
        blackouts: [{ day: "Thu", slot: "14:00", reason: "Campus event" }],
        constraints: {
          hard: {
            noFacultyOverlap: true,
            noRoomDoubleBook: true,
            capacityRespect: true,
            noCohortOverlap: true,
          },
          soft: {
            studentCompactness: 3,
            facultyFairness: 3,
            roomMatch: 2,
            electiveClashMin: 3,
          },
        },
      };
}

export default function CalendarsConstraints() {
  const [state, setState] = useState(loadState());
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    localStorage.setItem("calendarsConstraints", JSON.stringify(state));
  }, [state]);

  const validate = () => {
    const e = [];
    const { term, slotLength, slots, holidays, exams, blackouts } = state;
    if (!term.start) e.push("Term start date is required.");
    if (!term.end) e.push("Term end date is required.");
    if (term.start && term.end && new Date(term.start) > new Date(term.end))
      e.push("Term start must be before end.");
    if (!VALID_SLOT_MINUTES.includes(Number(slotLength)))
      e.push("Choose a common slot length (30/45/50/60/75/90/120).");
    const badSlots = slots.filter((s) => !/^\d{2}:\d{2}$/.test(s));
    if (badSlots.length) e.push("All slots must be in HH:MM format.");
    holidays.forEach((h, i) => {
      if (!h.name || !h.date) e.push(`Holiday #${i + 1} needs name and date.`);
    });
    exams.forEach((x, i) => {
      if (!x.name || !x.start || !x.end)
        e.push(`Exam window #${i + 1} needs name, start, and end.`);
      if (x.start && x.end && new Date(x.start) > new Date(x.end))
        e.push(`Exam window #${i + 1} start must be before end.`);
    });
    blackouts.forEach((b, i) => {
      if (!b.day || !b.slot)
        e.push(`Blackout #${i + 1} needs both day and slot.`);
    });
    setErrors(e);
    return e.length === 0;
  };

  const save = () => {
    if (validate()) alert("Saved calendars & constraints for scenarios.");
  };

  const toggleDay = (d) => {
    setState((s) => {
      const set = new Set(s.teachingDays);
      set.has(d) ? set.delete(d) : set.add(d);
      return { ...s, teachingDays: Array.from(set) };
    });
  };

  const addSlot = () => setState((s) => ({ ...s, slots: [...s.slots, ""] }));
  const updateSlot = (i, v) =>
    setState((s) => {
      const next = [...s.slots];
      next[i] = v;
      return { ...s, slots: next };
    });
  const removeSlot = (i) =>
    setState((s) => {
      const next = [...s.slots];
      next.splice(i, 1);
      return { ...s, slots: next };
    });

  const addHoliday = () =>
    setState((s) => ({
      ...s,
      holidays: [...s.holidays, { name: "", date: "" }],
    }));
  const updateHoliday = (i, key, v) =>
    setState((s) => {
      const arr = [...s.holidays];
      arr[i] = { ...arr[i], [key]: v };
      return { ...s, holidays: arr };
    });
  const removeHoliday = (i) =>
    setState((s) => {
      const arr = [...s.holidays];
      arr.splice(i, 1);
      return { ...s, holidays: arr };
    });

  const addExam = () =>
    setState((s) => ({
      ...s,
      exams: [...s.exams, { name: "", start: "", end: "" }],
    }));
  const updateExam = (i, key, v) =>
    setState((s) => {
      const arr = [...s.exams];
      arr[i] = { ...arr[i], [key]: v };
      return { ...s, exams: arr };
    });
  const removeExam = (i) =>
    setState((s) => {
      const arr = [...s.exams];
      arr.splice(i, 1);
      return { ...s, exams: arr };
    });

  const addBlackout = () =>
    setState((s) => ({
      ...s,
      blackouts: [...s.blackouts, { day: "", slot: "", reason: "" }],
    }));
  const updateBlackout = (i, key, v) =>
    setState((s) => {
      const arr = [...s.blackouts];
      arr[i] = { ...arr[i], [key]: v };
      return { ...s, blackouts: arr };
    });
  const removeBlackout = (i) =>
    setState((s) => {
      const arr = [...s.blackouts];
      arr.splice(i, 1);
      return { ...s, blackouts: arr };
    });

  const hard = state.constraints.hard;
  const soft = state.constraints.soft;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto max-w-[1200px] px-5 py-4">
          <h1 className="text-2xl font-bold">Calendars & Constraints</h1>
          <p className="text-slate-300">
            Define term dates, teaching slots, holidays, blackouts, and
            scheduling rules.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-5 py-4 space-y-4">
        {/* Error summary */}
        {errors.length > 0 && (
          <div
            className="rounded-lg border border-red-800 bg-red-900/30 p-3"
            role="alert"
            aria-live="assertive"
          >
            <ul className="list-disc pl-5">
              {errors.map((e, i) => (
                <li key={i} className="text-red-200">
                  {e}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Academic calendar */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="term-title"
        >
          <h2
            id="term-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            Academic calendar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="grid gap-1">
              <span>Term start</span>
              <input
                type="date"
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                value={state.term.start}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    term: { ...s.term, start: e.target.value },
                  }))
                }
                aria-describedby="term-help"
              />
            </label>
            <label className="grid gap-1">
              <span>Term end</span>
              <input
                type="date"
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                value={state.term.end}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    term: { ...s.term, end: e.target.value },
                  }))
                }
                aria-describedby="term-help"
              />
            </label>
          </div>
          <p id="term-help" className="text-sm text-slate-400 mt-1">
            Ensure exam windows and holidays fall within the term range.
          </p>

          {/* Holidays */}
          <fieldset className="mt-3 rounded-lg border border-dashed border-slate-700 p-3">
            <legend className="text-slate-300">Holidays</legend>
            <div className="space-y-2">
              {(state.holidays || []).map((h, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-[1fr_240px_auto] gap-2 items-end"
                >
                  <label className="grid gap-1">
                    <span>Name</span>
                    <input
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                      value={h.name}
                      onChange={(e) => updateHoliday(i, "name", e.target.value)}
                    />
                  </label>
                  <label className="grid gap-1">
                    <span>Date</span>
                    <input
                      type="date"
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                      value={h.date}
                      onChange={(e) => updateHoliday(i, "date", e.target.value)}
                    />
                  </label>
                  <button
                    type="button"
                    className="underline text-red-400"
                    onClick={() => removeHoliday(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-2 rounded-lg border border-slate-700 px-3 py-2"
              onClick={addHoliday}
            >
              Add holiday
            </button>
          </fieldset>

          {/* Exams */}
          <fieldset className="mt-3 rounded-lg border border-dashed border-slate-700 p-3">
            <legend className="text-slate-300">Exam windows</legend>
            <div className="space-y-2">
              {(state.exams || []).map((x, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-[1fr_240px_240px_auto] gap-2 items-end"
                >
                  <label className="grid gap-1">
                    <span>Name</span>
                    <input
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                      value={x.name}
                      onChange={(e) => updateExam(i, "name", e.target.value)}
                    />
                  </label>
                  <label className="grid gap-1">
                    <span>Start</span>
                    <input
                      type="date"
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                      value={x.start}
                      onChange={(e) => updateExam(i, "start", e.target.value)}
                    />
                  </label>
                  <label className="grid gap-1">
                    <span>End</span>
                    <input
                      type="date"
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                      value={x.end}
                      onChange={(e) => updateExam(i, "end", e.target.value)}
                    />
                  </label>
                  <button
                    type="button"
                    className="underline text-red-400"
                    onClick={() => removeExam(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-2 rounded-lg border border-slate-700 px-3 py-2"
              onClick={addExam}
            >
              Add exam window
            </button>
          </fieldset>
        </section>

        {/* Teaching days & slots */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="slots-title"
        >
          <h2
            id="slots-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            Teaching days & slots
          </h2>

          <fieldset className="rounded-lg border border-dashed border-slate-700 p-3">
            <legend className="text-slate-300">Working days</legend>
            <div className="flex flex-wrap gap-3">
              {DAYS.map((d) => (
                <label key={d} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={state.teachingDays.includes(d)}
                    onChange={() => toggleDay(d)}
                  />
                  <span>{d}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
            <label className="grid gap-1">
              <span>Slot length (minutes)</span>
              <input
                type="number"
                min="15"
                step="5"
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                value={state.slotLength}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    slotLength: Number(e.target.value),
                  }))
                }
              />
            </label>

            <div className="md:col-span-2 grid gap-1">
              <span>Named slots</span>
              <div className="grid gap-2">
                {state.slots.map((s, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto] gap-2">
                    <input
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                      value={s}
                      onChange={(e) => updateSlot(i, e.target.value)}
                      placeholder="HH:MM"
                    />
                    <button
                      type="button"
                      className="underline text-red-400"
                      onClick={() => removeSlot(i)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="rounded-lg border border-slate-700 px-3 py-2 w-max"
                  onClick={addSlot}
                >
                  Add slot
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Institution-wide blackouts */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="inst-blk-title"
        >
          <h2
            id="inst-blk-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            Institution‑wide blackouts
          </h2>

          <div className="space-y-2">
            {(state.blackouts || []).map((b, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-[180px_180px_1fr_auto] gap-2 items-end"
              >
                <label className="grid gap-1">
                  <span>Day</span>
                  <select
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                    value={b.day}
                    onChange={(e) => updateBlackout(i, "day", e.target.value)}
                  >
                    <option value="">Select</option>
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1">
                  <span>Slot</span>
                  <select
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                    value={b.slot}
                    onChange={(e) => updateBlackout(i, "slot", e.target.value)}
                  >
                    <option value="">Select</option>
                    {state.slots.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1">
                  <span>Reason</span>
                  <input
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                    value={b.reason}
                    onChange={(e) =>
                      updateBlackout(i, "reason", e.target.value)
                    }
                    placeholder="Optional"
                  />
                </label>
                <button
                  type="button"
                  className="underline text-red-400"
                  onClick={() => removeBlackout(i)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-2 rounded-lg border border-slate-700 px-3 py-2"
            onClick={addBlackout}
          >
            Add blackout
          </button>
        </section>

        {/* Constraints */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="constraints-title"
        >
          <h2
            id="constraints-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            Constraints
          </h2>

          <fieldset className="rounded-lg border border-dashed border-slate-700 p-3">
            <legend className="text-slate-300">Hard constraints</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hard.noFacultyOverlap}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      constraints: {
                        ...s.constraints,
                        hard: {
                          ...s.constraints.hard,
                          noFacultyOverlap: e.target.checked,
                        },
                      },
                    }))
                  }
                />
                <span>No faculty overlap</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hard.noRoomDoubleBook}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      constraints: {
                        ...s.constraints,
                        hard: {
                          ...s.constraints.hard,
                          noRoomDoubleBook: e.target.checked,
                        },
                      },
                    }))
                  }
                />
                <span>No room double‑booking</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hard.capacityRespect}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      constraints: {
                        ...s.constraints,
                        hard: {
                          ...s.constraints.hard,
                          capacityRespect: e.target.checked,
                        },
                      },
                    }))
                  }
                />
                <span>Respect room capacity</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hard.noCohortOverlap}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      constraints: {
                        ...s.constraints,
                        hard: {
                          ...s.constraints.hard,
                          noCohortOverlap: e.target.checked,
                        },
                      },
                    }))
                  }
                />
                <span>No cohort elective overlap</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="mt-3 rounded-lg border border-dashed border-slate-700 p-3">
            <legend className="text-slate-300">Soft objectives</legend>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <label className="grid gap-1">
                <span>Student compactness weight</span>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={soft.studentCompactness}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      constraints: {
                        ...s.constraints,
                        soft: {
                          ...s.constraints.soft,
                          studentCompactness: Number(e.target.value),
                        },
                      },
                    }))
                  }
                />
              </label>
              <label className="grid gap-1">
                <span>Faculty fairness weight</span>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={soft.facultyFairness}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      constraints: {
                        ...s.constraints,
                        soft: {
                          ...s.constraints.soft,
                          facultyFairness: Number(e.target.value),
                        },
                      },
                    }))
                  }
                />
              </label>
              <label className="grid gap-1">
                <span>Room match weight</span>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={soft.roomMatch}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      constraints: {
                        ...s.constraints,
                        soft: {
                          ...s.constraints.soft,
                          roomMatch: Number(e.target.value),
                        },
                      },
                    }))
                  }
                />
              </label>
              <label className="grid gap-1">
                <span>Minimize elective clashes</span>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={soft.electiveClashMin}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      constraints: {
                        ...s.constraints,
                        soft: {
                          ...s.constraints.soft,
                          electiveClashMin: Number(e.target.value),
                        },
                      },
                    }))
                  }
                />
              </label>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Higher weights prioritize that objective in scenario solving
              previews.
            </p>
          </fieldset>
        </section>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="rounded-lg border border-slate-700 px-3 py-2"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-indigo-500 px-3 py-2 font-bold text-slate-900"
            onClick={save}
          >
            Save Calendars & Constraints
          </button>
        </div>
      </main>
    </div>
  );
}
