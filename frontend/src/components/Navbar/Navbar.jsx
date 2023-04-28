import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";
import "./Navbar.scss";

export default function Navbar() {
  const items = [];

  switch (useLocation().pathname) {
    case "/":
      items.push(
        <div className="navbar-item">
          <Link to={"/auth"}>
            <Button>Sing In</Button>
          </Link>
        </div>
      );
      items.push(
        <div className="navbar-item">
          <Link to={"/auth"}>
            <Button>Sing Up</Button>
          </Link>
        </div>
      );
      items.push(
        <div className="navbar-item">
          <Link to={"/panel"}>
            <Button>Admin Panel</Button>
          </Link>
        </div>
      );
      break;

    default:
      items.push(
        <div className="navbar-item">
          <Link to={"/"}>
            <Button>Go To Home Page</Button>
          </Link>
        </div>
      );
      break;
  }

  return (
    <div className="navbar-container">
      <div className="navbar-title">
        <Link to={"/"}>Blackouts <img src="icons/favicon.svg"></img> Schedule</Link>
      </div>

      <div className="navbar-items">{items}</div>
    </div>
  );
}
