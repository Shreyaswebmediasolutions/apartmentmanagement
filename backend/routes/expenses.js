const express = require('express');
const router = express.Router();
const db = require('../config/db');
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const expenseRoutes = require("./routes/expenses"); 


const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "apartmentDB",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection was failed:", err);
    return;
  } else {
  console.log("MySQL Connected...");
  }
});

// Fetch expenses for a month
app.get("/expenses/add", (req, res) => {
  const { month } = req.params;
  const query = 'SELECT * FROM expenses WHERE month = ?';
  db.query(sql, [month], (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, data: results });
  });
});

// Add new expense
app.post('/expenses/add', (req, res) => {
  const { month, description, amount } = req.body;
  console.log(req.body);

  if (!month || !description || !amount) {
    return res.status(400).json({message: 'All fields are required.' });
  }

  const sql = 'INSERT INTO expenses (month, description, amount) VALUES (?, ?, ?)';
  db.query(sql, [month, description, amount], (err, result) => {
    if (err){
      console.error("Error inserting user:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.status(201).json({message: 'Expense added successfully!' });
  });
});

// POST: Add Expense
router.post("/add", (req, res) => {
  const { month, description, amount } = req.body;

  if (!month || !description || !amount) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const insertQuery = "INSERT INTO expenses (month, description, amount) VALUES (?, ?, ?)";
  db.query(insertQuery, [month, description, amount], (err, result) => {
    if (err) {
      console.error("Error inserting expense:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    return res.status(200).json({ success: true, insertId: result.insertId });
  });
});

// 📅 Get all expenses for a specific month
app.get('/expenses/add', (req, res) => {
  const { month } = req.params;
  console.log(req.body);

  const query = 'SELECT * FROM expenses WHERE month = ?';

  db.query(query, [month], (err, results) => {
    if (err) {
      console.error(' Error fetching expenses:', err);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({
      success: true,
      data: results,
    });
  });
});

// GET: Fetch Expenses for a Month
router.get("/:month", (req, res) => {
  const selectedMonth = req.params.month;

  const query = "SELECT * FROM expenses WHERE month = ?";
  db.query(query, [selectedMonth], (err, results) => {
    if (err) {
      console.error("Error fetching expenses:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    return res.status(200).json({ success: true, data: results });
  });
});

module.exports = router;

// ✅ Server Running
app.listen(5000, () => console.log("Server is a running on port 5000"));
