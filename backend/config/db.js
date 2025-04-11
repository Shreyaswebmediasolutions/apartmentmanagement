const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "apartmentdb",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connecting...");
});

// ✅ Export the promise wrapper
module.exports = db.promise();
