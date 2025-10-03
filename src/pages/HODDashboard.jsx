import React, { useState } from "react";
import {
  CalendarIcon,
  UsersIcon,
  BookIcon,
  CalendarDaysIcon,
  GraduationCapIcon,
  BarChartIcon,
  AlertTriangleIcon,
  BuildingIcon,
  AlertCircleIcon,
} from "lucide-react";
import Modal from "../components/Modal";

export default function HODDashboard() {
  // Demo department context
  const dept = {
    name: "Computer Science",
    term: "AY 2025-26, Sem 3",
    programSets: ["FYUGP-CS", "Minor-CS", "MDC-CS"],
  };

  // KPIs (sample)
  const kpis = [
    {
      label: "Faculty load variance",
      value: "±2.1 hrs",
      help: "vs weekly targets",
      icon: <UsersIcon size={16} className="text-indigo-400" />,
    },
    {
      label: "Room utilization",
      value: "71%",
      help: "Mon–Fri 9–5",
      icon: <BuildingIcon size={16} className="text-emerald-400" />,
    },
    {
      label: "Elective clash risk",
      value: "Medium",
      help: "Popular combos",
      icon: <AlertCircleIcon size={16} className="text-amber-400" />,
    },
    {
      label: "Pending approvals",
      value: 4,
      help: "Timetables/changes",
      icon: <AlertTriangleIcon size={16} className="text-rose-400" />,
    },
  ];

  // Modals for each core function
  const [showProfile, setShowProfile] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [showGenerate, setShowGenerate] = useState(false);
  const [showPracticum, setShowPracticum] = useState(false);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [showSubstitution, setShowSubstitution] = useState(false);

  // Profile management (stub)
  const [profile, setProfile] = useState({
    displayName: "Department of Computer Science",
    contact: "hod.cs@university.edu",
  });

  function saveProfile() {
    alert("Profile changes saved (awaiting approval if required).");
    setShowProfile(false);
  }

  // Subjects & electives (stub)
  const [courses, setCourses] = useState([
    { code: "CS342", name: "AI & ML", type: "Elective", ltp: "3-0-0" },
    { code: "CS344", name: "Cloud Computing", type: "Elective", ltp: "3-0-0" },
    {
      code: "CS331",
      name: "Operating Systems Lab",
      type: "Major",
      ltp: "0-0-2",
    },
  ]);

  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    type: "Major",
    ltp: "3-0-0",
  });

  function addCourse() {
    if (!newCourse.code || !newCourse.name) {
      alert("Provide code and name");
      return;
    }
    setCourses((c) => [...c, newCourse]);
    setNewCourse({ code: "", name: "", type: "Major", ltp: "3-0-0" });
  }

  function removeCourse(code) {
    setCourses((c) => c.filter((x) => x.code !== code));
  }

  function saveCourses() {
    alert("Subjects and electives updated.");
    setShowSubjects(false);
  }

  // Generate timetables (scenario composer stub)
  const [scenario, setScenario] = useState({
    term: "Sem 3",
    profile: "Student-compact",
    timeBudget: 180,
  });

  function runScenario() {
    alert("Scenario queued. You will be notified when it completes.");
    setShowGenerate(false);
  }

  // Practicum / fieldwork management (ITEP)
  const [blocks, setBlocks] = useState([
    {
      cohort: "ITEP-S3",
      day: "Wed",
      start: "14:00",
      end: "16:30",
      label: "Practicum",
    },
    {
      cohort: "ITEP-S3",
      day: "Fri",
      start: "10:15",
      end: "12:15",
      label: "School internship",
    },
  ]);

  const [newBlock, setNewBlock] = useState({
    cohort: "ITEP-S3",
    day: "Wed",
    start: "14:00",
    end: "16:30",
    label: "Practicum",
  });

  function addBlock() {
    if (!newBlock.cohort || !newBlock.day || !newBlock.start || !newBlock.end) {
      alert("Complete all fields");
      return;
    }
    setBlocks((b) => [...b, { ...newBlock }]);
  }

  function removeBlock(idx) {
    setBlocks((b) => b.filter((_, i) => i !== idx));
  }

  function savePracticum() {
    alert("Teaching practice/fieldwork updated.");
    setShowPracticum(false);
  }

  // Enrollment statistics (stub)
  const enrollStats = [
    { code: "CS342", name: "AI & ML", cap: 60, enrolled: 58 },
    { code: "CS344", name: "Cloud Computing", cap: 60, enrolled: 61 },
    { code: "CS331", name: "OS Lab", cap: 30, enrolled: 29 },
  ];

  // Substitutions / emergency adjustments (same-day)
  const [sub, setSub] = useState({
    date: "",
    slot: "10:15",
    course: "",
    fromFaculty: "",
    toFaculty: "",
    room: "",
  });

  function submitSubstitution() {
    if (
      !sub.date ||
      !sub.slot ||
      !sub.course ||
      !sub.fromFaculty ||
      !sub.toFaculty
    ) {
      alert("Fill required fields.");
      return;
    }
    alert("Substitution request submitted for validation.");
    setShowSubstitution(false);
  }

  return (
    <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-8">
      {/* Sidebar */}
      <aside aria-label="Department" className="self-start space-y-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-sm">
          <h1 className="text-xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {dept.name}
          </h1>
          <p className="text-sm text-slate-400 mt-1">{dept.term}</p>
          <div className="mt-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <GraduationCapIcon size={16} className="text-indigo-400" />
              Program sets
            </h3>
            <ul className="flex flex-wrap gap-2">
              {dept.programSets.map((p) => (
                <li
                  key={p}
                  className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BarChartIcon size={16} className="text-indigo-400" />
              Key metrics
            </h3>
            <ul className="grid grid-cols-1 gap-3">
              {kpis.map((k, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-xl bg-slate-800/40 px-4 py-3 border border-slate-700/50 hover:border-slate-700 transition-colors"
                >
                  <div className="flex-shrink-0">{k.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-200">
                      {k.label}
                    </p>
                    <p className="text-xs text-slate-400">{k.help}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-lg">{k.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Content */}
      <section className="space-y-8" aria-label="Content">
        {/* Core actions */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <CalendarDaysIcon size={18} className="text-indigo-400" />
            Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowProfile(true)}
              className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-indigo-400 hover:bg-indigo-500/10 text-sm transition-all flex items-center gap-2"
            >
              <BuildingIcon size={16} />
              Department profile
            </button>
            <button
              onClick={() => setShowSubjects(true)}
              className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-indigo-400 hover:bg-indigo-500/10 text-sm transition-all flex items-center gap-2"
            >
              <BookIcon size={16} />
              Subjects & electives
            </button>
            <button
              onClick={() => setShowGenerate(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/30 flex items-center gap-2"
            >
              <CalendarIcon size={16} />
              Generate timetables
            </button>
            <button
              onClick={() => setShowPracticum(true)}
              className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-indigo-400 hover:bg-indigo-500/10 text-sm transition-all flex items-center gap-2"
            >
              <GraduationCapIcon size={16} />
              Teaching practice
            </button>
            <button
              onClick={() => setShowEnrollment(true)}
              className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-indigo-400 hover:bg-indigo-500/10 text-sm transition-all flex items-center gap-2"
            >
              <BarChartIcon size={16} />
              Enrollment statistics
            </button>
            <button
              onClick={() => setShowSubstitution(true)}
              className="px-4 py-2.5 rounded-xl border border-amber-500/50 text-amber-200 hover:bg-amber-500/10 text-sm transition-all flex items-center gap-2"
            >
              <AlertTriangleIcon size={16} />
              Substitutions
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      {showProfile && (
        <Modal title="Department profile" onClose={() => setShowProfile(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1.5">
                Display name
              </label>
              <input
                value={profile.displayName}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, displayName: e.target.value }))
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1.5">
                Contact email
              </label>
              <input
                value={profile.contact}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, contact: e.target.value }))
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowProfile(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
      {showSubjects && (
        <Modal
          title="Subjects & electives"
          onClose={() => setShowSubjects(false)}
        >
          <div className="space-y-4">
            <div className="grid sm:grid-cols-4 gap-3 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
              <input
                placeholder="Code"
                value={newCourse.code}
                onChange={(e) =>
                  setNewCourse((c) => ({ ...c, code: e.target.value }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
              <input
                placeholder="Name"
                value={newCourse.name}
                onChange={(e) =>
                  setNewCourse((c) => ({ ...c, name: e.target.value }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all sm:col-span-2"
              />
              <select
                value={newCourse.type}
                onChange={(e) =>
                  setNewCourse((c) => ({ ...c, type: e.target.value }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>Major</option>
                <option>Minor</option>
                <option>MDC</option>
                <option>AEC</option>
                <option>SEC</option>
                <option>VAC</option>
                <option>Elective</option>
              </select>
              <input
                placeholder="L–T–P (e.g., 3-0-0)"
                value={newCourse.ltp}
                onChange={(e) =>
                  setNewCourse((c) => ({ ...c, ltp: e.target.value }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all sm:col-span-3"
              />
              <button
                onClick={addCourse}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition-colors flex items-center justify-center gap-1"
              >
                <span>Add</span>
              </button>
            </div>
            <div className="border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="bg-slate-800/30 px-4 py-2 border-b border-slate-700/50">
                <h3 className="font-medium">Course list</h3>
              </div>
              <ul className="divide-y divide-slate-800/50 max-h-60 overflow-auto">
                {courses.map((c) => (
                  <li
                    key={c.code}
                    className="py-3 px-4 flex items-center justify-between hover:bg-slate-800/20 group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-indigo-400">
                          {c.code}
                        </span>
                        <span className="text-sm font-medium">{c.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                          {c.type}
                        </span>
                        <span className="text-xs text-slate-400">{c.ltp}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeCourse(c.code)}
                      className="text-xs text-rose-400 hover:text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded-md hover:bg-rose-500/10"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubjects(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveCourses}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
      {showGenerate && (
        <Modal
          title="Generate timetables"
          onClose={() => setShowGenerate(false)}
        >
          <div className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Term
                </label>
                <select
                  value={scenario.term}
                  onChange={(e) =>
                    setScenario((s) => ({ ...s, term: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                >
                  <option>Sem 3</option>
                  <option>Sem 4</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Profile
                </label>
                <select
                  value={scenario.profile}
                  onChange={(e) =>
                    setScenario((s) => ({ ...s, profile: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                >
                  <option>Student-compact</option>
                  <option>Faculty-fair</option>
                  <option>Utilization</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Time budget (s)
                </label>
                <input
                  type="number"
                  value={scenario.timeBudget}
                  onChange={(e) =>
                    setScenario((s) => ({
                      ...s,
                      timeBudget: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-sm text-indigo-300">
              <p>
                The timetable generation will use constraint-based optimization
                to find the best schedule based on your selected profile.
              </p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowGenerate(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={runScenario}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition-colors"
              >
                Queue run
              </button>
            </div>
          </div>
        </Modal>
      )}
      {showPracticum && (
        <Modal
          title="Teaching practice / Fieldwork"
          onClose={() => setShowPracticum(false)}
        >
          <div className="space-y-4">
            <div className="grid sm:grid-cols-5 gap-3 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
              <input
                placeholder="Cohort"
                value={newBlock.cohort}
                onChange={(e) =>
                  setNewBlock((b) => ({ ...b, cohort: e.target.value }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
              <select
                value={newBlock.day}
                onChange={(e) =>
                  setNewBlock((b) => ({ ...b, day: e.target.value }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>Mon</option>
                <option>Tue</option>
                <option>Wed</option>
                <option>Thu</option>
                <option>Fri</option>
              </select>
              <input
                placeholder="Start (e.g., 14:00)"
                value={newBlock.start}
                onChange={(e) =>
                  setNewBlock((b) => ({ ...b, start: e.target.value }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
              <input
                placeholder="End (e.g., 16:30)"
                value={newBlock.end}
                onChange={(e) =>
                  setNewBlock((b) => ({ ...b, end: e.target.value }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
              <input
                placeholder="Label"
                value={newBlock.label}
                onChange={(e) =>
                  setNewBlock((b) => ({ ...b, label: e.target.value }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={addBlock}
                className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:border-indigo-400 hover:bg-indigo-500/10 transition-all flex items-center gap-1"
              >
                Add block
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPracticum(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={savePracticum}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="bg-slate-800/30 px-4 py-2 border-b border-slate-700/50">
                <h3 className="font-medium">Block schedule</h3>
              </div>
              <ul className="divide-y divide-slate-800/50 max-h-60 overflow-auto">
                {blocks.map((b, i) => (
                  <li
                    key={`${b.cohort}-${b.day}-${b.start}-${i}`}
                    className="py-3 px-4 flex items-center justify-between hover:bg-slate-800/20 group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{b.cohort}</span>
                        <span className="text-slate-400">:</span>
                        <span>{b.label}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {b.day} {b.start}-{b.end}
                      </div>
                    </div>
                    <button
                      onClick={() => removeBlock(i)}
                      className="text-xs text-rose-400 hover:text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded-md hover:bg-rose-500/10"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
      {showEnrollment && (
        <Modal
          title="Enrollment statistics"
          onClose={() => setShowEnrollment(false)}
        >
          <div className="space-y-4">
            <div className="border border-slate-700/50 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-800/50">
                  <tr className="text-left text-slate-300">
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Cap</th>
                    <th className="py-3 px-4">Enrolled</th>
                    <th className="py-3 px-4">Utilization</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollStats.map((e) => {
                    const util = Math.round((e.enrolled / e.cap) * 100);
                    const utilClass =
                      util > 100
                        ? "text-rose-400"
                        : util >= 85
                        ? "text-amber-400"
                        : "text-emerald-400";
                    return (
                      <tr
                        key={e.code}
                        className="border-t border-slate-800/50 hover:bg-slate-800/20"
                      >
                        <td className="py-3 px-4 font-mono">{e.code}</td>
                        <td className="py-3 px-4">{e.name}</td>
                        <td className="py-3 px-4">{e.cap}</td>
                        <td className="py-3 px-4">{e.enrolled}</td>
                        <td className={`py-3 px-4 ${utilClass} font-medium`}>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  util > 100
                                    ? "bg-rose-500"
                                    : util >= 85
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                                }`}
                                style={{ width: `${Math.min(util, 100)}%` }}
                              ></div>
                            </div>
                            <span>{util}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowEnrollment(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
      {showSubstitution && (
        <Modal
          title="Substitutions & emergency adjustments"
          onClose={() => setShowSubstitution(false)}
        >
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  value={sub.date}
                  onChange={(e) =>
                    setSub((s) => ({ ...s, date: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Slot
                </label>
                <select
                  value={sub.slot}
                  onChange={(e) =>
                    setSub((s) => ({ ...s, slot: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                >
                  <option>09:00</option>
                  <option>10:15</option>
                  <option>11:30</option>
                  <option>12:45</option>
                  <option>14:00</option>
                  <option>15:15</option>
                  <option>16:30</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Course
                </label>
                <input
                  value={sub.course}
                  onChange={(e) =>
                    setSub((s) => ({ ...s, course: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="e.g., CS201"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  From faculty
                </label>
                <input
                  value={sub.fromFaculty}
                  onChange={(e) =>
                    setSub((s) => ({ ...s, fromFaculty: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="e.g., Dr. Rao"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  To faculty
                </label>
                <input
                  value={sub.toFaculty}
                  onChange={(e) =>
                    setSub((s) => ({ ...s, toFaculty: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="e.g., Dr. Jain"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Room (optional)
                </label>
                <input
                  value={sub.room}
                  onChange={(e) =>
                    setSub((s) => ({ ...s, room: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="e.g., CS-201"
                />
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-sm text-amber-300">
              <p>
                The system will check conflicts before applying, and notify
                affected stakeholders.
              </p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubstitution(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitSubstitution}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white text-sm hover:bg-amber-500 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
