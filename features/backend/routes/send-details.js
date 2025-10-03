const express = require('express');
const db = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

router.post('/send-details', async (req, res) => {
    try {
        const token = req.body.token;
        const name = req.body.name;
        const email = req.body.email;

        if (!token) res.json({ message: 'No token', success: false })

        const decoded = jwt.verify(token, JWT_SECRET);
        const mobile = decoded.mobile;

        const [result] = await db.execute('UPDATE users SET name = ?, email = ? WHERE mobile = ?', [name, email, mobile]);
        if (result) { res.json({ success: true }); }
    }
    catch (e) {
        res.json({ success: false });
    }
});

module.exports = router;