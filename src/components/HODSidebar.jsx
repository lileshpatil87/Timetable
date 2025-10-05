import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Building2,
  Users,
  GraduationCap,
  DoorOpen,
  UsersRound,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Download,
  UserCheck,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/hod", icon: LayoutDashboard },
  { title: "Programs", url: "/hod/programs", icon: GraduationCap },
  { title: "Courses", url: "/hod/courses", icon: BookOpen },
  { title: "Faculty", url: "/hod/faculties", icon: UsersRound },
  { title: "Students", url: "/hod/students", icon: UserCheck },
  { title: "Rooms", url: "/hod/viewr", icon: DoorOpen },
  { title: "Timetables", url: "/hod/timetables", icon: Calendar },
  { title: "Approvals", url: "/hod/approvals", icon: CheckCircle },
  { title: "Clashes", url: "/hod/clashes", icon: AlertTriangle },
  { title: "Exports", url: "/hod/exports", icon: Download },
];

export default function HODSidebar({ theme, isDark }) {
  return (
    <div className="w-64 h-full py-4 px-3">
      {/* Navigation Section */}
      <nav className="space-y-1">
        <div className={`px-3 py-2 mb-2`}>
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${theme.mutedText}`}
          >
            Navigation
          </p>
        </div>

        {menuItems.map((item, index) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/hod"}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? isDark
                    ? "bg-indigo-500/20 text-white-700 font-semibold shadow-sm"
                    : "bg-indigo-500/20 text-indigo-700 font-semibold"
                  : `${theme.mutedText} hover:bg-${isDark ? "slate" : "gray"}-${
                      isDark ? "800/50" : "300"
                    } hover:text-${isDark ? "white-500" : "slate-100"}`
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                className="flex items-center gap-3 w-full"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <item.icon size={18} />
                <span className="text-sm flex-1">{item.title}</span>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ChevronRight
                      size={16}
                      className={isDark ? "text-indigo-600" : "text-indigo-400"}
                    />
                  </motion.div>
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
