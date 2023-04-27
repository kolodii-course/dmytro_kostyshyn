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
            <Button>SING IN</Button>
          </Link>
        </div>
      );
      items.push(
        <div className="navbar-item">
          <Link to={"/auth"}>
            <Button>SING UP</Button>
          </Link>
        </div>
      );
      break;

    default:
      items.push(
        <div className="navbar-item">
          <Link to={"/"}>
            <Button>GO TO HOME PAGE</Button>
          </Link>
        </div>
      );
      break;
  }

  return (
    <div className="navbar-container">
      <div className="navbar-title">
        <Link to={"/"}>Blackouts Schedule</Link>
      </div>

      <div className="navbar-items">{items}</div>
    </div>
  );
}
