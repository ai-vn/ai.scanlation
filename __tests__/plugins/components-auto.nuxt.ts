import Vue from 'vue';
import { importComponents } from '~/__tests__/__utils__/component';

describe('plugins/components-auto', () => {
    beforeAll(async () => {
        jest.mock('~/actions/actions.import', () => ({ actions: {} }));

        await importComponents();
    });

    it('should require components', () => {
        expect.hasAssertions();
        expect(
            Object.prototype.hasOwnProperty.call(
                Vue.options.components,
                'button-',
            ),
        ).toBeTrue();
    });
});
