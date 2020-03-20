import dimensions from './dimensions';
import { FunctionsOptions } from '~/types/postcss.plugins';

const postcssFunctionsOptions: FunctionsOptions = {
    functions: {
        ...dimensions,
    },
};

export default postcssFunctionsOptions;
