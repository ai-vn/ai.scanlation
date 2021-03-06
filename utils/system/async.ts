/* eslint-disable @typescript-eslint/ban-types */
import { CustomPromisify, promisify } from 'util';

type ArgsType<T> = T extends (...args: infer A) => any ? A : never;

export function attemptPromisify<TCustom extends Function>(
    fn: CustomPromisify<TCustom>,
): TCustom | ((...args: ArgsType<TCustom> | any[]) => Promise<Error>) {
    const promiseFunction = promisify(fn);
    return async (...args: ArgsType<typeof promiseFunction> | any[]) => {
        try {
            return await promiseFunction(...args);
        } catch (e) {
            return e;
        }
    };
}

export const attemptAsync = <TFunction extends Function>(
    func: TFunction,
):
    | TFunction
    | ((...args: ArgsType<TFunction> | any[]) => Promise<Error>) => async (
    ...args: ArgsType<TFunction> | any[]
) => {
    try {
        return await func(...args);
    } catch (e) {
        return e;
    }
};
