const path = require('path');
const fs = require('fs').promises;
const root = require('./root');

/**
 * Gets the contents of an ejs file from Views folder
 * @param {string} name file name
 * @returns {Promise<string>} ejs file content
 */
async function getView(name) {
    try {
        return await fs.readFile(path.join(root, 'views', `${name}.ejs`), 'utf-8');
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getView,
};
