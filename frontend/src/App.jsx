import React from "react";
import ScheduleScreen from "./screens/ScheduleScreen/ScheduleScreen";
import { Routes, Route } from "react-router-dom";
import AdminPanelScreen from "./screens/AdminPanelScreen/AdminPanelScreen";
import AuthScreen from "./screens/AuthScreen/AuthScreen";
import Navbar from "./components/Navbar/Navbar";
import NotFoundScreen from "./screens/NotFoundScreen/NotFoundScreen";

export default function App() {
  return (
   <>
     <Navbar />
    <Routes>
      <Route path="/" element={<ScheduleScreen />} />
      <Route path="/panel" element={<AdminPanelScreen />} />
      <Route path="/auth" element={<AuthScreen />} />

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
   </>
  );
}
