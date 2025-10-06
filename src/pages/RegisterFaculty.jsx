import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "../components/CustomDropdown";
import {
  User,
  AtSign,
  Phone,
  Building2,
  BookOpen,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Save,
  ArrowLeft,
  ShieldCheck,
  Users,
  Clock,
  X,
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

const FACULTY_SUBJECTS = [
  "Algorithms",
  "Operating Systems",
  "Database Systems",
  "Networks",
  "Mathematics",
  "Physics",
  "Data Structures",
  "Computer Architecture",
  "Software Engineering",
  "Machine Learning",
];

export default function RegisterFaculty() {
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
    hoverBg: isDark ? "hover:bg-slate-800/50" : "hover:bg-gray-50",
  };

  const theme = contextTheme || defaultTheme;

  const hodDepartment = "Computer Science";

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    contact: "",
    department: hodDepartment,
    expertise: [],
    availability: "",
    universityCode: "",
    instituteCode: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [formAlert, setFormAlert] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  }

  function toggleExpertise(subject) {
    setForm((prev) => {
      const updated = prev.expertise.includes(subject)
        ? prev.expertise.filter((s) => s !== subject)
        : [...prev.expertise, subject];
      return { ...prev, expertise: updated };
    });
    clearError("expertise");
  }

  function clearError(field) {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  }

  function validate() {
    const newErrors = {};
    let valid = true;

    if (!form.id.trim()) {
      newErrors.id = "ID is required";
      valid = false;
    }
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }
    if (!form.contact.trim()) {
      newErrors.contact = "Contact is required";
      valid = false;
    }
    if (!form.department) {
      newErrors.department = "Department is required";
      valid = false;
    }
    if (form.expertise.length === 0) {
      newErrors.expertise = "Select at least one subject of expertise";
      valid = false;
    }
    if (!form.availability.trim()) {
      newErrors.availability = "Availability is required";
      valid = false;
    }
    if (!form.universityCode.trim()) {
      newErrors.universityCode = "University code is required";
      valid = false;
    }
    if (!form.instituteCode.trim()) {
      newErrors.instituteCode = "Institute code is required";
      valid = false;
    }
    if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    setFormAlert(valid ? "" : "Please fix the errors above");
    return valid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      id: form.id,
      name: form.name,
      email: form.email,
      contact: form.contact,
      department: form.department,
      expertise: form.expertise,
      availability: form.availability,
      universityCode: form.universityCode,
      instituteCode: form.instituteCode,
      password: form.password,
      role: "Faculty",
    };

    console.log("Registering Faculty:", payload);

    setSuccess(true);
    setTimeout(() => {
      navigate("/hod/dashboard");
    }, 2000);
  }

  const isFormComplete =
    form.id &&
    form.name &&
    form.email &&
    /^\S+@\S+\.\S+$/.test(form.email) &&
    form.contact &&
    form.department &&
    form.expertise.length > 0 &&
    form.availability &&
    form.universityCode &&
    form.instituteCode &&
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
              <h1 className="text-3xl font-bold mb-2">
                Register Faculty Member
              </h1>
              <p className={`text-sm ${theme.mutedText}`}>
                Add faculty to {hodDepartment} department with login credentials
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
            <span className="text-xs font-medium">HOD Access</span>
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
        {/* Success message */}
        <AnimatePresence>
          {success && (
            <motion.div
              className={`mb-6 px-4 py-3 rounded-xl flex items-center gap-2 text-sm border ${
                isDark
                  ? "bg-green-500/10 border-green-500/30 text-green-300"
                  : "bg-green-50 border-green-200 text-green-700"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <CheckCircle size={18} />
              Faculty registered successfully! Redirecting...
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error alert */}
        <AnimatePresence>
          {formAlert && !success && (
            <motion.div
              role="alert"
              aria-live="assertive"
              className={`mb-6 px-4 py-3 rounded-xl text-sm border ${
                isDark
                  ? "bg-red-500/10 border-red-500/30 text-red-300"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {formAlert}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* Personal Details */}
          <section>
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Users
                size={16}
                className={isDark ? "text-indigo-600" : "text-indigo-400"}
              />
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                id="id"
                label="Faculty ID"
                icon={<User className="h-5 w-5" />}
                value={form.id}
                onChange={handleChange}
                error={errors.id}
                placeholder="Employee ID"
                autoComplete="username"
                theme={theme}
                isDark={isDark}
              />

              <Field
                id="name"
                label="Full Name"
                icon={<User className="h-5 w-5" />}
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Full name"
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
                onChange={handleChange}
                error={errors.email}
                placeholder="email@university.edu"
                autoComplete="email"
                theme={theme}
                isDark={isDark}
              />

              <Field
                id="contact"
                label="Contact"
                type="tel"
                icon={<Phone className="h-5 w-5" />}
                value={form.contact}
                onChange={handleChange}
                error={errors.contact}
                placeholder="+91-XXXXXXXXXX"
                autoComplete="tel"
                theme={theme}
                isDark={isDark}
              />
            </div>
          </section>

          {/* Academic Details */}
          <section>
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <BookOpen
                size={16}
                className={isDark ? "text-indigo-600" : "text-indigo-400"}
              />
              Academic Details
            </h2>
            <div className="space-y-5">
              <CustomDropdown
                label="Department"
                name="department"
                id="department"
                value={form.department}
                onChange={handleChange}
                options={DEPARTMENTS}
                error={errors.department}
                theme={isDark ? "dark" : "light"}
                disabled={true}
                placeholder="Pre-filled from your department"
              />

              {/* Expertise (multi-select) */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Subjects of Expertise
                </label>
                <div
                  className={`rounded-xl border ${theme.cardBorder} ${theme.accentBg} p-4`}
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {form.expertise.length > 0 ? (
                      form.expertise.map((subj) => (
                        <span
                          key={subj}
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium ${
                            isDark
                              ? "bg-indigo-500/20 text-indigo-300 border-indigo-400/40"
                              : "bg-indigo-100 text-indigo-700 border-indigo-200"
                          }`}
                        >
                          {subj}
                          <button
                            type="button"
                            onClick={() => toggleExpertise(subj)}
                            className={
                              isDark
                                ? "hover:text-indigo-100"
                                : "hover:text-indigo-900"
                            }
                            aria-label={`Remove ${subj}`}
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className={`text-xs ${theme.mutedText}`}>
                        No subjects selected
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {FACULTY_SUBJECTS.map((subj) => (
                      <button
                        key={subj}
                        type="button"
                        onClick={() => toggleExpertise(subj)}
                        disabled={form.expertise.includes(subj)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                          form.expertise.includes(subj)
                            ? `${theme.accentBg} border ${theme.accentBorder} ${theme.mutedText} cursor-not-allowed opacity-60`
                            : `${theme.inputBg} border ${theme.inputBorder} ${
                                isDark
                                  ? "hover:border-indigo-400/50 hover:bg-slate-700/70"
                                  : "hover:border-indigo-300 hover:bg-gray-100"
                              }`
                        }`}
                      >
                        {form.expertise.includes(subj) ? "✓ " : "+ "}
                        {subj}
                      </button>
                    ))}
                  </div>
                </div>
                {errors.expertise && (
                  <p
                    className={`mt-1.5 text-xs flex items-center gap-1 ${
                      isDark ? "text-red-300" : "text-red-600"
                    }`}
                  >
                    <span
                      className={`inline-block w-1 h-1 rounded-full ${
                        isDark ? "bg-red-400" : "bg-red-600"
                      }`}
                    ></span>
                    {errors.expertise}
                  </p>
                )}
              </div>

              <Field
                id="availability"
                label="Availability (Hours per Week)"
                type="number"
                icon={<Clock className="h-5 w-5" />}
                value={form.availability}
                onChange={handleChange}
                error={errors.availability}
                placeholder="e.g., 20"
                theme={theme}
                isDark={isDark}
              />
            </div>
          </section>

          {/* Institution */}
          <section>
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Building2
                size={16}
                className={isDark ? "text-indigo-600" : "text-indigo-400"}
              />
              Institution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                id="universityCode"
                label="University Name/Code"
                icon={<Building2 className="h-5 w-5" />}
                value={form.universityCode}
                onChange={handleChange}
                error={errors.universityCode}
                placeholder="SPPU / UNI123"
                autoComplete="organization"
                theme={theme}
                isDark={isDark}
              />

              <Field
                id="instituteCode"
                label="Institute Name/Code"
                icon={<Building2 className="h-5 w-5" />}
                value={form.instituteCode}
                onChange={handleChange}
                error={errors.instituteCode}
                placeholder="COEP / INST456"
                autoComplete="organization"
                theme={theme}
                isDark={isDark}
              />
            </div>
          </section>

          {/* Security */}
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
                onChange={handleChange}
                shown={showPassword}
                toggle={() => setShowPassword(!showPassword)}
                error={errors.password}
                hint="Use 8+ characters with a mix of letters and numbers"
                theme={theme}
                isDark={isDark}
              />

              <PasswordField
                id="confirmPassword"
                label="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                shown={showConfirm}
                toggle={() => setShowConfirm(!showConfirm)}
                error={errors.confirmPassword}
                theme={theme}
                isDark={isDark}
              />
            </div>

            {/* Password strength indicator */}
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
                <CheckCircle size={16} />
                Password Requirements
              </h3>
              <ul className="space-y-1 text-xs">
                <Requirement
                  met={form.password.length >= 8}
                  isDark={isDark}
                  theme={theme}
                >
                  Minimum 8 characters
                </Requirement>
                <Requirement
                  met={/[A-Z]/.test(form.password)}
                  isDark={isDark}
                  theme={theme}
                >
                  At least one uppercase letter
                </Requirement>
                <Requirement
                  met={/[0-9]/.test(form.password)}
                  isDark={isDark}
                  theme={theme}
                >
                  At least one number
                </Requirement>
                <Requirement
                  met={
                    form.password === form.confirmPassword &&
                    form.password !== ""
                  }
                  isDark={isDark}
                  theme={theme}
                >
                  Passwords match
                </Requirement>
              </ul>
            </div>
          </section>

          {/* Submit */}
          <div
            className={`flex items-center justify-end gap-3 pt-6 border-t ${theme.cardBorder}`}
          >
            <motion.button
              type="button"
              onClick={() => navigate(-1)}
              className={`rounded-xl border ${theme.cardBorder} px-5 py-2.5 font-medium transition-all`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>

            <motion.button
              type="submit"
              disabled={!isFormComplete || success}
              className={`rounded-xl px-6 py-2.5 font-medium shadow-lg flex items-center gap-2 transition-all ${
                isFormComplete && !success
                  ? `bg-gradient-to-r ${theme.gradient} text-white hover:shadow-xl`
                  : isDark
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              whileHover={isFormComplete && !success ? { scale: 1.02 } : {}}
              whileTap={isFormComplete && !success ? { scale: 0.98 } : {}}
            >
              <Save size={18} />
              Register Faculty
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
          onChange={onChange}
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
  disabled = false,
  hint = "",
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
          onChange={onChange}
          required
          disabled={disabled}
          className={`w-full rounded-xl border ${
            icon ? "pl-10" : "pl-3"
          } pr-10 py-2.5 ${theme.inputBg} ${theme.inputText} appearance-none ${
            disabled ? "opacity-60 cursor-not-allowed" : ""
          } ${
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

// PasswordField component
function PasswordField({
  id,
  label,
  value,
  onChange,
  shown,
  toggle,
  error,
  hint,
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
          onChange={onChange}
          required
          autoComplete="new-password"
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

// Requirement component
function Requirement({ met, children, isDark, theme }) {
  return (
    <li
      className={`flex items-center gap-1.5 ${
        met ? (isDark ? "text-green-400" : "text-green-600") : theme.mutedText
      }`}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          met
            ? isDark
              ? "bg-green-400"
              : "bg-green-600"
            : isDark
            ? "bg-slate-600"
            : "bg-gray-300"
        }`}
      ></div>
      {children}
    </li>
  );
}
