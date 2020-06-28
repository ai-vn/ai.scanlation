/* eslint-disable @typescript-eslint/no-empty-function */
import { shallowMount } from '@vue/test-utils';
import { Vue } from 'nuxt-property-decorator';
import input from '~/components/utilities/input.vue';

describe('components/utilities/input', () => {
    it.each([[true], [false]])(
        'should mounted with inGroup=%p',
        async inGroup => {
            expect.hasAssertions();

            const wrapper = shallowMount<
                Vue & {
                    inGroup: boolean;
                    blur(): void;
                    focus(): void;
                }
            >(input, {
                propsData: {
                    type: 'number',
                    placeholder: 'placeholder',
                    min: 0,
                    max: 10,
                },
            });

            wrapper.vm.inGroup = inGroup;
            wrapper.vm.blur();
            wrapper.vm.focus();
            await Vue.nextTick();
            expect(wrapper.vm.$options.name).toStrictEqual('input-');
        },
    );
});
