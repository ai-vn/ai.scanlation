import { customRef, Ref } from '@nuxtjs/composition-api';
import { assign, camelCase } from 'lodash';
import { VuexModule } from 'vuex-module-decorators';
import { FunctionPropertyNames, NonFunctionPropertyNames } from '~/types/type';

type StoreStaticProperty =
    | 'namespaced'
    | 'state'
    | 'getters'
    | 'actions'
    | 'mutations'
    | 'modules'
    | 'context';

export const useStore = <
    T extends VuexModule,
    K extends
        | NonFunctionPropertyNames<Omit<T, StoreStaticProperty>>
        | FunctionPropertyNames<T>
>(
    module: T,
    keys: K[],
): { [k in K]: T[k] extends (...args: any[]) => any ? T[k] : Ref<T[k]> } => {
    const getValue = (key: K) => {
        const name = camelCase(`set ${key.toString()}`);
        const mutation = (module as T &
            { [moduleKey in typeof name]: (value: T[K]) => void })[name];

        return typeof module[key] === 'function'
            ? module[key]
            : customRef(() => ({
                  get: () => module[key],
                  set: (value: T[K]) => {
                      if (typeof mutation === 'function')
                          return mutation(value);
                      throw new Error(`module doesn't have mutation '${name}'`);
                  },
              }));
    };
    return assign({}, ...keys.map(key => ({ [key]: getValue(key) })));
};
