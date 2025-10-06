import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "../components/CustomDropdown";

import {
  User,
  AtSign,
  Phone,
  Building2,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowLeft,
  Save,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const DEPARTMENTS = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Mathematics",
  "Management",
];

export default function RegisterHOD() {
  const navigate = useNavigate();

  // Get theme from parent layout
  const outletContext = useOutletContext();
  const { theme: contextTheme, isDark: contextIsDark } = outletContext || {};

  const [localIsDark] = useState(false);
  const isDark = contextIsDark !== undefined ? contextIsDark : localIsDark;

  const defaultTheme = {
    bg: isDark ? "bg-slate-950" : "bg-gray-50",
    text: isDark ? "text-slate-50" : "text-gray-900",
    cardBg: isDark ? "bg-slate-900/50" : "bg-white",
    cardBorder: isDark ? "border-slate-800/60" : "border-gray-200",
    mutedText: isDark ? "text-slate-400" : "text-gray-600",
    gradient: isDark
      ? "from-indigo-400 via-purple-400 to-pink-400"
      : "from-indigo-600 via-purple-600 to-pink-600",
    accentBg: isDark ? "bg-slate-800/30" : "bg-gray-50",
    accentBorder: isDark ? "border-slate-700/40" : "border-gray-200",
    inputBg: isDark ? "bg-slate-800/50" : "bg-white",
    inputBorder: isDark ? "border-slate-700" : "border-gray-300",
    inputText: isDark ? "text-slate-100" : "text-gray-900",
  };

  const theme = contextTheme || defaultTheme;

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    contact: "",
    department: "",
    approveTimetables: true,
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [formAlert, setFormAlert] = useState("");

  const onChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const clearError = (field) => {
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const validate = () => {
    const newErrors = {};
    let ok = true;

    if (!form.id.trim()) {
      newErrors.id = "ID is required";
      ok = false;
    }
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      ok = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      ok = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
      ok = false;
    }
    if (!form.contact.trim()) {
      newErrors.contact = "Contact is required";
      ok = false;
    }
    if (!form.department) {
      newErrors.department = "Department is required";
      ok = false;
    }
    if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      ok = false;
    }
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
      ok = false;
    }

    setErrors(newErrors);
    setFormAlert(ok ? "" : "Please fix the errors below.");
    return ok;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      id: form.id,
      name: form.name,
      email: form.email,
      contact: form.contact,
      department: form.department,
      approveTimetables: form.approveTimetables,
      password: form.password,
      role: "HOD",
    };

    console.log("Registering HOD:", payload);

    navigate("/dean/dashboard", {
      state: { message: "HOD registered successfully" },
    });
  };

  const isFormComplete =
    !!form.id &&
    !!form.name &&
    !!form.email &&
    /^\S+@\S+\.\S+$/.test(form.email) &&
    !!form.contact &&
    !!form.department &&
    form.password.length >= 8 &&
    form.password === form.confirmPassword;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-xl ${
                isDark ? "bg-indigo-100" : "bg-indigo-500/20"
              }`}
            >
              <Sparkles
                size={24}
                className={isDark ? "text-indigo-600" : "text-indigo-400"}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Register HOD</h1>
              <p className={`text-sm ${theme.mutedText}`}>
                Create a new Head of Department account with login credentials
              </p>
            </div>
          </div>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${theme.accentBorder} ${theme.accentBg}`}
          >
            <ShieldCheck
              size={16}
              className={isDark ? "text-indigo-600" : "text-indigo-400"}
            />
            <span className="text-xs font-medium">Dean Access</span>
          </div>
        </div>
      </motion.div>

      {/* Form Card */}
      <motion.div
        className={`rounded-2xl border ${theme.cardBorder} ${theme.cardBg} backdrop-blur-sm p-8 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Alert */}
        <AnimatePresence>
          {formAlert && (
            <motion.div
              role="alert"
              aria-live="assertive"
              className={`px-4 py-3 rounded-xl mb-6 text-sm border ${
                isDark
                  ? "bg-red-500/10 border-red-500/30 text-red-300"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {formAlert}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* Personal Details */}
          <section>
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <User
                size={16}
                className={isDark ? "text-indigo-600" : "text-indigo-400"}
              />
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                id="id"
                label="Employee ID"
                icon={<User className="h-5 w-5" />}
                value={form.id}
                onChange={(v) => onChange("id", v)}
                error={errors.id}
                placeholder="e.g., HOD001"
                autoComplete="username"
                theme={theme}
                isDark={isDark}
              />

              <Field
                id="name"
                label="Full Name"
                icon={<User className="h-5 w-5" />}
                value={form.name}
                onChange={(v) => onChange("name", v)}
                error={errors.name}
                placeholder="Dr. John Doe"
                autoComplete="name"
                theme={theme}
                isDark={isDark}
              />

              <Field
                id="email"
                label="Email"
                type="email"
                icon={<AtSign className="h-5 w-5" />}
                value={form.email}
                onChange={(v) => onChange("email", v)}
                error={errors.email}
                placeholder="hod@university.edu"
                autoComplete="email"
                theme={theme}
                isDark={isDark}
              />

              <Field
                id="contact"
                label="Contact Number"
                type="tel"
                icon={<Phone className="h-5 w-5" />}
                value={form.contact}
                onChange={(v) => onChange("contact", v)}
                error={errors.contact}
                placeholder="+91-XXXXXXXXXX"
                autoComplete="tel"
                theme={theme}
                isDark={isDark}
              />
            </div>
          </section>

          {/* Department & Permissions */}
          <section>
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Building2
                size={16}
                className={isDark ? "text-indigo-600" : "text-indigo-400"}
              />
              Department & Permissions
            </h2>
            <div className="space-y-5">
              <div>
                <CustomDropdown
                  label="Department"
                  name="department"
                  id="department"
                  value={form.department}
                  onChange={(e) => onChange("department", e.target.value)}
                  options={["", ...DEPARTMENTS]}
                  error={errors.department}
                  theme={isDark ? "dark" : "light"}
                />
              </div>

              <motion.label
                className={`inline-flex items-center gap-3 p-4 rounded-xl border ${theme.cardBorder} ${theme.accentBg} text-sm cursor-pointer ${theme.hoverBg} transition-colors`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input
                  type="checkbox"
                  className={`rounded h-4 w-4 ${
                    isDark
                      ? "border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-400/40"
                      : "border-gray-300 bg-white text-indigo-600 focus:ring-indigo-500"
                  }`}
                  checked={form.approveTimetables}
                  onChange={(e) =>
                    onChange("approveTimetables", e.target.checked)
                  }
                />
                <div>
                  <div className="font-medium">Approve Timetables</div>
                  <div className={`text-xs ${theme.mutedText} mt-0.5`}>
                    Allow this HOD to review and approve department timetables
                  </div>
                </div>
              </motion.label>
            </div>
          </section>

          {/* Login Credentials */}
          <section>
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Lock
                size={16}
                className={isDark ? "text-indigo-600" : "text-indigo-400"}
              />
              Login Credentials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <PasswordField
                id="password"
                label="Password"
                value={form.password}
                onChange={(v) => onChange("password", v)}
                shown={showPassword}
                toggle={() => setShowPassword(!showPassword)}
                error={errors.password}
                hint="Minimum 8 characters"
                autoComplete="new-password"
                theme={theme}
                isDark={isDark}
              />

              <PasswordField
                id="confirmPassword"
                label="Confirm Password"
                value={form.confirmPassword}
                onChange={(v) => onChange("confirmPassword", v)}
                shown={showConfirm}
                toggle={() => setShowConfirm(!showConfirm)}
                error={errors.confirmPassword}
                autoComplete="new-password"
                theme={theme}
                isDark={isDark}
              />
            </div>

            {/* Password requirements */}
            <div
              className={`mt-4 p-4 rounded-xl border ${
                isDark
                  ? "bg-indigo-500/10 border-indigo-500/20"
                  : "bg-indigo-50 border-indigo-200"
              }`}
            >
              <h3
                className={`text-sm font-medium mb-2 flex items-center gap-2 ${
                  isDark ? "text-indigo-300" : "text-indigo-700"
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                Password Requirements
              </h3>
              <ul className="space-y-1 text-xs">
                {[
                  {
                    test: form.password.length >= 8,
                    label: "Minimum 8 characters",
                  },
                  {
                    test: /[A-Z]/.test(form.password),
                    label: "At least one uppercase letter",
                  },
                  {
                    test: /[0-9]/.test(form.password),
                    label: "At least one number",
                  },
                  {
                    test:
                      form.password === form.confirmPassword &&
                      form.password !== "",
                    label: "Passwords match",
                  },
                ].map((req, idx) => (
                  <li
                    key={idx}
                    className={`flex items-center gap-1.5 ${
                      req.test
                        ? isDark
                          ? "text-green-400"
                          : "text-green-600"
                        : theme.mutedText
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        req.test
                          ? isDark
                            ? "bg-green-400"
                            : "bg-green-600"
                          : isDark
                          ? "bg-slate-600"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    {req.label}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Actions */}
          <div
            className={`flex items-center justify-end gap-3 pt-6 border-t ${theme.cardBorder}`}
          >
            <motion.button
              type="button"
              onClick={() => navigate(-1)}
              className={`rounded-xl border ${theme.cardBorder} px-5 py-2.5 font-medium transition-all hover:scale-105`}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>

            <motion.button
              type="submit"
              className={`rounded-xl px-6 py-2.5 font-medium shadow-lg flex items-center gap-2 transition-all ${
                isFormComplete
                  ? `bg-gradient-to-r ${theme.gradient} text-white hover:shadow-xl`
                  : isDark
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              whileHover={isFormComplete ? { scale: 1.02 } : {}}
              whileTap={isFormComplete ? { scale: 0.98 } : {}}
              disabled={!isFormComplete}
            >
              <Save size={18} />
              Register HOD
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Field component
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
  isDark,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div
            className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${theme.mutedText}`}
          >
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
          className={`w-full rounded-xl border ${
            icon ? "pl-10" : "pl-3"
          } pr-3 py-2.5 ${theme.inputBg} ${theme.inputText} ${
            error
              ? isDark
                ? "border-red-500/60 focus:border-red-400"
                : "border-red-300 focus:border-red-500"
              : `${theme.inputBorder} focus:border-indigo-500`
          } focus:ring-2 ${
            isDark ? "focus:ring-indigo-400/30" : "focus:ring-indigo-500/30"
          } transition-all duration-200 placeholder:${theme.mutedText}`}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-errormessage={error ? `${id}-error` : undefined}
        />
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className={`mt-1.5 text-xs flex items-center gap-1 ${
            isDark ? "text-red-300" : "text-red-600"
          }`}
        >
          <span
            className={`inline-block w-1 h-1 rounded-full ${
              isDark ? "bg-red-400" : "bg-red-600"
            }`}
          ></span>
          {error}
        </p>
      )}
    </div>
  );
}

