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
  UserPlus,
  Settings,
  Clock,
  Grid3x3,
  Shuffle,
  Eye,
  FileText,
  Database,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/coordinator", icon: LayoutDashboard },
  { title: "Generate Timetable", url: "/coordinator/generate", icon: Shuffle },

  // Registration Section
  {
    title: "Register Rooms",
    url: "/coordinator/register-rooms",
    icon: Building2,
  },
  {
    title: "Register Faculty",
    url: "/coordinator/register-faculty",
    icon: UserPlus,
  },
  { title: "Register HOD", url: "/coordinator/register-hod", icon: Users },
  {
    title: "Register Programs",
    url: "/coordinator/register-program",
    icon: Users,
  },
  {
    title: "Register Courses",
    url: "/coordinator/register-course",
    icon: Users,
  },

  // Data Management
  { title: "View Programs", url: "/coordinator/programs", icon: GraduationCap },
  { title: "View Courses", url: "/coordinator/courses", icon: BookOpen },
  { title: "View Faculty", url: "/coordinator/faculty", icon: UsersRound },
  { title: "View Students", url: "/coordinator/students", icon: UserCheck },
  { title: "View Rooms", url: "/coordinator/rooms", icon: DoorOpen },

  // Timetable Management

  { title: "View Timetables", url: "/coordinator/timetables", icon: Calendar },
  // { title: "Conflict Resolution", url: "/coordinator/conflicts", icon: AlertTriangle },

  { title: "Exports", url: "/coordinator/exports", icon: Download },
];

export default function CoordinatorSidebar({ theme, isDark }) {
  return (
    <div className="w-64 h-full py-4 px-3 overflow-y-auto">
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
            end={item.url === "/coordinator"}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? isDark
                    ? "bg-indigo-500/20 text-white font-semibold shadow-sm"
                    : "bg-indigo-500/20 text-indigo-700 font-semibold"
                  : `${theme.mutedText} ${
                      isDark
                        ? "hover:bg-slate-800/50 hover:text-slate-200"
                        : "hover:bg-gray-100 hover:text-gray-900"
                    }`
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
                      className={isDark ? "text-indigo-400" : "text-indigo-600"}
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
