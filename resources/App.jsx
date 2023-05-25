import React from "react";
import ScheduleScreen from "./screens/ScheduleScreen/ScheduleScreen";
import { Routes, Route } from "react-router-dom";
import AdminPanelScreen from "./screens/AdminPanelScreen/AdminPanelScreen";
import Navbar from "./components/Navbar/Navbar";
import NotFoundScreen from "./screens/NotFoundScreen/NotFoundScreen";
import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import LogoutScreen from "./screens/LogoutScreen/LogoutScreen";
import { User } from "./api/User";

export default function App() {
    try {
        const email = JSON.parse(localStorage.getItem("user")).email;
        User.getByEmail(email).then((data) => {
            localStorage.setItem("isAdmin", data.role === "admin");
        });
    } catch {
        localStorage.setItem("isAdmin", false);
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<ScheduleScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/registration" element={<RegistrationScreen />} />
                <Route path="/logout" element={<LogoutScreen />} />
                <Route path="/panel" element={<AdminPanelScreen />} />
                <Route path="/panel/user" element={<AdminPanelScreen />} />
                <Route path="/panel/queue" element={<AdminPanelScreen />} />
                <Route path="/panel/outage" element={<AdminPanelScreen />} />
                <Route path="/panel/parser" element={<AdminPanelScreen />} />

                <Route path="*" element={<NotFoundScreen />} />
            </Routes>
        </>
    );
}
