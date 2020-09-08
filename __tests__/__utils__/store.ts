import Vue from 'vue';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';

Vue.use(Vuex);

type TExplorer = typeof import('~/store/explorer').default;

type TStores = {
    explorer: TExplorer;
};

export const store = async <T extends keyof TStores>(module: T) => {
    type TDefault = new (args: any) => InstanceType<TStores[T]>;

    const { plugins } = await import('~/store');
    const { default: CurrentModule } = jest.requireActual<{
        default: TDefault;
    }>(`~/store/${module}`);

    const localStore = new Vuex.Store({
        plugins,
        modules: { [module]: CurrentModule as TStores[T] },
    });

    return getModule(CurrentModule, localStore);
};
