import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../pages/Header";
import "../styles/styles.css"; // Importing styles

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <div className="dashboard-main">
          <h2>            Welcome to the Dashboard</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
