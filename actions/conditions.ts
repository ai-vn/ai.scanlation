export const isExplorer = () =>
    window.$nuxt.$router.currentRoute.name === 'explorer';

export const isReader = () =>
    window.$nuxt.$router.currentRoute.name === 'reader';
