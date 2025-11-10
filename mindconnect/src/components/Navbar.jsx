import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";  // Adjust path if needed
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <img src={logo} alt="App Logo" className="navbar-logo" />
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tracker">Mood Tracker</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><Link to="/relationship">Relationship Check-ins</Link></li>
        <li><Link to="/insights">Insights</Link></li>
        <li><Link to="/safety">Safety Net</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