// SelectField component
function SelectField({
  id,
  label,
  icon,
  value,
  onChange,
  options,
  error,
  theme,
  isDark,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div
            className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${theme.mutedText}`}
          >
            {icon}
          </div>
        )}
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className={`w-full rounded-xl border ${
            icon ? "pl-10" : "pl-3"
          } pr-10 py-2.5 ${theme.inputBg} ${theme.inputText} appearance-none ${
            error
              ? isDark
                ? "border-red-500/60 focus:border-red-400"
                : "border-red-300 focus:border-red-500"
              : `${theme.inputBorder} focus:border-indigo-500`
          } focus:ring-2 ${
            isDark ? "focus:ring-indigo-400/30" : "focus:ring-indigo-500/30"
          } transition-all duration-200`}
          aria-invalid={!!error}
          aria-errormessage={error ? `${id}-error` : undefined}
        >
          <option value="">Select</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className={`mt-1.5 text-xs flex items-center gap-1 ${
            isDark ? "text-red-300" : "text-red-600"
          }`}
        >
          <span
            className={`inline-block w-1 h-1 rounded-full ${
              isDark ? "bg-red-400" : "bg-red-600"
            }`}
          ></span>
          {error}
        </p>
      )}
    </div>
  );
}

// PasswordField component
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
  isDark,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      <div className="relative">
        <div
          className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${theme.mutedText}`}
        >
          <Lock className="h-5 w-5" />
        </div>
        <input
          id={id}
          name={id}
          type={shown ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          autoComplete={autoComplete}
          className={`w-full rounded-xl border pl-10 pr-12 py-2.5 ${
            theme.inputBg
          } ${theme.inputText} ${
            error
              ? isDark
                ? "border-red-500/60 focus:border-red-400"
                : "border-red-300 focus:border-red-500"
              : `${theme.inputBorder} focus:border-indigo-500`
          } focus:ring-2 ${
            isDark ? "focus:ring-indigo-400/30" : "focus:ring-indigo-500/30"
          } transition-all duration-200 placeholder:${theme.mutedText}`}
          aria-invalid={!!error}
          aria-errormessage={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          onClick={toggle}
          className={`absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center rounded-md px-2 py-1 ${
            theme.mutedText
          } ${
            isDark ? "hover:text-indigo-300" : "hover:text-indigo-600"
          } transition-colors duration-200 focus:outline-none focus:ring-2 ${
            isDark ? "focus:ring-indigo-400/40" : "focus:ring-indigo-500"
          }`}
          aria-label={shown ? "Hide password" : "Show password"}
          aria-pressed={shown}
          aria-controls={id}
        >
          {shown ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {hint && <p className={`mt-1.5 text-xs ${theme.mutedText}`}>{hint}</p>}
      {error && (
        <p
          id={`${id}-error`}
          className={`mt-1.5 text-xs flex items-center gap-1 ${
            isDark ? "text-red-300" : "text-red-600"
          }`}
        >
          <span
            className={`inline-block w-1 h-1 rounded-full ${
              isDark ? "bg-red-400" : "bg-red-600"
            }`}
          ></span>
          {error}
        </p>
      )}
    </div>
  );
}
