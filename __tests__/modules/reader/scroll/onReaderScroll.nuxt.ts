import { defineComponent, Ref, ref } from '@nuxtjs/composition-api';
import { shallowMount } from '@vue/test-utils';
import { range } from 'lodash';
import { mock } from '~/__tests__/__utils__';

const component = defineComponent({
    setup() {
        const images = ref<HTMLElement>() as Ref<HTMLElement>;

        return {
            files: range(5).map(key => ({ key })),
            images,
        };
    },
    template: `
        <div ref="images">
            <div v-for="file in files" :key="file.key" />
        </div>
    `,
});

describe('modules/reader/scroll/onReaderScroll', () => {
    beforeAll(() => {
        mock.store({
            reader: {
                files: range(5).map(() => ({})),
                updateFile: jest.fn(),
            },
        });
    });

    it('should call on scroll', async () => {
        expect.assertions(0);

        const wrapper = shallowMount(component);
        const target = wrapper.vm.images;

        const { onReaderScroll } = await import('~/modules/reader');
        onReaderScroll({ target });
    });

    it('should not call on scroll', async () => {
        expect.assertions(0);

        const { onReaderScroll } = await import('~/modules/reader');
        onReaderScroll({ target: {} as HTMLElement });
    });
});
