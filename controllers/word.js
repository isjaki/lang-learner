const ejs = require('ejs');
const { v4 } = require('uuid');
const { getView } = require('../utils/getView.js');
const { parseRequestBody } = require('../utils/parseRequestBody');
const { writeToFile } = require('../utils/writeToFile');
const { getDataFromFile } = require('../utils/getDataFromFile');
const { FILE_PATH } = require('../constants');

exports.addWord = function(req, res) {
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
        res.writeHead(303, { 'Location': '/words' });
        res.end();
    });
}

exports.getWords = async function(_, res) {
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
