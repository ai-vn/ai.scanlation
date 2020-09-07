import { customRef, Ref } from '@nuxtjs/composition-api';
import { camelCase } from 'lodash';
import { VuexModule } from 'vuex-module-decorators';
import { NonFunctionPropertyNames } from '~/types/type';

export const useBinding = <
    T extends VuexModule,
    K extends NonFunctionPropertyNames<T>
>(
    module: T,
    key: K,
) => {
    const name = camelCase(`set ${key.toString()}`);
    const mutation = (module as T &
        { [key in typeof name]: (value: T[K]) => void })[name];
    return {
        [key]: customRef(() => ({
            get() {
                return module[key];
            },
            set(value: T[K]) {
                if (typeof mutation === 'function') return mutation(value);
                throw new Error(`module doesn't have mutation '${name}'`);
            },
        })),
    } as { [key in K]: Ref<T[K]> };
};
