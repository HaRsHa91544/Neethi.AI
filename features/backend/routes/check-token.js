const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { JWT_SECRET } = require('../config');

router.post('/check-token', (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.json({ valid: false });

    jwt.verify(token, JWT_SECRET, (err) => {
        if (err) return res.json({ valid: false });
        res.json({ valid: true });
    });
});

module.exports = router;