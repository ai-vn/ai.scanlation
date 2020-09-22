import { ComponentOptions } from 'vue';

declare module 'vue/types/vue' {
    interface VueConstructor<V extends Vue = Vue> {
        options: ComponentOptions<V>;
    }
}
