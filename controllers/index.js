const path = require('path');
const ejs = require('ejs');
const { getView } = require('../utils/getView.js');
const { getDataFromFile } = require('../utils/getDataFromFile');

exports.getMain = async function(_, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const mainView = await getView('main');
    const renderedMain = ejs.render(mainView);
    res.write(renderedMain);
    res.end();
}

exports.getCSS = async function(req, res) {
    const fileName = path.basename(req.url);
    const fileData = await getDataFromFile(`public/css/${fileName}`);
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.write(fileData);
    res.end();
}

exports.getPageNotFound = async function(_, res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    const notFoundView = await getView('404');
    const renderedNotFound = ejs.render(notFoundView);
    res.write(renderedNotFound);
    res.end();
}
