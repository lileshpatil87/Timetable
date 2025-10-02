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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/admin" element={<AdminDashboard />}></Route>
        <Route path="/programs" element={<ProgramsFramework />}></Route>
        <Route path="/courses" element={<CoursesOfferings />}></Route>
        <Route path="/faculty" element={<FacultyManagement />}></Route>
        <Route path="/rooms" element={<RoomsResources />}></Route>
        <Route path="/students" element={<StudentsEnrollments />}></Route>
        <Route path="/calendars" element={<CalendarsConstraints />}></Route>
        <Route path="/scenarios" element={<ScenarioComposer />}></Route>
        <Route
          path="/scenarios/:runid/explain"
          element={<ScenarioExplain />}
        ></Route>
        <Route path="/timetables" element={<Timetables />}></Route>
        <Route path="/conflicts" element={<ConflictExplorer />}></Route>
        <Route path="/exports" element={<ExportsPublishing />}></Route>
        <Route path="/settings" element={<SettingsIntegrations />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
