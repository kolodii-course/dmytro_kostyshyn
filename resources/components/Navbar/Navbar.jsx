import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";
import "./Navbar.scss";

const NavbarButtons = {
  GoToHomePage: (
    <div className="navbar-item" key={0}>
      <Link to={"/"}>
        <Button>Go To Home Page</Button>
      </Link>
    </div>
  ),

  Authorization: (
    <div className="navbar-item" key={1}>
      <Link to={"/login"}>
        <Button>Authorization</Button>
      </Link>
    </div>
  ),

  Registration: (
    <div className="navbar-item" key={2}>
      <Link to={"/registration"}>
        <Button>Registration</Button>
      </Link>
    </div>
  ),

  AdminPanel: (
    <div className="navbar-item" key={3}>
      <Link to={"/panel"}>
        <Button>Admin Panel</Button>
      </Link>
    </div>
  ),
};

export default function Navbar() {
  const buttons = [];

  switch (useLocation().pathname) {
    case "/":
      buttons.push(NavbarButtons.Authorization);
    //   buttons.push(NavbarButtons.Registration);
      buttons.push(NavbarButtons.AdminPanel);
      break;

    case "/login":
      buttons.push(NavbarButtons.Registration);
      buttons.push(NavbarButtons.GoToHomePage);
      break;

    case "/registration":
      buttons.push(NavbarButtons.Authorization);
      buttons.push(NavbarButtons.GoToHomePage);
      break;

    default:
      buttons.push(NavbarButtons.GoToHomePage);
      break;
  }

  return (
    <div className="navbar-container">
      <div className="navbar-title">
        <Link to={"/"}>
          Blackouts <img src="icons/favicon.svg"></img> Schedule
        </Link>
      </div>

      <div className="navbar-items">{buttons}</div>
    </div>
  );
}
