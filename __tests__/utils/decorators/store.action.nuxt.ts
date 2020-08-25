/* eslint-disable @typescript-eslint/no-empty-function */
import { mount } from '@vue/test-utils';
import { Vue, Component } from 'nuxt-property-decorator';
import Vuex from 'vuex';
import { Action, getModule, Module, VuexModule } from 'vuex-module-decorators';
import { StoreAction } from '~/utils/decorators/store.action';

@Module({ name: 'temp', stateFactory: true, namespaced: true })
class Temp extends VuexModule {
    @Action
    action() {}
}

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: { temp: Temp },
});
const module = getModule(Temp, store);

@Component({ template: '<div/>' })
class TempComponent extends Vue {
    @StoreAction(module)
    action!: typeof module.action;
}

describe('utils/decorators/store.action', () => {
    it('should return store action', () => {
        expect.hasAssertions();

        const wrapper = mount(TempComponent);
        expect(wrapper.vm).toBeInstanceOf(Vue);
    });
});
