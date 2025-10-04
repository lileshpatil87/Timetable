import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AtSignIcon,
  UserIcon,
  PhoneIcon,
  BuildingIcon,
  BookIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
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
  const [active, setActive] = useState("personal");
  const tabRefs = useRef({});
  const navigate = useNavigate();

  // Tab 1: Personal (role locked to Dean)
  const [personal, setPersonal] = useState({
    id: "",
    name: "",
    email: "",
    contact: "",
    universityCode: "",
    instituteCode: "",
    role: "Dean",
  });

  // Tab 3: Password
  const [security, setSecurity] = useState({
    password: "",
    confirmPassword: "",
    show1: false,
    show2: false,
  });

  // Errors
  const [errors, setErrors] = useState({}); // { fieldId: message }
  const [formAlert, setFormAlert] = useState("");

  // Pure predicates for JSX (no state updates)
  const isPersonalComplete =
    !!personal.id &&
    !!personal.name &&
    !!personal.email &&
    /^\S+@\S+\.\S+$/.test(personal.email) &&
    !!personal.contact &&
    !!personal.universityCode &&
    !!personal.instituteCode;

  // Dean has no role-specific fields; always complete
  const isRoleComplete = true;

  const isPasswordComplete =
    security.password.length >= 8 &&
    security.password === security.confirmPassword;

  // Calculate current step (1-indexed)
  const currentStep = TABS.findIndex((tab) => tab.id === active) + 1;
  const totalSteps = TABS.length;
  const progress = (currentStep / totalSteps) * 100;

  // Validation that sets error state, called only on Next/Submit
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
    setErrors((e) => ({
      ...e,
      ...next,
    }));
    setFormAlert(ok ? "" : "Fix errors in Personal Details");
    return ok;
  }

  // No-op for Dean
  function validateRole() {
    setFormAlert("");
    return true;
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
    setErrors((e) => ({
      ...e,
      ...next,
    }));
    setFormAlert(ok ? "" : "Fix errors in Password tab");
    return ok;
  }

  function setFieldError(id, msg) {
    setErrors((e) => ({
      ...e,
      [id]: msg,
    }));
  }

  function clearFieldError(id) {
    setErrors((e) => {
      const copy = {
        ...e,
      };
      delete copy[id];
      return copy;
    });
  }

  function goNext() {
    if (active === "personal" && !validatePersonal()) return;
    if (active === "role" && !validateRole()) return;
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

  function onKeyDownTabs(e) {
    const idx = TABS.findIndex((t) => t.id === active);
    if (e.key === "ArrowRight") {
      const next = TABS[(idx + 1) % TABS.length].id;
      setActive(next);
      tabRefs.current[next]?.focus();
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      const prev = TABS[(idx - 1 + TABS.length) % TABS.length].id;
      setActive(prev);
      tabRefs.current[prev]?.focus();
      e.preventDefault();
    } else if (e.key === "Home") {
      setActive(TABS[0].id);
      tabRefs.current[TABS[0].id]?.focus();
      e.preventDefault();
    } else if (e.key === "End") {
      setActive(TABS[TABS.length - 1].id);
      tabRefs.current[TABS[TABS.length - 1].id]?.focus();
      e.preventDefault();
    }
  }

  function submit(e) {
    e.preventDefault();
    const p = validatePersonal();
    if (!p) {
      setActive("personal");
      return;
    }
    const r = validateRole();
    if (!r) {
      setActive("role");
      return;
    }
    const s = validatePassword();
    if (!s) {
      setActive("password");
      return;
    }
    const payload = {
      ...personal, // role is "Dean"
      password: security.password,
    };
    // TODO: await api.signup(payload)
    navigate("/login", {
      replace: true,
      state: {
        registered: true,
      },
    });
  }

  const err = (id) => errors[id];
  const ariaErr = (id) =>
    err(id)
      ? {
          "aria-invalid": true,
          "aria-errormessage": `${id}-error`,
        }
      : {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-10">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"></div>
      </div>

      <motion.div
        className="w-full max-w-3xl"
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        {/* Brand */}
        <motion.div
          className="flex items-center justify-center mb-6"
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 font-extrabold text-lg"
          >
            <CalendarDaysIcon className="h-6 w-6 text-indigo-400" />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Timely NEP
            </span>
          </Link>
        </motion.div>

        <motion.div
          className="relative rounded-2xl border border-slate-800/80 bg-slate-900/90 p-8 shadow-xl backdrop-blur-sm"
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
        >
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-30 -z-10"></div>

          <header className="mb-6 text-center">
            <motion.h1
              className="text-2xl font-extrabold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
            >
              Create Your Account
            </motion.h1>
            <motion.p
              className="text-slate-400 text-sm mt-1"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.4,
              }}
            >
              Join Timely NEP to manage your academic schedule
            </motion.p>
          </header>

          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-xs font-medium text-indigo-400">
                {active === "personal" ? "Personal Details" : "Security"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400"
                initial={{
                  width: `${((currentStep - 1) / totalSteps) * 100}%`,
                }}
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.3,
                }}
              />
            </div>
          </div>

          {/* Error alert */}
          <AnimatePresence>
            {formAlert && (
              <motion.div
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-6 text-sm"
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                {formAlert}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Registration tabs"
            className="flex mb-6 border-b border-slate-800"
            onKeyDown={onKeyDownTabs}
          >
            {TABS.map((tab) => {
              const selected = active === tab.id;
              const Icon = tab.icon;
              const isCompleted =
                (tab.id === "personal" && isPersonalComplete) ||
                (tab.id === "role" && isRoleComplete) ||
                (tab.id === "password" && isPasswordComplete);
              return (
                <motion.button
                  key={tab.id}
                  role="tab"
                  ref={(el) => (tabRefs.current[tab.id] = el)}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 relative transition-all duration-200 ${
                    selected
                      ? "text-indigo-300"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-400" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                    <span className="hidden sm:inline text-sm font-medium">
                      {tab.label}
                    </span>
                  </div>
                  {selected && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400"
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          <form onSubmit={submit} className="space-y-6" noValidate>
            {/* Personal */}
            <AnimatePresence mode="wait">
              {active === "personal" && (
                <motion.section
                  key="personal"
                  role="tabpanel"
                  id="panel-personal"
                  aria-labelledby="tab-personal"
                  className="space-y-5"
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 20,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field
                      id="id"
                      label="ID"
                      icon={<UserIcon className="h-5 w-5 text-slate-500" />}
                      value={personal.id}
                      onChange={(v) => {
                        setPersonal((p) => ({
                          ...p,
                          id: v,
                        }));
                        clearFieldError("id");
                      }}
                      error={err("id")}
                      ariaProps={ariaErr("id")}
                      placeholder="User/roll/emp ID"
                      autoComplete="username"
                    />

                    <Field
                      id="name"
                      label="Name"
                      icon={<UserIcon className="h-5 w-5 text-slate-500" />}
                      value={personal.name}
                      onChange={(v) => {
                        setPersonal((p) => ({
                          ...p,
                          name: v,
                        }));
                        clearFieldError("name");
                      }}
                      error={err("name")}
                      ariaProps={ariaErr("name")}
                      placeholder="Full name"
                      autoComplete="name"
                    />

                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      icon={<AtSignIcon className="h-5 w-5 text-slate-500" />}
                      value={personal.email}
                      onChange={(v) => {
                        setPersonal((p) => ({
                          ...p,
                          email: v,
                        }));
                        clearFieldError("email");
                      }}
                      error={err("email")}
                      ariaProps={ariaErr("email")}
                      placeholder="name@university.edu"
                      autoComplete="username"
                    />

                    <Field
                      id="contact"
                      label="Contact"
                      type="tel"
                      icon={<PhoneIcon className="h-5 w-5 text-slate-500" />}
                      value={personal.contact}
                      onChange={(v) => {
                        setPersonal((p) => ({
                          ...p,
                          contact: v,
                        }));
                        clearFieldError("contact");
                      }}
                      error={err("contact")}
                      ariaProps={ariaErr("contact")}
                      placeholder="+91-XXXXXXXXXX"
                      autoComplete="tel"
                    />

                    <Field
                      id="universityCode"
                      label="University name/code"
                      icon={<BuildingIcon className="h-5 w-5 text-slate-500" />}
                      value={personal.universityCode}
                      onChange={(v) => {
                        setPersonal((p) => ({
                          ...p,
                          universityCode: v,
                        }));
                        clearFieldError("universityCode");
                      }}
                      error={err("universityCode")}
                      ariaProps={ariaErr("universityCode")}
                      placeholder="SPPU / UNI123"
                      autoComplete="organization"
                    />

                    <Field
                      id="instituteCode"
                      label="Institute name/code"
                      icon={<BuildingIcon className="h-5 w-5 text-slate-500" />}
                      value={personal.instituteCode}
                      onChange={(v) => {
                        setPersonal((p) => ({
                          ...p,
                          instituteCode: v,
                        }));
                        clearFieldError("instituteCode");
                      }}
                      error={err("instituteCode")}
                      ariaProps={ariaErr("instituteCode")}
                      placeholder="COEP / INST456"
                      autoComplete="organization"
                    />
                  </div>

                  {/* Fixed, non-editable role display */}
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-1.5">
                      User type
                    </label>
                    <div className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-slate-100">
                      Dean
                    </div>
                    <p className="mt-1.5 text-xs text-slate-400">
                      Signup is restricted to the Dean role.
                    </p>
                  </div>
                </motion.section>
              )}

              {/* Role-specific */}
              {active === "role" && (
                <motion.section
                  key="role"
                  role="tabpanel"
                  id="panel-role"
                  aria-labelledby="tab-role"
                  className="space-y-5"
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 20,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                    <span className="text-xs font-medium">Role: Dean</span>
                  </div>
                  <motion.div
                    className="p-5 rounded-xl border border-slate-700/50 bg-slate-800/30 text-sm text-slate-400 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p>No additional details required for Dean.</p>
                  </motion.div>
                </motion.section>
              )}

              {/* Password */}
              {active === "password" && (
                <motion.section
                  key="password"
                  role="tabpanel"
                  id="panel-password"
                  aria-labelledby="tab-password"
                  className="space-y-5"
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 20,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <PasswordField
                    id="password"
                    label="Password"
                    value={security.password}
                    onChange={(v) => {
                      setSecurity((s) => ({
                        ...s,
                        password: v,
                      }));
                      clearFieldError("password");
                    }}
                    shown={security.show1}
                    toggle={() =>
                      setSecurity((s) => ({
                        ...s,
                        show1: !s.show1,
                      }))
                    }
                    hint="Use 8+ characters with a mix of letters and numbers."
                    error={err("password")}
                    autoComplete="new-password"
                  />

                  <PasswordField
                    id="confirmPassword"
                    label="Confirm password"
                    value={security.confirmPassword}
                    onChange={(v) => {
                      setSecurity((s) => ({
                        ...s,
                        confirmPassword: v,
                      }));
                      clearFieldError("confirmPassword");
                    }}
                    shown={security.show2}
                    toggle={() =>
                      setSecurity((s) => ({
                        ...s,
                        show2: !s.show2,
                      }))
                    }
                    error={err("confirmPassword")}
                    autoComplete="new-password"
                  />

                  <div className="mt-2 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <h3 className="text-sm font-medium text-indigo-300 mb-2 flex items-center gap-2">
                      <CheckCircleIcon className="h-4 w-4" />
                      Password Requirements
                    </h3>
                    <ul className="space-y-1 text-xs text-slate-300">
                      <li
                        className={`flex items-center gap-1.5 ${
                          security.password.length >= 8
                            ? "text-green-400"
                            : "text-slate-400"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            security.password.length >= 8
                              ? "bg-green-400"
                              : "bg-slate-600"
                          }`}
                        ></div>
                        Minimum 8 characters
                      </li>
                      <li
                        className={`flex items-center gap-1.5 ${
                          /[A-Z]/.test(security.password)
                            ? "text-green-400"
                            : "text-slate-400"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            /[A-Z]/.test(security.password)
                              ? "bg-green-400"
                              : "bg-slate-600"
                          }`}
                        ></div>
                        At least one uppercase letter
                      </li>
                      <li
                        className={`flex items-center gap-1.5 ${
                          /[0-9]/.test(security.password)
                            ? "text-green-400"
                            : "text-slate-400"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            /[0-9]/.test(security.password)
                              ? "bg-green-400"
                              : "bg-slate-600"
                          }`}
                        ></div>
                        At least one number
                      </li>
                      <li
                        className={`flex items-center gap-1.5 ${
                          security.password === security.confirmPassword &&
                          security.password !== ""
                            ? "text-green-400"
                            : "text-slate-400"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            security.password === security.confirmPassword &&
                            security.password !== ""
                              ? "bg-green-400"
                              : "bg-slate-600"
                          }`}
                        ></div>
                        Passwords match
                      </li>
                    </ul>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-3">
                <motion.button
                  type="button"
                  onClick={goBack}
                  className="rounded-xl border border-slate-700/80 px-4 py-2.5 text-slate-200 hover:border-indigo-400/70 hover:bg-slate-800/50 transition-colors duration-200 flex items-center gap-2"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  disabled={active === "personal"}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                  Back
                </motion.button>

                {active !== "password" && (
                  <motion.button
                    type="button"
                    onClick={goNext}
                    className="rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 py-2.5 text-slate-200 hover:border-indigo-400/70 hover:bg-slate-700/70 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-700/80 disabled:hover:bg-slate-800/50"
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    disabled={
                      active === "personal"
                        ? !isPersonalComplete
                        : active === "role"
                        ? !isRoleComplete
                        : false
                    }
                  >
                    Next
                    <ChevronRightIcon className="h-4 w-4" />
                  </motion.button>
                )}
              </div>

              <motion.button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-2.5 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                disabled={
                  !(isPersonalComplete && isRoleComplete && isPasswordComplete)
                }
              >
                <span className="relative z-10 flex items-center gap-2">
                  Create account
                </span>
                <span className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></span>
              </motion.button>
            </div>
          </form>
        </motion.div>

        <motion.p
          className="mt-6 text-center text-sm text-slate-400"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-300 hover:text-indigo-200 font-medium transition-colors duration-200"
          >
            Sign in
          </Link>
        </motion.p>
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
  ariaProps = {},
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-200 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          autoComplete={autoComplete}
          className={`w-full rounded-xl border bg-slate-800/50 ${
            icon ? "pl-10" : "pl-3"
          } px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200 ${
            error
              ? "border-red-500/60 focus:border-red-400"
              : "border-slate-700/50 focus:border-indigo-400"
          }`}
          {...ariaProps}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-xs text-red-300 flex items-center gap-1"
        >
          <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
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
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-200 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <LockIcon className="h-5 w-5 text-slate-500" />
        </div>
        <input
          id={id}
          name={id}
          type={shown ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          autoComplete={autoComplete}
          className={`w-full rounded-xl border bg-slate-800/50 pl-10 px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200 ${
            error
              ? "border-red-500/60 focus:border-red-400"
              : "border-slate-700/50 focus:border-indigo-400"
          }`}
          aria-invalid={!!error}
          aria-errormessage={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center rounded-md px-2 py-1 text-slate-400 hover:text-indigo-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
          aria-label={shown ? "Hide password" : "Show password"}
          aria-pressed={shown}
          aria-controls={id}
        >
          {shown ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      {hint && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-xs text-red-300 flex items-center gap-1"
        >
          <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
}
