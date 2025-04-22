import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Dashboard</h3>
      <ul>
        <li><Link to="/rooms">Flat Management</Link></li>
        <li><Link to="/executiveMembers">Executive Members</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/YearlySpending">Yearlyspending</Link></li>
        <li><Link to="/FlatMaintenance">FlatMaintenance</Link></li>
        <li><Link to="/PaymentPage">PaymentPage</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
