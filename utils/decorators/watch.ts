import { VuexModule } from 'vuex-module-decorators';
import { camelCase } from 'lodash';
import { Store } from 'vuex';
import { NonFunctionPropertyNames } from '~/types/type';

interface Watcher<T> {
    getter: (self: any) => T;
    watcher: ((value: T, oldValue: T) => void) | any;
}

const watchers: Watcher<any>[] = [];

export const Watch = <
    M extends VuexModule,
    P extends NonFunctionPropertyNames<M>
>(
    module: { new (...args: any[]): M },
    property: P,
) => (
    target: M,
    key: string & keyof M,
    descriptor_:
        | TypedPropertyDescriptor<(value: M[P], oldValue: M[P]) => void>
        | TypedPropertyDescriptor<(value: M[P]) => void>,
): void => {
    watchers.push({
        getter: state => state[camelCase(module.name)][property],
        watcher: target[key],
    });
};

export const watchInitializer = (store: Store<any>) => {
    watchers.forEach(watcher => {
        store.watch(watcher.getter, watcher.watcher);
    });
};
