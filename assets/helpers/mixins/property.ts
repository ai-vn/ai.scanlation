import { MixinsObject } from '~/types/postcss.plugins';

const properties: MixinsObject = {
    property: (mixin, key, value) => ({ [key]: value }),
};

export default properties;
