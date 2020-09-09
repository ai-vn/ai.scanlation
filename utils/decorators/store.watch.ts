import { debounce } from 'lodash';
import { Store } from 'vuex';
import { VuexModule } from 'vuex-module-decorators';
import { StoreModules } from '~/store/-modules';
import { NonFunctionPropertyNames, Payload } from '~/types/type';

interface Watcher<T> {
    getter: (self: any) => T;
    watcher: (store: Store<any>) => (value: T, oldValue: T) => void;
}

const watchers: Watcher<any>[] = [];

export const StoreWatch = <
    M extends VuexModule,
    P extends NonFunctionPropertyNames<M>,
    Modules extends StoreModules
>(
    module: { new (...args: any[]): M },
    moduleName: {
        [ModuleName in keyof Modules]: M extends Modules[ModuleName]
            ? ModuleName
            : never;
    }[keyof Modules],
    property: P,
    wait = 0,
) => (
    target: M,
    action: string & keyof M,
    descriptor_:
        | TypedPropertyDescriptor<(payload: Payload<M[P]>) => void>
        | TypedPropertyDescriptor<(payload: Payload<M[P]>) => Promise<void>>,
): void => {
    watchers.push({
        getter: state => state[moduleName][property],
        watcher: (store: Store<any>) => {
            const callback = (value: M[P], oldValue: M[P]) =>
                store.dispatch(`${moduleName}/${action}`, { value, oldValue });

            return wait > 0 ? debounce(callback, wait) : callback;
        },
    });
};

export const watchInitializer = (store: Store<any>) => {
    watchers.forEach(watcher => {
        store.watch(watcher.getter, watcher.watcher(store));
    });
};
