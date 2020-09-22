import '~/plugins/v-dragscroll';
import '~/plugins/v-tooltip';
import { shallowMount } from '@vue/test-utils';
import { store } from '~/__tests__/__utils__';
import { importComponents } from '~/__tests__/__utils__/component';

describe('pages/explorer', () => {
    beforeAll(async () => {
        await store('reader');
        await importComponents();
    });

    it('should render page reader', async () => {
        expect.hasAssertions();

        const { default: reader } = await import('~/pages/reader.vue');

        const wrapper = shallowMount(reader, {});
        wrapper.destroy();

        expect(wrapper.vm.$options.name).toStrictEqual('reader-');
    });
});
