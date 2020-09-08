import { defineComponent } from '@nuxtjs/composition-api';
import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import input from '~/components/utilities/input.vue';

describe('components/utilities/input', () => {
    it.each([[true], [false]])(
        'should mounted with inGroup=%p',
        async inGroup => {
            expect.hasAssertions();

            const wrapper = shallowMount<Vue & { blur(): void; focus(): void }>(
                input,
                {
                    propsData: {
                        type: 'number',
                        placeholder: 'placeholder',
                        min: 0,
                        max: 10,
                    },
                    parentComponent: inGroup
                        ? defineComponent({ name: 'group-' })
                        : undefined,
                },
            );

            wrapper.vm.blur();
            wrapper.vm.focus();
            expect(wrapper.vm.$options.name).toStrictEqual('input-');
        },
    );
});
