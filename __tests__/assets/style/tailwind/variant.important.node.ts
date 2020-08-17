import postcss from 'postcss';
import tailwind from 'tailwindcss';
import { importantVariant } from '~/assets/style/tailwind/variant.important';

describe('assets/style/tailwind/variant.important', () => {
    it('should create important variant', async () => {
        expect.hasAssertions();

        const result = await postcss([
            tailwind({
                corePlugins: ['textColor'],
                variants: { textColor: ['important'] },
                theme: { colors: { black: '#000', white: '#fff' } },
                plugins: [importantVariant],
            }),
        ]).process(
            `
                @tailwind base;
                @tailwind components;
                @tailwind utilities;
            `,
            { from: undefined },
        );

        expect(result.css).toContain('.\\!text-white');
    });
});
