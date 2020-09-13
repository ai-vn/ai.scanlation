/* eslint-disable @typescript-eslint/ban-types */
import { assign } from 'lodash';
import { DeepPartial } from '~/types/type';

type TFs = DeepPartial<typeof import('fs')>;
type TStore = DeepPartial<typeof import('~/store')>;
type TUtil = DeepPartial<typeof import('util')>;
type TUtils = DeepPartial<typeof import('~/utils')>;

export const requireActual = <T extends Record<string, any>>(path: string) =>
    jest.requireActual<T>(path);

export function mock(path: string, children: string[]) {
    jest.unmock(path);
    jest.doMock(path, () =>
        assign({}, ...children.map(child => requireActual(`${path}/${child}`))),
    );
}

const mockFactory = <T>(module: string) => (data: T) => {
    jest.unmock(module);
    jest.setMock<TStore>(module, data);
};

mock.fs = mockFactory<TFs>('fs');
mock.store = mockFactory<TStore>('~/store');
mock.util = mockFactory<TUtil>('util');
mock.utils = mockFactory<TUtils>('~/utils');

export const mockInstance = <T>(data: DeepPartial<T>) => data as T;
