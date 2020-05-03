import postcss from 'postcss';
import postcssFunctions from 'postcss-functions';
import postcssMixins from 'postcss-mixins';
import postcssFunctionsOptions from '~/assets/helpers/functions/postcss.functions';
import postcssMixinsOptions from '~/assets/helpers/mixins/postcss.mixins';

describe('assets/helper/functions/dimensions.ts', () => {
    const functions = postcssFunctions(postcssFunctionsOptions);
    const mixins = postcssMixins(postcssMixinsOptions);
    const processor = postcss().use(functions).use(mixins);

    describe('function only(direction, value, elseValue)', () => {
        it.each([
            ['top', 'red blue blue blue'],
            ['x', 'blue red blue red'],
            ['y', 'red blue red blue'],
        ])('should work with value `%p`', (dimension, expected) => {
            expect.hasAssertions();
            const pcss = `div {
                border-color: only(${dimension}, red, blue);
            }`;
            const css = processor.process(pcss).css.replace(/\s+/g, ' ');
            expect(css).toStrictEqual(`div { border-color: ${expected}; }`);
        });
    });

    describe('function opposite(direction)', () => {
        it.each([
            ['top', 'bottom'],
            ['right', 'left'],
        ])('should work with value `%p`', (direction, expected) => {
            expect.hasAssertions();
            const pcss = `div {
                @mixin property opposite(${direction}, margin), 1px;
            }`;
            const css = processor.process(pcss).css.replace(/\s+/g, ' ');
            expect(css).toStrictEqual(`div { margin-${expected}: 1px; }`);
        });

        it('should throw error', () => {
            expect.hasAssertions();
            const pcss = `div {
                @mixin property opposite(err, margin), 1px;
            }`;
            jest.spyOn(global.console, 'error').mockImplementation();
            expect(() => processor.process(pcss).css).toThrow(
                `Argument of type err is not assignable to parameter of type 'top' | 'bottom' | 'left' | 'right' | 'x' | 'y'`,
            );
        });
    });
});
