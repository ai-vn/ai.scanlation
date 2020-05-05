import Vue from 'vue';

describe('plugins/components-auto', () => {
    it('should require components', () => {
        expect.hasAssertions();
        require('babel-plugin-require-context-hook/register')();
        require('~/plugins/components-auto');
        expect(
            Object.prototype.hasOwnProperty.call(
                Vue.options.components,
                'button-',
            ),
        ).toBeTrue();
    });
});
