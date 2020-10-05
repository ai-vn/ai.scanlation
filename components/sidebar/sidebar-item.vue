<template>
    <n-link v-tooltip="tooltip" class="sidebar-item" :to="path" exact>
        <icon- :i="action.icon" />
    </n-link>
</template>
<script lang="ts">
/* eslint-disable vue/require-prop-types */
import {
    computed,
    ComputedRef,
    defineComponent,
} from '@nuxtjs/composition-api';
import { TooltipSettings } from 'v-tooltip';
import { toShortcut, actionProps } from '~/utils';

export default defineComponent({
    name: 'sidebar-item-',
    props: {
        action: { ...actionProps.action, required: true },
        path: { type: String, required: true },
    },
    setup: (props): { tooltip: ComputedRef<TooltipSettings> } => ({
        tooltip: computed(() => ({
            placement: 'right',
            content: [props.action.title, toShortcut(props.action.accelerator)]
                .filter(i => i)
                .join(' '),
        })),
    }),
});
</script>
<style lang="postcss">
.sidebar-item {
    $sidebar-size: 3rem;

    width: $sidebar-size;
    height: $sidebar-size;
    min-height: $sidebar-size;
    line-height: $sidebar-size;
    cursor: pointer;

    @apply text-center text-xl;

    &.nuxt-link-active {
        background-color: var(--main-background-color-active);
    }

    &:hover {
        background-color: var(--main-background-color-hover);
    }
}
</style>
