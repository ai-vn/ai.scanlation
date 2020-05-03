/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Explorer from '~/store/explorer';

let explorer: Explorer;

function initializeStore(store: Store<any>): void {
    explorer = getModule(Explorer, store);
}

export { initializeStore, explorer };
