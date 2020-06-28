// eslint-disable-next-line import/no-extraneous-dependencies
import { MixinsOptions } from 'postcss-mixins';
import property from './property';

const postcssMixinsOptions: MixinsOptions = {
    mixins: {
        ...property,
    },
};

export default postcssMixinsOptions;
