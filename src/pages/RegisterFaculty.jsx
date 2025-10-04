import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserIcon,
  AtSignIcon,
  PhoneIcon,
  BuildingIcon,
  BookOpenIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircleIcon,
  SaveIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  UsersIcon,
  ClockIcon,
  XIcon,
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

  // In a real app, fetch HOD's department from auth context
  const hodDepartment = "Computer Science"; // Example: pre-filled from logged-in HOD

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    contact: "",
    department: hodDepartment, // Auto-filled from HOD
    expertise: [], // Multiple subjects
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

    // TODO: API call to register Faculty
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

    // Simulate success
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100 px-4">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-2xl mx-auto">


        <motion.div
          className="relative rounded-2xl border border-slate-800/80 bg-slate-900/90 p-8 shadow-xl backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-30 -z-10"></div>

          <header className="mb-6">
            <motion.div
              className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ShieldCheckIcon size={16} className="text-indigo-400" />
              <span className="text-xs font-medium text-indigo-300">
                HOD Access
              </span>
            </motion.div>

            <motion.h1
              className="text-2xl font-extrabold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Register Faculty Member
            </motion.h1>
            <motion.p
              className="text-slate-400 text-sm mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Add faculty to {hodDepartment} department with login credentials
            </motion.p>
          </header>

          {/* Success message */}
          <AnimatePresence>
            {success && (
              <motion.div
                className="mb-6 bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-3 rounded-xl flex items-center gap-2 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <CheckCircleIcon size={18} />
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
                className="mb-6 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {formAlert}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Personal Details */}
            <section>
              <h2 className="text-base font-bold mb-4 flex items-center gap-2 text-slate-200">
                <UsersIcon size={18} className="text-indigo-400" />
                Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  id="id"
                  label="Faculty ID"
                  icon={<UserIcon className="h-5 w-5 text-slate-500" />}
                  value={form.id}
                  onChange={handleChange}
                  error={errors.id}
                  placeholder="Employee ID"
                  autoComplete="username"
                />

                <Field
                  id="name"
                  label="Full Name"
                  icon={<UserIcon className="h-5 w-5 text-slate-500" />}
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Full name"
                  autoComplete="name"
                />

                <Field
                  id="email"
                  label="Email"
                  type="email"
                  icon={<AtSignIcon className="h-5 w-5 text-slate-500" />}
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="email@university.edu"
                  autoComplete="email"
                />

                <Field
                  id="contact"
                  label="Contact"
                  type="tel"
                  icon={<PhoneIcon className="h-5 w-5 text-slate-500" />}
                  value={form.contact}
                  onChange={handleChange}
                  error={errors.contact}
                  placeholder="+91-XXXXXXXXXX"
                  autoComplete="tel"
                />
              </div>
            </section>

            {/* Academic Details */}
            <section>
              <h2 className="text-base font-bold mb-4 flex items-center gap-2 text-slate-200">
                <BookOpenIcon size={18} className="text-indigo-400" />
                Academic Details
              </h2>
              <div className="space-y-5">
                <SelectField
                  id="department"
                  label="Department"
                  icon={<BuildingIcon className="h-5 w-5 text-slate-500" />}
                  value={form.department}
                  onChange={handleChange}
                  error={errors.department}
                  options={DEPARTMENTS}
                  disabled={true}
                  hint="Pre-filled from your department"
                />

                {/* Expertise (multi-select) */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1.5">
                    Subjects of Expertise
                  </label>
                  <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {form.expertise.length > 0 ? (
                        form.expertise.map((subj) => (
                          <span
                            key={subj}
                            className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 px-3 py-1 text-xs font-medium"
                          >
                            {subj}
                            <button
                              type="button"
                              onClick={() => toggleExpertise(subj)}
                              className="hover:text-indigo-100 transition-colors"
                              aria-label={`Remove ${subj}`}
                            >
                              <XIcon size={14} />
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400">
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
                              ? "border-slate-700 bg-slate-800/30 text-slate-500 cursor-not-allowed"
                              : "border-slate-700 bg-slate-800/70 text-slate-300 hover:border-indigo-400/50 hover:bg-slate-700/70"
                          }`}
                        >
                          {form.expertise.includes(subj) ? "✓ " : "+ "}
                          {subj}
                        </button>
                      ))}
                    </div>
                  </div>
                  {errors.expertise && (
                    <p className="mt-1.5 text-xs text-red-300 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                      {errors.expertise}
                    </p>
                  )}
                </div>

                <Field
                  id="availability"
                  label="Availability (Hours per Week)"
                  type="number"
                  icon={<ClockIcon className="h-5 w-5 text-slate-500" />}
                  value={form.availability}
                  onChange={handleChange}
                  error={errors.availability}
                  placeholder="e.g., 20"
                />
              </div>
            </section>

            {/* Institution */}
            <section>
              <h2 className="text-base font-bold mb-4 flex items-center gap-2 text-slate-200">
                <BuildingIcon size={18} className="text-indigo-400" />
                Institution
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  id="universityCode"
                  label="University Name/Code"
                  icon={<BuildingIcon className="h-5 w-5 text-slate-500" />}
                  value={form.universityCode}
                  onChange={handleChange}
                  error={errors.universityCode}
                  placeholder="SPPU / UNI123"
                  autoComplete="organization"
                />

                <Field
                  id="instituteCode"
                  label="Institute Name/Code"
                  icon={<BuildingIcon className="h-5 w-5 text-slate-500" />}
                  value={form.instituteCode}
                  onChange={handleChange}
                  error={errors.instituteCode}
                  placeholder="COEP / INST456"
                  autoComplete="organization"
                />
              </div>
            </section>

            {/* Security */}
            <section>
              <h2 className="text-base font-bold mb-4 flex items-center gap-2 text-slate-200">
                <LockIcon size={18} className="text-indigo-400" />
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
                  hint="Use 8+ characters with a mix of letters and numbers."
                />

                <PasswordField
                  id="confirmPassword"
                  label="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  shown={showConfirm}
                  toggle={() => setShowConfirm(!showConfirm)}
                  error={errors.confirmPassword}
                />
              </div>

              {/* Password strength indicator */}
              <div className="mt-4 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <h3 className="text-sm font-medium text-indigo-300 mb-2 flex items-center gap-2">
                  <CheckCircleIcon size={16} />
                  Password Requirements
                </h3>
                <ul className="space-y-1 text-xs text-slate-300">
                  <Requirement met={form.password.length >= 8}>
                    Minimum 8 characters
                  </Requirement>
                  <Requirement met={/[A-Z]/.test(form.password)}>
                    At least one uppercase letter
                  </Requirement>
                  <Requirement met={/[0-9]/.test(form.password)}>
                    At least one number
                  </Requirement>
                  <Requirement
                    met={
                      form.password === form.confirmPassword &&
                      form.password !== ""
                    }
                  >
                    Passwords match
                  </Requirement>
                </ul>
              </div>
            </section>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-4">
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
                disabled={!isFormComplete || success}
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-2.5 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SaveIcon size={18} />
                Register Faculty
                <span className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
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
  extraClasses = "",
}) {
  return (
    <div className={extraClasses}>
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
          onChange={onChange}
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
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required
          disabled={disabled}
          className={`w-full rounded-xl border bg-slate-800/50 ${
            icon ? "pl-10" : "pl-3"
          } pr-10 py-2.5 text-slate-100 appearance-none focus:ring-2 focus:ring-indigo-400/30 transition-all duration-200 ${
            disabled ? "opacity-60 cursor-not-allowed" : ""
          } ${
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

function PasswordField({
  id,
  label,
  value,
  onChange,
  shown,
  toggle,
  error,
  hint,
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
          onChange={onChange}
          required
          autoComplete="new-password"
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

function Requirement({ met, children }) {
  return (
    <li
      className={`flex items-center gap-1.5 ${
        met ? "text-green-400" : "text-slate-400"
      }`}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          met ? "bg-green-400" : "bg-slate-600"
        }`}
      ></div>
      {children}
    </li>
  );
}
