import { ActionsInject } from '~/plugins/actions';

declare module 'vue/types/vue' {
    interface Vue {
        $action: ActionsInject;
    }
}
