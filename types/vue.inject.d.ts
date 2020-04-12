import { AppUtils } from '~/modules/utils';

declare module 'vue/types/vue' {
    interface Vue {
        $utils: AppUtils;
    }
}
