const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "apartmentdb",
  port: 3306
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// ✅ Export the promise wrapper
module.exports = db.promise();
