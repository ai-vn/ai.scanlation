/* eslint-disable @typescript-eslint/ban-types */
import { DeepPartial } from '~/types/type';

type TFs = typeof import('fs');
type TStore = typeof import('~/store');
type TUtil = typeof import('util');
type TUtils = typeof import('~/utils');

const actualFactory = <T>(module: string) => jest.requireActual<T>(module);

export const actual = {
    fs: actualFactory<TFs>('fs'),
    util: actualFactory<TUtil>('util'),
};

const mockFactory = <T>(module: string) => (data: DeepPartial<T>) => {
    jest.unmock(module);
    jest.setMock<DeepPartial<T>>(module, data);
};

export const mock = {
    fs: mockFactory<TFs>('fs'),
    store: mockFactory<TStore>('~/store'),
    util: mockFactory<TUtil>('util'),
    utils: mockFactory<TUtils>('~/utils'),
};

export const mockInstance = <T>(data: DeepPartial<T>) => data as T;
