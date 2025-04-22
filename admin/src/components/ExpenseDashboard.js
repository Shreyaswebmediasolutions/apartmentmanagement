// src/components/ExpenseDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MonthDropdown from './MonthDropdown';
import Sidebar from './Sidebar';
import ExpenseTable from './ExpenseTable';
import TotalAmountBox from './TotalAmountBox';
import '../styles/ExpenseDashboard.css'; // Import the CSS file


const ExpenseDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/expenses/${selectedMonth}`)
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err));
  }, [selectedMonth]);

  const dates = expenses.map((exp) => exp.date);

  const calculateTotal = () => {
    const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    setTotalAmount(total);
  };
  console.log("Expenses data:", expenses);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <Sidebar dates={dates} />
      </div>

      <div className="main-content">
        <div className="header">
          <h1 className="header-title">Monthly Expense Report</h1>
          {/* <MonthDropdown selectedMonth={selectedMonth} onChange={setSelectedMonth} /> */}
        </div>

        <div>
      <div className="table-container">
        <h2 className="table-heading">Expenses for {selectedMonth}</h2>
        <ExpenseTable selectedMonth={selectedMonth} expenses={expenses} onCalculateTotal={calculateTotal} />
      </div>
    </div>

        {totalAmount !== null && (
          <div className="total-box">
            <TotalAmountBox total={totalAmount} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseDashboard;



