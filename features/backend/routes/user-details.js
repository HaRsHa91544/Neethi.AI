const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

router.post('/user-details', async (req, res) => {
    const category = req.body.category;
    const city = req.body.city;
    const token = req.body.token;

    if (!token) res.send({ message: 'Token not found' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const mobile = decoded.mobile;

    // Validate category selection
    if (category === "" || city.trim() === "") {
        res.send({ success: false, message: 'Enter correct details' });
    }

    try {
        const [result] = await db.execute('UPDATE users  SET category = ?, city = ? WHERE mobile = ?', [category, city, mobile]);
        res.send({ success: true, message: 'Details inserted in dB' });
    }
    catch (error) {
        console.log('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;