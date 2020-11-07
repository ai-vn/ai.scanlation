import { TailwindConfig } from 'tailwindcss';
import { groupSpaceUtility } from './tailwind/utility.group-space';
import { importantVariant } from './tailwind/variant.important';
import { variants } from './tailwind/variants';

const config: Partial<TailwindConfig> = {
    purge: ['./**/*.vue'],
    variants: variants({ before: ['important'] }),
    plugins: [importantVariant, groupSpaceUtility],
};

module.exports = config;
