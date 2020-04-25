import createPersistedState from 'vuex-persistedstate';
import { Plugin } from '@nuxt/types';

const plugin: Plugin = ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({})(store);
    });
};

export default plugin;
