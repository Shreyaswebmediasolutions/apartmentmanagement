import React from "react";
import { Link } from "react-router-dom"; // If using React Router
import "../styles/styles.css";
import { FaSearch  } from "react-icons/fa";

function Header() {
  return (
    <div className="header">
      {/* Logo */}
      <img src="logo3.png" alt="Logo" className="logo" />
    
    


      {/* Heading */}
      <h2 className="title">THE SEVENTH HILL </h2>

      {/* Search Bar with Icon */}
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>

      {/* Admin Dropdown */}
      <div className="admin-dropdown">
        <button className="dropdown-btn">Admin ▼</button>
        <div className="dropdown-content">
         
        </div>
      </div>
    
</div>
  );
}

export default Header;
