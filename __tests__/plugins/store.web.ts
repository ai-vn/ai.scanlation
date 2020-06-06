import pluginStore from '~/plugins/store';
import { installPlugin } from '~/__tests__/__utils__/nuxt';

describe('plugins/store', () => {
    beforeAll(() => {
        window.onNuxtReady = (callback: () => void) => callback();
    });

    it('should pass', () => {
        expect.hasAssertions();
        expect(() => {
            installPlugin(pluginStore);
        }).not.toThrow();
    });
});
