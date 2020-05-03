// eslint-disable-next-line import/no-extraneous-dependencies
import { MixinsObject } from 'postcss-mixins';

const property: MixinsObject = {
    property: (mixin, key, value) => ({ [key]: value }),
};

export default property;
