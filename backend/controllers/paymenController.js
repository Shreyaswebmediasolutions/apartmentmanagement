const mysql = require("mysql");
const db = require("../db");

// Add a payment
exports.addPayment = (req, res) => {
  const { category, amount, payment_method, reason, date_time } = req.body;

  // Ensure required fields are provided
  if (!category || !amount || !payment_method || !date_time) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // SQL query to insert payment details
  const sql = "INSERT INTO payments (category, amount, payment_method, reason, date_time) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [category, amount, payment_method, reason || null, date_time], (err) => {
    if (err) {
      console.error("Error inserting payment:", err);
      return res.status(500).json({ message: "Payment addition failed!" });
    }
    res.status(201).json({ message: "Payment added successfully!" });
  });
};

// Get payments by category
exports.getPaymentsByCategory = (req, res) => {
  const category = req.query.category;

  // Ensure category is provided
  if (!category) {
    return res.status(400).json({ message: "Category is required!" });
  }

  // SQL query to fetch payments by category
  const sql = "SELECT * FROM payments WHERE category = ?";
  db.query(sql, [category], (err, results) => {
    if (err) {
      console.error("Error fetching payments:", err);
      return res.status(500).json({ message: "Failed to retrieve payments" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No payments found for this category" });
    }

    res.status(200).json(results);
  });
};