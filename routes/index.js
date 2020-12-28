const express = require('express');
const router = express.Router();

const mainController = require('../controllers/index');
const wordController = require('../controllers/word');

router.get('/', mainController.getMain);

router.get('/words', wordController.getWords);

router.post('/add-word', wordController.addWord);

module.exports = router;
