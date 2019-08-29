/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');

module.exports = {
    resolve: {
        alias: {
            '~': resolve(__dirname, '../'),
        },
    },
};
