import { useState } from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProgramsFramework from "./pages/ProgramsFramework";
import CoursesOfferings from "./pages/CoursesOfferings";
import FacultyManagement from "./pages/FacultyManagement";
import RoomsResources from "./pages/RoomsResources";
import StudentsEnrollments from "./pages/StudentsEnrollments";
import CalendarsConstraints from "./pages/CalendarsConstraints";
import ScenarioComposer from "./pages/ScenarioComposer";
import Timetables from "./pages/Timetables";
import ConflictExplorer from "./pages/ConflictExplorer";
import ExportsPublishing from "./pages/ExportsPublishing";
import ScenarioExplain from "./pages/ScenarioExplain";
import SettingsIntegrations from "./pages/SettingsIntegrations";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import HODDashboard from "./pages/HODDashboard";
import DeanDashboard from "./pages/DeanDashboard";
import { DashboardLayout } from "./components/DashboardLayout";
import ApprovalQueue from "./pages/ApprovalQueue";
import ReportedClashes from "./pages/ReportedClashes";
import ViewPrograms from "./pages/ViewPrograms";
import RegisterHOD from "./pages/RegisterHOD";
import RegisterFaculty from "./pages/RegisterFaculty";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import ViewRooms from "./pages/ViewRooms";
import GenerateTimetable from "./pages/GenerateTimetable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/admin" element={<AdminDashboard />}></Route>
        <Route path="/student" element={<StudentDashboard />}></Route>
        <Route path="/faculty" element={<FacultyDashboard />}></Route>
        <Route path="/staff" element={<CoordinatorDashboard />}></Route>

        <Route path="/dean" element={<DashboardLayout role="dean" />}>
          <Route index element={<DeanDashboard />} />
          <Route path="approvals" element={<ApprovalQueue />}></Route>
          <Route path="clashes" element={<ReportedClashes />}></Route>
          <Route path="courses" element={<CoursesOfferings />}></Route>
          <Route path="faculties" element={<FacultyManagement />}></Route>
          <Route path="students" element={<StudentsEnrollments />}></Route>
          <Route path="timetables" element={<Timetables />}></Route>
          <Route path="conflicts" element={<ConflictExplorer />}></Route>
          <Route path="exports" element={<ExportsPublishing />}></Route>
          <Route path="view" element={<ViewPrograms />}></Route>
          <Route path="register" element={<RegisterHOD />}></Route>
          <Route path="viewr" element={<ViewRooms />}></Route>
        </Route>

        <Route path="/hod" element={<DashboardLayout role="hod" />}>
          <Route index element={<HODDashboard />} />
          <Route path="programs" element={<ProgramsFramework />}></Route>
          <Route path="rooms" element={<RoomsResources />}></Route>
          <Route path="registerf" element={<RegisterFaculty />}></Route>
          <Route path="approvals" element={<ApprovalQueue />}></Route>
          <Route path="clashes" element={<ReportedClashes />}></Route>
          <Route path="courses" element={<CoursesOfferings />}></Route>
          <Route path="faculties" element={<FacultyManagement />}></Route>
          <Route path="students" element={<StudentsEnrollments />}></Route>
          <Route path="timetables" element={<Timetables />}></Route>
          <Route path="conflicts" element={<ConflictExplorer />}></Route>
          <Route path="exports" element={<ExportsPublishing />}></Route>
          <Route path="viewr" element={<ViewRooms />}></Route>
        </Route>

        <Route
          path="/coordinator"
          element={<DashboardLayout role="coordinator" />}
        >
          {/* Dashboard */}
          <Route index element={<CoordinatorDashboard />} />

          {/* Registration Routes */}
          <Route path="register-rooms" element={<RoomsResources />} />
          <Route path="register-faculty" element={<RegisterFaculty />} />
          <Route path="register-hod" element={<RegisterHOD />} />
          <Route path="register-program" element={<ProgramsFramework />} />
          <Route path="register-course" element={<CoursesOfferings />} />

          {/* View/Management Routes */}
          <Route path="programs" element={<ViewPrograms />} />
          <Route path="courses" element={<CoursesOfferings />} />
          <Route path="faculty" element={<FacultyManagement />} />
          <Route path="students" element={<StudentsEnrollments />} />
          <Route path="rooms" element={<ViewRooms />} />

          {/* Timetable Generation & Management */}
          <Route path="generate" element={<GenerateTimetable />} />
          <Route path="timetables" element={<Timetables />} />
          <Route path="conflicts" element={<ConflictExplorer />} />

          {/* Settings & Exports */}
          <Route path="calendar" element={<CalendarsConstraints />} />
          <Route path="exports" element={<ExportsPublishing />} />
        </Route>

        <Route path="/calendars" element={<CalendarsConstraints />}></Route>
        <Route path="/scenarios" element={<ScenarioComposer />}></Route>
        <Route
          path="/scenarios/:runid/explain"
          element={<ScenarioExplain />}
        ></Route>

        <Route path="/settings" element={<SettingsIntegrations />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
