import { Vue, Component } from 'nuxt-property-decorator';
import { Action, isAction } from '~/utils';
import { ActionItem } from '~/actions/actions.type';

@Component({ template: '<div/>' })
class ComponentWithActions extends Vue {
    @Action
    resetMousetrap!: ActionItem;

    @Action(x => x.resetMousetrap)
    reset!: ActionItem;
}

describe('utils/decorators/action', () => {
    it("shouldn't be action", () => {
        expect.hasAssertions();

        const result = isAction({ call: undefined });

        expect(result).toBeFalse();
    });

    it('should be typeof ActionItem', () => {
        expect.hasAssertions();

        const component = new ComponentWithActions();
        component.reset.call();

        expect(component.reset.call).toBeFunction();
        expect(isAction(component.reset)).toBeTrue();
    });
});
