
const path = require('path');
const ejs = require('ejs');
const { v4 } = require('uuid');
const { getView } = require('../utils/getView.js');
const { parseRequestBody } = require('../utils/parseRequestBody');
const { writeToFile } = require('../utils/writeToFile');
const { getDataFromFile } = require('../utils/getDataFromFile');

const FILE_PATH = 'data/words.json';

async function getMain(_, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const mainView = await getView('main');
    const renderedMain = ejs.render(mainView);
    res.write(renderedMain);
    res.end();
}

function postAddWord(req, res) {
    const chunks = [];
    req.on('data', chunk => {
        chunks.push(chunk);
    });
    req.on('end', async () => {
        const bodyString = Buffer.concat(chunks).toString();
        const wordData = parseRequestBody(bodyString);
        wordData.id = v4();

        const words = await getDataFromFile(FILE_PATH);

        if (words === undefined || words === '') {
            const initWordsList = [wordData];
            await writeToFile(FILE_PATH, JSON.stringify(initWordsList));
        } else {
            const wordsList = JSON.parse(words);
            const updatedWords = wordsList.concat(wordData);
            await writeToFile(FILE_PATH, JSON.stringify(updatedWords));
        }
        res.writeHead(303, { 'Location': '/' });
        res.end();
    });
}

async function getWords(_, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const wordsListView = await getView('words');
    const wordsList = await getDataFromFile(FILE_PATH);
    try {
        const parsedWordsList = JSON.parse(wordsList);
        const renderedWordsList = ejs.render(wordsListView, { words: parsedWordsList });
        res.write(renderedWordsList);
    } catch (e) {
        console.log(e);
    } finally {
        res.end();
    }
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
    const notFoundView = await getView('404');
    const renderedNotFound = ejs.render(notFoundView);
    res.write(renderedNotFound);
    res.end();
}

module.exports = {
    getMain,
    postAddWord,
    getWords,
    getPageNotFound,
    getCSS,
};
