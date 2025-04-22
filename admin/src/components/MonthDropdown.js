import React from 'react';
import "../styles/ExpenseTable.css";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MonthDropdown = ({ selectedMonth, onChange }) => {
  return (
    <select
      className="month dropdown"
      value={selectedMonth}
      onChange={(e) => onChange(e.target.value)}
      
    >
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthDropdown;
