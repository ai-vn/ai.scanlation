import Vue from 'vue';

const requireComponent = require.context('../components', true, /.vue$/);

requireComponent.keys().forEach((fileName): void => {
    const componentConfig = requireComponent(fileName);
    const pattern = /^\.[/\w-]*\/([\w-]+)\.vue$/i;
    const name = fileName.replace(pattern, '$1');
    Vue.component(`${name}-`, componentConfig.default || componentConfig);
});
