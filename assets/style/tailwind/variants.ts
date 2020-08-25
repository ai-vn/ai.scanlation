/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { TailwindConfig } from 'tailwindcss';
import defaultConfig from 'tailwindcss/defaultConfig';

export const variants = (options: { before?: string[]; after?: string[] }) => {
    const cloneVariants: TailwindConfig['variants'] = {};

    for (const variant in defaultConfig.variants) {
        cloneVariants[variant] = [
            ...(options.before || []),
            ...defaultConfig.variants[variant],
            ...(options.after || []),
        ];
    }

    return cloneVariants;
};
