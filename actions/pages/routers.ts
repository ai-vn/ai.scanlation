import { ActionItem } from '~/actions/actions.type';

const routerPush = (name: string) => () => {
    window.$nuxt.$router.push(name);
};

export const goToHome: ActionItem = {
    call: routerPush('/'),
    accelerator: 'q',
};
export const goToExplorer: ActionItem = {
    call: routerPush('/explorer'),
    accelerator: 'w',
};
export const goToReader: ActionItem = {
    call: routerPush('/reader'),
    accelerator: 'e',
};
export const goToSetting: ActionItem = {
    call: routerPush('/settings'),
    accelerator: 'r',
};
