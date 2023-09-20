const express = require('express');

const app = express()
const SERVER_PORT = 5000


app.listen(SERVER_PORT, () => {console.log(`Server listening on port ${SERVER_PORT}.`)})