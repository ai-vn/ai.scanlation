import postcssFunctions from 'postcss-functions';
import postcssFunctionsOptions from '~/assets/helpers/functions/postcss.functions';

describe('assets/helper/functions/postcss.functions', () => {
    it('should be defined', async () => {
        expect.hasAssertions();
        const functions = postcssFunctions(postcssFunctionsOptions);
        expect(functions).toBeDefined();
        expect(functions.postcssPlugin).toStrictEqual('postcss-functions');
    });
});
