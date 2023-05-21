import React from "react";
import ScheduleScreen from "./screens/ScheduleScreen/ScheduleScreen";
import { Routes, Route } from "react-router-dom";
import AdminPanelScreen from "./screens/AdminPanelScreen/AdminPanelScreen";
import Navbar from "./components/Navbar/Navbar";
import NotFoundScreen from "./screens/NotFoundScreen/NotFoundScreen";
import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";

export default function App() {
  return (
   <>
     <Navbar />
    <Routes>
      <Route path="/" element={<ScheduleScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/registration" element={<RegistrationScreen />} />
      <Route path="/panel" element={<AdminPanelScreen />} />
      <Route path="/panel/parser" element={<AdminPanelScreen />} />
      <Route path="/panel/queue" element={<AdminPanelScreen />} />
      <Route path="/panel/outage" element={<AdminPanelScreen />} />

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
   </>
  );
}
