const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

router.post('/check-news', async (req, res) => {
    try {
        const token = req.body.token;
        const news = req.body.news;
        const articleId = req.body.articleId;

        if (!token) res.json({ message: 'No token' })

        const decoded = jwt.verify(token, JWT_SECRET);
        const mobile = decoded.mobile;

        const request = await fetch('http://localhost:5678/webhook-test/91a67ec4-3dc4-4c26-b842-650aaa555522', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ articleId, mobile, news })
        });

        const response = await request.json();
        res.json(response);
    }
    catch (error) {
        console.log('Webhook error');
    }
});

module.exports = router;