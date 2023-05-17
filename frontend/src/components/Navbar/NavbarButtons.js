import { Link } from "react-router-dom";
import { Button } from "antd";
import React from "react";

export const NavbarButtons = {
  GoToHomePage: (
    <div className="navbar-item">
      <Link to={"/"}>
        <Button>Go To Home Page</Button>
      </Link>
    </div>
  ),

  Login: (
    <div className="navbar-item">
      <Link to={"/auth"}>
        <Button>Login</Button>
      </Link>
    </div>
  ),

  Registration: (
    <div className="navbar-item">
      <Link to={"/auth"}>
        <Button>Registration</Button>
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
};
