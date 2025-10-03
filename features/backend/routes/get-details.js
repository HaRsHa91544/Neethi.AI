const express = require('express');
const db = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

router.post('/get-details', async (req, res) => {
    try {
        const token = req.body.token;

        if (!token) res.json({ message: 'No token' })

        const decoded = jwt.verify(token, JWT_SECRET);
        const mobile = decoded.mobile;

        const [rows] = await db.execute('SELECT * FROM users WHERE mobile = ?', [mobile]);
        if (rows.length === 0) {
            res.json({ success: false });
        } else {
            res.json({ name: rows[0].name, email: rows[0].email });
        }
    }
    catch (e) {
        console.log('Error occured');
    }
});

module.exports = router;