import properties from './property';
import { MixinsOptions } from '~/types/postcss.plugins';

const postcssMixinsOptions: MixinsOptions = {
    mixins: {
        ...properties,
    },
};

export default postcssMixinsOptions;
