import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  X,
  Save,
  Building2,
  LayoutGrid,
  Users,
  ClipboardList,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  PlusCircle,
  Calendar,
  Monitor,
  Sun,
  Moon,
} from "lucide-react";

const TYPES = ["Lecture", "Lab", "Studio"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

const seedRooms = [
  {
    id: "R-A204",
    name: "A-204",
    type: "Lecture",
    capacity: 120,
    equipment: ["Projector", "Audio System"],
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
    equipment: ["Whiteboard"],
    availabilityNote: "",
    blackouts: [],
  },
  {
    id: "R-LAB2",
    name: "Lab-2",
    type: "Lab",
    capacity: 30,
    equipment: ["PCs", "LAN", "Projector"],
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
    equipment: ["Recording Equipment", "Soundproofing"],
    availabilityNote: "",
    blackouts: [],
  },
];

function loadState() {
  const r = localStorage.getItem("rooms");
  return r ? JSON.parse(r) : seedRooms;
}

export default function RoomsResources({ theme, isDark }) {
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

  const getRoomTypeColor = (type) => {
    if (type === "Lecture") {
      return isDark
        ? "bg-blue-100 text-blue-700 border-blue-200"
        : "bg-blue-500/20 text-blue-300 border-blue-400/40";
    }
    if (type === "Lab") {
      return isDark
        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
        : "bg-emerald-500/20 text-emerald-300 border-emerald-400/40";
    }
    return isDark
      ? "bg-purple-100 text-purple-700 border-purple-200"
      : "bg-purple-500/20 text-purple-300 border-purple-400/40";
  };

  const getRoomTypeIcon = (type) => {
    if (type === "Lecture") return <LayoutGrid size={14} />;
    if (type === "Lab") return <Monitor size={14} />;
    return <Building2 size={14} />;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-base font-bold mb-4 flex items-center gap-2">
          <Filter
            size={18}
            className={isDark ? "text-indigo-600" : "text-indigo-400"}
          />
          Filter Rooms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search
              size={16}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.mutedText}`}
            />
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
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
            />
          </div>

          <select
            value={filters.type}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                type: e.target.value,
              }))
            }
            className={`w-full px-4 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none`}
          >
            <option>All</option>
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

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
            className={`w-full px-4 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
          />

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
            className={`w-full px-4 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
          />

          <select
            value={filters.hasEquip}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                hasEquip: e.target.value,
              }))
            }
            className={`w-full px-4 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none`}
          >
            <option>All</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </motion.section>

      {/* Rooms Table */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm overflow-hidden shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div
          className={`p-5 border-b ${theme.cardBorder} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}
        >
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold flex items-center gap-2">
              <ClipboardList
                size={18}
                className={isDark ? "text-indigo-600" : "text-indigo-400"}
              />
              Room Inventory
            </h2>
            <span
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${theme.accentBg} border ${theme.accentBorder}`}
            >
              {filtered.length} rooms
            </span>
          </div>
          <motion.button
            onClick={openCreate}
            className={`px-4 py-2.5 rounded-lg bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlusCircle size={16} />
            New Room
          </motion.button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className={theme.tableHeader}>
              <tr>
                {[
                  "Room",
                  "Type",
                  "Capacity",
                  "Equipment",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b ${theme.tableBorder}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((r, idx) => (
                  <motion.tr
                    key={r.id}
                    className={`border-b ${theme.tableBorder} ${theme.hoverBg} transition-colors`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <td className="px-4 py-4 font-semibold">{r.name}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold ${getRoomTypeColor(
                          r.type
                        )}`}
                      >
                        {getRoomTypeIcon(r.type)}
                        {r.type}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Users size={14} className={theme.mutedText} />
                        <span className="font-semibold">{r.capacity}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {r.equipment.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {r.equipment.slice(0, 2).map((eq) => (
                            <span
                              key={eq}
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${theme.accentBg} border ${theme.accentBorder}`}
                            >
                              {eq}
                            </span>
                          ))}
                          {r.equipment.length > 2 && (
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${theme.accentBg} border ${theme.accentBorder}`}
                            >
                              +{r.equipment.length - 2}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className={theme.mutedText}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                          r.blackouts.length === 0
                            ? isDark
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                            : isDark
                            ? "bg-amber-100 text-amber-700 border-amber-200"
                            : "bg-amber-500/20 text-amber-300 border-amber-400/40"
                        }`}
                      >
                        {r.blackouts.length === 0 ? (
                          <>
                            <CheckCircle size={14} />
                            Available
                          </>
                        ) : (
                          <>
                            <AlertTriangle size={14} />
                            {r.blackouts.length} blackout
                            {r.blackouts.length > 1 ? "s" : ""}
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <motion.button
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border ${
                            isDark
                              ? "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200"
                              : "bg-indigo-500/20 text-indigo-300 border-indigo-400/40 hover:bg-indigo-500/30"
                          } transition-colors`}
                          onClick={() => openEdit(r)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Edit size={14} />
                          Edit
                        </motion.button>
                        <motion.button
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border ${
                            isDark
                              ? "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200"
                              : "bg-rose-500/20 text-rose-300 border-rose-400/40 hover:bg-rose-500/30"
                          } transition-colors`}
                          onClick={() => confirmDelete(r)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 size={14} />
                          Delete
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className={`px-4 py-12 text-center ${theme.mutedText}`}
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <AlertTriangle size={32} className="opacity-50" />
                      <p className="text-sm">
                        No rooms match your filters. Try adjusting your criteria
                        or add a new room.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {edit && (
          <motion.div
            className="fixed inset-0 z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className={`absolute inset-0 ${theme.modalOverlay} backdrop-blur-sm`}
              onClick={() => {
                setSelected(null);
                setEdit(null);
                setIsCreating(false);
              }}
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <motion.div
                className="w-screen max-w-2xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div
                  className={`h-full flex flex-col rounded-l-2xl border ${theme.cardBorder} ${theme.modalBg} shadow-2xl`}
                >
                  <div
                    className={`flex items-center justify-between px-6 py-4 border-b ${theme.cardBorder}`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <div
                          className={`p-2 rounded-lg ${
                            isDark ? "bg-indigo-100" : "bg-indigo-500/20"
                          }`}
                        >
                          <Building2
                            size={18}
                            className={
                              isDark ? "text-indigo-600" : "text-indigo-400"
                            }
                          />
                        </div>
                        <h2 className="text-lg font-bold">
                          {isCreating ? "Add New Room" : `Edit ${edit.name}`}
                        </h2>
                      </div>
                      {!isCreating && (
                        <p className={`text-sm ${theme.mutedText} ml-11`}>
                          {edit.type} Room • Capacity: {edit.capacity}
                        </p>
                      )}
                    </div>
                    <motion.button
                      onClick={() => {
                        setSelected(null);
                        setEdit(null);
                        setIsCreating(false);
                      }}
                      className={`p-2 rounded-lg ${theme.hoverBg} transition-colors`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={18} />
                    </motion.button>
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
                      <fieldset
                        className={`rounded-xl border ${theme.cardBorder} p-5 ${theme.accentBg}`}
                      >
                        <legend className="px-2 text-sm font-semibold mb-4">
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
                            icon={<Building2 size={16} />}
                            theme={theme}
                            required
                          />
                          <div className="space-y-1.5">
                            <label className="block text-sm font-semibold">
                              Room Type
                            </label>
                            <div className="relative">
                              <LayoutGrid
                                size={16}
                                className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.mutedText}`}
                              />
                              <select
                                value={edit.type}
                                onChange={(e) =>
                                  setEdit({
                                    ...edit,
                                    type: e.target.value,
                                  })
                                }
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none`}
                              >
                                {TYPES.map((t) => (
                                  <option key={t}>{t}</option>
                                ))}
                              </select>
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
                            icon={<Users size={16} />}
                            theme={theme}
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
                            icon={<ClipboardList size={16} />}
                            theme={theme}
                            placeholder="Optional context"
                          />
                        </div>
                      </fieldset>

                      {/* Equipment */}
                      <fieldset
                        className={`rounded-xl border ${theme.cardBorder} p-5 ${theme.accentBg}`}
                      >
                        <legend className="px-2 text-sm font-semibold mb-4">
                          Equipment
                        </legend>
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <MapPin
                                size={16}
                                className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.mutedText}`}
                              />
                              <input
                                id="equipAdd"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
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
                            <motion.button
                              type="button"
                              className={`px-4 py-2.5 rounded-lg border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} text-sm font-medium transition-colors flex items-center gap-2`}
                              onClick={() => {
                                const el = document.getElementById("equipAdd");
                                if (el && el.value.trim()) {
                                  addEquipment(el.value);
                                  el.value = "";
                                }
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Plus size={16} />
                              Add
                            </motion.button>
                          </div>
                          <div className="flex flex-wrap gap-2 min-h-[40px]">
                            {(edit.equipment || []).length > 0 ? (
                              edit.equipment.map((tag) => (
                                <motion.span
                                  key={tag}
                                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium border ${theme.accentBorder} ${theme.accentBg}`}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => removeEquipment(tag)}
                                    className={`${theme.mutedText} hover:text-current`}
                                  >
                                    <X size={14} />
                                  </button>
                                </motion.span>
                              ))
                            ) : (
                              <span className={`text-sm ${theme.mutedText}`}>
                                No equipment added yet
                              </span>
                            )}
                          </div>
                        </div>
                      </fieldset>

                      {/* Blackout windows */}
                      <fieldset
                        className={`rounded-xl border ${theme.cardBorder} p-5 ${theme.accentBg}`}
                      >
                        <legend className="px-2 text-sm font-semibold mb-2">
                          Blackout Windows
                        </legend>
                        <p className={`text-sm ${theme.mutedText} mb-4`}>
                          Block specific time slots for maintenance or special
                          events
                        </p>
                        <div className="space-y-3">
                          {(edit.blackouts || []).length > 0 ? (
                            edit.blackouts.map((b, i) => (
                              <motion.div
                                key={i}
                                className={`grid grid-cols-1 md:grid-cols-4 gap-3 items-end border ${theme.cardBorder} rounded-lg p-3 ${theme.accentBg}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                              >
                                <div className="space-y-1.5">
                                  <label className="block text-sm font-medium">
                                    Day
                                  </label>
                                  <select
                                    className={`w-full px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
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
                                </div>
                                <div className="space-y-1.5">
                                  <label className="block text-sm font-medium">
                                    Slot
                                  </label>
                                  <select
                                    className={`w-full px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
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
                                </div>
                                <div className="space-y-1.5">
                                  <label className="block text-sm font-medium">
                                    Reason
                                  </label>
                                  <input
                                    className={`w-full px-3 py-2 rounded-lg border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
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
                                <motion.button
                                  type="button"
                                  className={`px-3 py-2 rounded-lg text-sm font-medium border ${
                                    isDark
                                      ? "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200"
                                      : "bg-rose-500/20 text-rose-300 border-rose-400/40 hover:bg-rose-500/30"
                                  } transition-colors flex items-center justify-center gap-1.5`}
                                  onClick={() => removeBlackout(i)}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Trash2 size={14} />
                                  Remove
                                </motion.button>
                              </motion.div>
                            ))
                          ) : (
                            <p className={`text-sm ${theme.mutedText}`}>
                              No blackout windows added yet
                            </p>
                          )}
                        </div>
                        <motion.button
                          type="button"
                          className={`mt-4 px-4 py-2.5 rounded-lg border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} text-sm font-medium transition-colors flex items-center gap-2`}
                          onClick={addBlackout}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <PlusCircle size={16} />
                          Add Blackout Window
                        </motion.button>
                      </fieldset>

                      <div className="flex justify-end gap-3 pt-2">
                        <motion.button
                          type="button"
                          onClick={() => {
                            setSelected(null);
                            setEdit(null);
                            setIsCreating(false);
                          }}
                          className={`px-5 py-2.5 rounded-lg border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} text-sm font-medium transition-colors flex items-center gap-2`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <X size={16} />
                          Cancel
                        </motion.button>
                        <motion.button
                          type="submit"
                          className={`px-5 py-2.5 rounded-lg bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Save size={16} />
                          {isCreating ? "Create Room" : "Save Changes"}
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className={`absolute inset-0 ${theme.modalOverlay} backdrop-blur-sm`}
              onClick={() => setDeleteConfirm(null)}
            />
            <motion.div
              className={`relative w-full max-w-md rounded-2xl border ${theme.cardBorder} ${theme.modalBg} shadow-2xl`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div
                className={`border-b ${theme.cardBorder} px-6 py-4 flex items-center gap-3`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    isDark ? "bg-rose-100" : "bg-rose-500/20"
                  }`}
                >
                  <AlertTriangle
                    size={18}
                    className={isDark ? "text-rose-600" : "text-rose-400"}
                  />
                </div>
                <h2 className="text-lg font-bold">Delete Room</h2>
              </div>
              <div className="p-6">
                <p className="mb-6">
                  Are you sure you want to delete{" "}
                  <strong>{deleteConfirm.name}</strong>? This action cannot be
                  undone.
                </p>
                <div className="flex justify-end gap-3">
                  <motion.button
                    type="button"
                    className={`px-5 py-2.5 rounded-lg border ${theme.buttonBorder} ${theme.buttonBg} ${theme.buttonText} text-sm font-medium transition-colors flex items-center gap-2`}
                    onClick={() => setDeleteConfirm(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <X size={16} />
                    Cancel
                  </motion.button>
                  <motion.button
                    type="button"
                    className={`px-5 py-2.5 rounded-lg text-white text-sm font-semibold shadow-lg transition-all flex items-center gap-2 ${
                      isDark
                        ? "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700"
                        : "bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600"
                    }`}
                    onClick={deleteRoom}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
  theme,
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold">{label}</label>
      <div className="relative">
        {icon && (
          <div
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.mutedText}`}
          >
            {icon}
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-2.5 rounded-lg border ${theme.inputBorder} ${
            theme.inputBg
          } ${
            theme.inputText
          } text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
}

function LabeledNumber({ label, value, onChange, icon, theme }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold">{label}</label>
      <div className="relative">
        {icon && (
          <div
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.mutedText}`}
          >
            {icon}
          </div>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-2.5 rounded-lg border ${theme.inputBorder} ${
            theme.inputBg
          } ${
            theme.inputText
          } text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
          required
        />
      </div>
    </div>
  );
}
