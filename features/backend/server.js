const express = require('express');
const cors = require('cors');
const neethi = express();
neethi.use(cors());
neethi.use(express.json());

const checknewsRoute = require('./routes/check-news');
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');

neethi.use('/', checknewsRoute);
neethi.use('/', loginRoute);
neethi.use('/', signupRoute);

neethi.get('/', (req, res) => {
    res.send('Neethi Server is Live');
});

neethi.listen(3000, () => {
    console.log('Neethi Server Started at 3000');
});

