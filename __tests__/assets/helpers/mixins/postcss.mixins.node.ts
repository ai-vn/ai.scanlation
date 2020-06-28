import postcssMixins from 'postcss-mixins';
import postcssMixinsOptions from '~/assets/helpers/mixins/postcss.mixins';

describe('assets/helper/mixins/postcss.mixins', () => {
    it('should be defined', () => {
        expect.hasAssertions();
        const mixins = postcssMixins(postcssMixinsOptions);
        expect(mixins).toBeDefined();
        expect(mixins.postcssPlugin).toStrictEqual('postcss-mixins');
    });
});
