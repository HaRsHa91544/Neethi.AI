const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

router.post('/check-url', async (req, res) => {
    try {
        const token = req.body.token;
        const url = req.body.url;
        const urlId = req.body.urlId;

        if (!token) res.json({ message: 'No token' })

        const decoded = jwt.verify(token, JWT_SECRET);
        const mobile = decoded.mobile;

        const request = await fetch('http://localhost:5678/webhook/776e35c1-2e51-431e-bca1-36960f702fce', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ urlId, mobile, url })
        });

        const response = await request.json();
        res.json(response);
    }
    catch (error) {
        console.log('Webhook error');
    }
});

module.exports = router;