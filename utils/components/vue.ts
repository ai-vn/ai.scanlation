import { PropOptions, computed, ComputedRef } from '@nuxtjs/composition-api';
import { mapValues } from 'lodash';

export const defineProp = <T>(options: PropOptions<T>): PropOptions<T> =>
    options;

export const computeds = <T extends { [key in keyof T]: () => any }>(data: T) =>
    mapValues(data, computed) as {
        [P in keyof T]: ComputedRef<ReturnType<T[P]>>;
    };
