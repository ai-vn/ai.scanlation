import { mount } from '@vue/test-utils';
import IndexPage from '~/pages/index.vue';

describe('example test', () => {
    it('should be true', () => {
        expect.hasAssertions();
        expect(true).toStrictEqual(true);
    });
    it('is a Vue component', () => {
        expect.hasAssertions();
        const wrapper = mount(IndexPage);
        expect(wrapper.isVueInstance()).toBe(true);
    });
});
