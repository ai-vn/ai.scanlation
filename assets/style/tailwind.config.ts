import { TailwindConfig } from 'tailwindcss';
import { importantVariant } from './tailwind/variant.important';
import { variants } from './tailwind/variants';

const config: Partial<TailwindConfig> = {
    purge: ['./**/*.vue'],
    variants: variants({ before: ['important'] }),
    plugins: [importantVariant],
};

export = config;
