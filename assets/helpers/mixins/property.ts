import { MixinsObject } from '~/types/plugin.postcss';

const properties: MixinsObject = {
    property: (mixin, key, value) => ({ [key]: value }),
};

export default properties;
