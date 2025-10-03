const express = require('express');
const db = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

router.post('/delete-account', async (req, res) => {
    try {
        const token = req.body.token;

        if (!token) res.json({ message: 'No token', success: false })

        const decoded = jwt.verify(token, JWT_SECRET);
        const mobile = decoded.mobile;

        const [result] = await db.execute('DELETE FROM users WHERE mobile = ?', [mobile]);
        if(result) { res.json({ success: true });}
    }
    catch (e) {
        res.json({ success: false });
    }
});

module.exports = router;