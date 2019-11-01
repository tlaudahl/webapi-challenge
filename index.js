const express = require('express');
const projectRoute = require('./routes/projectRoutes');
const actionRoute = require('./routes/actionRoutes');

const server = express();

server.use('/projects', projectRoute);
server.use('/actions', actionRoute);

server.listen(4000, () => {
    console.log("\n === Server listening on port 4000 === \n");
})
