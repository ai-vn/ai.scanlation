/* eslint-disable import/no-extraneous-dependencies */
import { ServerResponse } from 'http';
import { Context, Plugin } from '@nuxt/types';
import { IncomingMessage } from 'connect';
import Vue from 'vue';
import { Route } from 'vue-router';
import Vuex from 'vuex';
import { plugins } from '~/store';

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

function getContext() {
    const templateApp = new Vue();
    const templateRoute: Route = {
        path: '/',
        hash: '',
        query: {},
        params: {},
        fullPath: '/',
        matched: [],
    };
    const context: Context = {
        app: templateApp,
        base: '/',
        isClient: true,
        isServer: false,
        isStatic: false,
        isDev: true,
        isHMR: true,
        route: templateRoute,
        from: templateRoute,
        store: new Vuex.Store({ plugins }),
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
    };
    return context;
}

export function installPlugin(plugin: Plugin) {
    const context = getContext();

    plugin(context, inject);
}
