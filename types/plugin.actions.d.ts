import { ComponentOptions } from 'vue';
import { ActionsInject } from '~/plugins/actions';

declare module 'vue/types/vue' {
    interface Vue {
        $action: ActionsInject;
    }

    interface VueConstructor<V extends Vue = Vue> {
        options: ComponentOptions<V>;
    }
}
