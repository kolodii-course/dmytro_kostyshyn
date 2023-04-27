import React from "react";
import "./Navbar.scss";
import { Button } from "antd";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-title">Blackouts Schedule</div>

      <div className="navbar-items">
        <div className="navbar-item">
          <Button>Sing Up</Button>
        </div>

        <div className="navbar-item">
          <Button>Sing In</Button>
        </div>
      </div>
    </div>
  );
}
