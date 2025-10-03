const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const db = require('../db');

router.post('/history', async (req, res) => {
    const token = req.body.token;
    let mobile;
    if (!token) res.json({ success: false, message: 'Unathorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        mobile = decoded.mobile;
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.json({ success: false, message: 'Unathorized' });
        }
    }
    try {
        const [rows] = await db.execute('SELECT submissions.*, GROUP_CONCAT(sources.name) as "sources" FROM submissions JOIN sources ON submissions.articleId=sources.articleId WHERE mobile=? GROUP BY articleId;', [mobile]);
        if (rows.length == 0) {
            res.json({ success: false, message: 'Not found' });
            return;
        } else {
            res.json({ success: true, rows });
        }
    }
    catch (error) {
        console.log(error);
        return { success: false, message: 'System Failure, Try again!' };
    }
});

module.exports = router;