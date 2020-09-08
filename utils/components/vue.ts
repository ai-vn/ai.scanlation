import { PropOptions } from '@nuxtjs/composition-api';

export const defineProp = <T>(options: PropOptions<T>): PropOptions<T> =>
    options;
