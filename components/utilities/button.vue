<template>
    <div
        v-tooltip="tooltip_"
        class="btn"
        :class="{ active, 'no-icon': !icon }"
        @click="action_"
    >
        <icon- v-if="icon_" :i="icon_" class="btn-icon" />
        <div v-if="title_ && tooltip_ === true" class="btn-title">
            {{ title_ }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { actionProps, tooltipProp, useAction, useTooltip } from '~/utils';

export default defineComponent({
    name: 'button-',
    props: {
        tooltip: tooltipProp,
        active: { default: false, type: Boolean },
        ...actionProps,
    },
    setup(props, context) {
        const render = useAction(props, context);
        return {
            ...useTooltip(props, render),
            ...render,
        };
    },
});
</script>
<style lang="postcss">
.btn {
    @apply flex cursor-pointer rounded;

    height: var(--component-size);
    line-height: var(--component-size);
    background-color: var(--component-background-color);

    &:hover {
        color: #fff;
    }

    &.active {
        color: var(--selected-color);
    }

    &-icon {
        @apply text-center;

        width: var(--component-size);
        font-size: calc(var(--component-size) * 0.5);

        + ^&-title {
            @apply pl-0;
        }
    }

    &-title {
        @apply px-2;
    }
}
</style>
