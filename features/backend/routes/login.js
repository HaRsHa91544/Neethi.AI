const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

router.post('/login', async (req, res) => {
    const mobile = req.body.mobile;
    const pin = req.body.pin;
    const isValid = await validateUser(mobile, pin);
    res.json(isValid);
});

async function validateUser(mobile, pin) {
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE mobile = ?', [mobile]);
        if (rows.length === 0) {
            return { success: false, message: 'Entered mobile number is incorrect' };
        }
        else {
            let validPass = await bcrypt.compare(pin, rows[0].pin);
            if (validPass) {
                const token = jwt.sign({ name: rows[0].name, mobile }, JWT_SECRET, { expiresIn: '24h' })
                return { success: true, token };
            }
            else {
                return { success: false, message: 'Entered Pin is incorrect' };
            }
        }
    }
    catch (error) {
        console.log(error);
        return { success: false, message: 'System Failure, Try again!' };
    }
}

module.exports = router;
