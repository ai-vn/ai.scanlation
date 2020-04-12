import { Context } from '@nuxt/types';

export interface Action {
    call: (this: Context) => void;
    accelerator?: string;
    description?: string;
}
