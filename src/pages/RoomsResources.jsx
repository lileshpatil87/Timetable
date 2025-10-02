// src/pages/RoomsResources.jsx
import React, { useEffect, useMemo, useState } from "react";

const TYPES = ["Lecture", "Lab", "Studio"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

const seedRooms = [
  {
    id: "R-A204",
    name: "A-204",
    type: "Lecture",
    capacity: 120,
    equipment: ["Projector"],
    availabilityNote: "",
    blackouts: [{ day: "Thu", slot: "14:00", reason: "Maintenance" }],
  },
  {
    id: "R-B101",
    name: "B-101",
    type: "Lecture",
    capacity: 80,
    equipment: [],
    availabilityNote: "",
    blackouts: [],
  },
  {
    id: "R-LAB2",
    name: "Lab-2",
    type: "Lab",
    capacity: 30,
    equipment: ["PCs", "LAN"],
    availabilityNote: "Preferred for CS labs",
    blackouts: [{ day: "Wed", slot: "14:00", reason: "Network check" }],
  },
  {
    id: "R-ST1",
    name: "Studio-1",
    type: "Studio",
    capacity: 40,
    equipment: ["Recording"],
    availabilityNote: "",
    blackouts: [],
  },
];

function loadState() {
  const r = localStorage.getItem("rooms");
  return r ? JSON.parse(r) : seedRooms;
}

export default function RoomsResources() {
  const [rooms, setRooms] = useState(loadState());
  const [filters, setFilters] = useState({
    q: "",
    type: "All",
    minCap: "",
    maxCap: "",
    hasEquip: "All",
  });
  const [selected, setSelected] = useState(null);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  const filtered = useMemo(() => {
    return rooms.filter((r) => {
      const q = filters.q.trim().toLowerCase();
      const okQ = !q || r.name.toLowerCase().includes(q);
      const okT = filters.type === "All" || r.type === filters.type;
      const okMin =
        filters.minCap === "" || r.capacity >= Number(filters.minCap);
      const okMax =
        filters.maxCap === "" || r.capacity <= Number(filters.maxCap);
      const okEq =
        filters.hasEquip === "All" ||
        (filters.hasEquip === "Yes"
          ? r.equipment.length > 0
          : r.equipment.length === 0);
      return okQ && okT && okMin && okMax && okEq;
    });
  }, [rooms, filters]);

  const openEdit = (room) => {
    setSelected(room);
    setEdit(JSON.parse(JSON.stringify(room)));
  };

  const addEquipment = (val) => {
    const v = val.trim();
    if (!v) return;
    setEdit((e) => ({
      ...e,
      equipment: Array.from(new Set([...(e.equipment || []), v])),
    }));
  };

  const removeEquipment = (val) => {
    setEdit((e) => ({
      ...e,
      equipment: (e.equipment || []).filter((x) => x !== val),
    }));
  };

  const addBlackout = () => {
    setEdit((e) => ({
      ...e,
      blackouts: [...(e.blackouts || []), { day: "", slot: "", reason: "" }],
    }));
  };

  const updateBlackout = (i, key, val) => {
    setEdit((e) => {
      const arr = [...e.blackouts];
      arr[i] = { ...arr[i], [key]: val };
      return { ...e, blackouts: arr };
    });
  };

  const removeBlackout = (i) => {
    setEdit((e) => {
      const arr = [...e.blackouts];
      arr.splice(i, 1);
      return { ...e, blackouts: arr };
    });
  };

  const save = () => {
    const errs = [];
    if (!edit.name.trim()) errs.push("Name is required.");
    if (!TYPES.includes(edit.type)) errs.push("Invalid type.");
    if (!edit.capacity || edit.capacity <= 0)
      errs.push("Capacity must be positive.");
    (edit.blackouts || []).forEach((b, i) => {
      if (!b.day || !b.slot)
        errs.push(`Blackout #${i + 1} needs both day and slot.`);
    });
    if (errs.length) {
      alert(errs.join("\n"));
      return;
    }
    setRooms((list) => list.map((r) => (r.id === edit.id ? edit : r)));
    setSelected(null);
    setEdit(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto max-w-[1200px] px-5 py-4">
          <h1 className="text-2xl font-bold">Rooms & Resources</h1>
          <p className="text-slate-300">
            Manage capacities, types, equipment, and blackout windows with an
            at‑a‑glance utilization preview.
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
            <label className="grid gap-1">
              <span className="text-sm text-slate-300">Search</span>
              <input
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                type="search"
                placeholder="Room name"
                value={filters.q}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, q: e.target.value }))
                }
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-slate-300">Type</span>
              <select
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                value={filters.type}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, type: e.target.value }))
                }
              >
                <option>All</option>
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-slate-300">Capacity min</span>
              <input
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                type="number"
                min="0"
                value={filters.minCap}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, minCap: e.target.value }))
                }
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-slate-300">Capacity max</span>
              <input
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                type="number"
                min="0"
                value={filters.maxCap}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, maxCap: e.target.value }))
                }
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-slate-300">Has equipment</span>
              <select
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                value={filters.hasEquip}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, hasEquip: e.target.value }))
                }
              >
                <option>All</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>
          </div>
        </section>

        {/* Rooms Table */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          aria-labelledby="rooms-title"
        >
          <h2
            id="rooms-title"
            className="text-sm font-semibold text-slate-300 mb-2"
          >
            Rooms
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <caption className="sr-only">
                Room inventory with capacities, types, and equipment
              </caption>
              <thead className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <th scope="col" className="px-2 py-2 text-left">
                    Room
                  </th>
                  <th scope="col" className="px-2 py-2 text-left">
                    Type
                  </th>
                  <th scope="col" className="px-2 py-2 text-left">
                    Capacity
                  </th>
                  <th scope="col" className="px-2 py-2 text-left">
                    Equipment
                  </th>
                  <th scope="col" className="px-2 py-2 text-left">
                    Blackouts
                  </th>
                  <th scope="col" className="px-2 py-2 text-left w-[120px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className={
                      selected?.id === r.id ? "bg-indigo-500/10" : undefined
                    }
                  >
                    <td className="px-2 py-2 break-words">{r.name}</td>
                    <td className="px-2 py-2">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          r.type === "Lecture"
                            ? "bg-blue-500/20 text-blue-300"
                            : r.type === "Lab"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-purple-500/20 text-purple-300"
                        }`}
                      >
                        {r.type}
                      </span>
                    </td>
                    <td className="px-2 py-2">{r.capacity}</td>
                    <td className="px-2 py-2 break-words">
                      {r.equipment.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {r.equipment.map((eq) => (
                            <span
                              key={eq}
                              className="inline-block rounded bg-slate-700 px-2 py-1 text-xs"
                            >
                              {eq}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400">None</span>
                      )}
                    </td>
                    <td className="px-2 py-2">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs ${
                          r.blackouts.length === 0
                            ? "bg-green-500/20 text-green-300"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {r.blackouts.length}
                      </span>
                    </td>
                    <td className="px-2 py-2">
                      <button
                        className="underline text-indigo-400"
                        onClick={() => openEdit(r)}
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

        {/* Edit Dialog */}
        {edit && (
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-title"
            className="fixed inset-0 z-20 grid place-items-center bg-black/50 p-2"
          >
            <div className="w-[min(980px,96vw)] max-h-[92vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                <h2 id="edit-title" className="text-lg font-semibold">
                  Edit Room
                </h2>
                <button
                  onClick={() => {
                    setSelected(null);
                    setEdit(null);
                  }}
                  className="h-8 w-8 rounded border border-slate-700 bg-slate-800"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <form
                className="grid gap-4 p-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  save();
                }}
              >
                {/* Properties */}
                <fieldset className="border border-dashed border-slate-700 rounded-lg p-3">
                  <legend className="text-slate-300">Properties</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                      <span>Type</span>
                      <select
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                        value={edit.type}
                        onChange={(e) =>
                          setEdit({ ...edit, type: e.target.value })
                        }
                      >
                        {TYPES.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-1">
                      <span>Capacity</span>
                      <input
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                        type="number"
                        min="1"
                        value={edit.capacity}
                        onChange={(e) =>
                          setEdit({ ...edit, capacity: Number(e.target.value) })
                        }
                        required
                      />
                    </label>
                    <label className="grid gap-1">
                      <span>Availability note</span>
                      <input
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                        value={edit.availabilityNote}
                        onChange={(e) =>
                          setEdit({ ...edit, availabilityNote: e.target.value })
                        }
                        placeholder="Optional context"
                      />
                    </label>
                  </div>
                </fieldset>

                {/* Equipment */}
                <fieldset className="border border-dashed border-slate-700 rounded-lg p-3">
                  <legend className="text-slate-300">Equipment</legend>
                  <div className="flex gap-2 mb-3">
                    <input
                      className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                      id="equipAdd"
                      placeholder="Add equipment tag and press +"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addEquipment(e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="rounded-lg border border-slate-700 px-3 py-2"
                      onClick={() => {
                        const el = document.getElementById("equipAdd");
                        if (el && el.value.trim()) {
                          addEquipment(el.value);
                          el.value = "";
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(edit.equipment || []).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-800 border border-slate-700 px-3 py-1"
                      >
                        {tag}
                        <button
                          type="button"
                          aria-label={`Remove ${tag}`}
                          onClick={() => removeEquipment(tag)}
                          className="text-slate-400 hover:text-slate-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </fieldset>

                {/* Blackout windows */}
                <fieldset className="border border-dashed border-slate-700 rounded-lg p-3">
                  <legend className="text-slate-300">Blackout windows</legend>
                  <p className="text-sm text-slate-400 mb-3">
                    Add day/slot blocks for maintenance or events to prevent
                    scheduling then.
                  </p>
                  <div className="space-y-3">
                    {(edit.blackouts || []).map((b, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end"
                      >
                        <label className="grid gap-1">
                          <span className="text-sm">Day</span>
                          <select
                            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                            value={b.day}
                            onChange={(e) =>
                              updateBlackout(i, "day", e.target.value)
                            }
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
                          <span className="text-sm">Slot</span>
                          <select
                            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                            value={b.slot}
                            onChange={(e) =>
                              updateBlackout(i, "slot", e.target.value)
                            }
                          >
                            <option value="">Select</option>
                            {SLOTS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="grid gap-1">
                          <span className="text-sm">Reason</span>
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
                    className="mt-3 rounded-lg border border-slate-700 px-3 py-2"
                    onClick={addBlackout}
                  >
                    Add blackout
                  </button>
                </fieldset>

                {/* Utilization preview */}
                <fieldset className="border border-dashed border-slate-700 rounded-lg p-3">
                  <legend className="text-slate-300">
                    Utilization preview (demo)
                  </legend>
                  <div className="grid grid-cols-7 gap-1 py-2 mb-2">
                    {Array.from({ length: DAYS.length * SLOTS.length }).map(
                      (_, i) => (
                        <span
                          key={i}
                          className="h-4 rounded bg-gradient-to-b from-indigo-400 to-emerald-400"
                          style={{ opacity: 0.3 + (i % 7) * 0.1 }}
                          aria-hidden="true"
                        />
                      )
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>Low</span>
                    <div className="h-2 w-32 rounded bg-gradient-to-r from-indigo-400/20 to-emerald-400" />
                    <span>High</span>
                  </div>
                </fieldset>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-slate-700 px-3 py-2"
                    onClick={() => {
                      setSelected(null);
                      setEdit(null);
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
      </main>
    </div>
  );
}
