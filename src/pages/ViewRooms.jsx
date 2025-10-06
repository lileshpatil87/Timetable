import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "../components/CustomDropdown";

import {
  Search,
  Filter,
  Building2,
  LayoutGrid,
  Users,
  ClipboardList,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Calendar,
  Sparkles,
  Monitor,
  Palette,
  TrendingUp,
} from "lucide-react";

const TYPES = ["Lecture", "Lab", "Studio"];

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
  // Get theme from parent layout
  const outletContext = useOutletContext();
  const { theme: contextTheme, isDark: contextIsDark } = outletContext || {};

  const [localIsDark] = useState(true);
  const isDark = contextIsDark !== undefined ? contextIsDark : localIsDark;

  const defaultTheme = {
    bg: isDark ? "bg-gray-50" : "bg-slate-950",
    text: isDark ? "text-gray-900" : "text-slate-50",
    cardBg: isDark ? "bg-white" : "bg-slate-900/50",
    cardBorder: isDark ? "border-gray-200" : "border-slate-800/60",
    mutedText: isDark ? "text-gray-600" : "text-slate-400",
    gradient: isDark
      ? "from-indigo-600 via-purple-600 to-pink-600"
      : "from-indigo-400 via-purple-400 to-pink-400",
    accentBg: isDark ? "bg-gray-50" : "bg-slate-800/30",
    accentBorder: isDark ? "border-gray-200" : "border-slate-700/40",
    hoverBg: isDark ? "hover:bg-gray-50" : "hover:bg-slate-800/50",
    buttonBg: isDark ? "bg-gray-100" : "bg-slate-800/40",
    buttonBorder: isDark ? "border-gray-300" : "border-slate-700/60",
    buttonText: isDark ? "text-gray-900" : "text-slate-200",
    inputBg: isDark ? "bg-white" : "bg-slate-800/50",
    inputBorder: isDark ? "border-gray-300" : "border-slate-700",
    inputText: isDark ? "text-gray-900" : "text-slate-100",
    tableBorder: isDark ? "border-gray-200" : "border-slate-800/60",
    tableHeader: isDark ? "bg-gray-50" : "bg-slate-800/40",
  };

  const theme = contextTheme || defaultTheme;

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

  const getRoomTypeColor = (type) => {
    if (type === "Lecture") {
      return !isDark
        ? "bg-blue-100 text-blue-700 border-blue-200"
        : "bg-blue-500/20 text-blue-300 border-blue-400/40";
    }
    if (type === "Lab") {
      return !isDark
        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
        : "bg-emerald-500/20 text-emerald-300 border-emerald-400/40";
    }
    return !isDark
      ? "bg-purple-100 text-purple-700 border-purple-200"
      : "bg-purple-500/20 text-purple-300 border-purple-400/40";
  };

  const getRoomTypeIcon = (type) => {
    if (type === "Lecture") return <LayoutGrid size={14} />;
    if (type === "Lab") return <Monitor size={14} />;
    return <Palette size={14} />;
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0);
    const withEquipment = rooms.filter((r) => r.equipment.length > 0).length;
    const withBlackouts = rooms.filter((r) => r.blackouts.length > 0).length;

    return {
      total: rooms.length,
      totalCapacity,
      avgCapacity: Math.round(totalCapacity / rooms.length),
      withEquipment,
      withBlackouts,
    };
  }, [rooms]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`p-3 rounded-xl ${
              isDark ? "bg-indigo-100" : "bg-indigo-500/20"
            }`}
          >
            <Sparkles
              size={24}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">View Rooms & Resources</h1>
            <p className={`text-sm ${theme.mutedText}`}>
              Browse all available rooms, labs, and studios with their
              capacities and equipment
            </p>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div
          className={`rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-4 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-indigo-100" : "bg-indigo-500/20"
              }`}
            >
              <Building2
                size={18}
                className={isDark ? "text-indigo-600" : "text-indigo-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>Total Rooms</p>
              <p className="text-xl font-bold">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-4 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-blue-100" : "bg-blue-500/20"
              }`}
            >
              <Users
                size={18}
                className={isDark ? "text-blue-600" : "text-blue-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>Total Capacity</p>
              <p className="text-xl font-bold">{stats.totalCapacity}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-4 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-emerald-100" : "bg-emerald-500/20"
              }`}
            >
              <TrendingUp
                size={18}
                className={isDark ? "text-emerald-600" : "text-emerald-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>Avg. Capacity</p>
              <p className="text-xl font-bold">{stats.avgCapacity}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-4 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-purple-100" : "bg-purple-500/20"
              }`}
            >
              <MapPin
                size={18}
                className={isDark ? "text-purple-600" : "text-purple-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>With Equipment</p>
              <p className="text-xl font-bold">{stats.withEquipment}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`rounded-xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-4 shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-amber-100" : "bg-amber-500/20"
              }`}
            >
              <AlertTriangle
                size={18}
                className={isDark ? "text-amber-600" : "text-amber-400"}
              />
            </div>
            <div>
              <p className={`text-xs ${theme.mutedText}`}>With Blackouts</p>
              <p className="text-xl font-bold">{stats.withBlackouts}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-6 shadow-sm z-[9999]`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-base font-bold mb-5 flex items-center gap-2">
          <Filter
            size={18}
            className={isDark ? "text-indigo-600" : "text-indigo-400"}
          />
          Filter Rooms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 z-[9999]">
          <div className="relative z-[9999]">
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

          <CustomDropdown
            name="type"
            id="filter-type"
            value={filters.type}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                type: e.target.value,
              }))
            }
            options={["All", ...TYPES]}
            theme={isDark ? "dark" : "light"}
            placeholder="Room type"
          />

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

          <CustomDropdown
            name="hasEquip"
            id="filter-equipment"
            value={filters.hasEquip}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                hasEquip: e.target.value,
              }))
            }
            options={["All", "Yes", "No"]}
            theme={isDark ? "dark" : "light"}
            placeholder="Equipment"
          />
        </div>
      </motion.section>

      {/* Rooms Table */}
      <motion.section
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm overflow-hidden shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div
          className={`p-5 border-b ${theme.cardBorder} flex justify-between items-center`}
        >
          <h2 className="text-base font-bold flex items-center gap-2">
            <ClipboardList
              size={18}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            Room Inventory
          </h2>
          <span
            className={`px-3 py-1 text-xs rounded-lg font-semibold ${theme.accentBg} border ${theme.accentBorder}`}
          >
            {filtered.length} rooms
          </span>
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
                  "Notes",
                  "Status",
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
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${getRoomTypeColor(
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
                          {r.equipment.map((eq) => (
                            <span
                              key={eq}
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${theme.accentBg} border ${theme.accentBorder}`}
                            >
                              {eq}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className={theme.mutedText}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 max-w-xs">
                      {r.availabilityNote ? (
                        <span className={`text-xs ${theme.mutedText}`}>
                          {r.availabilityNote}
                        </span>
                      ) : (
                        <span className={theme.mutedText}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${
                          r.blackouts.length === 0
                            ? !isDark
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                            : !isDark
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
      </motion.section>
    </div>
  );
}
