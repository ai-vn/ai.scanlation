import { Vue } from 'nuxt-property-decorator';
import actions from '~/plugins/actions';
import { installPlugin } from '~/__tests__/__utils__/nuxt';

describe('plugins/actions', () => {
    beforeAll(() => {
        installPlugin(actions);
    });

    it('component should have method `$action`', () => {
        expect.hasAssertions();
        const component = new Vue();
        expect(() => component.$action(x => x.resetMousetrap)).not.toThrow();
    });
});
