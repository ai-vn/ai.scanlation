type ConverterType<R1, R2> = (item: NonNullable<R1>) => R2;
type ReturnMethod<T> = (item: T) => string | number;

export function nonNull<T, R1>(fn1: ConverterType<T, R1>): ReturnMethod<T>;
export function nonNull<T, R1, R2>(
    fn1: ConverterType<T, R1>,
    fn2: ConverterType<R1, R2>,
): ReturnMethod<T>;
export function nonNull<T, R1, R2, R3>(
    fn1: ConverterType<T, R1>,
    fn2: ConverterType<R1, R2>,
    fn3: ConverterType<R2, R3>,
): ReturnMethod<T>;
export function nonNull<T>(...funcs: ((item: any) => any)[]) {
    return (item: T) =>
        funcs.reduce(
            (pre, fun) => (pre === undefined || pre === null ? '' : fun(pre)),
            item,
        );
}
