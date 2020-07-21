const path = require('path');
const fs = require('fs').promises;
const root = require('./root');

/**
 * Gets the contents of an html file from Views folder
 * @param {string} name file name
 * @returns {Promise<string>} html file content
 */
async function getHtml(name) {
    try {
        return await fs.readFile(path.join(root, 'views', `${name}.html`), 'utf-8');
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getHtml,
};
