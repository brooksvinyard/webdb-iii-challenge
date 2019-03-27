
const express = require('express');

const cohortRouter = require('./api/cohort-router.js');

const server = express();

server.use(express.json());

server.use('/api/cohorts', cohortRouter);

module.exports = server;