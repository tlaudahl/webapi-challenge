const express = require('express');
const projectRoute = require('./routes/projectRoutes');

const server = express();

server.use('/projects', projectRoute);

server.listen(4000, () => {
    console.log("\n === Server listening on port 4000 === \n");
})
