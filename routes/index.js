const mainController = require('../controllers/index');
const wordController = require('../controllers/word');

exports.requestHandler = async function(req, res) {
    const url = req.url;
    const method = req.method;

    if (url === '/' && method === 'GET') {
        await mainController.getMain(req, res);
    } else if (url === '/add-word' && method === 'POST') {
        wordController.addWord(req, res);
    } else if (url === '/words' && method === 'GET') {
        await wordController.getWords(req, res);
    } else if (url.includes('css') && method === 'GET') {
        await mainController.getCSS(req, res);
    } else {
        await mainController.getPageNotFound(req, res);
    }
}
