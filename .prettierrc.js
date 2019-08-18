var isWin = require('os').platform() === 'win32';

module.exports = {
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    bracketSpacing: true,
    arrowParens: 'avoid',
    htmlWhitespaceSensitivity: 'ignore',
    printWidth: 80,
    endOfLine: isWin ? 'crlf' : 'lf',
    overrides: [
        {
            files: ['*.code-workspace', '.stylelintrc', '.babelrc'],
            options: { parser: 'json' },
        },
        {
            files: ['package.json', '.travis.yml'],
            options: { tabWidth: 2 },
        },
    ],
};
