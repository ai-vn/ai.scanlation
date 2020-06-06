/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
const plugin = require('tailwindcss/plugin');

module.exports = {
    purge: ['./**/*.vue'],
    theme: {},
    variants: {
        padding: ['important'],
        margin: ['important'],
    },
    plugins: [
        plugin(({ addVariant }) => {
            addVariant('important', ({ container }) => {
                container.walkRules(rule => {
                    rule.selector = `.\\!${rule.selector.slice(1)}`;
                    rule.walkDecls(decl => {
                        decl.important = true;
                    });
                });
            });
        }),
    ],
};
