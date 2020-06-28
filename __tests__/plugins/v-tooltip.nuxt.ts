import Vue from 'vue';
import '~/plugins/v-tooltip';

describe('plugins/v-tooltip', () => {
    it('component should have directives `tooltip`', () => {
        expect.hasAssertions();
        expect(Vue.options.directives?.tooltip).toBeDefined();
    });
});
