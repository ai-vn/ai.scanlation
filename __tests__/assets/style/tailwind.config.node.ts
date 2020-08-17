import defaultConfig from 'tailwindcss/defaultConfig';
import resolveConfig from 'tailwindcss/resolveConfig';
import config from '~/assets/style/tailwind.config';

describe('assets/style/tailwind.config', () => {
    it('should resolve config', () => {
        expect.hasAssertions();

        const resolvedConfig = resolveConfig([config, defaultConfig]);
        expect(resolvedConfig).toBeDefined();
    });
});
