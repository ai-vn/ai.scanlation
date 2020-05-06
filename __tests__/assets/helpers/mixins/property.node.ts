import postcss from 'postcss';
import postcssMixins from 'postcss-mixins';
import postcssMixinsOptions from '~/assets/helpers/mixins/postcss.mixins';

const pcss = `body {
    @mixin property color, red;
}`;

describe('assets/helper/mixins/property', () => {
    it('should support `property` mixins', () => {
        expect.hasAssertions();
        const mixins = postcssMixins(postcssMixinsOptions);
        const css = postcss()
            .use(mixins)
            .process(pcss)
            .css.replace(/\s+/g, ' ');
        expect(css).toStrictEqual(`body { color: red; }`);
    });
});
