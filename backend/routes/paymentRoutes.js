const express = require("express");
const router = express.Router();
const { addPayment, getPaymentsByCategory } = require("../controllers/paymentController");

// Route to add a payment
router.post("/add-payment", addPayment);

// Route to get payments by category
router.get("/payment-info", getPaymentsByCategory);

module.exports = router;