/* eslint-disable @typescript-eslint/ban-types */
declare module 'tailwindcss/plugin' {
    import { Properties } from 'csstype';
    import { Rule, Root } from 'postcss';
    import { TailwindConfig } from 'tailwindcss';

    export interface TailwindPlugin {
        handler: (pluginHandler: TailwindPluginHandler) => void;
        config: Partial<TailwindConfig>;
    }

    export type Utilities = UtilitiesSingle | UtilitiesSingle[];
    export type UtilitiesSingle = { [key: string]: Properties };
    export type UtilitiesOptionsSingle = {
        variants?: string[];
        respectPrefix?: boolean;
        respectImportant?: boolean;
    };
    export type UtilitiesOptions =
        | UtilitiesOptionsSingle
        | UtilitiesOptionsSingle[];

    export interface GenerateVariantFunction {
        (options: {
            container: Root;
            separator: TailwindConfig['separator'];
            modifySelectors: (modifierFunction: {
                className: string;
                selectors: Rule['selectors'];
            }) => Root;
        }): void;
    }

    export interface TailwindPluginHandler {
        addUtilities: (
            utilities: Utilities,
            options?: UtilitiesOptions,
        ) => void;
        addVariant: (
            name: string,
            generator: GenerateVariantFunction,
            options?: Object,
        ) => void;
        theme: (name: string) => any;
    }

    export default function (
        handler: TailwindPlugin['handler'],
        config?: TailwindPlugin['config'],
    ): TailwindPlugin;
}
