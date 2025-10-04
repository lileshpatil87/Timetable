import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserIcon,
  AtSignIcon,
  PhoneIcon,
  BuildingIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  SaveIcon,
  ShieldCheckIcon,
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

  // Form state
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

  // Field handlers
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

  // Validation
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

  // Submit handler
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

    // TODO: Replace with actual API call
    console.log("Registering HOD:", payload);

    // Navigate back or show success
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 px-4 ">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"></div>
      </div>

      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative rounded-2xl border border-slate-800/80 bg-slate-900/90 p-8 shadow-xl backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-30 -z-10"></div>

          {/* Header */}
          <header className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <motion.button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-300 transition-colors"
                whileHover={{ x: -4 }}
              >
                <ArrowLeftIcon size={18} />
                <span className="text-sm">Back</span>
              </motion.button>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                <ShieldCheckIcon size={14} />
                <span className="text-xs font-medium">Dean Access</span>
              </div>
            </div>
            <motion.h1
              className="text-2xl font-extrabold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Register HOD
            </motion.h1>
            <motion.p
              className="text-slate-400 text-sm mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Create a new Head of Department account with login credentials
            </motion.p>
          </header>

          {/* Alert */}
          <AnimatePresence>
            {formAlert && (
              <motion.div
                role="alert"
                aria-live="assertive"
                className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-6 text-sm"
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
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Personal Details */}
            <section>
              <h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <UserIcon size={16} className="text-indigo-400" />
                Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  id="id"
                  label="Employee ID"
                  icon={<UserIcon className="h-5 w-5 text-slate-500" />}
                  value={form.id}
                  onChange={(v) => onChange("id", v)}
                  error={errors.id}
                  placeholder="e.g., HOD001"
                  autoComplete="username"
                />

                <Field
                  id="name"
                  label="Full Name"
                  icon={<UserIcon className="h-5 w-5 text-slate-500" />}
                  value={form.name}
                  onChange={(v) => onChange("name", v)}
                  error={errors.name}
                  placeholder="Dr. John Doe"
                  autoComplete="name"
                />

                <Field
                  id="email"
                  label="Email"
                  type="email"
                  icon={<AtSignIcon className="h-5 w-5 text-slate-500" />}
                  value={form.email}
                  onChange={(v) => onChange("email", v)}
                  error={errors.email}
                  placeholder="hod@university.edu"
                  autoComplete="email"
                />

                <Field
                  id="contact"
                  label="Contact Number"
                  type="tel"
                  icon={<PhoneIcon className="h-5 w-5 text-slate-500" />}
                  value={form.contact}
                  onChange={(v) => onChange("contact", v)}
                  error={errors.contact}
                  placeholder="+91-XXXXXXXXXX"
                  autoComplete="tel"
                />
              </div>
            </section>

            {/* Department & Permissions */}
            <section>
              <h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <BuildingIcon size={16} className="text-indigo-400" />
                Department & Permissions
              </h2>
              <div className="space-y-5">
                <SelectField
                  id="department"
                  label="Department"
                  icon={<BuildingIcon className="h-5 w-5 text-slate-500" />}
                  value={form.department}
                  onChange={(v) => onChange("department", v)}
                  options={DEPARTMENTS}
                  error={errors.department}
                />

                <motion.label
                  className="inline-flex items-center gap-3 p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 text-sm text-slate-200 cursor-pointer hover:bg-slate-800/50 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <input
                    type="checkbox"
                    className="rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-400/40 h-4 w-4"
                    checked={form.approveTimetables}
                    onChange={(e) =>
                      onChange("approveTimetables", e.target.checked)
                    }
                  />
                  <div>
                    <div className="font-medium">Approve Timetables</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Allow this HOD to review and approve department timetables
                    </div>
                  </div>
                </motion.label>
              </div>
            </section>

            {/* Login Credentials */}
            <section>
              <h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <LockIcon size={16} className="text-indigo-400" />
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
                />
              </div>

              {/* Password requirements */}
              <div className="mt-4 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <h3 className="text-sm font-medium text-indigo-300 mb-2 flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4" />
                  Password Requirements
                </h3>
                <ul className="space-y-1 text-xs text-slate-300">
                  <li
                    className={`flex items-center gap-1.5 ${
                      form.password.length >= 8
                        ? "text-green-400"
                        : "text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        form.password.length >= 8
                          ? "bg-green-400"
                          : "bg-slate-600"
                      }`}
                    ></div>
                    Minimum 8 characters
                  </li>
                  <li
                    className={`flex items-center gap-1.5 ${
                      /[A-Z]/.test(form.password)
                        ? "text-green-400"
                        : "text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        /[A-Z]/.test(form.password)
                          ? "bg-green-400"
                          : "bg-slate-600"
                      }`}
                    ></div>
                    At least one uppercase letter
                  </li>
                  <li
                    className={`flex items-center gap-1.5 ${
                      /[0-9]/.test(form.password)
                        ? "text-green-400"
                        : "text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        /[0-9]/.test(form.password)
                          ? "bg-green-400"
                          : "bg-slate-600"
                      }`}
                    ></div>
                    At least one number
                  </li>
                  <li
                    className={`flex items-center gap-1.5 ${
                      form.password === form.confirmPassword &&
                      form.password !== ""
                        ? "text-green-400"
                        : "text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        form.password === form.confirmPassword &&
                        form.password !== ""
                          ? "bg-green-400"
                          : "bg-slate-600"
                      }`}
                    ></div>
                    Passwords match
                  </li>
                </ul>
              </div>
            </section>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <motion.button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-xl border border-slate-700/80 px-5 py-2.5 text-slate-200 hover:border-indigo-400/70 hover:bg-slate-800/50 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>

              <motion.button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-2.5 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!isFormComplete}
              >
                <SaveIcon size={18} />
                <span className="relative z-10">Register HOD</span>
                <span className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Reusable Field component
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
          } pr-3 py-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200 ${
            error
              ? "border-red-500/60 focus:border-red-400"
              : "border-slate-700/50 focus:border-indigo-400"
          }`}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-errormessage={error ? `${id}-error` : undefined}
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

// SelectField component
function SelectField({ id, label, icon, value, onChange, options, error }) {
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
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className={`w-full rounded-xl border bg-slate-800/50 ${
            icon ? "pl-10" : "pl-3"
          } pr-10 py-2.5 text-slate-100 appearance-none focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200 ${
            error
              ? "border-red-500/60 focus:border-red-400"
              : "border-slate-700/50 focus:border-indigo-400"
          }`}
          style={{
            backgroundImage:
              'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 20 20\\" fill=\\"%2394a3b8\\"><path fill-rule=\\"evenodd\\" d=\\"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\\" clip-rule=\\"evenodd\\"/></svg>")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "1.25rem 1.25rem",
          }}
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
          className="mt-1.5 text-xs text-red-300 flex items-center gap-1"
        >
          <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
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
          className={`w-full rounded-xl border bg-slate-800/50 pl-10 pr-12 py-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200 ${
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
