import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// import SignUp from "./pages/signup"; // Create this in the next step
import Dashboard from "./pages/Dashboard"; // Placeholder for after login
import Register from "./pages/Register";
//import Sidebar from "./components/Sidebar";
import ExecutiveMembers from "./components/ExecutiveMembers";
import RoomsList from "./pages/RoomsList";
import OwnerDetails from "./pages/OwnerDetails";
import ContactPage from "./pages/ContactPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/executiveMembers" element={<ExecutiveMembers />} />
        <Route path="/rooms" element={<RoomsList />} />
        <Route path="/room/:id" element={<OwnerDetails />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
