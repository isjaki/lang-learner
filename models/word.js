const { v4 } = require('uuid');
const { writeToFile } = require('../utils/writeToFile');
const { getDataFromFile } = require('../utils/getDataFromFile');
const { FILE_PATH } = require('../constants');

class Word {
    constructor(word, translation, partOfSpeech, sentence) {
        this.id = v4();
        this.word = word;
        this.translation = translation;
        this.partOfSpeech = partOfSpeech;
        this.sentence = sentence;
    }

    static async getAll() {
        try {
            const wordsList = await getDataFromFile(FILE_PATH);
            return JSON.parse(wordsList);
        } catch(e) {
            console.log(e);
        }
    }

    static async deleteById(id) {
        try {
            const words = await Word.getAll();
            const updatedWords = words.filter(word => word.id !== id);
            await writeToFile(FILE_PATH, JSON.stringify(updatedWords));
        } catch (e) {
            console.log(e);
        }
    }

    async save() {
        try {
            const wordData = {
                id: this.id,
                word: this.word,
                translation: this.translation,
                partOfSpeech: this.partOfSpeech,
                sentence: this.sentence,
            };
            const words = await getDataFromFile(FILE_PATH);
            if (words === undefined || words === '') {
                const initWordsList = [wordData];
                await writeToFile(FILE_PATH, JSON.stringify(initWordsList));
            } else {
                const wordsList = JSON.parse(words);
                const updatedWords = wordsList.concat(wordData);
                await writeToFile(FILE_PATH, JSON.stringify(updatedWords));
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = Word;
