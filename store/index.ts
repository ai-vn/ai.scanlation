import { Store } from 'vuex';
import { initializeStore } from '~/utils/store';

const initializer = (store: Store<any>) => initializeStore(store);
export const plugins = [initializer];
export * from '~/utils/store';
