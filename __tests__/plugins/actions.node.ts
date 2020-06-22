import { Vue } from 'nuxt-property-decorator';
import { mock } from '~/__tests__/__utils__/mock';

describe('plugins/actions', () => {
    beforeAll(async () => {
        mock('~/utils', ['decorators/store.watch']);
        mock('~/modules/explorer', [
            'analyze/explorer',
            'analyze/images/images',
        ]);

        jest.mock('~/actions/actions.import', () => ({
            actions: {
                resetMousetrap: { call: jest.fn() },
            },
        }));

        const { installPlugin } = await import('~/__tests__/__utils__/nuxt');
        const { default: actions } = await import('~/plugins/actions');

        installPlugin(actions);
    });

    it('component should have method `$action`', () => {
        expect.hasAssertions();
        const component = new Vue();
        expect(() => component.$action(x => x.resetMousetrap)).not.toThrow();
    });
});
