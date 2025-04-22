require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const cors = require("cors");
const roomRoutes = require("./routes/roomRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://147.93.31.45:3002",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",

  password: "", // Your MySQL password
  database: "apartmentDB", // Your database name

  password: "Shreyas4321@",
  database: "apartmentdb",

});

db.connect((err) => {
  if (err) {
    console.error("Database connection was failed:", err);
    return;
  }
  console.log("MySQL Connected...");
});

// Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/owners", ownerRoutes);


// Register User
app.post("/register", (req, res) => {
  const { name, address, contact, email, userId, userRole, password } = req.body;

  if (!name || !address || !contact || !email || !userId || !userRole || !password) {


// ✅ Register API - Fixing Table Names
app.post("/register", (req, res) => {
  const { name, address, contact, email, userId, userRole, password } =
    req.body;
  console.log("req.body", req.body);

  if (
    !name ||
    !address ||
    !contact ||
    !email ||
    !userId ||
    !userRole ||
    !password
  ) {

    return res.status(400).json({ message: "All fields are required!" });
  }

  const sql = `
    INSERT INTO users (name, address, contact, email, userId, userRole, password)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, address, contact, email, userId, userRole, password], (err) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ message: "Registration failed!" });
    }
    res.status(201).json({ message: "User registered successfully!" });
  });
});

// Login User
app.post("/login", (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: "User ID and Password are required!" });
  }

  const sql = "SELECT * FROM users WHERE userId = ? AND password = ?";
  db.query(sql, [userId, password], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ message: "Server error!" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid User ID or Password!" });
    }

    res.status(200).json({ message: "Login Successful!", user: results[0] });
  });
});

// Executive Member - Add
app.post("/executivemember", (req, res) => {
  const { flat_no, name, position, contact_no } = req.body;

  if (!flat_no || !name || !position || !contact_no) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const sql = `
    INSERT INTO members (flat_no, name, position, contact_no)
    VALUES (?, ?, ?, ?)`;

  db.query(sql, [flat_no, name, position, contact_no], (err) => {
    if (err) {
      return res.status(500).json({ message: "Registration failed!" });
    }
    res.status(201).json({ message: "Executive member registered successfully!" });
  });
});

// Executive Member - Get Latest Per Position
app.get("/executivemembers", (req, res) => {
  const sql = `
    SELECT m1.* FROM members m1
    INNER JOIN (
        SELECT position, MAX(created_at) AS max_created
        FROM members
        GROUP BY position
    ) m2 
    ON m1.position = m2.position AND m1.created_at = m2.max_created
    ORDER BY m1.created_at DESC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching members:", err);
      return res.status(500).json({ message: "Failed to retrieve members" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No members found" });
    }

    res.status(200).json(results);

    res.status(200).json(results); // Returns the latest member for each position gdh

  });
});

// Executive Member - Update
app.put("/executivemember/:id", (req, res) => {
  const { id } = req.params;
  const { flat_no, name, position, contact_no } = req.body;

  const sql = `
    UPDATE members SET flat_no = ?, name = ?, position = ?, contact_no = ?
    WHERE id = ?`;

  db.query(sql, [flat_no, name, position, contact_no, id], (err) => {
    if (err) {
      return res.status(500).json({ message: "Update failed!", error: err });
    }
    res.json({ message: "Executive member updated successfully!" });
  });
});

// Executive Member - Get by Position
app.get("/executivemembers/position/:position", (req, res) => {
  const { position } = req.params;
  const sql = `
    SELECT * FROM members
    WHERE position = ?
    ORDER BY created_at DESC`;

  db.query(sql, [position], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to retrieve members" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No members found for this position" });
    }
    res.status(200).json(results);
  });
});

// Maintenance - Add Record
app.post("/api/maintenance", (req, res) => {
  const { flat_no, owner_name, month, amount } = req.body;

  if (!flat_no || !owner_name || !month || !amount) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const sql = `
    INSERT INTO maintenance (flat_no, owner_name, month, amount)
    VALUES (?, ?, ?, ?)`;

  db.query(sql, [flat_no, owner_name, month, amount], (err) => {
    if (err) {
      console.error("Error inserting maintenance record:", err);
      return res.status(500).json({ message: "Failed to save maintenance!" });
    }
    res.status(201).json({ message: "Maintenance record saved successfully!" });
  });
});

