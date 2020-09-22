export type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

export type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export type Payload<T> = {
    value: T;
    oldValue: T;
};

export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends (...args: infer P) => infer R
        ? (...args: P) => DeepPartial<R>
        : DeepPartial<T[K]>;
};

export type GenericArray<T> = T extends Array<infer R> ? R : never;
