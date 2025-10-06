import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AtSignIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  CheckIcon,
  Sun,
  Moon,
} from "lucide-react";

const ROLES = [
  "Student",
  "Faculty",
  "Timetable Coordinators",
  "Head of the Department",
  "Academic Dean",
];

export default function Login() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  const [showPwd, setShowPwd] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "Student",
  });
  const [errors, setErrors] = useState({});
  const [alertMsg, setAlertMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;
  const dropdownRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsRoleOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  function selectRole(role) {
    setForm((f) => ({ ...f, role }));
    setErrors((er) => ({ ...er, role: "" }));
    setIsRoleOpen(false);
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  }

  function validate() {
    const next = {};
    if (!form.email) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email";
    if (!form.password) next.password = "Password is required";
    if (!form.role) next.role = "Select a role";
    setErrors(next);
    setAlertMsg(Object.keys(next).length ? "Fix errors in the form" : "");
    return Object.keys(next).length === 0;
  }

  function routeByRole(role) {
    if (from) {
      navigate(from, { replace: true });
      return;
    }
    const routes = {
      Student: "/student",
      Faculty: "/faculty",
      "Timetable Coordinators": "/coordinator",
      "Head of the Department": "/hod",
      "Academic Dean": "/dean",
    };
    navigate(routes[role] || "/student", { replace: true });
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const user = { role: form.role };
      routeByRole(user.role);
    } catch (_err) {
      setErrors({ password: "Invalid email, password, or role" });
      setAlertMsg("Login failed: Invalid email, password, or role");
    } finally {
      setIsSubmitting(false);
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-10 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-slate-950 to-slate-900"
          : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      {/* Decorative elements - only in dark mode */}
      {theme === "dark" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      )}

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Brand & Theme Toggle */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
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

          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className={`p-2 rounded-lg transition-all ${
              theme === "dark"
                ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <motion.div
          className={`relative rounded-2xl p-8 shadow-xl transition-colors duration-300 ${
            theme === "dark"
              ? "border border-slate-800/80 bg-slate-900/90 backdrop-blur-sm"
              : "border border-gray-200 bg-white"
          }`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Glow effect - only in dark mode */}
          {theme === "dark" && (
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-30 -z-10"></div>
          )}

          <header className="mb-8 text-center">
            <motion.h1
              className={`text-2xl font-bold mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              {...fadeInUp}
            >
              Welcome Back
            </motion.h1>
            <motion.p
              className={`text-sm ${
                theme === "dark" ? "text-slate-400" : "text-gray-600"
              }`}
              {...fadeInUp}
              transition={{ delay: 0.1 }}
            >
              Sign in to your account
            </motion.p>
          </header>

          {alertMsg && (
            <div
              role="alert"
              className={`px-4 py-3 rounded-xl mb-6 text-sm ${
                theme === "dark"
                  ? "bg-red-500/10 border border-red-500/30 text-red-300"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {alertMsg}
            </div>
          )}

          <motion.form onSubmit={onSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <motion.div variants={fadeInUp}>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-1.5 ${
                  theme === "dark" ? "text-slate-200" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <AtSignIcon
                    className={`h-5 w-5 ${
                      theme === "dark" ? "text-slate-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={form.email}
                  onChange={onChange}
                  className={`w-full rounded-xl pl-10 px-3 py-2.5 transition-all duration-200 ${
                    theme === "dark"
                      ? "border bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-400/50"
                      : "border bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                  } ${
                    errors.email
                      ? theme === "dark"
                        ? "border-red-500/60"
                        : "border-red-400"
                      : theme === "dark"
                      ? "border-slate-700/50"
                      : "border-gray-300"
                  }`}
                  placeholder="name@college.edu"
                />
              </div>
              {errors.email && (
                <p
                  className={`mt-1.5 text-xs flex items-center gap-1 ${
                    theme === "dark" ? "text-red-300" : "text-red-600"
                  }`}
                >
                  <span className="inline-block w-1 h-1 bg-current rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeInUp}>
              <label
                htmlFor="current-password"
                className={`block text-sm font-medium mb-1.5 ${
                  theme === "dark" ? "text-slate-200" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <LockIcon
                    className={`h-5 w-5 ${
                      theme === "dark" ? "text-slate-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  id="current-password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={onChange}
                  className={`w-full rounded-xl pl-10 pr-12 px-3 py-2.5 transition-all duration-200 ${
                    theme === "dark"
                      ? "border bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-400/50"
                      : "border bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                  } ${
                    errors.password
                      ? theme === "dark"
                        ? "border-red-500/60"
                        : "border-red-400"
                      : theme === "dark"
                      ? "border-slate-700/50"
                      : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md transition-colors ${
                    theme === "dark"
                      ? "text-slate-400 hover:text-indigo-300"
                      : "text-gray-400 hover:text-indigo-600"
                  }`}
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  className={`mt-1.5 text-xs flex items-center gap-1 ${
                    theme === "dark" ? "text-red-300" : "text-red-600"
                  }`}
                >
                  <span className="inline-block w-1 h-1 bg-current rounded-full"></span>
                  {errors.password}
                </p>
              )}
              <div className="mt-1.5 flex justify-end">
                <Link
                  to="/forgot-password"
                  className={`text-xs transition-colors ${
                    theme === "dark"
                      ? "text-indigo-300 hover:text-indigo-200"
                      : "text-indigo-600 hover:text-indigo-700"
                  }`}
                >
                  Forgot password?
                </Link>
              </div>
            </motion.div>

            {/* Custom Role Dropdown */}
            <motion.div variants={fadeInUp} ref={dropdownRef}>
              <label
                htmlFor="role"
                className={`block text-sm font-medium mb-1.5 ${
                  theme === "dark" ? "text-slate-200" : "text-gray-700"
                }`}
              >
                Role
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsRoleOpen(!isRoleOpen)}
                  className={`w-full rounded-xl px-3 py-2.5 pr-10 text-left transition-all duration-200 ${
                    theme === "dark"
                      ? "border bg-slate-800/50 text-slate-100 focus:ring-2 focus:ring-indigo-400/50"
                      : "border bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500"
                  } ${
                    errors.role
                      ? theme === "dark"
                        ? "border-red-500/60"
                        : "border-red-400"
                      : theme === "dark"
                      ? "border-slate-700/50"
                      : "border-gray-300"
                  }`}
                >
                  {form.role}
                  <ChevronDownIcon
                    className={`absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-transform ${
                      isRoleOpen ? "rotate-180" : ""
                    } ${theme === "dark" ? "text-slate-500" : "text-gray-400"}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isRoleOpen && (
                  <div
                    className={`absolute z-50 w-full mt-2 rounded-xl shadow-lg overflow-hidden border ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {ROLES.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => selectRole(role)}
                        className={`w-full px-3 py-2.5 text-left flex items-center justify-between transition-colors ${
                          theme === "dark"
                            ? "hover:bg-slate-700/50 text-slate-100"
                            : "hover:bg-gray-50 text-gray-900"
                        } ${
                          form.role === role
                            ? theme === "dark"
                              ? "bg-slate-700/30"
                              : "bg-indigo-50"
                            : ""
                        }`}
                      >
                        <span>{role}</span>
                        {form.role === role && (
                          <CheckIcon
                            className={`h-4 w-4 ${
                              theme === "dark"
                                ? "text-indigo-400"
                                : "text-indigo-600"
                            }`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.role && (
                <p
                  className={`mt-1.5 text-xs flex items-center gap-1 ${
                    theme === "dark" ? "text-red-300" : "text-red-600"
                  }`}
                >
                  <span className="inline-block w-1 h-1 bg-current rounded-full"></span>
                  {errors.role}
                </p>
              )}
            </motion.div>

            {/* Submit */}
            <motion.div variants={fadeInUp} className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-3 text-white font-medium shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </motion.div>
          </motion.form>
        </motion.div>

        <motion.p
          className={`mt-6 text-center text-sm ${
            theme === "dark" ? "text-slate-400" : "text-gray-600"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          New here?{" "}
          <Link
            to="/signup"
            className={`font-medium transition-colors ${
              theme === "dark"
                ? "text-indigo-300 hover:text-indigo-200"
                : "text-indigo-600 hover:text-indigo-700"
            }`}
          >
            Create an account
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
