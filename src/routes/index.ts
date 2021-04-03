import express from 'express';
import * as main from '../controllers';
import * as word from '../controllers/word';

const router = express.Router();

router.get('/', main.getMain);

router.get('/words', word.getWords);

router.get('/words/:id/delete', word.deleteWord);

router.get('/words/:id/edit', word.editWord);

router.post('/add-word', word.addWord);

router.post('/update-word/:id', word.updateWord);

export default router;;
