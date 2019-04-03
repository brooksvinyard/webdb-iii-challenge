
const express = require('express');

const cohortRouter = require('./api/cohort-router.js');
const studentRouter = require('./api/student-router.js');

const server = express();

server.use(express.json());

server.use('/api/cohorts', cohortRouter);
server.use('/api/students', studentRouter);

module.exports = server;