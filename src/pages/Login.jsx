import React, { useState, Children } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AtSignIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
} from "lucide-react";
const ROLES = ["Student", "Faculty", "HOD", "Dean", "Staff"];
export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
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
  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: value,
    }));
    setErrors((er) => ({
      ...er,
      [name]: "",
    }));
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
      navigate(from, {
        replace: true,
      });
      return;
    }
    switch (role) {
      case "Student":
        navigate("/student", {
          replace: true,
        });
        break;
      case "Faculty":
        navigate("/faculty", {
          replace: true,
        });
        break;
      case "HOD":
        navigate("/hod", {
          replace: true,
        });
        break;
      case "Dean":
        navigate("/dean", {
          replace: true,
        });
        break;
      case "Staff":
        navigate("/staff", {
          replace: true,
        });
        break;
      default:
        navigate("/student", {
          replace: true,
        });
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      // const { user, token } = await api.login(form.email, form.password, form.role);
      // Server should validate credentials and return authoritative role claims.
      // If user has multiple roles, server may respect requested form.role if permitted.
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      const user = {
        role: form.role,
      }; // replace with API response
      routeByRole(user.role);
    } catch (_err) {
      setErrors({
        password: "Invalid email, password, or role",
      });
      setAlertMsg("Login failed: Invalid email, password, or role");
    } finally {
      setIsSubmitting(false);
    }
  }
  const fadeInUp = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-10">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"></div>
      </div>
      <motion.div
        className="w-full max-w-md"
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
          <header className="mb-8 text-center">
            <motion.h1
              className="text-2xl font-extrabold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
              {...fadeInUp}
            >
              Welcome Back
            </motion.h1>
            <motion.p
              className="text-slate-400 text-sm mt-1"
              {...fadeInUp}
              transition={{
                delay: 0.1,
              }}
            >
              Sign in to your account
            </motion.p>
          </header>
          <div
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            className={`${
              alertMsg
                ? "bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-6 text-sm"
                : "sr-only"
            }`}
          >
            {alertMsg}
          </div>
          <motion.form
            onSubmit={onSubmit}
            className="space-y-5"
            noValidate
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-200 mb-1.5"
              >
                Email or username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <AtSignIcon className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={form.email}
                  onChange={onChange}
                  className={`w-full rounded-xl border bg-slate-800/50 pl-10 px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-400/50 transition-all duration-200 ${
                    errors.email
                      ? "border-red-500/60 focus:border-red-400"
                      : "border-slate-700/50 focus:border-indigo-400"
                  }`}
                  aria-invalid={!!errors.email}
                  aria-errormessage={errors.email ? "email-error" : undefined}
                  placeholder="name@college.edu"
                />
              </div>
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1.5 text-xs text-red-300 flex items-center gap-1"
                >
                  <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </motion.div>
            <motion.div className="relative" variants={fadeInUp}>
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-slate-200 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <LockIcon className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="current-password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={onChange}
                  className={`w-full rounded-xl border bg-slate-800/50 pl-10 px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-400/50 transition-all duration-200 ${
                    errors.password
                      ? "border-red-500/60 focus:border-red-400"
                      : "border-slate-700/50 focus:border-indigo-400"
                  }`}
                  aria-invalid={!!errors.password}
                  aria-errormessage={
                    errors.password ? "password-error" : undefined
                  }
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center rounded-md px-2 py-1 text-slate-400 hover:text-indigo-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                  aria-pressed={showPwd}
                  aria-controls="current-password"
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
                  id="password-error"
                  className="mt-1.5 text-xs text-red-300 flex items-center gap-1"
                >
                  <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                  {errors.password}
                </p>
              )}
              <div className="mt-1.5 flex items-center justify-end">
                <Link
                  to="/forgot-password"
                  className="text-xs text-indigo-300 hover:text-indigo-200 transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-slate-200 mb-1.5"
              >
                Role
              </label>
              <div className="relative h-11">
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={onChange}
                  required
                  className={`w-full rounded-xl border bg-slate-800/50 pl-10 px-3 pr-12 py-2.5 text-slate-100 appearance-none focus:ring-2 focus:ring-indigo-400/50 transition-all duration-200 ${
                    errors.role
                      ? "border-red-500/60 focus:border-red-400"
                      : "border-slate-700/50 focus:border-indigo-400"
                  }`}
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 20 20\\" fill=\\"%2394a3b8\\"><path fill-rule=\\"evenodd\\" d=\\"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\\" clip-rule=\\"evenodd\\"/></svg>")',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.25rem 1.25rem",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                  }}
                  aria-invalid={!!errors.role}
                  aria-errormessage={errors.role ? "role-error" : undefined}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 z-10">
                  <svg
                    className="h-5 w-5 text-slate-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {errors.role && (
                <p
                  id="role-error"
                  className="mt-1.5 text-xs text-red-300 flex items-center gap-1"
                >
                  <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                  {errors.role}
                </p>
              )}
              <p className="mt-1.5 text-xs text-slate-400">
                Used as preferred landing; final access is validated by the
                server.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-3 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 relative overflow-hidden group"
              >
                <span className="flex items-center justify-center gap-2 relative z-10">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                <span className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></span>
              </button>
            </motion.div>
          </motion.form>
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
          New here?{" "}
          <Link
            to="/signup"
            className="text-indigo-300 hover:text-indigo-200 font-medium transition-colors duration-200"
          >
            Create an account
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
