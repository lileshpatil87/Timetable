import { NavLink } from "react-router-dom";
import {
  LayoutDashboardIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  CalendarIcon,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/hod",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Program",
    url: "/programs",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Faculties",
    url: "/faculties",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Rooms",
    url: "/rooms",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Students",
    url: "/students",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Timetables",
    url: "/timetables",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Approval Queue",
    url: "/approvals",
    icon: CheckCircleIcon,
  },
  {
    title: "Reported Clashes",
    url: "/clashes",
    icon: AlertTriangleIcon,
  },
  {
    title: "Exports",
    url: "/exports",
    icon: LayoutDashboardIcon,
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-[calc(100vh-70px)] bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300
      ${collapsed ? "w-14" : "w-60"}`}
    >
      {/* Menu */}
      <nav className="flex flex-col p-2 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-500/20 text-indigo-300 font-medium"
                  : "text-slate-300 hover:bg-slate-800/50"
              }`
            }
          >
            <item.icon size={18} />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
