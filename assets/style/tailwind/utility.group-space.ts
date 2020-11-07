import { map } from 'lodash';
import plugin from 'tailwindcss/plugin';

export const groupSpaceUtility = plugin(({ addUtilities, theme }) => {
    const spacing: Record<string, string> = theme('spacing');

    const utilities = map(spacing, (value, key) => ({
        [`.group-space-${key}`]: {
            margin: `calc(-${value} / 2)`,
        },
        [`.group-space-${key} > *`]: {
            margin: `calc(${value} / 2)`,
        },
    }));

    addUtilities(utilities);
});
