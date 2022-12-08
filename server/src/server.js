const express = require('express');
const server = express();
const port = process.env.NODE_PORT || 1337;

server.listen(port, () => console.log(`server started on port ${port}`));
