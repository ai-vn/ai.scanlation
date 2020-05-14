/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Explorer from '~/store/explorer';
import { watchInitializer } from '~/utils/decorators/watch';

let explorer: Explorer;

const initializer = (store: Store<any>) => {
    explorer = getModule(Explorer, store);
};

export const plugins = [initializer, watchInitializer];
export { explorer };
