const express = require('express');
const router = express.Router();

router.post('/check-news', (req, res) => {
    const news = req.body.news;
    res.json({result:`${news} is fake news`});
});

module.exports = router;