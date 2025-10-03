import React, { useMemo, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  LogOut,
  Download,
  Clock,
  AlertTriangle,
  X,
  MapPin,
  Users,
  User,
  Building2,
  Mail,
  Target,
  BarChart3,
  CalendarDays,
  BookOpen,
  Shield,
  ArrowRight,
  Plus,
  Trash2,
} from "lucide-react";
export default function FacultyDashboard() {
  const navigate = useNavigate();
  // Demo faculty data
  const faculty = {
    name: "Dr. R. Rao",
    id: "FAC-CS-014",
    email: "r.rao@university.edu",
    department: "Computer Science",
    role: "Faculty",
    targetHours: 16,
    assignedHours: 14,
    daysOnCampus: 4,
  };
  // Week grid setup
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = ["09:00", "10:15", "11:30", "12:45", "14:00", "15:15", "16:30"];
  // Faculty sessions
  const sessions = {
    Mon: [
      {
        slotIndex: 0,
        len: 1,
        title: "Data Structures (L)",
        type: "L",
        room: "CS-201",
        cohort: "FYUGP-CS-S3",
        code: "CS201",
      },
      {
        slotIndex: 2,
        len: 2,
        title: "OS Lab (P)",
        type: "P",
        room: "CS-Lab-1",
        cohort: "FYUGP-CS-S3",
        code: "CS331",
      },
    ],
    Tue: [
      {
        slotIndex: 1,
        len: 1,
        title: "Algorithms (L)",
        type: "L",
        room: "CS-105",
        cohort: "FYUGP-CS-S3",
        code: "CS301",
      },
    ],
    Wed: [
      {
        slotIndex: 3,
        len: 1,
        title: "Algorithms (T)",
        type: "T",
        room: "CS-204",
        cohort: "FYUGP-CS-S3",
        code: "CS301",
      },
    ],
    Thu: [],
    Fri: [],
  };
  // KPIs (includes load vs target suggestion)
  const kpis = [
    {
      label: "Assigned hrs / Target",
      value: `${faculty.assignedHours}/${faculty.targetHours}`,
      help: "Weekly load",
      icon: <Target size={20} className="text-indigo-400" />,
      color:
        faculty.assignedHours < faculty.targetHours
          ? "text-amber-400"
          : "text-emerald-400",
    },
    {
      label: "Days on campus",
      value: faculty.daysOnCampus,
      help: "This week",
      icon: <CalendarDays size={20} className="text-indigo-400" />,
      color: "text-white",
    },
    {
      label: "Sections",
      value: 5,
      help: "Total classes",
      icon: <BookOpen size={20} className="text-indigo-400" />,
      color: "text-white",
    },
    {
      label: "Conflicts",
      value: 0,
      help: "Faculty/Room overlaps",
      icon: <Shield size={20} className="text-indigo-400" />,
      color: "text-emerald-400",
    },
  ];
  // Core action modals
  const [showExport, setShowExport] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [showClash, setShowClash] = useState(false);
  // Logout-only header per prior pattern
  function handleLogout() {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      sessionStorage.clear();
    } finally {
      navigate("/login", {
        replace: true,
      });
    }
  }
  // Export stubs
  function downloadPDF() {
    alert("Downloading timetable PDF...");
  }
  function downloadExcel() {
    alert("Downloading timetable Excel...");
  }
  function downloadICS() {
    // In production, generate ICS from sessions using e.g. `ics` or scheduler export API
    alert("Downloading timetable ICS...");
  }
  // Availability state (simple weekly blocks)
  const dayOptions = weekDays;
  const slotOptions = slots;
  const [blocks, setBlocks] = useState([
    {
      day: "Tue",
      start: "14:00",
      end: "16:30",
      type: "Unavailable",
    },
    {
      day: "Thu",
      start: "09:00",
      end: "16:30",
      type: "Available",
    },
  ]);
  const [newBlock, setNewBlock] = useState({
    day: "Mon",
    start: "09:00",
    end: "10:15",
    type: "Unavailable",
  });
  function addBlock() {
    if (!newBlock.day || !newBlock.start || !newBlock.end || !newBlock.type) {
      alert("Fill all fields.");
      return;
    }
    setBlocks((b) => [
      ...b,
      {
        ...newBlock,
      },
    ]);
    setNewBlock({
      day: "Mon",
      start: "09:00",
      end: "10:15",
      type: "Unavailable",
    });
  }
  function removeBlock(idx) {
    setBlocks((b) => b.filter((_, i) => i !== idx));
  }
  function submitAvailability() {
    // TODO: POST availability to backend; scheduler will respect these as hard/soft constraints
    alert("Availability updated.");
    setShowAvailability(false);
  }
  // Clash report
  const [clashType, setClashType] = useState("Room double-booked");
  const [clashMessage, setClashMessage] = useState("");
  function submitClash() {
    if (!clashMessage.trim()) {
      alert("Please describe the clash.");
      return;
    }
    // TODO: send to backend for triage
    alert("Clash reported. HOD/Admin will review it.");
    setShowClash(false);
    setClashMessage("");
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/80 border-b border-slate-800 shadow-md">
        <motion.div
          className="max-w-[1280px] mx-auto px-6 py-3 flex items-center justify-between"
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400"
          >
            <Calendar className="h-5 w-5 text-emerald-400" />
            <span>Timely NEP</span>
          </Link>
          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            aria-label="Log out"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </motion.button>
        </motion.div>
      </header>
      {/* Main */}
      <main
        className="relative z-10 max-w-[1280px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6"
        aria-label="Faculty dashboard main"
      >
        {/* Sidebar */}
        <motion.aside
          aria-label="Profile"
          className="self-start"
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-xl backdrop-blur-sm">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 rounded-2xl blur opacity-30 -z-10"></div>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 grid place-content-center text-white font-bold text-lg shadow-lg"
                  aria-hidden="true"
                >
                  {faculty.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-lg">{faculty.name}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <User size={12} />
                    {faculty.id}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <dl className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-emerald-400" />
                      <dt className="text-slate-400 w-24">Department:</dt>
                      <dd className="font-medium">{faculty.department}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-emerald-400" />
                      <dt className="text-slate-400 w-24">Email:</dt>
                      <dd className="font-medium truncate max-w-[180px]">
                        {faculty.email}
                      </dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target size={14} className="text-emerald-400" />
                      <dt className="text-slate-400 w-24">Weekly target:</dt>
                      <dd className="font-medium">{faculty.targetHours} hrs</dd>
                    </div>
                  </dl>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <BarChart3 size={14} className="text-emerald-400" />
                    Progress
                  </h3>
                  <div className="h-2 rounded-full bg-slate-700/50 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                      style={{
                        width: `${
                          (faculty.assignedHours / faculty.targetHours) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1.5 text-xs">
                    <span className="text-slate-400">Assigned</span>
                    <span className="font-medium">
                      {faculty.assignedHours}/{faculty.targetHours} hrs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
        {/* Content */}
        <section className="space-y-6" aria-label="Content">
          {/* KPIs */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            aria-label="Key stats"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.1,
            }}
          >
            {kpis.map((k, i) => (
              <motion.div
                key={i}
                tabIndex={0}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-xl backdrop-blur-sm"
                whileHover={{
                  scale: 1.02,
                  transition: {
                    duration: 0.2,
                  },
                }}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 + i * 0.05,
                }}
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 rounded-2xl blur opacity-30 -z-10"></div>
                  <p className="text-xs text-slate-400 flex items-center gap-2">
                    {k.icon}
                    {k.label}
                  </p>
                  <p className={`text-2xl font-extrabold mt-2 ${k.color}`}>
                    {k.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{k.help}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* Core actions */}
          <motion.div
            className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-xl backdrop-blur-sm"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.2,
            }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 rounded-2xl blur opacity-30 -z-10"></div>
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Users size={18} className="text-emerald-400" />
                Actions
              </h2>
              <div className="flex flex-wrap gap-3">
                <motion.button
                  onClick={() => setShowExport(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-sm font-medium shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 flex items-center gap-2 transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  <Download size={16} />
                  Export timetable
                </motion.button>
                <motion.button
                  onClick={() => setShowAvailability(true)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-800/50 text-slate-200 hover:border-emerald-400/70 hover:bg-slate-700/70 text-sm font-medium flex items-center gap-2 transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  <Clock size={16} />
                  Update unavailability
                </motion.button>
                <motion.button
                  onClick={() => setShowClash(true)}
                  className="px-4 py-2.5 rounded-xl border border-rose-500/50 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20 text-sm font-medium flex items-center gap-2 transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  <AlertTriangle size={16} />
                  Report a clash
                </motion.button>
              </div>
            </div>
          </motion.div>
          {/* Weekly timetable */}
          <motion.div
            className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-xl backdrop-blur-sm"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.3,
            }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 rounded-2xl blur opacity-30 -z-10"></div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Calendar size={18} className="text-emerald-400" />
                  Weekly Timetable
                </h2>
                <div className="flex items-center gap-3 text-xs bg-slate-800/70 rounded-lg px-3 py-1.5 border border-slate-700/50">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400/50" />
                    <span className="font-medium">Lecture</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                    <span className="font-medium">Tutorial</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                    <span className="font-medium">Practical</span>
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-700/50">
                <div className="min-w-[720px]">
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: `120px repeat(${weekDays.length}, 1fr)`,
                    }}
                  >
                    <div className="bg-slate-800/80 p-3" />
                    {weekDays.map((d, i) => (
                      <div
                        key={d}
                        className={`px-3 py-3 text-sm font-medium border-b border-slate-700/50 bg-slate-800/80 text-center ${
                          i === 0
                            ? "rounded-tl-lg"
                            : i === weekDays.length - 1
                            ? "rounded-tr-lg"
                            : ""
                        }`}
                      >
                        {d}
                      </div>
                    ))}
                    {slots.map((t, row) => (
                      <Fragment key={t}>
                        <div className="px-3 py-3 text-xs font-medium text-slate-300 border-b border-slate-700/50 bg-slate-800/40 flex items-center">
                          <Clock size={12} className="mr-1.5 text-slate-400" />
                          {t}
                        </div>
                        {weekDays.map((d) => {
                          const blocks = sessions[d] || [];
                          const startBlock = blocks.find(
                            (b) => b.slotIndex === row
                          );
                          if (startBlock) {
                            const typeColors = {
                              L: {
                                bg: "bg-indigo-500/20",
                                border: "border-indigo-500/40",
                                text: "text-indigo-100",
                                icon: (
                                  <BookOpen
                                    size={14}
                                    className="text-indigo-300"
                                  />
                                ),
                              },
                              T: {
                                bg: "bg-emerald-500/20",
                                border: "border-emerald-500/40",
                                text: "text-emerald-100",
                                icon: (
                                  <BookOpen
                                    size={14}
                                    className="text-emerald-300"
                                  />
                                ),
                              },
                              P: {
                                bg: "bg-amber-500/20",
                                border: "border-amber-500/40",
                                text: "text-amber-100",
                                icon: (
                                  <BookOpen
                                    size={14}
                                    className="text-amber-300"
                                  />
                                ),
                              },
                            };
                            const color = typeColors[startBlock.type];
                            return (
                              <motion.div
                                key={`${d}-${row}`}
                                className={`px-3 py-2.5 text-xs border ${color.bg} ${color.border} ${color.text} rounded-lg m-1 shadow-sm hover:shadow-md transition-shadow duration-300`}
                                style={{
                                  gridRow: `span ${startBlock.len}`,
                                }}
                                whileHover={{
                                  scale: 1.02,
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 10,
                                }}
                              >
                                <div className="font-semibold flex items-center gap-1.5 mb-1">
                                  {color.icon}
                                  {startBlock.title}
                                </div>
                                <div className="text-slate-300 flex items-center gap-1.5 mb-0.5">
                                  <MapPin size={12} className="opacity-70" />
                                  {startBlock.room}
                                </div>
                                <div className="text-slate-400 flex items-center gap-1.5">
                                  <Users size={12} className="opacity-70" />
                                  {startBlock.cohort}
                                </div>
                              </motion.div>
                            );
                          }
                          return (
                            <div
                              key={`${d}-empty-${row}`}
                              className="border-b border-slate-700/30 bg-slate-800/10 min-h-[60px]"
                            />
                          );
                        })}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Modals */}
          <AnimatePresence>
            {showExport && (
              <Modal
                title="Export Timetable"
                icon={<Download size={18} className="text-emerald-400" />}
                onClose={() => setShowExport(false)}
              >
                <div className="space-y-4">
                  <p className="text-sm text-slate-300">
                    Choose a format to download your timetable.
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <motion.button
                      onClick={downloadPDF}
                      className="px-3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium flex flex-col items-center gap-2 transition-colors duration-200"
                      whileHover={{
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                    >
                      <Download size={24} className="text-red-400" />
                      PDF
                    </motion.button>
                    <motion.button
                      onClick={downloadExcel}
                      className="px-3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium flex flex-col items-center gap-2 transition-colors duration-200"
                      whileHover={{
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                    >
                      <Download size={24} className="text-green-400" />
                      Excel
                    </motion.button>
                    <motion.button
                      onClick={downloadICS}
                      className="px-3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium flex flex-col items-center gap-2 transition-colors duration-200"
                      whileHover={{
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                    >
                      <Calendar size={24} className="text-blue-400" />
                      ICS
                    </motion.button>
                  </div>
                </div>
              </Modal>
            )}
            {showAvailability && (
              <Modal
                title="Update Unavailability"
                icon={<Clock size={18} className="text-emerald-400" />}
                onClose={() => setShowAvailability(false)}
              >
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="day"
                        className="block text-sm font-medium text-slate-200 mb-1.5"
                      >
                        Day
                      </label>
                      <div className="relative">
                        <select
                          id="day"
                          value={newBlock.day}
                          onChange={(e) =>
                            setNewBlock((b) => ({
                              ...b,
                              day: e.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-emerald-400/30 appearance-none"
                        >
                          {dayOptions.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            className="h-5 w-5 text-slate-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium text-slate-200 mb-1.5"
                      >
                        Type
                      </label>
                      <div className="relative">
                        <select
                          id="type"
                          value={newBlock.type}
                          onChange={(e) =>
                            setNewBlock((b) => ({
                              ...b,
                              type: e.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-emerald-400/30 appearance-none"
                        >
                          <option>Unavailable</option>
                          <option>Available</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            className="h-5 w-5 text-slate-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="start"
                        className="block text-sm font-medium text-slate-200 mb-1.5"
                      >
                        Start
                      </label>
                      <div className="relative">
                        <select
                          id="start"
                          value={newBlock.start}
                          onChange={(e) =>
                            setNewBlock((b) => ({
                              ...b,
                              start: e.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-emerald-400/30 appearance-none"
                        >
                          {slotOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            className="h-5 w-5 text-slate-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="end"
                        className="block text-sm font-medium text-slate-200 mb-1.5"
                      >
                        End
                      </label>
                      <div className="relative">
                        <select
                          id="end"
                          value={newBlock.end}
                          onChange={(e) =>
                            setNewBlock((b) => ({
                              ...b,
                              end: e.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-emerald-400/30 appearance-none"
                        >
                          {slotOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            className="h-5 w-5 text-slate-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <motion.button
                      onClick={addBlock}
                      className="px-4 py-2 rounded-xl border border-slate-700/80 bg-slate-800/50 text-slate-200 hover:border-emerald-400/70 hover:bg-slate-700/70 text-sm font-medium flex items-center gap-2 transition-all duration-300"
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                    >
                      <Plus size={16} />
                      Add block
                    </motion.button>
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => setShowAvailability(false)}
                        className="px-4 py-2 rounded-xl border border-slate-700/80 text-sm font-medium hover:bg-slate-800 transition-colors duration-200"
                        whileHover={{
                          scale: 1.02,
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        onClick={submitAvailability}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors duration-200"
                        whileHover={{
                          scale: 1.02,
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                      >
                        Save
                      </motion.button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Calendar size={14} className="text-emerald-400" />
                      Current blocks
                    </h4>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                      {blocks.map((b, i) => (
                        <motion.div
                          key={`${b.day}-${b.start}-${i}`}
                          className={`p-3 rounded-lg flex items-center justify-between ${
                            b.type === "Unavailable"
                              ? "bg-rose-500/10 border border-rose-500/30"
                              : "bg-emerald-500/10 border border-emerald-500/30"
                          }`}
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -10,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                b.type === "Unavailable"
                                  ? "bg-rose-400"
                                  : "bg-emerald-400"
                              }`}
                            ></div>
                            <span className="text-sm">
                              <span className="font-medium">{b.type}:</span>{" "}
                              {b.day} {b.start}–{b.end}
                            </span>
                          </div>
                          <motion.button
                            onClick={() => removeBlock(i)}
                            className="text-xs text-slate-400 hover:text-rose-300 p-1 rounded-md hover:bg-slate-800/50"
                            whileHover={{
                              scale: 1.1,
                            }}
                            whileTap={{
                              scale: 0.9,
                            }}
                            aria-label="Remove block"
                          >
                            <Trash2 size={14} />
                          </motion.button>
                        </motion.div>
                      ))}
                      {blocks.length === 0 && (
                        <p className="text-sm text-slate-400 italic text-center py-2">
                          No availability blocks added yet.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Modal>
            )}
            {showClash && (
              <Modal
                title="Report a Clash"
                icon={<AlertTriangle size={18} className="text-rose-400" />}
                onClose={() => setShowClash(false)}
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="clash-type"
                      className="block text-sm font-medium text-slate-200 mb-1.5"
                    >
                      Clash Type
                    </label>
                    <div className="relative">
                      <select
                        id="clash-type"
                        value={clashType}
                        onChange={(e) => setClashType(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-rose-400/30 appearance-none"
                      >
                        <option>Room double-booked</option>
                        <option>Student overlap</option>
                        <option>Faculty unavailable</option>
                        <option>Capacity exceeded</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="h-5 w-5 text-slate-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="clash-msg"
                      className="block text-sm font-medium text-slate-200 mb-1.5"
                    >
                      Details
                    </label>
                    <textarea
                      id="clash-msg"
                      rows={4}
                      value={clashMessage}
                      onChange={(e) => setClashMessage(e.target.value)}
                      placeholder="Include course code(s), day/slot, and any context."
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-rose-400/30 placeholder:text-slate-500"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <motion.button
                      onClick={() => setShowClash(false)}
                      className="px-4 py-2 rounded-xl border border-slate-700/80 text-sm font-medium hover:bg-slate-800 transition-colors duration-200"
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={submitClash}
                      className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium transition-colors duration-200"
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                    >
                      Submit Report
                    </motion.button>
                  </div>
                </div>
              </Modal>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
function Modal({ title, children, onClose, icon = null }) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center px-4"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      />
      <motion.div
        className="relative w-full max-w-lg rounded-2xl border border-slate-700/80 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-sm"
        initial={{
          scale: 0.9,
          y: 20,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          y: 0,
          opacity: 1,
        }}
        exit={{
          scale: 0.9,
          y: 20,
          opacity: 0,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
        }}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 rounded-2xl blur opacity-30 -z-10"></div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            {icon && <span>{icon}</span>}
            {title}
          </h3>
          <motion.button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            aria-label="Close"
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
          >
            <X size={18} />
          </motion.button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
