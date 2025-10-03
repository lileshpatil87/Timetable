import React, { useEffect, useMemo, useState } from "react";
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  TrashIcon,
  EditIcon,
  XIcon,
  SaveIcon,
  BuildingIcon,
  LayoutGridIcon,
  UsersIcon,
  ClipboardListIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  BarChartIcon,
  PlusCircleIcon,
  CalendarIcon,
  GraduationCapIcon,
} from "lucide-react";
const TYPES = ["Lecture", "Lab", "Studio"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];
// Room type colors
const ROOM_TYPE_COLORS = {
  Lecture: "bg-blue-500/20 text-blue-300 border-blue-400/40",
  Lab: "bg-green-500/20 text-green-300 border-green-400/40",
  Studio: "bg-purple-500/20 text-purple-300 border-purple-400/40",
};
// Room type icons
const ROOM_TYPE_ICONS = {
  Lecture: <LayoutGridIcon size={14} />,
  Lab: <BuildingIcon size={14} />,
  Studio: <CalendarIcon size={14} />,
};
const seedRooms = [
  {
    id: "R-A204",
    name: "A-204",
    type: "Lecture",
    capacity: 120,
    equipment: ["Projector"],
    availabilityNote: "",
    blackouts: [
      {
        day: "Thu",
        slot: "14:00",
        reason: "Maintenance",
      },
    ],
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
    blackouts: [
      {
        day: "Wed",
        slot: "14:00",
        reason: "Network check",
      },
    ],
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
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
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
    setIsCreating(false);
  };
  const openCreate = () => {
    const newRoom = {
      id: `R-${Date.now()}`,
      name: "",
      type: TYPES[0],
      capacity: 30,
      equipment: [],
      availabilityNote: "",
      blackouts: [],
    };
    setSelected(null);
    setEdit(newRoom);
    setIsCreating(true);
  };
  const confirmDelete = (room) => {
    setDeleteConfirm(room);
  };
  const deleteRoom = () => {
    if (deleteConfirm) {
      setRooms((list) => list.filter((r) => r.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    }
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
      blackouts: [
        ...(e.blackouts || []),
        {
          day: "",
          slot: "",
          reason: "",
        },
      ],
    }));
  };
  const updateBlackout = (i, key, val) => {
    setEdit((e) => {
      const arr = [...e.blackouts];
      arr[i] = {
        ...arr[i],
        [key]: val,
      };
      return {
        ...e,
        blackouts: arr,
      };
    });
  };
  const removeBlackout = (i) => {
    setEdit((e) => {
      const arr = [...e.blackouts];
      arr.splice(i, 1);
      return {
        ...e,
        blackouts: arr,
      };
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
    if (isCreating) {
      setRooms((list) => [...list, edit]);
    } else {
      setRooms((list) => list.map((r) => (r.id === edit.id ? edit : r)));
    }
    setSelected(null);
    setEdit(null);
    setIsCreating(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
      
      {/* Page Header */}
      <div className="max-w-[1280px] mx-auto px-6 pb-6">
        <h1 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Rooms & Resources
        </h1>
        <p className="text-slate-400">
          Manage capacities, types, equipment, and blackout windows with an
          at‑a‑glance utilization preview.
        </p>
      </div>
      <main className="max-w-[1280px] mx-auto px-6 pb-16 space-y-6">
        {/* Filters */}
        <section
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm"
          aria-labelledby="filters-title"
        >
          <h2
            id="filters-title"
            className="text-base font-bold mb-4 flex items-center gap-2"
          >
            <FilterIcon size={18} className="text-indigo-400" />
            <span>Filter Rooms</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                <SearchIcon size={16} />
              </div>
              <input
                type="search"
                placeholder="Room name"
                value={filters.q}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    q: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    type: e.target.value,
                  }))
                }
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-4 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>All</option>
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <LayoutGridIcon size={16} />
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Min capacity"
                value={filters.minCap}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    minCap: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Max capacity"
                value={filters.maxCap}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    maxCap: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={filters.hasEquip}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    hasEquip: e.target.value,
                  }))
                }
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-4 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>All</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <MapPinIcon size={16} />
              </div>
            </div>
          </div>
        </section>
        {/* Rooms Table */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg backdrop-blur-sm">
          <div className="p-5 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-base font-bold flex items-center gap-2">
              <ClipboardListIcon size={18} className="text-indigo-400" />
              <span>Room Inventory</span>
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-300">
                {filtered.length} rooms
              </span>
            </h2>
            <button
              onClick={openCreate}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-lg shadow-indigo-900/30 hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center gap-2"
              aria-label="Add new room"
            >
              <PlusCircleIcon size={16} />
              <span>New Room</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <caption className="sr-only">
                Room inventory with capacities, types, and equipment
              </caption>
              <thead className="text-slate-300 bg-slate-800/50">
                <tr>
                  {[
                    "Room",
                    "Type",
                    "Capacity",
                    "Equipment",
                    "Blackouts",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.length > 0 ? (
                  filtered.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-4 py-3.5 text-white font-medium">
                        {r.name}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                            ROOM_TYPE_COLORS[r.type]
                          }`}
                        >
                          {ROOM_TYPE_ICONS[r.type]}
                          {r.type}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-800 text-white font-medium">
                          {r.capacity}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 break-words">
                        {r.equipment.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {r.equipment.map((eq) => (
                              <span
                                key={eq}
                                className="inline-flex items-center rounded-full bg-slate-800/70 px-2 py-0.5 text-xs"
                              >
                                {eq}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                            r.blackouts.length === 0
                              ? "bg-green-500/20 text-green-300 border-green-400/40"
                              : "bg-amber-500/20 text-amber-300 border-amber-400/40"
                          }`}
                        >
                          {r.blackouts.length === 0 ? (
                            <CheckCircleIcon size={14} />
                          ) : (
                            <AlertTriangleIcon size={14} />
                          )}
                          {r.blackouts.length}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex gap-2">
                          <button
                            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-400/40 px-3 py-1.5 text-xs font-medium transition-colors"
                            onClick={() => openEdit(r)}
                            aria-haspopup="dialog"
                            title="Edit room"
                          >
                            <EditIcon size={14} />
                            Edit
                          </button>
                          <button
                            className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/40 px-3 py-1.5 text-xs font-medium transition-colors"
                            onClick={() => confirmDelete(r)}
                            aria-haspopup="dialog"
                            title="Delete room"
                          >
                            <TrashIcon size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-slate-400"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertTriangleIcon
                          size={24}
                          className="text-slate-500"
                        />
                        <p>
                          No rooms match your filters. Try adjusting your
                          criteria or add a new room.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        {/* Edit/Create Drawer */}
        {edit && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={() => {
                setSelected(null);
                setEdit(null);
                setIsCreating(false);
              }}
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <div className="w-screen max-w-2xl animate-fadeIn">
                <div className="h-full flex flex-col rounded-l-2xl border border-slate-700 bg-slate-900 shadow-xl">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400">
                          <BuildingIcon size={16} />
                        </span>
                        <h2 className="text-lg font-bold">
                          {isCreating ? "Add New Room" : edit.name}
                        </h2>
                      </div>
                      {!isCreating && (
                        <p className="text-slate-300">{edit.type} Room</p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setSelected(null);
                        setEdit(null);
                        setIsCreating(false);
                      }}
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
                      {/* Properties */}
                      <fieldset className="rounded-xl border border-slate-700 p-5 grid gap-5 bg-slate-800/20">
                        <legend className="px-2 text-sm font-medium text-slate-300">
                          Room Properties
                        </legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <LabeledInput
                            label="Room Name"
                            value={edit.name}
                            onChange={(v) =>
                              setEdit({
                                ...edit,
                                name: v,
                              })
                            }
                            icon={
                              <BuildingIcon
                                size={16}
                                className="text-slate-400"
                              />
                            }
                            required
                          />
                          <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                              Room Type
                            </label>
                            <div className="relative">
                              <select
                                value={edit.type}
                                onChange={(e) =>
                                  setEdit({
                                    ...edit,
                                    type: e.target.value,
                                  })
                                }
                                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                              >
                                {TYPES.map((t) => (
                                  <option key={t}>{t}</option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <LayoutGridIcon size={16} />
                              </div>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <LabeledNumber
                            label="Capacity"
                            value={edit.capacity}
                            onChange={(v) =>
                              setEdit({
                                ...edit,
                                capacity: Number(v),
                              })
                            }
                            icon={
                              <UsersIcon size={16} className="text-slate-400" />
                            }
                          />
                          <LabeledInput
                            label="Availability Note"
                            value={edit.availabilityNote}
                            onChange={(v) =>
                              setEdit({
                                ...edit,
                                availabilityNote: v,
                              })
                            }
                            icon={
                              <ClipboardListIcon
                                size={16}
                                className="text-slate-400"
                              />
                            }
                            placeholder="Optional context"
                          />
                        </div>
                      </fieldset>
                      {/* Equipment */}
                      <fieldset className="rounded-xl border border-slate-700 p-5 bg-slate-800/20">
                        <legend className="px-2 text-sm font-medium text-slate-300">
                          Equipment
                        </legend>
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <MapPinIcon size={16} />
                              </div>
                              <input
                                id="equipAdd"
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="Add equipment tag"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addEquipment(e.currentTarget.value);
                                    e.currentTarget.value = "";
                                  }
                                }}
                              />
                            </div>
                            <button
                              type="button"
                              className="px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors flex items-center gap-1"
                              onClick={() => {
                                const el = document.getElementById("equipAdd");
                                if (el && el.value.trim()) {
                                  addEquipment(el.value);
                                  el.value = "";
                                }
                              }}
                            >
                              <PlusIcon size={16} />
                              Add
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2 min-h-[40px]">
                            {(edit.equipment || []).length > 0 ? (
                              edit.equipment.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 border border-slate-700 px-3 py-1"
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    aria-label={`Remove ${tag}`}
                                    onClick={() => removeEquipment(tag)}
                                    className="text-slate-400 hover:text-slate-100"
                                  >
                                    <XIcon size={14} />
                                  </button>
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-400 text-sm">
                                No equipment added yet. Add equipment tags
                                above.
                              </span>
                            )}
                          </div>
                        </div>
                      </fieldset>
                      {/* Blackout windows */}
                      <fieldset className="rounded-xl border border-slate-700 p-5 bg-slate-800/20">
                        <legend className="px-2 text-sm font-medium text-slate-300">
                          Blackout Windows
                        </legend>
                        <p className="text-sm text-slate-400 mb-4">
                          Add day/slot blocks for maintenance or events to
                          prevent scheduling then.
                        </p>
                        <div className="space-y-4">
                          {(edit.blackouts || []).length > 0 ? (
                            edit.blackouts.map((b, i) => (
                              <div
                                key={i}
                                className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end border border-slate-800 rounded-lg p-3 bg-slate-800/30"
                              >
                                <div className="space-y-1.5">
                                  <label className="block text-sm font-medium text-slate-300">
                                    Day
                                  </label>
                                  <div className="relative">
                                    <select
                                      className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
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
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                      <CalendarIcon size={16} />
                                    </div>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M19 9l-7 7-7-7"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-1.5">
                                  <label className="block text-sm font-medium text-slate-300">
                                    Slot
                                  </label>
                                  <div className="relative">
                                    <select
                                      className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-10 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                      value={b.slot}
                                      onChange={(e) =>
                                        updateBlackout(
                                          i,
                                          "slot",
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="">Select</option>
                                      {SLOTS.map((s) => (
                                        <option key={s} value={s}>
                                          {s}
                                        </option>
                                      ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                      <ClockIcon size={16} />
                                    </div>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M19 9l-7 7-7-7"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-1.5">
                                  <label className="block text-sm font-medium text-slate-300">
                                    Reason
                                  </label>
                                  <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                      <AlertTriangleIcon size={16} />
                                    </div>
                                    <input
                                      className="w-full rounded-lg border border-slate-700 bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                      value={b.reason}
                                      onChange={(e) =>
                                        updateBlackout(
                                          i,
                                          "reason",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Optional"
                                    />
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/40 px-3 py-2 text-xs font-medium transition-colors"
                                  onClick={() => removeBlackout(i)}
                                >
                                  <TrashIcon size={14} />
                                  Remove
                                </button>
                              </div>
                            ))
                          ) : (
                            <p className="text-slate-400 text-sm">
                              No blackout windows added yet.
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          className="mt-4 px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors flex items-center gap-2"
                          onClick={addBlackout}
                        >
                          <PlusCircleIcon size={16} />
                          Add Blackout Window
                        </button>
                      </fieldset>
                      {/* Utilization preview */}
                      <fieldset className="rounded-xl border border-slate-700 p-5 bg-slate-800/20">
                        <legend className="px-2 text-sm font-medium text-slate-300">
                          Utilization Preview
                        </legend>
                        <div className="grid grid-cols-7 gap-1 py-2 mb-3">
                          {Array.from({
                            length: DAYS.length * SLOTS.length,
                          }).map((_, i) => (
                            <span
                              key={i}
                              className="h-5 rounded bg-gradient-to-b from-indigo-400 to-purple-400"
                              style={{
                                opacity: 0.3 + (i % 7) * 0.1,
                              }}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <span>Low</span>
                          <div className="h-2 w-32 rounded bg-gradient-to-r from-indigo-400/20 to-purple-400" />
                          <span>High</span>
                        </div>
                      </fieldset>
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelected(null);
                            setEdit(null);
                            setIsCreating(false);
                          }}
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
                          {isCreating ? "Create Room" : "Save Changes"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Delete Confirmation Dialog */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={() => setDeleteConfirm(null)}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
                <div className="border-b border-slate-800 px-5 py-4">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-red-400">
                    <AlertTriangleIcon size={18} />
                    Delete Room
                  </h2>
                </div>
                <div className="p-5">
                  <p className="mb-6">
                    Are you sure you want to delete{" "}
                    <strong>{deleteConfirm.name}</strong>? This action cannot be
                    undone.
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-lg border border-slate-700 text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
                      onClick={() => setDeleteConfirm(null)}
                    >
                      <XIcon size={16} />
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-medium shadow-lg shadow-red-900/30 hover:from-red-600 hover:to-rose-600 transition-all flex items-center gap-2"
                      onClick={deleteRoom}
                    >
                      <TrashIcon size={16} />
                      Delete
                    </button>
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
function LabeledInput({
  label,
  value,
  onChange,
  icon,
  placeholder,
  required = false,
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border border-slate-700 bg-slate-800/70 ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all`}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
}
function LabeledNumber({ label, value, onChange, icon }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border border-slate-700 bg-slate-800/70 ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all`}
          required
        />
      </div>
    </div>
  );
}
