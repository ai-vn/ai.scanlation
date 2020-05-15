import { mount } from '@vue/test-utils';
import { Component, Vue } from 'nuxt-property-decorator';
import Vuex from 'vuex';
import {
    getModule,
    Module,
    Mutation,
    VuexModule,
} from 'vuex-module-decorators';
import { plugins } from '~/store';
import { StoreState } from '~/utils/decorators/store.state';

@Module({ name: 'no', stateFactory: true, namespaced: true })
class NoMutation extends VuexModule {
    text = '';
}

@Module({ name: 'has', stateFactory: true, namespaced: true })
class HasMutation extends VuexModule {
    text = '';

    @Mutation
    setText(val: string) {
        this.text = val;
    }
}

describe('utils/decorators/store', () => {
    Vue.use(Vuex);
    const store = new Vuex.Store({
        plugins,
        modules: { has: HasMutation, no: NoMutation },
    });
    const hasMutation = getModule(HasMutation, store);
    const noMutation = getModule(NoMutation, store);

    it('should support getter & setter for text', () => {
        expect.hasAssertions();

        @Component({
            template: '<div/>',
        })
        class TempComponent extends Vue {
            @StoreState(hasMutation)
            text!: string;
        }
        const wrapper = mount(TempComponent);

        const { text } = wrapper.vm;
        expect(text).toStrictEqual('');

        wrapper.vm.text = 'C://';

        expect(store.state.has.text).toStrictEqual('C://');
        expect(hasMutation.text).toStrictEqual('C://');
    });

    it('should require mutation', () => {
        expect.hasAssertions();

        expect(() => {
            @Component({
                template: '<div/>',
            })
            class TempComponent extends Vue {
                @StoreState(noMutation)
                text!: string;
            }
            return TempComponent;
        }).toThrow(`module 'undefined' doesn't have mutation 'setText'`);
    });
});
