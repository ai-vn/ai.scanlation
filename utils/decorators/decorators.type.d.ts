import { Vue } from 'nuxt-property-decorator';

export type VuePropertyDecorator<V extends Vue> = (
    target: V,
    key: string,
) => void;
