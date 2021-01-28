const { v4 } = require('uuid');
const { writeToFile } = require('../utils/writeToFile');
const { getDataFromFile } = require('../utils/getDataFromFile');
const { FILE_PATH } = require('../constants');

class Word {
    constructor(word, translation, partOfSpeech, sentence, article, id) {
        this.id = id ? id : v4();
        this.word = word;
        this.translation = translation;
        this.partOfSpeech = partOfSpeech;
        this.sentence = sentence;
        this.article = article ? article : null;
    }

    static async getAll() {
        try {
            const wordsList = await getDataFromFile(FILE_PATH);
            const parsedWordList = JSON.parse(wordsList);
            if (parsedWordList === undefined || parsedWordList === '') {
                return [];
            }
            return parsedWordList;
        } catch(e) {
            console.log(e);
        }
    }

    static async getById(wordId) {
        const words = await Word.getAll();

        const wordData = words.find(word => word.id === wordId);
        if (wordData === undefined) {
            return null;
        }
        const { word, translation, partOfSpeech, sentence, article, id } = wordData;
        return new Word(word, translation, partOfSpeech, sentence, article, id);
    }

    static async deleteById(wordId) {
        try {
            const words = await Word.getAll();
            const updatedWords = words.filter(word => word.id !== wordId);
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
                article: this.article,
            };
            const words = await Word.getAll();

            if (words.length === 0) {
                const initWordsList = [wordData];
                await writeToFile(FILE_PATH, JSON.stringify(initWordsList));
            } else {
                let isWordUpdated = false;
                let updatedWords = words.map(word => {
                    if (word.id === wordData.id) {
                        isWordUpdated = true;
                        return wordData;
                    }
                    return word;
                });
                if (!isWordUpdated) {
                    updatedWords = words.concat(wordData);
                }
                await writeToFile(FILE_PATH, JSON.stringify(updatedWords));
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = Word;
