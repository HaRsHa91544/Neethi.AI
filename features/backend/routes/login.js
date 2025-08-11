const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const router = express.Router();


router.post('/login', async (req, res) => {
    const mobile = req.body.mobile;
    const password = req.body.password;
    const isValid = await validateUser(mobile, password);
    res.json({ isValid });
});

async function validateUser(mobile, password) {
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE mobile = ?', [mobile]);
        if (rows.length === 0) {
            return false;
        }
        else {
            let validPass = bcrypt.compare(password, rows[0].password_hash);
            if (validPass) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    catch (error) {
        return 'ERROR';
    }
}

module.exports = router;
