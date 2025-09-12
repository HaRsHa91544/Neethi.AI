const express = require('express');
const cors = require('cors');
const neethi = express();
neethi.use(cors());
neethi.use(express.json());

const checknewsRoute = require('./routes/check-news');
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const checkTokenRoute = require('./routes/check-token');
const userDetails = require('./routes/user-details');
const history = require('./routes/history');

neethi.use('/', history);
neethi.use('/', checknewsRoute);
neethi.use('/', loginRoute);
neethi.use('/', signupRoute);
neethi.use('/', checkTokenRoute);
neethi.use('/', userDetails);

neethi.get('/', (req, res) => {
    res.send('Neethi Server is Live');
});

neethi.listen(3000, () => {
    console.log('Neethi Server Started at 3000');
});

