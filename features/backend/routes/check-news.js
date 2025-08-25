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

        const request = await fetch('http://localhost:5678/webhook-test/84f8c6a0-c93e-43d6-b816-c6596b71a3f4', {
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