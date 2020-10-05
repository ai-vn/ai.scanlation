/* eslint-disable jest/prefer-spy-on */
import { defineComponent, ref, Ref } from '@nuxtjs/composition-api';
import { mount } from '@vue/test-utils';
import { range } from 'lodash';
import { scrollToFile } from '~/modules/reader';

const component = defineComponent({
    setup() {
        const images = ref<HTMLElement>() as Ref<HTMLElement>;

        return {
            files: range(5).map(key => ({ key })),
            scrollToFile: scrollToFile(images),
            images,
        };
    },
    template: `
        <div ref="images">
            <div v-for="file in files" :key="file.key" />
        </div>
    `,
});

describe('modules/reader/scroll/scrollToFile', () => {
    beforeAll(() => {
        Element.prototype.scrollTo = jest.fn();
    });

    it('should scroll to images', () => {
        expect.assertions(0);

        const wrapper = mount(component);
        wrapper.vm.scrollToFile(0);
        wrapper.vm.scrollToFile(10);
    });
});
