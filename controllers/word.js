const { v4 } = require('uuid');
const { writeToFile } = require('../utils/writeToFile');
const { getDataFromFile } = require('../utils/getDataFromFile');
const { FILE_PATH } = require('../constants');

exports.addWord = async function(req, res) {
    const wordData = {
        id: v4(),
        word: req.body.word,
        translation: req.body.translation,
        partOfSpeech: req.body.partOfSpeech,
        sentence: req.body.sentence,
    };

    try {
        const words = await getDataFromFile(FILE_PATH);
        if (words === undefined || words === '') {
            const initWordsList = [wordData];
            await writeToFile(FILE_PATH, JSON.stringify(initWordsList));
        } else {
            const wordsList = JSON.parse(words);
            const updatedWords = wordsList.concat(wordData);
            await writeToFile(FILE_PATH, JSON.stringify(updatedWords));
        }
        res.redirect('/words');
    } catch (e) {
        console.log(e);
    }
}

exports.getWords = async function(_, res) {
    try {
        const wordsList = await getDataFromFile(FILE_PATH);
        const parsedWordsList = JSON.parse(wordsList);
        res.render('words', { words: parsedWordsList });
    } catch (e) {
        console.log(e);
    }
}
