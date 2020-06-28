import { assign } from 'lodash';

export const requireActual = (path: string) =>
    jest.requireActual<Record<string, any>>(path);

export const mock = (path: string, children: string[]) => {
    jest.doMock(path, () =>
        assign({}, ...children.map(child => requireActual(`${path}/${child}`))),
    );
};
