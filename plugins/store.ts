import { Plugin } from '@nuxt/types';
import createPersistedState from 'vuex-persistedstate';

const plugin: Plugin = ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({})(store);
    });
};

export default plugin;
