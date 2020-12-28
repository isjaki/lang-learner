require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes');
const { getPageNotFound } = require('./controllers');
const { PORT, HOSTNAME } = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.use(getPageNotFound);

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});
