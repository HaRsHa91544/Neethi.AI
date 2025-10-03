const express = require('express');
const cors = require('cors');
const neethi = express();
neethi.use(cors());
neethi.use(express.json());

const checknewsRoute = require('./routes/check-news');
const checkurlRoute = require('./routes/check-url');
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const checkTokenRoute = require('./routes/check-token');
const userDetails = require('./routes/user-details');
const history = require('./routes/history');
const getDetails = require('./routes/get-details');
const deleteAccount = require('./routes/delete-account');
const sendDetails = require('./routes/send-details');


neethi.use('/', history);
neethi.use('/', getDetails);
neethi.use('/', checknewsRoute);
neethi.use('/', checkurlRoute);
neethi.use('/', loginRoute);
neethi.use('/', signupRoute);
neethi.use('/', checkTokenRoute);
neethi.use('/', userDetails);
neethi.use('/', deleteAccount);
neethi.use('/', sendDetails);


neethi.get('/', (req, res) => {
    res.send('Neethi Server is Live');
});

neethi.listen(3000, () => {
    console.log('Neethi Server Started at 3000');
});

