<template>
    <span class="icon">{{ icon }}</span>
</template>
<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import map from '~/assets/fonts/aicon.map.json';

export default defineComponent<{ i: keyof typeof map }>({
    name: 'icon-',
    props: {
        i: {
            required: true,
            type: String,
            validator: (value: string) =>
                typeof value === 'string' &&
                Object.prototype.hasOwnProperty.call(map, value),
        },
    },
    setup: props => ({ icon: computed(() => map[props.i] || '') }),
});
</script>
<style lang="postcss">
.icon {
    font-weight: normal;
    font-family: 'aicon', serif !important;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    user-select: none;
}
</style>
