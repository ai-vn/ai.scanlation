/* eslint-disable @typescript-eslint/no-empty-function */
import { Vue } from 'nuxt-property-decorator';
import Vuex from 'vuex';
import {
    Action,
    Module,
    Mutation,
    VuexModule,
    getModule,
} from 'vuex-module-decorators';
import { Payload } from '~/types/type';
import { StoreWatch, watchInitializer } from '~/utils/decorators/store.watch';

@Module({ name: 'temp', stateFactory: true, namespaced: true })
class Temp extends VuexModule {
    text = '';
    isChanged = false;

    @Mutation
    setText(value: string) {
        this.text = value;
    }

    @Action
    @StoreWatch(Temp, 'text')
    watchText(payload_: Payload<string>) {}

    @Action
    @StoreWatch(Temp, 'text', 100)
    watchTextWait(payload_: Payload<string>) {}
}

describe('utils/decorators/store.watch', () => {
    it('should watch store property', async () => {
        expect.hasAssertions();

        Vue.use(Vuex);
        const store = new Vuex.Store({
            modules: { temp: Temp },
            plugins: [watchInitializer],
        });

        jest.spyOn(store, 'watch').mockImplementation((getter, watcher) => {
            getter(store.state, store.getters);
            watcher('new', '');
            return () => {};
        });

        const temp = getModule(Temp, store);

        temp.setText('new');
        expect(temp.text).toStrictEqual('new');
        expect(store.state.temp.text).toStrictEqual('new');
    });
});
