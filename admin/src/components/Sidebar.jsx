import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Dashboard</h3>
      <ul className="sidebar-menu">
        <li>
          <Link to="/rooms">Flat Management</Link> </li>
        <li>
          <Link to="/executiveMembers">Executive Members</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/ExpenseDashboard">Monthly Expensive</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

