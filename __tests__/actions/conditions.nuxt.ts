import { NuxtApp } from '@nuxt/types/app';

describe('actions/conditions', () => {
    const setRouterName = (name: string) => {
        window.$nuxt = {
            $router: { currentRoute: { name } },
        } as NuxtApp;
    };

    it('should is explorer', async () => {
        expect.hasAssertions();

        setRouterName('explorer');
        const { isExplorer } = await import('~/actions/conditions');

        expect(isExplorer()).toBeTrue();
    });

    it('should is reader', async () => {
        expect.hasAssertions();

        setRouterName('reader');
        const { isReader } = await import('~/actions/conditions');

        expect(isReader()).toBeTrue();
    });
});
