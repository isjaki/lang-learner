/**
 * Parses the request body string and returns data in a key:value format
 * @param {string} str request body string
 * @returns {Object}
 */
function parseRequestBody(str) {
    return str
        .split('&')
        .reduce((acc, keyValueStr) => {
            const [key, value] = keyValueStr.split('=');
            acc[key] = decodeURIComponent(value).replace(/\+/g, ' ');
            return acc;
        }, {});
}

module.exports = {
    parseRequestBody,
};
