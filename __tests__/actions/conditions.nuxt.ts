import { NuxtApp } from '@nuxt/types/app';

describe('actions/conditions', () => {
    beforeAll(() => {
        window.$nuxt = {
            $router: { currentRoute: { name: 'explorer' } },
        } as NuxtApp;
    });

    it('should', async () => {
        expect.hasAssertions();

        const { isExplorer } = await import('~/actions/conditions');

        const result = isExplorer();
        expect(result).toBeTrue();
    });
});
