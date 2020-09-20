/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Explorer from '~/store/explorer';
import Reader from '~/store/reader';
import { watchInitializer } from '~/utils';

let explorer: Explorer;
let reader: Reader;

const initializer = (store: Store<any>) => {
    explorer = getModule(Explorer, store);
    reader = getModule(Reader, store);
};

export const plugins = [initializer, watchInitializer];
export { explorer, reader };
