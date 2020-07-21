const controller = require('../controllers/index');

async function requestHandler(req, res) {
    const url = req.url;
    const method = req.method;

    if (url === '/' && method === 'GET') {
        await controller.getMain(req, res);
    } else if (url === '/add-word' && method === 'POST') {
        controller.postAddWord(req, res);
    } else if (url === '/words' && method === 'GET') {
        await controller.getWords(req, res);
    } else if (url.includes('css') && method === 'GET') {
        await controller.getCSS(req, res);
    } else {
        await controller.getPageNotFound(req, res);
    }
}

module.exports = {
    requestHandler,
};
