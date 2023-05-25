import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";
import "./Navbar.scss";

const NavbarButtons = {
    GoToHomePage: (
        <div className="navbar-item">
            <Link to={"/"}>
                <Button>Go To Home Page</Button>
            </Link>
        </div>
    ),

    Authorization: (
        <div className="navbar-item">
            <Link to={"/login"}>
                <Button>Authorization</Button>
            </Link>
        </div>
    ),

    AdminPanel: (
        <div className="navbar-item">
            <Link to={"/panel"}>
                <Button>Admin Panel</Button>
            </Link>
        </div>
    ),

    Logout: (
        <div className="navbar-item">
            <Link to={"/logout"}>
                <Button>Logout</Button>
            </Link>
        </div>
    ),
};

export default function Navbar() {
    let locate = useLocation().pathname;
    const [buttons, setButtons] = useState([]);

    const btns = [];

    let isAuth = false;
    let isAdmin = localStorage.getItem("isAdmin") === "true";

    try {
        isAuth = localStorage.getItem("token").length > 10;
    } catch {}

    if (locate === '/' || locate.split('/')[1] === 'panel') {
        btns.push(isAuth ? NavbarButtons.Logout : NavbarButtons.Authorization);
    }


    if (isAdmin && isAuth && locate.split('/')[1] !== 'panel') {
        btns.push(NavbarButtons.AdminPanel);
    }

    if (locate !== "/") {
        btns.push(NavbarButtons.GoToHomePage);
    }




    return (
        <div className="navbar-container">
            <div className="navbar-title">
                <Link to={"/"}>
                    Blackout <img src="/icons/favicon.svg"></img> Schedule
                </Link>
            </div>

            <div className="navbar-items">{btns}</div>
        </div>
    );
}
