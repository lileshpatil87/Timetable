import React, { useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { CalendarIcon, LogOutIcon, MenuIcon } from "lucide-react";
import HODSidebar from "./HODSidebar";
import DeanSidebar from "./DeanSidebar";

export function DashboardLayout({ role = "hod" }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function handleLogout() {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      sessionStorage.clear();
    } finally {
      navigate("/login", { replace: true });
    }
  }

  // Select sidebar component based on role
  const SidebarComponent = role === "dean" ? DeanSidebar : HODSidebar;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100 scrollbar-hidden">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/90 border-b border-slate-800 shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-300 hover:text-indigo-400 transition-colors"
            >
              <MenuIcon size={20} />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400">
                <CalendarIcon size={20} />
              </div>
              <Link
                to={"/"}
                className="text-xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
              >
                Timely NEP
              </Link>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:border-indigo-400 hover:bg-indigo-500/10 transition-colors flex items-center gap-2"
          >
            <LogOutIcon size={16} />
            Logout
          </button>
        </div>
      </header>

      <div className="flex w-full h-[calc(100vh-70px)]">
        {sidebarOpen && (
          <div className="shrink-0">
            <SidebarComponent className="sticky top-0 h-[calc(100vh-70px)] overflow-hidden" />
          </div>
        )}
        <main className="flex-1 px-6 py-8 overflow-y-auto scrollbar-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
