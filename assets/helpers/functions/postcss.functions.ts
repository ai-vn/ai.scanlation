import dimensions from './dimensions';
import { FunctionsOptions } from '~/types/plugin.postcss';

const postcssFunctionsOptions: FunctionsOptions = {
    functions: {
        ...dimensions,
    },
};

export default postcssFunctionsOptions;
