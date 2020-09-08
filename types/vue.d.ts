declare module '*.vue' {
    import { defineComponent } from '@nuxtjs/composition-api';

    const Component: ReturnType<typeof defineComponent>;
    export default Component;
}
