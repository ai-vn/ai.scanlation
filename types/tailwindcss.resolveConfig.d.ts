declare module 'tailwindcss/resolveConfig' {
    import { TailwindConfig } from 'tailwindcss';

    export default function resolveConfig(
        config: Partial<TailwindConfig>[],
    ): Partial<TailwindConfig>;
}
