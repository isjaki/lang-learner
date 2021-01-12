const Word = require('../models/word');

exports.addWord = async function(req, res) {
    const word = new Word(
        req.body.word,
        req.body.translation,
        req.body.partOfSpeech,
        req.body.sentence,
        req.body.article,
    );
    await word.save();

    res.redirect('/words');
}

exports.editWord = async function(req, res) {
    const wordId = req.params.id;
    const selectedWord = await Word.getById(wordId);

    res.render('edit-word', {
        word: selectedWord.word,
        translation: selectedWord.translation,
        article: selectedWord.article ? selectedWord.article : null,
        partOfSpeech: selectedWord.partOfSpeech,
        sentence: selectedWord.sentence,
    });
}

exports.updateWord = async function(req, res) {

}

exports.deleteWord = async function(req, res) {
    const wordId = req.params.id;
    await Word.deleteById(wordId);
    res.redirect('/words');
}

exports.getWords = async function(_, res) {
    const words = await Word.getAll();
    res.render('words', { words });
}
