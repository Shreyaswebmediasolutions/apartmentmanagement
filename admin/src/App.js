import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// import SignUp from "./pages/signup"; // Create this in the next step
import Dashboard from "./pages/Dashboard"; // Placeholder for after login
import Register from "./pages/Register";
import ExecutiveMembers from "./components/ExecutiveMembers";
import RoomsList from "./pages/RoomsList";
import OwnerDetails from "./pages/OwnerDetails";
import ContactPage from "./pages/ContactPage";

import YearlySpending from "./pages/YearlySpending";
import FlatMaintenance from "./pages/FlatMaintenance";
import PaymentPage from  "./pages/PaymentPage";

import ExpenseDashboard from "./components/ExpenseDashboard";
import ExpenseTable from "../src/components/ExpenseTable";
import TotalAmountBox from "./components/TotalAmountBox";
import MonthDropdown from "../src/components/MonthDropdown";
import Sidebar from "./components/Sidebar";


import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/executiveMembers" element={<ExecutiveMembers />} />
        <Route path="/rooms" element={<RoomsList />} />
        <Route path="/room/:id" element={<OwnerDetails />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/yearlyspending" element={<YearlySpending />} />
        <Route path="/FlatMaintenance" element={<FlatMaintenance/>} />
        <Route path="/PaymentPage" element={<PaymentPage/>} />

        <Route path="/ExpenseDashboard" element={<ExpenseDashboard />} />
        <Route path="/ExpenseTable" element={<ExpenseTable />} />
        <Route path="/TotalAmountBox" element={<TotalAmountBox />} />
        <Route path="/MonthDropdown" element={<MonthDropdown />} />

      </Routes>

    </Router>
  );
}

export default App;
