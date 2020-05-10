import Vue from 'vue';
import { importComponents } from '~/__tests__/__utils__/component';

describe('plugins/components-auto', () => {
    it('should require components', async () => {
        expect.hasAssertions();
        await importComponents();
        expect(
            Object.prototype.hasOwnProperty.call(
                Vue.options.components,
                'button-',
            ),
        ).toBeTrue();
    });
});
