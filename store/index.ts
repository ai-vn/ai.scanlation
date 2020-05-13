/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Explorer from '~/store/explorer';

let explorer: Explorer;

const initializer = (store: Store<any>) => {
    explorer = getModule(Explorer, store);
};

export const plugins = [initializer];
export { explorer };
