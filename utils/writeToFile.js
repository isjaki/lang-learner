const path = require('path');
const fs = require('fs').promises;
const root = require('./root');

/**
 * Asynchronously writes data to a file, replacing the file if it already exists 
 * @param {string} filename file name with an extention
 * @param {string | Buffer} data data to write
 * @returns {Promise<void>}
 */
async function writeToFile(filename, data) {
    try {
        await fs.writeFile(path.join(root, filename), data);
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    writeToFile,
};
