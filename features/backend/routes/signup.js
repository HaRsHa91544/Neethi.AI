const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

router.post('/signup', async (req, res) => {
    const name = req.body.name;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const password = req.body.password;
    let result = await addUser(name, mobile, email, password);
    res.json(result);
});

async function addUser(name, mobile, email, password) {
    try {
        password = await bcrypt.hash(password, 10);
        const [result] = await db.execute('INSERT INTO users (name, mobile, email, password_hash) VALUES (?, ?, ?, ?)', [name, mobile, email, password]);
        const jwt_token = jwt.sign({ userId: result.insertId }, JWT_SECRET, { expiresIn: '5h' });
        return { success: true, token: jwt_token };
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = router;