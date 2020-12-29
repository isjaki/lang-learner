const express = require('express');
const router = express.Router();

const mainController = require('../controllers/index');
const wordController = require('../controllers/word');

router.get('/', mainController.getMain);

router.get('/words', wordController.getWords);

router.get('/words/:id/delete', wordController.deleteWord);

router.post('/add-word', wordController.addWord);

module.exports = router;
