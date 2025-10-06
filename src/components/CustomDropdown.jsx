import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";

export default function CustomDropdown({
  label,
  name,
  id,
  value,
  onChange,
  options = [],
  theme = "dark",
  placeholder = "Select an option",
  error = "",
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const isDark = theme === "dark";

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange({ target: { value: option, name } });
    setIsOpen(false);
  };

  const displayValue = value || placeholder;

  const themeClasses = {
    input: isDark
      ? "bg-slate-800/50 border-slate-700 text-slate-100"
      : "bg-white border-gray-300 text-gray-900",
    inputFocus: isDark
      ? "focus:border-indigo-400 focus:ring-indigo-400/30"
      : "focus:border-indigo-500 focus:ring-indigo-500/30",
    inputError: isDark
      ? "border-red-500/60 focus:border-red-400"
      : "border-red-300 focus:border-red-500",
    menu: isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200",
    menuShadow: isDark
      ? "shadow-2xl shadow-slate-900/50"
      : "shadow-xl shadow-gray-900/10",
    option: isDark
      ? "text-slate-100 hover:bg-slate-700"
      : "text-gray-900 hover:bg-gray-100",
    optionSelected: isDark ? "bg-slate-700/60" : "bg-indigo-50",
    mutedText: isDark ? "text-slate-400" : "text-gray-600",
    errorText: isDark ? "text-red-300" : "text-red-600",
    placeholderText: isDark ? "text-slate-500" : "text-gray-500",
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-1.5 ${
            error ? themeClasses.errorText : ""
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Dropdown Button */}
        <button
          ref={buttonRef}
          type="button"
          id={id}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full px-4 py-2.5 rounded-lg border text-left flex items-center justify-between text-sm focus:outline-none focus:ring-2 transition-all ${
            error
              ? themeClasses.inputError
              : `${themeClasses.input} ${themeClasses.inputFocus}`
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={!value ? themeClasses.placeholderText : ""}>
            {displayValue}
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              themeClasses.mutedText
            } ${isOpen ? "transform rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu with Portal */}
        {isOpen &&
          createPortal(
            <div
              ref={dropdownRef}
              className={`fixed rounded-lg border ${themeClasses.menu} ${themeClasses.menuShadow} max-h-60 overflow-y-auto z-[9999]`}
              style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
              }}
              role="listbox"
            >
              {options.map((option, index) => {
                const isSelected = value === option;
                return (
                  <div
                    key={index}
                    onClick={() => handleSelect(option)}
                    className={`px-4 py-2.5 cursor-pointer flex items-center justify-between text-sm transition-colors ${
                      themeClasses.option
                    } ${isSelected ? themeClasses.optionSelected : ""}`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span>{option}</span>
                    {isSelected && (
                      <Check
                        size={16}
                        className={
                          isDark ? "text-indigo-400" : "text-indigo-600"
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>,
            document.body
          )}
      </div>

      {error && (
        <p className={`mt-1.5 text-xs ${themeClasses.errorText}`}>
          <span className="inline-block w-1 h-1 rounded-full bg-current mr-1"></span>
          {error}
        </p>
      )}
    </div>
  );
}
