import postcss from 'postcss';
import tailwind from 'tailwindcss';
import { groupSpaceUtility } from '~/assets/style/tailwind/utility.group-space';

describe('assets/style/tailwind/utility.group-space', () => {
    it('should add utility group space', async () => {
        expect.hasAssertions();

        const result = await postcss([
            tailwind({
                corePlugins: [],
                variants: {},
                theme: {},
                plugins: [groupSpaceUtility],
            }),
        ]).process(
            `
                @tailwind base;
                @tailwind components;
                @tailwind utilities;
            `,
            { from: undefined },
        );

        expect(result.css).toContain('.group-space');
    });
});
