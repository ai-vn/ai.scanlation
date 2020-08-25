import { Vue, Component } from 'nuxt-property-decorator';
import { mock } from '~/__tests__/__utils__/mock';
import { ActionItem } from '~/actions/actions.type';

describe('utils/decorators/action', () => {
    beforeAll(() => {
        mock('~/utils', ['decorators/action']);
        jest.mock('~/actions/actions.import', () => ({
            actions: { resetMousetrap: { call: jest.fn() } },
        }));
    });

    it("shouldn't be action", async () => {
        expect.hasAssertions();

        const { isAction } = await import('~/utils');

        const result = isAction({ call: undefined });
        expect(result).toBeFalse();
    });

    it('should be typeof ActionItem', async () => {
        expect.hasAssertions();

        const { Action, isAction } = await import('~/utils');

        @Component({ template: '<div/>' })
        class ComponentWithActions extends Vue {
            @Action
            resetMousetrap!: ActionItem;

            @Action(x => x.resetMousetrap)
            reset!: ActionItem;
        }

        const component = new ComponentWithActions();
        component.reset.call();

        expect(component.reset.call).toBeFunction();
        expect(isAction(component.reset)).toBeTrue();
    });
});
