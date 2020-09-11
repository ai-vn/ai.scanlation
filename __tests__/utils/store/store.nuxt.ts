import Vue from 'vue';
import Vuex from 'vuex';
import {
    VuexModule,
    Module,
    Mutation,
    Action,
    getModule,
} from 'vuex-module-decorators';
import { useStore } from '~/utils';

@Module({ name: 'temp', stateFactory: true, namespaced: true })
class Temp extends VuexModule {
    text = '';
    counter = 0;

    @Mutation
    setCounter(value: number) {
        this.counter = value;
    }

    @Action
    increase() {
        this.setCounter(this.counter + 1);
    }
}

describe('utils/store/store', () => {
    Vue.use(Vuex);
    const store = new Vuex.Store({
        modules: { temp: Temp },
    });
    const temp = getModule(Temp, store);

    it('should binding property & function', () => {
        expect.hasAssertions();

        const tempInstance = useStore(temp, ['text', 'counter', 'increase']);

        expect(tempInstance.counter.value).toStrictEqual(0);

        tempInstance.increase();
        expect(tempInstance.counter.value).toStrictEqual(1);

        tempInstance.counter.value = 5;
        expect(tempInstance.counter.value).toStrictEqual(5);

        expect(tempInstance.text.value).toStrictEqual('');
        expect(() => {
            tempInstance.text.value = '~';
        }).toThrow(`module doesn't have mutation 'setText'`);
    });
});
