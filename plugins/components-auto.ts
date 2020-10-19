import Vue from 'vue';

const importComponents = (
    requireContext: ReturnType<typeof require.context>,
) => {
    requireContext.keys().forEach((fileName): void => {
        const componentConfig = requireContext(fileName);
        const pattern = /^\.[/\w-]*\/([\w-]+)\.vue$/i;
        const name = fileName.replace(pattern, '$1');
        Vue.component(`${name}-`, componentConfig.default || componentConfig);
    });
};

importComponents(require.context('../components', true, /.vue$/));
importComponents(require.context('../pages', true, /-src\/.*.vue$/));
