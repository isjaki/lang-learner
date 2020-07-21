const path = require('path');
const fs = require('fs').promises;
const root = require('./root');

/**
 * Gets data from a file
 * @param {string} filename file name with an extention
 * @returns {Promise<string>} file data string
 */
async function getDataFromFile(filename) {
    try {
        return await fs.readFile(path.join(root, filename), 'utf-8');
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getDataFromFile,
};
