import { defineNuxtPlugin } from '@nuxtjs/composition-api';
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import createPersistedState from 'vuex-persistedstate';
import Explorer from '~/store/explorer';

const storeInitialize = (store: Store<any>) => {
    const explorer = getModule(Explorer, store);

    explorer.watchFolderPath({
        value: explorer.folderPath,
        oldValue: '~',
    });
};

export default defineNuxtPlugin(({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({})(store);
        storeInitialize(store);
    });
});
