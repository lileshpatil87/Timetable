import React, { useState, useRef } from "react";
import {
  Calendar,
  Users,
  BookOpen,
  Clock,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Download,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";

const UniversityTimetableSystem = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("login");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [users] = useState({
    students: [
      {
        id: 1,
        name: "John Doe",
        email: "john@university.edu",
        contact: "1234567890",
        university: "MIT",
        department: "Computer Science",
        elective: "Machine Learning",
        credits: 18,
      },
    ],
    faculty: [
      {
        id: 1,
        name: "Dr. Smith",
        email: "smith@university.edu",
        contact: "0987654321",
        university: "MIT",
        department: "Computer Science",
        subjects: ["Data Structures", "Algorithms"],
        available: true,
      },
    ],
    hod: [
      {
        id: 1,
        name: "Prof. Johnson",
        email: "johnson@university.edu",
        contact: "5555555555",
        university: "MIT",
        department: "Computer Science",
      },
    ],
    dean: [
      {
        id: 1,
        name: "Dr. Williams",
        email: "williams@university.edu",
        contact: "6666666666",
        university: "MIT",
      },
    ],
    admin: [
      {
        id: 1,
        name: "Admin User",
        email: "admin@university.edu",
        contact: "7777777777",
        university: "MIT",
      },
    ],
  });

  const [timetables] = useState([
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 10:00 AM",
      subject: "Data Structures",
      faculty: "Dr. Smith",
      room: "Room 101",
      status: "pending",
    },
    {
      id: 2,
      day: "Monday",
      time: "10:00 AM - 11:00 AM",
      subject: "Algorithms",
      faculty: "Dr. Smith",
      room: "Room 102",
      status: "approved",
    },
    {
      id: 3,
      day: "Tuesday",
      time: "9:00 AM - 10:00 AM",
      subject: "Machine Learning",
      faculty: "Dr. Brown",
      room: "Room 201",
      status: "pending",
    },
  ]);

  const [courses] = useState([
    {
      id: 1,
      code: "CS101",
      name: "Data Structures",
      credits: 4,
      department: "Computer Science",
    },
    {
      id: 2,
      code: "CS102",
      name: "Algorithms",
      credits: 4,
      department: "Computer Science",
    },
    {
      id: 3,
      code: "CS201",
      name: "Machine Learning",
      credits: 3,
      department: "Computer Science",
    },
  ]);

  const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("student");

    const handleLogin = (e) => {
      e.preventDefault();
      const user = users[userType + "s"]?.[0] || users[userType]?.[0];
      if (user) {
        setCurrentUser({ ...user, type: userType });
        setCurrentPage("dashboard");
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Timetable System
            </h1>
            <p className="text-gray-600 mt-2">University Management Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Type
              </label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="hod">HOD</option>
                <option value="dean">Dean</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Login
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setCurrentPage("register")}
                className="text-indigo-600 hover:text-indigo-700 text-sm"
              >
                New User? Register Here
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const RegisterPage = () => {
    const [formData, setFormData] = useState({
      userType: "student",
      name: "",
      email: "",
      contact: "",
      university: "",
      institute: "",
      department: "",
      password: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      alert("Registration successful! Please login.");
      setCurrentPage("login");
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            User Registration
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Type
                </label>
                <select
                  value={formData.userType}
                  onChange={(e) =>
                    setFormData({ ...formData, userType: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="hod">HOD</option>
                  <option value="dean">Dean</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact
                </label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University Name/Code
                </label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) =>
                    setFormData({ ...formData, university: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institute Name/Code
                </label>
                <input
                  type="text"
                  value={formData.institute}
                  onChange={(e) =>
                    setFormData({ ...formData, institute: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage("login")}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState("timetable");

    return (
      <div>
        <div className="mb-6 flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("timetable")}
            className={`px-4 py-2 font-medium ${
              activeTab === "timetable"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-600"
            }`}
          >
            Timetable
          </button>
          <button
            onClick={() => setActiveTab("enrollment")}
            className={`px-4 py-2 font-medium ${
              activeTab === "enrollment"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-600"
            }`}
          >
            Course Enrollment
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 font-medium ${
              activeTab === "profile"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-600"
            }`}
          >
            Profile
          </button>
        </div>

        {activeTab === "timetable" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Timetable</h2>
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                <Download size={18} />
                Export PDF
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Day
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Subject
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Faculty
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Room
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {timetables
                    .filter((t) => t.status === "approved")
                    .map((tt) => (
                      <tr key={tt.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {tt.day}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {tt.time}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {tt.subject}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {tt.faculty}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {tt.room}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "enrollment" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Course Enrollment
            </h2>

            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Total Enrolled Credits:
                </span>
                <span className="text-2xl font-bold text-indigo-600">
                  {currentUser.credits} / 20
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {course.code} • {course.credits} Credits
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {course.department}
                      </p>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
                      Enroll
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Profile Management
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={currentUser.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={currentUser.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
                Update Profile
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const FacultyDashboard = () => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Faculty Dashboard
        </h2>
        <p className="text-gray-600">Welcome, {currentUser.name}</p>
      </div>
    );
  };

  const HODDashboard = () => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">HOD Dashboard</h2>
        <p className="text-gray-600">Welcome, {currentUser.name}</p>
      </div>
    );
  };

  const DeanDashboard = () => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Dean Dashboard
        </h2>
        <p className="text-gray-600">Welcome, {currentUser.name}</p>
      </div>
    );
  };

  const AdminDashboard = () => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h2>
        <p className="text-gray-600">Welcome, {currentUser.name}</p>
      </div>
    );
  };

  const DashboardLayout = () => {
    const renderDashboard = () => {
      switch (currentUser.type) {
        case "student":
          return <StudentDashboard />;
        case "faculty":
          return <FacultyDashboard />;
        case "hod":
          return <HODDashboard />;
        case "dean":
          return <DeanDashboard />;
        case "admin":
          return <AdminDashboard />;
        default:
          return <StudentDashboard />;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <Calendar className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Timetable System
                </h1>
                <p className="text-xs text-gray-600">University Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-semibold text-gray-800">
                  {currentUser.name}
                </div>
                <div className="text-xs text-gray-600 capitalize">
                  {currentUser.type}
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setCurrentPage("login");
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">{renderDashboard()}</main>
      </div>
    );
  };

  if (currentPage === "login") return <LoginPage />;
  if (currentPage === "register") return <RegisterPage />;
  if (currentPage === "dashboard" && currentUser) return <DashboardLayout />;

  return <LoginPage />;
};

export default UniversityTimetableSystem;
