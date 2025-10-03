import React, { useEffect } from "react";
import { XIcon } from "lucide-react";
export default function Modal({ title, children, onClose }) {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center px-4 overflow-y-auto"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl animate-fadeIn"
        style={{ animation: "fadeIn 0.2s ease-out" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800/70 transition-colors"
            aria-label="Close"
          >
            <XIcon size={18} />
          </button>
        </div>
        {children}
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

// import React from "react";
// import { XIcon } from "lucide-react";

// export default function Modal({ title, onClose, children }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
//       <div className="w-full max-w-2xl max-h-[90vh] overflow-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
//         <div className="sticky top-0 flex items-center justify-between border-b border-slate-800 bg-slate-900/95 backdrop-blur px-6 py-4">
//           <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
//             {title}
//           </h2>
//           <button
//             onClick={onClose}
//             className="rounded-lg p-2 hover:bg-slate-800 transition-colors"
//             aria-label="Close modal"
//           >
//             <XIcon size={20} />
//           </button>
//         </div>
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// }
