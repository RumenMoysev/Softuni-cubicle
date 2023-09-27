const express = require('express');

const SERVER_PORT = 5000;
const app = express();

const expressConfigurator = require('./config/expressConfigurator.js');
const handlebarsConfigurator = require('./config/handlebarsConfigurator.js');

const router = require('./routes.js');

const connectDb = require('./config/dbConfig.js')

connectDb().then(() => console.log('Db connected.'))
.catch((error) => console.log('Db connection failed', error))

expressConfigurator(app);
handlebarsConfigurator(app);

app.use(router);

app.listen(SERVER_PORT, () => {console.log(`Server listening on port ${SERVER_PORT}.`)});