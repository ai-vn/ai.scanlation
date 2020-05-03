declare module 'postcss-functions' {
    import { AcceptedPlugin, Transformer } from 'postcss';

    export type FunctionType = (...args: string[]) => string;
    export type FunctionsObject = {
        [key in string]: FunctionType;
    };
    export type FunctionsOptions = {
        functions?: FunctionsObject;
        glob?: string | string[];
    };

    export default function (
        options: FunctionsOptions,
    ): AcceptedPlugin & Transformer;
}
