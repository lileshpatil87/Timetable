import React, { useMemo, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  FileText,
  Download,
  BookOpen,
  AlertTriangle,
  X,
  PlusCircle,
  BookMarked,
  Clock,
  MapPin,
  User,
  Grid3x3,
  GraduationCap,
  Building2,
  Layers,
  Award,
} from "lucide-react";
import LogoutButton from "../components/LogoutButton";
export default function StudentDashboard() {
  // Demo student data
  const student = {
    name: "Alex Kumar",
    id: "STU23CS001",
    email: "alex.kumar@university.edu",
    department: "Computer Science",
    program: "FYUGP",
    semester: 3,
    creditsEnrolled: 22,
    electives: ["AI & ML", "Cloud Computing"],
  };
  // Timetable grid seed
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = ["09:00", "10:15", "11:30", "12:45", "14:00", "15:15", "16:30"];
  const sessions = {
    Mon: [
      {
        slotIndex: 0,
        len: 1,
        title: "Data Structures (L)",
        type: "L",
        room: "CS-201",
        faculty: "Dr. Rao",
        code: "CS201",
      },
      {
        slotIndex: 2,
        len: 1,
        title: "AI & ML (T)",
        type: "T",
        room: "CS-Lab-2",
        faculty: "Dr. Singh",
        code: "CS342",
        flags: ["Elective"],
      },
      {
        slotIndex: 5,
        len: 2,
        title: "OS Lab (P)",
        type: "P",
        room: "CS-Lab-1",
        faculty: "Ms. Das",
        code: "CS331",
      },
    ],
    Tue: [
      {
        slotIndex: 1,
        len: 1,
        title: "Discrete Math (L)",
        type: "L",
        room: "MATH-102",
        faculty: "Prof. Iyer",
        code: "MA203",
      },
    ],
    Wed: [
      {
        slotIndex: 0,
        len: 1,
        title: "Algorithms (L)",
        type: "L",
        room: "CS-105",
        faculty: "Dr. Jain",
        code: "CS301",
      },
      {
        slotIndex: 2,
        len: 1,
        title: "Cloud (T)",
        type: "T",
        room: "CS-204",
        faculty: "Dr. Patil",
        code: "CS344",
        flags: ["Elective"],
      },
    ],
    Thu: [
      {
        slotIndex: 4,
        len: 2,
        title: "OS Lab (P)",
        type: "P",
        room: "CS-Lab-1",
        faculty: "Ms. Das",
        code: "CS331",
      },
    ],
    Fri: [],
  };
  // Core actions modal state
  const [showExport, setShowExport] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);
  const [showElective, setShowElective] = useState(false);
  const [showClash, setShowClash] = useState(false);
  // Export handlers (stubs)
  function downloadPDF() {
    // TODO: wire to server-generated PDF or client render
    alert("Downloading timetable PDF...");
  }
  function downloadExcel() {
    alert("Downloading timetable Excel...");
  }
  function downloadICS() {
    // TODO: generate ICS from sessions map
    alert("Downloading timetable ICS...");
  }
  // Enrollment state (stub options)
  const catalog = [
    {
      code: "CS351",
      name: "Computer Networks",
      type: "Major",
      seats: 60,
      filled: 52,
      ltp: "3-0-0",
    },
    {
      code: "CS372",
      name: "Database Systems",
      type: "Major",
      seats: 60,
      filled: 60,
      ltp: "3-0-0",
    },
    {
      code: "CS382",
      name: "Software Engg",
      type: "MDC",
      seats: 60,
      filled: 41,
      ltp: "3-0-0",
    },
  ];
  const [enrollCode, setEnrollCode] = useState("");
  const enrollCourse = useMemo(
    () => catalog.find((c) => c.code === enrollCode) || null,
    [enrollCode]
  );
  function submitEnroll() {
    if (!enrollCourse) return;
    if (enrollCourse.filled >= enrollCourse.seats) {
      alert("Course is full. Choose another.");
      return;
    }
    // TODO: call API to enroll; revalidate capacity server-side
    alert(`Enrollment requested for ${enrollCourse.code}`);
    setShowEnroll(false);
  }
  // Elective selection (stub options)
  const electivePool = [
    {
      code: "CS342",
      name: "AI & ML",
      slots: ["Mon 11:30"],
      risk: "Low",
    },
    {
      code: "CS344",
      name: "Cloud Computing",
      slots: ["Wed 11:30"],
      risk: "Low",
    },
    {
      code: "CS346",
      name: "Cyber Security",
      slots: ["Mon 11:30"],
      risk: "Clash",
    },
  ];
  const [selectedElectives, setSelectedElectives] = useState(
    new Set(
      student.electives
        .map((e) => electivePool.find((x) => x.name === e)?.code)
        .filter(Boolean)
    )
  );
  function toggleElective(code) {
    setSelectedElectives((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  }
  function submitElectives() {
    // Simple clash hint: if two chosen share same slot label
    const chosen = electivePool.filter((e) => selectedElectives.has(e.code));
    const slotsFlat = chosen.flatMap((e) => e.slots);
    const hasDup = new Set(slotsFlat).size !== slotsFlat.length;
    if (hasDup) {
      alert("Selected electives have a time clash. Please adjust.");
      return;
    }
    // TODO: call API to save elective choices; server re-checks clashes
    alert(`Saved electives: ${chosen.map((c) => c.name).join(", ")}`);
    setShowElective(false);
  }
  // Clash report
  const [clashType, setClashType] = useState("Student overlap");
  const [clashMessage, setClashMessage] = useState("");
  function submitClash() {
    if (!clashMessage.trim()) {
      alert("Please describe the clash.");
      return;
    }
    // TODO: send report to backend for triage
    alert("Clash reported. The department will review it.");
    setShowClash(false);
    setClashMessage("");
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
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
            className="flex items-center gap-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
          >
            <Calendar className="h-5 w-5 text-indigo-400" />
            <span>Timely NEP</span>
          </Link>
          {/* Logout button */}
          <LogoutButton />
        </motion.div>
      </header>
      {/* Main */}
      <main
        className="relative z-10 max-w-[1280px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6"
        aria-label="Student dashboard main"
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-30 -z-10"></div>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 grid place-content-center text-white font-bold text-lg shadow-lg"
                  aria-hidden="true"
                >
                  {student.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-lg">{student.name}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <User size={12} />
                    {student.id}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <dl className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={14} className="text-indigo-400" />
                      <dt className="text-slate-400 w-20">Program:</dt>
                      <dd className="font-medium">{student.program}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-indigo-400" />
                      <dt className="text-slate-400 w-20">Department:</dt>
                      <dd className="font-medium">{student.department}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers size={14} className="text-indigo-400" />
                      <dt className="text-slate-400 w-20">Semester:</dt>
                      <dd className="font-medium">Sem {student.semester}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={14} className="text-indigo-400" />
                      <dt className="text-slate-400 w-20">Credits:</dt>
                      <dd className="font-medium">{student.creditsEnrolled}</dd>
                    </div>
                  </dl>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <BookMarked size={16} className="text-indigo-400" />
                    Current Electives
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {student.electives.map((e, i) => (
                      <motion.li
                        key={i}
                        className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 font-medium"
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                      >
                        {e}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
        {/* Content */}
        <section className="space-y-6" aria-label="Content">
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
              delay: 0.1,
            }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-30 -z-10"></div>
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Grid3x3 size={18} className="text-indigo-400" />
                Quick Actions
              </h2>
              <div className="flex flex-wrap gap-3">
                <motion.button
                  onClick={() => setShowExport(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-sm font-medium shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 flex items-center gap-2 transition-all duration-300"
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
                  onClick={() => setShowEnroll(true)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-800/50 text-slate-200 hover:border-indigo-400/70 hover:bg-slate-700/70 text-sm font-medium flex items-center gap-2 transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  <PlusCircle size={16} />
                  Enroll to a course
                </motion.button>
                <motion.button
                  onClick={() => setShowElective(true)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-800/50 text-slate-200 hover:border-indigo-400/70 hover:bg-slate-700/70 text-sm font-medium flex items-center gap-2 transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  <BookOpen size={16} />
                  Choose elective
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
              delay: 0.2,
            }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-30 -z-10"></div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Calendar size={18} className="text-indigo-400" />
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
                                  <FileText
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
                                  <BookMarked
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
                                  <User size={12} className="opacity-70" />
                                  {startBlock.faculty}
                                </div>
                                {startBlock.flags?.includes("Elective") && (
                                  <span className="mt-1.5 inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300 font-medium">
                                    Elective
                                  </span>
                                )}
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
                icon={<Download size={18} />}
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
                      <FileText size={24} className="text-red-400" />
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
                      <FileText size={24} className="text-green-400" />
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
            {showEnroll && (
              <Modal
                title="Enroll to a Course"
                icon={<PlusCircle size={18} />}
                onClose={() => setShowEnroll(false)}
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="enroll-code"
                      className="block text-sm font-medium text-slate-200 mb-1.5"
                    >
                      Select Course
                    </label>
                    <div className="relative">
                      <select
                        id="enroll-code"
                        value={enrollCode}
                        onChange={(e) => setEnrollCode(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-indigo-400/30 appearance-none"
                      >
                        <option value="">Select course</option>
                        {catalog.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code} — {c.name} ({c.type}) [{c.filled}/{c.seats}
                            ] {c.ltp}
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
                  {enrollCourse && (
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <h3 className="text-sm font-medium text-slate-200 mb-2">
                        {enrollCourse.name} ({enrollCourse.code})
                      </h3>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/50">
                          <div className="text-slate-400">Type</div>
                          <div className="font-medium">{enrollCourse.type}</div>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/50">
                          <div className="text-slate-400">Seats</div>
                          <div className="font-medium">
                            <span
                              className={
                                enrollCourse.filled >= enrollCourse.seats
                                  ? "text-rose-400"
                                  : "text-emerald-400"
                              }
                            >
                              {enrollCourse.filled}/{enrollCourse.seats}
                            </span>
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/50">
                          <div className="text-slate-400">L-T-P</div>
                          <div className="font-medium">{enrollCourse.ltp}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-3 pt-2">
                    <motion.button
                      onClick={() => setShowEnroll(false)}
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
                      onClick={submitEnroll}
                      className={`px-4 py-2 rounded-xl text-white text-sm font-medium transition-all duration-300 ${
                        !enrollCourse
                          ? "bg-indigo-500/50 cursor-not-allowed"
                          : "bg-indigo-500 hover:bg-indigo-600"
                      }`}
                      whileHover={
                        enrollCourse
                          ? {
                              scale: 1.02,
                            }
                          : {}
                      }
                      whileTap={
                        enrollCourse
                          ? {
                              scale: 0.98,
                            }
                          : {}
                      }
                      disabled={!enrollCourse}
                    >
                      Enroll
                    </motion.button>
                  </div>
                </div>
              </Modal>
            )}
            {showElective && (
              <Modal
                title="Choose Electives"
                icon={<BookOpen size={18} />}
                onClose={() => setShowElective(false)}
              >
                <div className="space-y-4">
                  <p className="text-sm text-slate-300">
                    Select your preferred elective courses. Be careful to avoid
                    time clashes.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {electivePool.map((e) => {
                      const checked = selectedElectives.has(e.code);
                      const riskClass =
                        e.risk === "Clash"
                          ? "text-rose-300"
                          : "text-emerald-300";
                      return (
                        <motion.label
                          key={e.code}
                          className={`rounded-xl border p-4 flex items-start gap-3 cursor-pointer transition-all duration-200 ${
                            checked
                              ? "bg-indigo-500/20 border-indigo-500/40"
                              : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
                          }`}
                          whileHover={{
                            scale: 1.02,
                          }}
                          whileTap={{
                            scale: 0.98,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleElective(e.code)}
                            className="mt-1 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-400/40"
                          />
                          <div>
                            <p className="text-sm font-medium flex items-center gap-1.5">
                              <BookMarked
                                size={14}
                                className={
                                  checked ? "text-indigo-400" : "text-slate-400"
                                }
                              />
                              {e.name}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              <span className="font-medium text-slate-300">
                                {e.code}
                              </span>
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <p className="text-xs flex items-center gap-1">
                                <Clock size={12} className="text-slate-400" />
                                <span className="text-slate-300">
                                  {e.slots.join(", ")}
                                </span>
                              </p>
                              <p
                                className={`text-xs font-medium flex items-center gap-1 ${riskClass}`}
                              >
                                {e.risk === "Clash" ? (
                                  <AlertTriangle size={12} />
                                ) : (
                                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                                )}
                                {e.risk}
                              </p>
                            </div>
                          </div>
                        </motion.label>
                      );
                    })}
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <motion.button
                      onClick={() => setShowElective(false)}
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
                      onClick={submitElectives}
                      className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors duration-200"
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                    >
                      Save Choices
                    </motion.button>
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
                        <option>Student overlap</option>
                        <option>Room double-booked</option>
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
                      placeholder="Describe the conflict with course codes, day/slot, and any evidence."
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
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-30 -z-10"></div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            {icon && <span className="text-indigo-400">{icon}</span>}
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
