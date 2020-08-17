/* eslint-disable no-param-reassign */
import plugin from 'tailwindcss/plugin';

export const importantVariant = plugin(({ addVariant }) => {
    addVariant('important', ({ container }) => {
        container.walkRules(rule => {
            rule.selector = `.\\!${rule.selector.slice(1)}`;
            rule.walkDecls(decl => (decl.important = true));
        });
    });
});
