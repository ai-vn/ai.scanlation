import { ActionItem } from '~/actions/actions.type';

const routerPush = (name: string) => () => {
    window.$nuxt.$router.push(name);
};

export const goToHome: ActionItem = {
    call: routerPush('/'),
    title: 'Home',
    icon: 'home',
    accelerator: 'q',
};
export const goToExplorer: ActionItem = {
    call: routerPush('/explorer'),
    title: 'Explorer',
    icon: 'file',
    accelerator: 'w',
};
export const goToReader: ActionItem = {
    call: routerPush('/reader'),
    title: 'Reader',
    icon: 'book-open',
    accelerator: 'e',
};
export const goToSetting: ActionItem = {
    call: routerPush('/settings'),
    title: 'Settings',
    icon: 'settings',
    accelerator: 'ctrl+,',
};
