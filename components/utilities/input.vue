<template>
    <input
        v-if="type === 'text'"
        :value="value"
        :placeholder="placeholder"
        type="text"
        @input="$emit('input', $event.target.value)"
    />
    <input
        v-else
        :value="value"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        type="number"
        @input="$emit('input', parseFloat($event.target.value))"
    />
</template>
<script lang="ts">
import { Vue, Component, Prop, Model } from 'nuxt-property-decorator';

@Component({ name: 'input-' })
export default class extends Vue {
    @Prop({
        type: String,
        default: 'text',
        validator: (value: string) => ['number', 'text'].indexOf(value) !== -1,
    })
    type!: string;

    @Prop({ type: String })
    placeholder!: string;

    @Prop({ type: Number })
    min!: number;

    @Prop({ type: Number })
    max!: number;

    @Model('input', { type: [String, Number] })
    value!: string | number;
}
</script>
<style lang="postcss">
input {
    &[type='number'],
    &[type='text'] {
        @apply rounded box-content;

        height: var(--component-size);
        padding: 0 calc(var(--component-size) * 0.25);
        font-size: calc(var(--component-size) * 0.5);
        line-height: var(--component-size);
        background-color: var(--component-background-color);
        border-color: var(--line-color);
    }

    &[type='number'] {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            appearance: none;
        }
    }

    &::placeholder {
        color: var(--component-color);
    }
}
</style>
