/* eslint-disable import/no-extraneous-dependencies */
import { ServerResponse } from 'http';
import { Context, Plugin } from '@nuxt/types';
import { IncomingMessage } from 'connect';
import Vue from 'vue';
import { Route } from 'vue-router';
import Vuex from 'vuex';

Vue.use(Vuex);

function inject(key: string, value: any) {
    if (!key) throw new Error('inject(key, value) has no key provided');
    if (value === undefined)
        throw new Error(`inject('${key}', value) has no value provided`);

    // eslint-disable-next-line no-param-reassign
    key = `$${key}`;

    Vue.use(() => {
        if (!Object.prototype.hasOwnProperty.call(Vue, key)) {
            Object.defineProperty(Vue.prototype, key, {
                get: () => value,
            });
        }
    });
}

async function getContext(): Promise<Context> {
    const { plugins } = await import('~/store');
    const { default: Explorer } = await import('~/store/explorer');
    const { default: Reader } = await import('~/store/reader');

    const templateRoute: Route = {
        path: '/',
        hash: '',
        query: {},
        params: {},
        fullPath: '/',
        matched: [],
    };
    return {
        app: new Vue(),
        base: '/',
        isClient: true,
        isServer: false,
        isStatic: false,
        isDev: true,
        isHMR: true,
        route: templateRoute,
        from: templateRoute,
        store: new Vuex.Store({
            plugins,
            modules: {
                explorer: Explorer,
                reader: Reader,
            },
        }),
        env: {},
        params: templateRoute.params,
        payload: undefined,
        query: templateRoute.query,
        req: {} as IncomingMessage,
        res: {} as ServerResponse,
        redirect: jest.fn(),
        error: jest.fn(),
        nuxtState: {},
        beforeNuxtRender: jest.fn(),
        $config: {},
    };
}

export async function installPlugin(plugin: Plugin) {
    const context = await getContext();

    plugin(context, inject);
}
