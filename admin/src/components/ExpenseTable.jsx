import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ExpenseTable.css";

const ExpenseTable = () => {
  const getCurrentMonth = () => {
    const date = new Date();
    return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
  };

  const getAllMonths = () => {
    const currentYear = new Date().getFullYear();
    const years = [currentYear - 1, currentYear, currentYear + 1];
    const months = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString("default", { month: "long" })
    );
    return years.flatMap((year) => months.map((month) => `${month} ${year}`));
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [expenses, setExpenses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newExpense, setNewExpense] = useState({ description: "", amount: "" });

  useEffect(() => {
    if (selectedMonth) {
      fetchExpenses();
    }
  }, [selectedMonth]);

  useEffect(() => {
    // const totalAmount = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    // setTotal(totalAmount.toFixed(2));
    const sum = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
    setTotal(sum.toFixed(2));
  }, [expenses]);

  // const ExpenseTable = () => {
  //   const [selectedMonth, setSelectedMonth] = useState(() => {
  //     const date = new Date();
  //     return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
  //   });
  // };


  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/expenses/${selectedMonth}`);
      if (res.data.success) setExpenses(res.data.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const handleSaveExpense = async () => {
    if (!newExpense.description || !newExpense.amount) {
      alert("Both description and amount are required!");
      return;
    }

    const expenseToAdd = {
      month: selectedMonth,
      description: newExpense.description.trim(),
      amount: parseFloat(newExpense.amount),
    };

    try {
      const res = await fetch("http://localhost:5000/expenses/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseToAdd),
      });

      const result = await res.json();

      if (result.success) {
        setTotal((prevTotal) => (parseFloat(prevTotal || 0) + expenseToAdd.amount).toFixed(2));
        setExpenses((prev) => [...prev,
        {
          id: result.insertId || Date.now(),
          ...expenseToAdd,
        },
        ]);
        setNewExpense({ description: "", amount: "" });
        setShowModal(false);
        fetchExpenses();
      } else {
        alert("Failed to add expense.");
      }
    } catch (error) {
      console.error("Error saving expense:", error);
      alert("Something went wrong.");
    }
  };

  const handleAddRow = () => {
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setNewExpense((prev) => ({
      ...prev,
      [field]: field === "amount" ? value.replace(/[^0-9.]/g, "") : value,
    }));
  };

  const handleTableInputChange = (index, field, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][field] = field === "amount" ? value.replace(/[^0-9.]/g, "") : value;
    setExpenses(updatedExpenses);

    // Recalculate total after updating
    if (field === "amount") {
      const totalSum = updatedExpenses.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
      setTotal(totalSum.toFixed(2));
    }
  };

  const saveEditedExpense = async (index) => {
    const expense = expenses[index];

    try {
      const res = await axios.put(`http://localhost:5000/expenses/update/${expense.id}`, {
        month: expense.month,
        description: expense.description,
        amount: parseFloat(expense.amount),
      });

      if (!res.data.success) {
        alert("Failed to save changes.");
      }
    } catch (err) {
      console.error("Error saving changes:", err);
      alert("Something went wrong.");
    }
  };


  // const handleCalculateTotal = () => {
  //   const filtered = expenses.filter((e) => e.month === selectedMonth);
  //   const sum = filtered.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
  //   setTotal(sum.toFixed(2));
  // };

  const handleEditRow = (index) => {
    setEditingIndex(index);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="expense-table-container">
      {/* Header Section */}
      <div className="table-header">
        <select value={selectedMonth} onChange={handleMonthChange} className="month-dropdown">
          {getAllMonths().map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <button className="add-button" onClick={handleAddRow}>
        + Add
      </button>

      {/* Table */}
      <table className="expense-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Expenditure Description</th>
            <th>Amount (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense.id || index}>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={expense.month}
                    onChange={(e) => handleTableInputChange(index, "month", e.target.value)}
                  />
                ) : (
                  expense.month
                )}
              </td>

              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={expense.description}
                    onChange={(e) => handleTableInputChange(index, "description", e.target.value)}
                  />
                ) : (
                  expense.description
                )}
              </td>

              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={expense.amount}
                    onChange={(e) => handleTableInputChange(index, "amount", e.target.value)}
                    onBlur={() => saveEditedExpense(index)}
                  />

                ) : (
                  `₹${parseFloat(expense.amount || 0).toFixed(2)}`
                )}
              </td>

              <td>
                <button className="edit-button" onClick={() => handleEditRow(index)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {/* Total Calculation - moved outside the table */}
      <div className="calculate-section">
        {/* <button className="calculate-button" onClick={handleCalculateTotal}>
          Total
        </button> */}
        <input
          type="text"
          value={total ? `₹${total}` : ""}
          readOnly
          className="total-field"
          placeholder="Total amount"
        />
      </div>

      {/* Add Expense Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Expense for {selectedMonth}</h3>

            <input
              type="text"
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />

            <input
              type="text"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              onBlur={() => {
                if (isNaN(parseFloat(newExpense.amount))) {
                  setNewExpense((prev) => ({ ...prev, amount: "" }));
                }
              }}
            />

            <div className="modal-buttons">
              <button className="save-button" onClick={handleSaveExpense}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTable;
