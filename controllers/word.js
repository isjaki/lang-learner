const Word = require('../models/word');

exports.addWord = async function(req, res) {
    const word = new Word(
        req.body.word,
        req.body.translation,
        req.body.partOfSpeech,
        req.body.sentence,
    );
    await word.save();

    res.redirect('/words');
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
