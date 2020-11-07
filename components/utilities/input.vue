<template>
    <input
        v-if="type === 'text'"
        :value="value"
        :placeholder="placeholder"
        type="text"
        @focus="focus"
        @blur="blur"
        @input="$emit('input', $event.target.value)"
    />
    <input
        v-else
        :value="value"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        type="number"
        @focus="focus"
        @blur="blur"
        @input="$emit('input', parseFloat($event.target.value))"
    />
</template>
<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'input-',
    model: { prop: 'value', event: 'input' },
    props: {
        type: {
            type: String,
            default: 'text',
            validator: (value: string) => ['number', 'text'].includes(value),
        },
        value: { type: [String, Number], default: undefined },
        placeholder: { type: String, default: undefined },
        min: { type: Number, default: undefined },
        max: { type: Number, default: undefined },
    },
    setup(props, { emit, parent }) {
        let inGroup = true;
        onMounted(() => (inGroup = parent?.$options.name === 'group-'));

        return {
            blur() {
                emit('blur');
                if (inGroup) parent?.$el.classList.remove('focus');
            },
            focus() {
                emit('focus');
                if (inGroup) parent?.$el.classList.add('focus');
            },
        };
    },
});
</script>
<style lang="postcss">
input {
    &[type='number'],
    &[type='text'] {
        @apply rounded box-content min-w-0;

        height: var(--component-size);
        padding: 0 calc(var(--component-size) * 0.25);
        font-size: var(--component-font-size);
        line-height: var(--component-size);
        background-color: var(--component-background-color);
        border-color: var(--line-color);
    }

    &[type='number'] {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            appearance: none;
        }

        &.square {
            @apply text-center px-0;

            width: var(--component-size);
            min-width: var(--component-size);
        }
    }

    &::placeholder {
        color: var(--component-color);
    }
}

.group > input {
    &:focus {
        outline: none;
    }
}
</style>
