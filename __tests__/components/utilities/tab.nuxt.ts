import { mount } from '@vue/test-utils';
import { Dictionary, keyBy, mapValues } from 'lodash';
import { Tab } from '~/components/utilities/tab/tab';
import tab from '~/components/utilities/tab/tab.vue';

describe('components/utilities/tab', () => {
    it.each([
        //
        [['a', 'b', 'c']],
        [['a']],
        [undefined],
    ])('should mounted', tabsId => {
        expect.hasAssertions();

        jest.spyOn(console, 'error').mockImplementation();
        const tabs = tabsId
            ? mapValues<Dictionary<string>, Tab>(keyBy(tabsId), () => ({
                  title: '',
                  icon: 'x',
              }))
            : undefined;

        const wrapper = mount(tab, {
            propsData: { value: 'a', tabs },
            slots: {
                a: '<div/>',
                b: '<div/>',
                c: '<div/>',
            },
        });

        expect(wrapper.vm.$el.className).toStrictEqual('tab');
    });
});
