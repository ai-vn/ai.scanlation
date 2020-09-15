import Vue from 'vue';
import '~/plugins/v-dragscroll';

describe('plugins/v-dragscroll', () => {
    it('component should have directives `dragscroll`', () => {
        expect.hasAssertions();
        expect(Vue.options.directives?.dragscroll).toBeDefined();
    });
});
