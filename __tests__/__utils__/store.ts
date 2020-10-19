/* eslint-disable no-new */
import Vue from 'vue';
import Vuex from 'vuex';
import { StoreModules } from '~/store/-modules';

Vue.use(Vuex);

export async function store(): Promise<null>;
export async function store<T extends keyof StoreModules>(
    name: T,
): Promise<typeof import('~/store')[T]>;
export async function store<T extends keyof StoreModules>(name?: T) {
    const { plugins } = await import('~/store');
    new Vuex.Store({
        plugins,
        modules: {
            explorer: (await import('~/store/explorer')).default,
            reader: (await import('~/store/reader')).default,
        },
    });
    return name ? (await import('~/store'))[name] : null;
}
