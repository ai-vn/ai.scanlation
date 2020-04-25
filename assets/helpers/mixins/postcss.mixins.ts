import properties from './property';
import { MixinsOptions } from '~/types/plugin.postcss';

const postcssMixinsOptions: MixinsOptions = {
    mixins: {
        ...properties,
    },
};

export default postcssMixinsOptions;
