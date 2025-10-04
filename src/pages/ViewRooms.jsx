import React, { useMemo, useState } from "react";
import {
  SearchIcon,
  FilterIcon,
  BuildingIcon,
  LayoutGridIcon,
  UsersIcon,
  ClipboardListIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  MapPinIcon,
  CalendarIcon,
} from "lucide-react";

const TYPES = ["Lecture", "Lab", "Studio"];

const ROOM_TYPE_COLORS = {
  Lecture: "bg-blue-500/20 text-blue-300 border-blue-400/40",
  Lab: "bg-green-500/20 text-green-300 border-green-400/40",
  Studio: "bg-purple-500/20 text-purple-300 border-purple-400/40",
};

const ROOM_TYPE_ICONS = {
  Lecture: <LayoutGridIcon size={14} />,
  Lab: <BuildingIcon size={14} />,
  Studio: <CalendarIcon size={14} />,
};

const SEED_ROOMS = [
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
  {
    id: "R-C301",
    name: "C-301",
    type: "Lecture",
    capacity: 60,
    equipment: ["Projector", "Whiteboard"],
    availabilityNote: "Smart classroom",
    blackouts: [],
  },
  {
    id: "R-LAB3",
    name: "Lab-3",
    type: "Lab",
    capacity: 25,
    equipment: ["PCs", "LAN", "Printers"],
    availabilityNote: "Research lab",
    blackouts: [],
  },
];

export default function ViewRooms() {
  const [rooms] = useState(SEED_ROOMS);
  const [filters, setFilters] = useState({
    q: "",
    type: "All",
    minCap: "",
    maxCap: "",
    hasEquip: "All",
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
      {/* Page Header */}
      <div className="max-w-[1280px] mx-auto px-6 py-6">
        <h1 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          View Rooms & Resources
        </h1>
        <p className="text-slate-400">
          Browse all available rooms, labs, and studios with their capacities
          and equipment.
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
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 20 20\\" fill=\\"%2394a3b8\\"><path fill-rule=\\"evenodd\\" d=\\"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\\" clip-rule=\\"evenodd\\"/></svg>")',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.25rem 1.25rem",
                }}
              >
                <option>All</option>
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

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
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 20 20\\" fill=\\"%2394a3b8\\"><path fill-rule=\\"evenodd\\" d=\\"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\\" clip-rule=\\"evenodd\\"/></svg>")',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.25rem 1.25rem",
                }}
              >
                <option>All</option>
                <option>Yes</option>
                <option>No</option>
              </select>
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
                    "Notes",
                    "Blackouts",
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
                        <div className="flex items-center gap-2">
                          <UsersIcon size={14} className="text-slate-400" />
                          <span className="font-mono font-semibold">
                            {r.capacity}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 break-words max-w-xs">
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
                      <td className="px-4 py-3.5 max-w-xs">
                        {r.availabilityNote ? (
                          <span className="text-xs text-slate-400">
                            {r.availabilityNote}
                          </span>
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
                          criteria.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
