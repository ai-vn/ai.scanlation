import { Plugin } from '@nuxt/types';
import { AppUtils } from '~/modules/utils';

const plugin: Plugin = (context, inject) => {
    inject('utils', new AppUtils(context));
};

export default plugin;
