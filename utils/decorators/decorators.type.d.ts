import Vue from 'vue';

export type VuePropertyDecorator<V extends Vue, K = string> = (
    target: V,
    key: K,
) => void;
