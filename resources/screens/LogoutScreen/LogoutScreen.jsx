import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutScreen() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("isAdmin", false);

    const navigate = useNavigate()
    useEffect(() => {
        navigate("/")
    }, [])

    return <></>
}
