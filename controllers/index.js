
const path = require('path');
const { getHtml } = require('../utils/getHtml');
const { parseRequestBody } = require('../utils/parseRequestBody');
const { writeToFile } = require('../utils/writeToFile');
const { getDataFromFile } = require('../utils/getDataFromFile');

const FILE_PATH = 'data/words.json';

async function getMain(_, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(await getHtml('main'));
    res.end();
}

function postAddWord(req, res) {
    const chunks = [];
    req.on('data', chunk => {
        chunks.push(chunk);
    });
    req.on('end', async () => {
        const bodyString = Buffer.concat(chunks).toString();
        const userData = parseRequestBody(bodyString);
        const users = await getDataFromFile(FILE_PATH);
        if (users === undefined || users === '') {
            const initUsersList = [userData];
            await writeToFile(FILE_PATH, JSON.stringify(initUsersList));
        } else {
            const usersList = JSON.parse(users);
            const updatedUsers = usersList.concat(userData);
            await writeToFile(FILE_PATH, JSON.stringify(updatedUsers));
        }
        res.writeHead(303, { 'Location': '/' });
        res.end();
    });
}

async function getWords(_, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(await getDataFromFile(FILE_PATH));
    res.end();
}

async function getCSS(req, res) {
    const fileName = path.basename(req.url);
    const fileData = await getDataFromFile(`public/css/${fileName}`);
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.write(fileData);
    res.end();
}

async function getPageNotFound(_, res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(await getHtml('404'));
    res.end();
}

module.exports = {
    getMain,
    postAddWord,
    getWords,
    getPageNotFound,
    getCSS,
};
