import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, CalendarDaysIcon } from "lucide-react";
import CustomDropdown from "../components/CustomDropdown";

const GenerateTimetable = () => {
  const outletContext = useOutletContext();
  const { theme: contextTheme, isDark: contextIsDark } = outletContext || {};

  const [localIsDark] = useState(false);
  const isDark = contextIsDark !== undefined ? contextIsDark : localIsDark;

  const defaultTheme = {
    bg: isDark ? "bg-slate-950" : "bg-gray-50",
    text: isDark ? "text-slate-100" : "text-gray-900",
    cardBg: isDark ? "bg-slate-900/60" : "bg-white",
    cardBorder: isDark ? "border-slate-800" : "border-gray-200",
    headerBg: isDark
      ? "bg-slate-900/70 backdrop-blur-sm"
      : "bg-white/80 backdrop-blur-sm",
    headerBorder: isDark ? "border-slate-800" : "border-gray-200",
    mutedText: isDark ? "text-slate-400" : "text-gray-600",
    gradient: isDark
      ? "from-indigo-400 via-purple-400 to-pink-400"
      : "from-indigo-600 via-purple-600 to-pink-600",
    accentBg: isDark ? "bg-slate-800/50" : "bg-gray-100",
    accentBorder: isDark ? "border-slate-700" : "border-gray-200",
    hoverBg: isDark ? "hover:bg-slate-800" : "hover:bg-gray-100",
    buttonBg: isDark
      ? "bg-slate-800 hover:bg-slate-700"
      : "bg-gray-100 hover:bg-gray-200",
    buttonBorder: isDark ? "border-slate-700" : "border-gray-300",
    buttonText: isDark ? "text-slate-100" : "text-gray-900",
    inputBg: isDark ? "bg-slate-800/70" : "bg-white",
    inputBorder: isDark ? "border-slate-700" : "border-gray-300",
    inputText: isDark ? "text-slate-100" : "text-gray-900",
    inputPlaceholder: isDark
      ? "placeholder:text-slate-500"
      : "placeholder:text-gray-500",
    modalBg: isDark ? "bg-slate-900" : "bg-white",
    modalOverlay: isDark ? "bg-slate-950/80" : "bg-gray-900/40",
    tableBorder: isDark ? "border-slate-800" : "border-gray-200",
    tableHeader: isDark ? "bg-slate-800/60" : "bg-gray-50",
  };

  const theme = contextTheme || defaultTheme;

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // State for basic configuration
  const [basicConfig, setBasicConfig] = useState({
    academicYear: "",
    semester: "",
    startDate: "",
    endDate: "",
    workingDays: [],
    periodsPerDay: 6,
    periodDuration: 60,
    breakAfterPeriod: 3,
    breakDuration: 15,
    program: "",
  });

  // State for constraints
  const [constraints, setConstraints] = useState({
    hardConstraints: {
      noOverlap: true,
      facultyAvailability: true,
      roomAvailability: true,
      maxCreditsPerDay: 8,
      labSessionsConsecutive: true,
    },
    softConstraints: {
      minimizeIdleTime: true,
      balancedWorkload: true,
      preferredTimeSlots: true,
      avoidSinglePeriodGaps: true,
      evenDistribution: true,
    },
  });

  // State for generation status
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState("");

  // Program options
  const programs = ["ITEP", "BEd", "MEd"];
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Handle basic config changes
  const handleBasicConfigChange = (field, value) => {
    setBasicConfig((prev) => ({ ...prev, [field]: value }));
  };

  // Handle working days selection
  const toggleWorkingDay = (day) => {
    setBasicConfig((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));
  };

  // Handle constraint changes
  const handleConstraintChange = (type, key) => {
    setConstraints((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: !prev[type][key],
      },
    }));
  };

  // Generate timetable
  const generateTimetable = async () => {
    setIsGenerating(true);
    setGenerationStatus("Initializing timetable generation...");

    try {
      // Validate required inputs
    //   if (!basicConfig.program) {
    //     throw new Error("Please select a program");
    //   }
    //   if (basicConfig.workingDays.length === 0) {
    //     throw new Error("Please select working days");
    //   }

      const timetableData = {
        basicConfig,
        constraints,
      };

      setGenerationStatus("Applying hard constraints...");

      // Call backend API
    //   const response = await fetch("/api/timetable/generate", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(timetableData),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to generate timetable");
    //   }

    //   setGenerationStatus("Optimizing timetable with soft constraints...");
    //   const result = await response.json();

      setGenerationStatus("Timetable generated successfully!");
    } catch (error) {
      setGenerationStatus(`Error: ${error.message}`);
      console.error("Timetable generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-900"
      }`}
    >
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 ">
        {/* Basic Configuration Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className={`mb-8 rounded-xl p-6 sm:p-8 transition-all ${
            theme === "dark"
              ? "bg-slate-800/50 hover:bg-slate-800"
              : "bg-white hover:shadow-lg border border-gray-200"
          }`}
        >
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Basic Configuration
          </h2>

          <div className="space-y-6">
            {/* Program Selection */}
            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${
                  theme === "dark" ? "text-slate-300" : "text-gray-700"
                }`}
              >
                Select Program
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {programs.map((program) => (
                  <button
                    key={program}
                    onClick={() => handleBasicConfigChange("program", program)}
                    className={`p-4 rounded-lg font-semibold transition-all border-2 ${
                      basicConfig.program === program
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-lg"
                        : theme === "dark"
                        ? "bg-slate-700/50 text-slate-300 border-slate-600 hover:border-indigo-500"
                        : "bg-gray-50 text-gray-700 border-gray-300 hover:border-indigo-500"
                    }`}
                  >
                    {program}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  Academic Year
                </label>
                <input
                  type="text"
                  placeholder="e.g., 2025-2026"
                  value={basicConfig.academicYear}
                  onChange={(e) =>
                    handleBasicConfigChange("academicYear", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    theme === "dark"
                      ? "bg-slate-700/50 border-2 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-indigo-500"
                      : "bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                />
              </div>

              <div>
                <CustomDropdown
                  label="Semester"
                  name="semester"
                  id="semester"
                  value={
                    basicConfig.semester
                      ? `Semester ${basicConfig.semester}`
                      : ""
                  }
                  onChange={(e) => {
                    // Extract number from "Semester X"
                    const semesterNum = e.target.value.split(" ")[1];
                    handleBasicConfigChange("semester", semesterNum);
                  }}
                  options={[
                    "Semester 1",
                    "Semester 2",
                    "Semester 3",
                    "Semester 4",
                    "Semester 5",
                    "Semester 6",
                    "Semester 7",
                    "Semester 8",
                  ]}
                  theme={theme}
                  placeholder="Select Semester"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  Start Date
                </label>
                <input
                  type="date"
                  value={basicConfig.startDate}
                  onChange={(e) =>
                    handleBasicConfigChange("startDate", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    theme === "dark"
                      ? "bg-slate-700/50 border-2 border-slate-600 text-slate-100 focus:border-indigo-500"
                      : "bg-gray-50 border-2 border-gray-200 text-gray-900 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  End Date
                </label>
                <input
                  type="date"
                  value={basicConfig.endDate}
                  onChange={(e) =>
                    handleBasicConfigChange("endDate", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    theme === "dark"
                      ? "bg-slate-700/50 border-2 border-slate-600 text-slate-100 focus:border-indigo-500"
                      : "bg-gray-50 border-2 border-gray-200 text-gray-900 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  Periods Per Day
                </label>
                <input
                  type="number"
                  min="4"
                  max="10"
                  value={basicConfig.periodsPerDay}
                  onChange={(e) =>
                    handleBasicConfigChange(
                      "periodsPerDay",
                      parseInt(e.target.value)
                    )
                  }
                  className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    theme === "dark"
                      ? "bg-slate-700/50 border-2 border-slate-600 text-slate-100 focus:border-indigo-500"
                      : "bg-gray-50 border-2 border-gray-200 text-gray-900 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  Period Duration (min)
                </label>
                <input
                  type="number"
                  min="30"
                  max="90"
                  value={basicConfig.periodDuration}
                  onChange={(e) =>
                    handleBasicConfigChange(
                      "periodDuration",
                      parseInt(e.target.value)
                    )
                  }
                  className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    theme === "dark"
                      ? "bg-slate-700/50 border-2 border-slate-600 text-slate-100 focus:border-indigo-500"
                      : "bg-gray-50 border-2 border-gray-200 text-gray-900 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  Break After Period
                </label>
                <input
                  type="number"
                  min="1"
                  max={basicConfig.periodsPerDay}
                  value={basicConfig.breakAfterPeriod}
                  onChange={(e) =>
                    handleBasicConfigChange(
                      "breakAfterPeriod",
                      parseInt(e.target.value)
                    )
                  }
                  className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    theme === "dark"
                      ? "bg-slate-700/50 border-2 border-slate-600 text-slate-100 focus:border-indigo-500"
                      : "bg-gray-50 border-2 border-gray-200 text-gray-900 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  Break Duration (min)
                </label>
                <input
                  type="number"
                  min="10"
                  max="60"
                  value={basicConfig.breakDuration}
                  onChange={(e) =>
                    handleBasicConfigChange(
                      "breakDuration",
                      parseInt(e.target.value)
                    )
                  }
                  className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    theme === "dark"
                      ? "bg-slate-700/50 border-2 border-slate-600 text-slate-100 focus:border-indigo-500"
                      : "bg-gray-50 border-2 border-gray-200 text-gray-900 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                />
              </div>
            </div>

            {/* Working Days */}
            <div>
              <label
                className={`block text-sm font-semibold mb-3 ${
                  theme === "dark" ? "text-slate-300" : "text-gray-700"
                }`}
              >
                Working Days
              </label>
              <div className="flex flex-wrap gap-3">
                {weekDays.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleWorkingDay(day)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      basicConfig.workingDays.includes(day)
                        ? "bg-indigo-600 text-white shadow-lg"
                        : theme === "dark"
                        ? "bg-slate-700/50 text-slate-300 hover:bg-slate-700 border-2 border-slate-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Constraints Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className={`mb-8 rounded-xl p-6 sm:p-8 transition-all ${
            theme === "dark"
              ? "bg-slate-800/50 hover:bg-slate-800"
              : "bg-white hover:shadow-lg border border-gray-200"
          }`}
        >
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Constraints Configuration
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hard Constraints */}
            <div>
              <h3
                className={`text-xl font-semibold mb-4 ${
                  theme === "dark" ? "text-slate-200" : "text-gray-800"
                }`}
              >
                Hard Constraints (Must Be Satisfied)
              </h3>
              <div className="space-y-3">
                {Object.entries(constraints.hardConstraints).map(
                  ([key, value]) => (
                    <label
                      key={key}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                        theme === "dark"
                          ? "bg-slate-700/50 hover:bg-slate-700"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() =>
                          handleConstraintChange("hardConstraints", key)
                        }
                        className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                      />
                      <span
                        className={`ml-3 text-sm font-medium ${
                          theme === "dark" ? "text-slate-300" : "text-gray-700"
                        }`}
                      >
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Soft Constraints */}
            <div>
              <h3
                className={`text-xl font-semibold mb-4 ${
                  theme === "dark" ? "text-slate-200" : "text-gray-800"
                }`}
              >
                Soft Constraints (Optimization Goals)
              </h3>
              <div className="space-y-3">
                {Object.entries(constraints.softConstraints).map(
                  ([key, value]) => (
                    <label
                      key={key}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                        theme === "dark"
                          ? "bg-slate-700/50 hover:bg-slate-700"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() =>
                          handleConstraintChange("softConstraints", key)
                        }
                        className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                      />
                      <span
                        className={`ml-3 text-sm font-medium ${
                          theme === "dark" ? "text-slate-300" : "text-gray-700"
                        }`}
                      >
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Generate Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center"
        >
          <button
            onClick={generateTimetable}
            disabled={isGenerating}
            className="group px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg transition-all inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGenerating ? "Generating..." : "Generate Timetable"}
          </button>

          {generationStatus && (
            <div
              className={`mt-6 px-6 py-4 rounded-lg font-semibold inline-block ${
                generationStatus.includes("Error")
                  ? "bg-red-100 text-red-800 border-2 border-red-200"
                  : "bg-green-100 text-green-800 border-2 border-green-200"
              }`}
            >
              {generationStatus}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default GenerateTimetable;
