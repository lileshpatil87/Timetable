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
import RoomsResources from "./RoomsResources";
export default function StaffDashboard() {
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
        <RoomsResources />
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
