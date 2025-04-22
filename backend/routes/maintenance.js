const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/maintenance
app.post('/', (req, res) => {
    const { flat_no, owner_name, month, amount } = req.body;

    if (!flat_no || !owner_name || !month || !amount) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const sql = 'INSERT INTO maintenance(flat_no, owner_name, month, amount) VALUES (?, ?, ?, ?)';
    db.query(sql, [flat_no, owner_name, month, amount], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Payment saved.', id: result.insertId });
    });
});

module.exports = router;
