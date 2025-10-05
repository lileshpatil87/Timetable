import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AtSignIcon,
  UserIcon,
  PhoneIcon,
  BuildingIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  Sun,
  Moon,
} from "lucide-react";

const TABS = [
  {
    id: "personal",
    label: "Personal Details",
    icon: UserIcon,
  },
  {
    id: "password",
    label: "Password",
    icon: LockIcon,
  },
];

export default function SignUp() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  const [active, setActive] = useState("personal");
  const tabRefs = useRef({});
  const navigate = useNavigate();

  const [personal, setPersonal] = useState({
    id: "",
    name: "",
    email: "",
    contact: "",
    universityCode: "",
    instituteCode: "",
    role: "Dean",
  });

  const [security, setSecurity] = useState({
    password: "",
    confirmPassword: "",
    show1: false,
    show2: false,
  });

  const [errors, setErrors] = useState({});
  const [formAlert, setFormAlert] = useState("");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isPersonalComplete =
    !!personal.id &&
    !!personal.name &&
    !!personal.email &&
    /^\S+@\S+\.\S+$/.test(personal.email) &&
    !!personal.contact &&
    !!personal.universityCode &&
    !!personal.instituteCode;

  const isPasswordComplete =
    security.password.length >= 8 &&
    security.password === security.confirmPassword;

  const currentStep = TABS.findIndex((tab) => tab.id === active) + 1;
  const totalSteps = TABS.length;
  const progress = (currentStep / totalSteps) * 100;

  function validatePersonal() {
    let ok = true;
    const next = {};
    const req = [
      ["id", personal.id, "ID is required"],
      ["name", personal.name, "Name is required"],
      ["email", personal.email, "Email is required"],
      ["contact", personal.contact, "Contact is required"],
      [
        "universityCode",
        personal.universityCode,
        "University code is required",
      ],
      ["instituteCode", personal.instituteCode, "Institute code is required"],
    ];
    req.forEach(([k, v, m]) => {
      if (!v) {
        ok = false;
        next[k] = m;
      }
    });
    if (personal.email && !/^\S+@\S+\.\S+$/.test(personal.email)) {
      ok = false;
      next.email = "Enter a valid email address";
    }
    setErrors((e) => ({ ...e, ...next }));
    setFormAlert(ok ? "" : "Fix errors in Personal Details");
    return ok;
  }

  function validatePassword() {
    let ok = true;
    const next = {};
    if (security.password.length < 8) {
      ok = false;
      next["password"] = "Password must be at least 8 characters";
    }
    if (security.confirmPassword !== security.password) {
      ok = false;
      next["confirmPassword"] = "Passwords do not match";
    }
    setErrors((e) => ({ ...e, ...next }));
    setFormAlert(ok ? "" : "Fix errors in Password tab");
    return ok;
  }

  function clearFieldError(id) {
    setErrors((e) => {
      const copy = { ...e };
      delete copy[id];
      return copy;
    });
  }

  function goNext() {
    if (active === "personal" && !validatePersonal()) return;
    const idx = TABS.findIndex((t) => t.id === active);
    const next = TABS[Math.min(TABS.length - 1, idx + 1)].id;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function goBack() {
    const idx = TABS.findIndex((t) => t.id === active);
    const prev = TABS[Math.max(0, idx - 1)].id;
    setActive(prev);
    tabRefs.current[prev]?.focus();
  }

  function submit(e) {
    e.preventDefault();
    const p = validatePersonal();
    if (!p) {
      setActive("personal");
      return;
    }
    const s = validatePassword();
    if (!s) {
      setActive("password");
      return;
    }
    const payload = {
      ...personal,
      password: security.password,
    };
    navigate("/login", {
      replace: true,
      state: { registered: true },
    });
  }

  const err = (id) => errors[id];

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-10 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-slate-950 to-slate-900"
          : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      {theme === "dark" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      )}

      <motion.div
        className="w-full max-w-3xl relative z-10"
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
          {theme === "dark" && (
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-30 -z-10"></div>
          )}

          <header className="mb-8 text-center">
            <h1
              className={`text-2xl font-bold mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Create Your Account
            </h1>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-slate-400" : "text-gray-600"
              }`}
            >
              Join Timely NEP to manage your academic schedule
            </p>
          </header>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-xs ${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                }`}
              >
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-xs font-medium text-indigo-600">
                {active === "personal" ? "Personal Details" : "Security"}
              </span>
            </div>
            <div
              className={`h-1.5 w-full rounded-full overflow-hidden ${
                theme === "dark" ? "bg-slate-800/50" : "bg-gray-200"
              }`}
            >
              <motion.div
                className="h-full bg-indigo-600"
                initial={{
                  width: `${((currentStep - 1) / totalSteps) * 100}%`,
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {formAlert && (
            <div
              role="alert"
              className={`px-4 py-3 rounded-xl mb-6 text-sm ${
                theme === "dark"
                  ? "bg-red-500/10 border border-red-500/30 text-red-300"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {formAlert}
            </div>
          )}

          {/* Tabs */}
          <div
            role="tablist"
            className={`flex mb-6 border-b ${
              theme === "dark" ? "border-slate-800" : "border-gray-200"
            }`}
          >
            {TABS.map((tab) => {
              const selected = active === tab.id;
              const Icon = tab.icon;
              const isCompleted =
                (tab.id === "personal" && isPersonalComplete) ||
                (tab.id === "password" && isPasswordComplete);
              return (
                <button
                  key={tab.id}
                  role="tab"
                  ref={(el) => (tabRefs.current[tab.id] = el)}
                  aria-selected={selected}
                  onClick={() => setActive(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 relative transition-all ${
                    selected
                      ? "text-indigo-600"
                      : theme === "dark"
                      ? "text-slate-400 hover:text-slate-300"
                      : "text-gray-600 hover:text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                    <span className="hidden sm:inline text-sm font-medium">
                      {tab.label}
                    </span>
                  </div>
                  {selected && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <form onSubmit={submit} className="space-y-6" noValidate>
            <AnimatePresence mode="wait">
              {active === "personal" && (
                <motion.section
                  key="personal"
                  className="space-y-5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field
                      id="id"
                      label="ID"
                      icon={<UserIcon className="h-5 w-5" />}
                      value={personal.id}
                      onChange={(v) => {
                        setPersonal((p) => ({ ...p, id: v }));
                        clearFieldError("id");
                      }}
                      error={err("id")}
                      placeholder="User/roll/emp ID"
                      autoComplete="username"
                      theme={theme}
                    />

                    <Field
                      id="name"
                      label="Name"
                      icon={<UserIcon className="h-5 w-5" />}
                      value={personal.name}
                      onChange={(v) => {
                        setPersonal((p) => ({ ...p, name: v }));
                        clearFieldError("name");
                      }}
                      error={err("name")}
                      placeholder="Full name"
                      autoComplete="name"
                      theme={theme}
                    />

                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      icon={<AtSignIcon className="h-5 w-5" />}
                      value={personal.email}
                      onChange={(v) => {
                        setPersonal((p) => ({ ...p, email: v }));
                        clearFieldError("email");
                      }}
                      error={err("email")}
                      placeholder="name@university.edu"
                      autoComplete="username"
                      theme={theme}
                    />

                    <Field
                      id="contact"
                      label="Contact"
                      type="tel"
                      icon={<PhoneIcon className="h-5 w-5" />}
                      value={personal.contact}
                      onChange={(v) => {
                        setPersonal((p) => ({ ...p, contact: v }));
                        clearFieldError("contact");
                      }}
                      error={err("contact")}
                      placeholder="+91-XXXXXXXXXX"
                      autoComplete="tel"
                      theme={theme}
                    />

                    <Field
                      id="universityCode"
                      label="University name/code"
                      icon={<BuildingIcon className="h-5 w-5" />}
                      value={personal.universityCode}
                      onChange={(v) => {
                        setPersonal((p) => ({ ...p, universityCode: v }));
                        clearFieldError("universityCode");
                      }}
                      error={err("universityCode")}
                      placeholder="SPPU / UNI123"
                      autoComplete="organization"
                      theme={theme}
                    />

                    <Field
                      id="instituteCode"
                      label="Institute name/code"
                      icon={<BuildingIcon className="h-5 w-5" />}
                      value={personal.instituteCode}
                      onChange={(v) => {
                        setPersonal((p) => ({ ...p, instituteCode: v }));
                        clearFieldError("instituteCode");
                      }}
                      error={err("instituteCode")}
                      placeholder="COEP / INST456"
                      autoComplete="organization"
                      theme={theme}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-1.5 ${
                        theme === "dark" ? "text-slate-200" : "text-gray-700"
                      }`}
                    >
                      User type
                    </label>
                    <div
                      className={`w-full rounded-xl border px-3 py-2.5 ${
                        theme === "dark"
                          ? "border-slate-700 bg-slate-800/50 text-slate-100"
                          : "border-gray-300 bg-gray-50 text-gray-900"
                      }`}
                    >
                      Dean
                    </div>
                    <p
                      className={`mt-1.5 text-xs ${
                        theme === "dark" ? "text-slate-400" : "text-gray-600"
                      }`}
                    >
                      Signup is restricted to the Dean role.
                    </p>
                  </div>
                </motion.section>
              )}

              {active === "password" && (
                <motion.section
                  key="password"
                  className="space-y-5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PasswordField
                    id="password"
                    label="Password"
                    value={security.password}
                    onChange={(v) => {
                      setSecurity((s) => ({ ...s, password: v }));
                      clearFieldError("password");
                    }}
                    shown={security.show1}
                    toggle={() =>
                      setSecurity((s) => ({ ...s, show1: !s.show1 }))
                    }
                    hint="Use 8+ characters with a mix of letters and numbers."
                    error={err("password")}
                    autoComplete="new-password"
                    theme={theme}
                  />

                  <PasswordField
                    id="confirmPassword"
                    label="Confirm password"
                    value={security.confirmPassword}
                    onChange={(v) => {
                      setSecurity((s) => ({ ...s, confirmPassword: v }));
                      clearFieldError("confirmPassword");
                    }}
                    shown={security.show2}
                    toggle={() =>
                      setSecurity((s) => ({ ...s, show2: !s.show2 }))
                    }
                    error={err("confirmPassword")}
                    autoComplete="new-password"
                    theme={theme}
                  />

                  <div
                    className={`p-4 rounded-xl border ${
                      theme === "dark"
                        ? "bg-indigo-500/10 border-indigo-500/20"
                        : "bg-indigo-50 border-indigo-200"
                    }`}
                  >
                    <h3
                      className={`text-sm font-medium mb-2 flex items-center gap-2 ${
                        theme === "dark" ? "text-indigo-300" : "text-indigo-700"
                      }`}
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                      Password Requirements
                    </h3>
                    <ul className="space-y-1 text-xs">
                      <RequirementItem
                        met={security.password.length >= 8}
                        theme={theme}
                      >
                        Minimum 8 characters
                      </RequirementItem>
                      <RequirementItem
                        met={/[A-Z]/.test(security.password)}
                        theme={theme}
                      >
                        At least one uppercase letter
                      </RequirementItem>
                      <RequirementItem
                        met={/[0-9]/.test(security.password)}
                        theme={theme}
                      >
                        At least one number
                      </RequirementItem>
                      <RequirementItem
                        met={
                          security.password === security.confirmPassword &&
                          security.password !== ""
                        }
                        theme={theme}
                      >
                        Passwords match
                      </RequirementItem>
                    </ul>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={active === "personal"}
                  className={`rounded-xl border px-4 py-2.5 transition-colors flex items-center gap-2 disabled:opacity-50 ${
                    theme === "dark"
                      ? "border-slate-700 text-slate-200 hover:border-indigo-400 hover:bg-slate-800/50"
                      : "border-gray-300 text-gray-700 hover:border-indigo-500 hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                  Back
                </button>

                {active !== "password" && (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!isPersonalComplete}
                    className={`rounded-xl border px-4 py-2.5 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                      theme === "dark"
                        ? "border-slate-700 bg-slate-800/50 text-slate-200 hover:border-indigo-400"
                        : "border-gray-300 bg-gray-50 text-gray-700 hover:border-indigo-500"
                    }`}
                  >
                    Next
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={!(isPersonalComplete && isPasswordComplete)}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 text-white font-medium shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create account
              </button>
            </div>
          </form>
        </motion.div>

        <p
          className={`mt-6 text-center text-sm ${
            theme === "dark" ? "text-slate-400" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className={`font-medium transition-colors ${
              theme === "dark"
                ? "text-indigo-300 hover:text-indigo-200"
                : "text-indigo-600 hover:text-indigo-700"
            }`}
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  icon,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  theme,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-sm font-medium mb-1.5 ${
          theme === "dark" ? "text-slate-200" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <div
          className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${
            theme === "dark" ? "text-slate-500" : "text-gray-400"
          }`}
        >
          {icon}
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          autoComplete={autoComplete}
          className={`w-full rounded-xl pl-10 px-3 py-2.5 transition-all ${
            theme === "dark"
              ? "border bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-400/50"
              : "border bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
          } ${
            error
              ? theme === "dark"
                ? "border-red-500/60"
                : "border-red-400"
              : theme === "dark"
              ? "border-slate-700/50"
              : "border-gray-300"
          }`}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p
          className={`mt-1.5 text-xs flex items-center gap-1 ${
            theme === "dark" ? "text-red-300" : "text-red-600"
          }`}
        >
          <span className="inline-block w-1 h-1 bg-current rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  shown,
  toggle,
  hint,
  error,
  autoComplete,
  theme,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-sm font-medium mb-1.5 ${
          theme === "dark" ? "text-slate-200" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <div
          className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${
            theme === "dark" ? "text-slate-500" : "text-gray-400"
          }`}
        >
          <LockIcon className="h-5 w-5" />
        </div>
        <input
          id={id}
          type={shown ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          autoComplete={autoComplete}
          className={`w-full rounded-xl pl-10 pr-12 px-3 py-2.5 transition-all ${
            theme === "dark"
              ? "border bg-slate-800/50 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-400/50"
              : "border bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
          } ${
            error
              ? theme === "dark"
                ? "border-red-500/60"
                : "border-red-400"
              : theme === "dark"
              ? "border-slate-700/50"
              : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={toggle}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md transition-colors ${
            theme === "dark"
              ? "text-slate-400 hover:text-indigo-300"
              : "text-gray-400 hover:text-indigo-600"
          }`}
          aria-label={shown ? "Hide password" : "Show password"}
        >
          {shown ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            theme === "dark" ? "text-slate-400" : "text-gray-600"
          }`}
        >
          {hint}
        </p>
      )}
      {error && (
        <p
          className={`mt-1.5 text-xs flex items-center gap-1 ${
            theme === "dark" ? "text-red-300" : "text-red-600"
          }`}
        >
          <span className="inline-block w-1 h-1 bg-current rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
}

function RequirementItem({ met, theme, children }) {
  return (
    <li
      className={`flex items-center gap-1.5 ${
        met
          ? "text-green-500"
          : theme === "dark"
          ? "text-slate-400"
          : "text-gray-600"
      }`}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          met
            ? "bg-green-500"
            : theme === "dark"
            ? "bg-slate-600"
            : "bg-gray-400"
        }`}
      ></div>
      {children}
    </li>
  );
}
