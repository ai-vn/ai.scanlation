import { mount } from '@vue/test-utils';
import component from './render.nuxt.vue';

describe('utils/decorators/render', () => {
    const wrapper = mount(component, {
        propsData: {
            text: 'text',
        },
    });

    it('should', () => {
        expect.hasAssertions();
        expect(wrapper.text()).toMatch('render text');
    });
});
