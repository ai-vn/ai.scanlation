export type FunctionType = (...args: string[]) => string;
export type FunctionsObject = {
    [key in string]: FunctionType;
};
export type FunctionsOptions = {
    functions?: FunctionsObject;
    glob?: string | string[];
};

export type MixinsType = (mixin: any, ...args: string[]) => object;
export type MixinsObject = {
    [key in string]: MixinsType;
};
export type MixinsOptions = {
    mixins?: MixinsObject;
    mixinsDir?: string | string[];
    mixinsFiles?: string | string[];
    silent?: boolean;
};
