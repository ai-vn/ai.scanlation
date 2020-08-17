declare module 'tailwindcss/plugin' {
    import { Rule, Root } from 'postcss';
    import { TailwindConfig } from 'tailwindcss';

    export interface TailwindPlugin {
        handler: (pluginHandler: TailwindPluginHandler) => void;
        config: Partial<TailwindConfig>;
    }

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
        addVariant: (name: string, generator: GenerateVariantFunction) => void;
    }

    export default function (
        handler: TailwindPlugin['handler'],
        config?: TailwindPlugin['config'],
    ): TailwindPlugin;
}
