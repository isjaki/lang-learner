import { Request, Response } from 'express';
import { Word } from '../models/word';
import { WordDTO } from '../typings';

export async function addWord(req: Request<{}, {}, WordDTO>, res: Response) {
    const word = new Word(
        req.body.title,
        req.body.translation,
        req.body.partOfSpeech,
        req.body.sentence,
        req.body.article,
    );
    await word.save();

    res.redirect('/words');
}

export async function editWord(req: Request<{ id: string }>, res: Response) {
    const wordId = req.params.id;

    try {
        const selectedWord = await Word.getById(wordId);
        if (selectedWord === null) {
            throw new Error(`No word with id ${wordId} was found`);
        }
        res.render('edit-word', {
            wordId: selectedWord.id,
            title: selectedWord.title,
            translation: selectedWord.translation,
            article: selectedWord.article,
            partOfSpeech: selectedWord.partOfSpeech,
            sentence: selectedWord.sentence,
        });
    } catch(e) {
        console.log(e);
    }
}

export async function updateWord(req: Request<{ id: string }, {}, WordDTO>, res: Response) {
    const wordId = req.params.id;
    try {
        const word = await Word.getById(wordId);
        if (word === null) {
            throw new Error(`No word with id ${wordId} was found`);
        }
        const { title, translation, partOfSpeech, sentence, article } = req.body;

        word.title = title;
        word.translation = translation;
        word.partOfSpeech = partOfSpeech;
        word.sentence = sentence;
        word.article = article;
        await word.save();

        res.redirect('/words');
    } catch(e) {
        console.log(e);
    }
}

export async function deleteWord(req: Request<{ id: string }>, res: Response) {
    const wordId = req.params.id;
    await Word.deleteById(wordId);
    res.redirect('/words');
}

export async function getWords(_: Request, res: Response) {
    const words = await Word.getAll();
    res.render('words', { words });
}
