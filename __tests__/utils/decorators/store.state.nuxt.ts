import { mount } from '@vue/test-utils';
import { Component, Vue } from 'nuxt-property-decorator';
import Vuex from 'vuex';
import {
    getModule,
    Module,
    Mutation,
    VuexModule,
} from 'vuex-module-decorators';
import { StoreState } from '~/utils/decorators/store.state';

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

        @Component({ template: '<div/>' })
        class TempComponent extends Vue {
            @StoreState(hasSetter)
            text!: string;
        }
        const wrapper = mount(TempComponent);

        expect(wrapper.vm.text).toStrictEqual('');
        wrapper.vm.text = 'C://';
        expect(store.state.has.text).toStrictEqual('C://');
        expect(hasSetter.text).toStrictEqual('C://');
    });

    it('should support getter only', () => {
        expect.hasAssertions();

        @Component({ template: '<div/>' })
        class TempComponent extends Vue {
            @StoreState(noSetter)
            text!: string;
        }
        const wrapper = mount(TempComponent);

        expect(wrapper.vm.text).toStrictEqual('');
        expect(() => {
            wrapper.vm.text = '~';
        }).toThrow(`module doesn't have mutation 'setText'`);
    });
});
