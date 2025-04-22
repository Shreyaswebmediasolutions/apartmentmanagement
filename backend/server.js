const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const expensesRoutes = require('./routes/expenses'); // 👈 Import the route

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ✅ Use your expense routes
app.use('/expenses/add', expensesRoutes);

// Start server
app.listen(5001, () => {
  console.log(`Server running on http://localhost:5000`);
});
