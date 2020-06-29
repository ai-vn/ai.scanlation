export const isExplorer = () =>
    window.$nuxt.$router.currentRoute.name === 'explorer';
