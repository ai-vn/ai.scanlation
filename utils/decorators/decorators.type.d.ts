import Vue from 'vue';

export type VuePropertyDecorator<V extends Vue> = (
    target: V,
    key: string,
) => void;
