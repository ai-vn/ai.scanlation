import { assign } from 'lodash';
import { DeepPartial } from '~/types/type';

type TStore = DeepPartial<typeof import('~/store')>;
type TUtils = DeepPartial<typeof import('~/utils')>;
type TFs = DeepPartial<typeof import('fs')>;

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

mock.store = mockFactory<TStore>('~/store');
mock.utils = mockFactory<TUtils>('~/utils');
mock.fs = mockFactory<TFs>('fs');
