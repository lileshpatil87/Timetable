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
  { title: "Dashboard", url: "/hod", icon: LayoutDashboard },
  { title: "Programs", url: "/hod/programs", icon: GraduationCap },
  { title: "View Rooms", url: "/hod/viewr", icon: DoorOpen },
  { title: "Register Faculty", url: "/hod/registerf", icon: Users },
  { title: "Courses", url: "/hod/courses", icon: BookOpen },
  { title: "Faculties", url: "/hod/faculties", icon: UsersRound },
  { title: "Students", url: "/hod/students", icon: UserCheck },
  { title: "Timetables", url: "/hod/timetables", icon: Calendar },
  { title: "Approval Queue", url: "/hod/approvals", icon: CheckCircle },
  { title: "Reported Clashes", url: "/hod/clashes", icon: AlertTriangle },
  { title: "Exports", url: "/hod/exports", icon: Download },
];

export default function HODSidebar() {
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
