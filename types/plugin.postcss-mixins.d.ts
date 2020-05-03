declare module 'postcss-mixins' {
    import { AcceptedPlugin, Transformer } from 'postcss';

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

    export default function (
        options: MixinsOptions,
    ): AcceptedPlugin & Transformer;
}
