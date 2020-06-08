export type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T] &
    string;

export type Payload<T> = {
    value: T;
    oldValue: T;
};
