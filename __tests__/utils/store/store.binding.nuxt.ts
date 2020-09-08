import { defineComponent } from '@nuxtjs/composition-api';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import {
    getModule,
    Module,
    Mutation,
    VuexModule,
} from 'vuex-module-decorators';
import { useBinding } from '~/utils';

@Module({ name: 'no', stateFactory: true, namespaced: true })
class NoSetter extends VuexModule {
    text = '';
}

@Module({ name: 'has', stateFactory: true, namespaced: true })
class HasSetter extends VuexModule {
    text = '';

    @Mutation
    setText(val: string) {
        this.text = val;
    }
}

describe('utils/decorators/store.state', () => {
    Vue.use(Vuex);
    const store = new Vuex.Store({
        modules: { has: HasSetter, no: NoSetter },
    });
    const hasSetter = getModule(HasSetter, store);
    const noSetter = getModule(NoSetter, store);

    it('should support getter & setter', () => {
        expect.hasAssertions();

        const tempComponent = defineComponent({
            template: '<div/>',
            setup: () => useBinding(hasSetter, 'text'),
        });

        const wrapper = mount(tempComponent);

        expect(wrapper.vm.text).toStrictEqual('');
        wrapper.vm.text = 'text';
        expect(store.state.has.text).toStrictEqual('text');
        expect(hasSetter.text).toStrictEqual('text');
    });

    it('should support getter only', () => {
        expect.hasAssertions();

        const tempComponent = defineComponent({
            template: '<div/>',
            setup: () => useBinding(noSetter, 'text'),
        });

        const wrapper = mount(tempComponent);

        expect(wrapper.vm.text).toStrictEqual('');
        expect(() => {
            wrapper.vm.text = '~';
        }).toThrow(`module doesn't have mutation 'setText'`);
    });
});
