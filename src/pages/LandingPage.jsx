import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  LayoutGridIcon,
  ShieldCheckIcon,
  FileTextIcon,
  Sun,
  Moon,
} from "lucide-react";

export default function LandingPage() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur transition-colors duration-300 border-b shadow-sm ${
          theme === "dark"
            ? "bg-slate-900/80 border-slate-800"
            : "bg-white/80 border-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div
              className={`p-2 rounded-lg ${
                theme === "dark" ? "bg-indigo-500/20" : "bg-indigo-100"
              }`}
            >
              <CalendarDaysIcon
                className={`h-5 w-5 ${
                  theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                }`}
              />
            </div>
            <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
              Timely NEP
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className={`text-sm font-medium transition-colors ${
                theme === "dark"
                  ? "text-slate-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Features
            </a>
            <a
              href="#how"
              className={`text-sm font-medium transition-colors ${
                theme === "dark"
                  ? "text-slate-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              How it Works
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
              className={`p-2 rounded-lg transition-all ${
                theme === "dark"
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              to="/login"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                theme === "dark"
                  ? "text-slate-300 hover:text-white hover:bg-slate-800"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all shadow-sm ${
                theme === "dark"
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main>
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1
              className={`text-4xl lg:text-6xl font-bold mb-6 leading-tight ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              NEP-Aligned Timetables
              <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p
              className={`text-lg lg:text-xl mb-10 leading-relaxed max-w-2xl mx-auto ${
                theme === "dark" ? "text-slate-300" : "text-gray-600"
              }`}
            >
              Generate conflict-free schedules for FYUGP and ITEP programs with
              intelligent automation and instant exports.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/signup"
                className="group px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg transition-all inline-flex items-center gap-2"
              >
                Get Started
                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className={`px-6 py-3 rounded-lg font-medium transition-colors border ${
                  theme === "dark"
                    ? "border-slate-700 hover:border-slate-600 text-slate-300"
                    : "border-gray-300 hover:border-gray-400 text-gray-700"
                }`}
              >
                Login
              </Link>
            </div>

            <motion.div
              className="flex flex-wrap justify-center gap-8 mt-12 text-sm"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              {["No Setup Required", "Export Ready", "Conflict Detection"].map(
                (item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className={`flex items-center gap-2 ${
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    <CheckCircleIcon className="h-4 w-4 text-indigo-500" />
                    {item}
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>
        </section>

        {/* Features */}
        <section
          id="features"
          className={`py-20 ${
            theme === "dark" ? "bg-slate-900/50" : "bg-gray-50"
          }`}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                Features
              </span>
              <h2
                className={`text-3xl font-bold mt-3 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Everything You Need
              </h2>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: <CalendarDaysIcon className="h-6 w-6" />,
                  title: "NEP Compliant",
                  text: "Built for FYUGP and ITEP frameworks with L–T–P structure support.",
                },
                {
                  icon: <ShieldCheckIcon className="h-6 w-6" />,
                  title: "Conflict Detection",
                  text: "Automatic detection of faculty, room, and student conflicts.",
                },
                {
                  icon: <LayoutGridIcon className="h-6 w-6" />,
                  title: "Smart Scheduling",
                  text: "Optimized timetables with configurable constraints and preferences.",
                },
                {
                  icon: <FileTextIcon className="h-6 w-6" />,
                  title: "Export Ready",
                  text: "Download as PDF, Excel, or ICS for seamless integration.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className={`p-6 rounded-xl transition-all ${
                    theme === "dark"
                      ? "bg-slate-800/50 hover:bg-slate-800"
                      : "bg-white hover:shadow-lg border border-gray-200"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      theme === "dark"
                        ? "bg-indigo-500/20 text-indigo-400"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    className={`font-semibold text-lg mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    }
                  >
                    {feature.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Process
            </span>
            <h2
              className={`text-3xl font-bold mt-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              How It Works
            </h2>
          </div>

          <motion.div
            className="space-y-12"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                number: "01",
                title: "Define Framework",
                description: "Select your program type and academic term.",
              },
              {
                number: "02",
                title: "Add Resources",
                description:
                  "Import courses, faculty, rooms, and student cohorts.",
              },
              {
                number: "03",
                title: "Generate Schedule",
                description:
                  "Run the scheduler with your preferred constraints.",
              },
              {
                number: "04",
                title: "Review & Export",
                description:
                  "Check for conflicts and export in your preferred format.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="flex gap-6 items-start"
              >
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center font-bold text-2xl ${
                    theme === "dark"
                      ? "bg-indigo-500/20 text-indigo-400"
                      : "bg-indigo-100 text-indigo-600"
                  }`}
                >
                  {step.number}
                </div>
                <div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    }
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div
            className={`max-w-4xl mx-auto rounded-2xl p-12 text-center ${
              theme === "dark"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                : "bg-gradient-to-r from-indigo-600 to-purple-600"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Create your first timetable in minutes with our intuitive
              platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-lg bg-white text-indigo-600 hover:bg-gray-100 font-medium shadow-lg transition-all"
              >
                Sign Up Free
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-lg border-2 border-white text-white hover:bg-white/10 font-medium transition-all"
              >
                Login
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`border-t ${
          theme === "dark"
            ? "border-slate-800 bg-slate-900/50"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CalendarDaysIcon
              className={`h-5 w-5 ${
                theme === "dark" ? "text-indigo-400" : "text-indigo-600"
              }`}
            />
            <p
              className={`text-sm ${
                theme === "dark" ? "text-slate-400" : "text-gray-600"
              }`}
            >
              © 2025 Timely NEP. All rights reserved.
            </p>
          </div>
          <nav>
            <ul className="flex gap-6 text-sm">
              <li>
                <a
                  href="#features"
                  className={`transition-colors ${
                    theme === "dark"
                      ? "text-slate-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how"
                  className={`transition-colors ${
                    theme === "dark"
                      ? "text-slate-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  How it Works
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
