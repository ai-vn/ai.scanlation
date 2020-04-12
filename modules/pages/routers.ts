import { Context } from '@nuxt/types';
import { Action } from '~/modules/utils.type';

const routerPush = (name: string) =>
    function push(this: Context) {
        this.app.router?.push(name);
    };

export const goToHome: Action = {
    call: routerPush('/'),
    accelerator: 'q',
};
export const goToExplorer: Action = {
    call: routerPush('/explorer'),
    accelerator: 'w',
};
export const goToReader: Action = {
    call: routerPush('/reader'),
    accelerator: 'e',
};
export const goToSetting: Action = {
    call: routerPush('/settings'),
    accelerator: 'r',
};
