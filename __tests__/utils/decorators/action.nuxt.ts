import { Component, Vue } from 'nuxt-property-decorator';
import { ActionItem } from '~/actions/actions.type';

describe('utils/decorators/action', () => {
    it("shouldn't be action", async () => {
        expect.hasAssertions();

        const { isAction } = await import('~/actions/isAction');

        const result = isAction({ call: undefined });
        expect(result).toBeFalse();
    });

    it('should be typeof ActionItem', async () => {
        expect.hasAssertions();

        const { isAction } = await import('~/actions/isAction');
        const { Action } = await import('~/utils');

        @Component({ template: '<div/>' })
        class ComponentWithActions extends Vue {
            @Action
            reset!: ActionItem;

            @Action(x => x.reset)
            resetAction!: ActionItem;
        }

        const component = new ComponentWithActions();
        component.reset.call();

        expect(component.reset.call).toBeFunction();
        expect(isAction(component.reset)).toBeTrue();
    });
});