// Maintenance - Get All Records
app.get("/api/maintenance", (req, res) => {
  const sql = "SELECT * FROM maintenance ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching maintenance records:", err);
      return res.status(500).json({ message: "Failed to retrieve records" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No maintenance records found" });
    }
    res.status(200).json(results);
  });
});

// Yearly Spending - Add Record
app.post("/api/spending", (req, res) => {
  const { year, category, description, amount } = req.body;

  if (!year || !category || !amount) {
    return res.status(400).json({ message: "Year, Category and Amount are required!" });
  }

  const sql = `
    INSERT INTO yearly_spending (year, category, description, amount)
    VALUES (?, ?, ?, ?)`;

  db.query(sql, [year, category, description, amount], (err, result) => {
    if (err) {
      console.error("Error inserting spending record:", err);
      return res.status(500).json({ message: "Database error!" });
    }
    res.status(201).json({
      message: "Spending record added successfully!",
      id: result.insertId,
    });
  });
});


  
  
  
// Server Listen
app.listen(5000, () => console.log("Server running on port 5000"));
// Contacts - Get All Users
app.get("/api/contacts", (req, res) => {
  const sql = "SELECT id, name, contact, email, address, userRole FROM users ORDER BY name";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching contacts:", err);
      return res.status(500).json({ message: "Failed to retrieve contacts" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }
    res.status(200).json(results);
  });
});
// Yearly Spending - Get All Records
app.get("/api/spending", (req, res) => {
  const sql = "SELECT * FROM yearly_spending ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching spending records:", err);
      return res.status(500).json({ message: "Failed to retrieve spending records" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No spending records found" });
    }
    res.status(200).json(results);
  });
});


app.post('/expenses/add', (req, res) => {
  const { month, description, amount } = req.body;
  const sql = 'INSERT INTO expenses (month, description, amount) VALUES (?, ?, ?)';
  db.query(sql, [month, description, amount], (err, result) => {
    if (err){
      console.error('Error inserting expense:',err);
      return res.status(500).send({ success: false, error: err.message });
    }
    res.send({ success: true, message: 'Expense added successfully' });
  });
});

// ✅ GET: /expenses/:month
app.get("/expenses/:month", (req, res) => {
  const month = req.params.month; // e.g., "April 2025"
  const query = "SELECT * FROM expenses WHERE month = ?";
  db.query(query, [month], (err, results) => {
    if (err) {
      console.error('Error fetching expenses:', err);
      return res.status(500).send({ success: false, error: err.message });
    }
    res.send({ success: true, data: results });
  });
});



router.put('/expenses/add', (req, res) => {
  const { id } = req.params;
  const { month, description, amount } = req.body;
  console.log(req.body);

  const query = `
    UPDATE expenses 
    SET month = ?, description = ?, amount = ? 
    WHERE id = ?`;
    
  db.query(query, [month, description, amount], (err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.send({ success: true, message: 'Expense updated' });
  });
});

// Update an existing expense
app.put('/expenses/update/:id', (req, res) => {
  const { id } = req.params;
  const { month, description, amount } = req.body;

  const query = 'UPDATE expenses SET month = ?, description = ?, amount = ? WHERE id = ?';
  db.query(query, [month, description, amount, id], (err, result) => {
    if (err) {
      console.error('Error updating expense:', err);
      return res.status(500).send({ success: false, error: err.message });
    }
    res.send({ success: true });
  });
});



module.exports = router;

// ✅ Server Running
app.listen(5000, () => console.log("Server is running on port 5000"));

app.get("/server", (req, res) => {
  res.json({ message: "Server Running Successfully" });
});

// ✅ Server Running
app.listen(5001, "0.0.0.0", () => {
  console.log("✅ Server running on http://0.0.0.0:5001");
});
