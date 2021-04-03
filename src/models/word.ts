import { v4 } from 'uuid';
import { writeToFile } from '../utils/write-to-file';
import { getDataFromFile } from '../utils/get-data-from-file';
import { WordDTO } from '../typings';
import { DATA_PATH } from '../constants';

export class Word {
    title: string;
    translation: string;
    partOfSpeech: string;
    sentence: string;
    article: string | null;
    id: string;

    constructor(
        title: string,
        translation: string,
        partOfSpeech: string,
        sentence: string,
        article: string | null,
        id?: string
    ) {
        this.id = id === undefined ? v4() : id;
        this.article = article === null ? null : article;
        this.title = title;
        this.translation = translation;
        this.partOfSpeech = partOfSpeech;
        this.sentence = sentence;
    }

    static async getAll() {
        try {
            const wordList = await getDataFromFile(DATA_PATH);
            if (wordList === undefined) {
                return [];
            }
            const parsedWordList: WordDTO[] = JSON.parse(wordList);
            return parsedWordList;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    static async getById(wordId: string) {
        const words = await Word.getAll();
        const wordData = words.find(word => word.id === wordId);
        if (wordData === undefined) {
            return null;
        }
        const { title, translation, partOfSpeech, sentence, article, id } = wordData;
        return new Word(title, translation, partOfSpeech, sentence, article, id);
    }

    static async deleteById(wordId: string) {
        try {
            const words = await Word.getAll();
            const updatedWords = words.filter(word => word.id !== wordId);
            await writeToFile(DATA_PATH, JSON.stringify(updatedWords));
        } catch (e) {
            console.log(e);
        }
    }

    async save() {
        try {
            const wordData = {
                id: this.id,
                title: this.title,
                translation: this.translation,
                partOfSpeech: this.partOfSpeech,
                sentence: this.sentence,
                article: this.article,
            };
            const words = await Word.getAll();

            if (words.length === 0) {
                const initWordsList = [wordData];
                await writeToFile(DATA_PATH, JSON.stringify(initWordsList));
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
                await writeToFile(DATA_PATH, JSON.stringify(updatedWords));
            }
        } catch (e) {
            console.log(e);
        }
    }
}
