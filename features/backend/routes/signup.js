const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

router.post('/signup', async (req, res) => {
    const name = req.body.name;
    const mobile = req.body.mobile;
    const pin = req.body.pin;
    if (validateName(name) && validateMobile(mobile) && validatePin(pin)) {
        let result = await addUser(name, mobile, pin);
        res.json(result);
    }
    else {
        res.json({ success: false, message: 'You have entered incorrect credentials' })
    }
});

async function addUser(name, mobile, pin) {
    try {
        pin = await bcrypt.hash(pin, 10);
        const [result] = await db.execute('INSERT INTO users (name, mobile, pin) VALUES (?, ?, ?)', [name, mobile, pin]);
        const jwt_token = jwt.sign({ name, mobile }, JWT_SECRET, { expiresIn: '24h' });
        return { success: true, token: jwt_token };
    }
    catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return { success: false };
        }
        return { success: false, message: 'System Failure!' }
    }
}

function validateName(name) {
    // Only allow letters and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name) && name.trim().length > 0;
}

function validateMobile(mobile) {
    // Only allow exactly 10 digits
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
}

function validatePin(pin) {
    // Only allow exactly 4 digits
    const pinRegex = /^\d{4}$/;
    return pinRegex.test(pin);
}

module.exports = router;