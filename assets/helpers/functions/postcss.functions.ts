// eslint-disable-next-line import/no-extraneous-dependencies
import { FunctionsOptions } from 'postcss-functions';
import dimensions from './dimensions';

const postcssFunctionsOptions: FunctionsOptions = {
    functions: {
        ...dimensions,
    },
};

export default postcssFunctionsOptions;
