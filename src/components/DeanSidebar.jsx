import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Eye,
  Building2,
  UserPlus,
  Users,
  GraduationCap,
  DoorOpen,
  UsersRound,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Download,
  UserCheck,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { title: "Dashboard", url: "/dean", icon: LayoutDashboard },
  { title: "View Programs", url: "/dean/view", icon: Eye },
  { title: "View Rooms", url: "/dean/viewr", icon: DoorOpen },
  { title: "Register HOD", url: "/dean/register", icon: UserPlus },
  { title: "Courses", url: "/dean/courses", icon: BookOpen },
  { title: "Faculties", url: "/dean/faculties", icon: UsersRound },
  { title: "Students", url: "/dean/students", icon: UserCheck },
  { title: "Timetables", url: "/dean/timetables", icon: Calendar },
  { title: "Approval Queue", url: "/dean/approvals", icon: CheckCircle },
  { title: "Reported Clashes", url: "/dean/clashes", icon: AlertTriangle },
  { title: "Exports", url: "/dean/exports", icon: Download },
];

export default function DeanSidebar() {
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
