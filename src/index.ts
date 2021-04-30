import { config } from 'dotenv';
config();

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import router from './routes/index';
import { getPageNotFound } from './controllers';
import { root } from './utils/root';
import appConfig from './config';

const { PORT, HOSTNAME } = appConfig;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(root, '..', 'views'));

app.use(express.static(path.join(root, '..', 'public')));

app.use('/', router);

app.use(getPageNotFound);

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});
