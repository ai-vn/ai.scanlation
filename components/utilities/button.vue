<template>
    <div
        v-tooltip="tooltip_"
        class="btn"
        :class="{
            'no-icon': !icon,
        }"
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
import { TooltipSettings } from 'v-tooltip';
import { actionProps, actionRender, defineProp, tooltipRender } from '~/utils';

export default defineComponent({
    name: 'button-',
    props: {
        tooltip: defineProp<boolean | string | TooltipSettings>({
            type: [Boolean, String, Object],
        }),
        ...actionProps,
    },
    setup(props, context) {
        const render = actionRender(props, context);
        return {
            ...tooltipRender(props, render),
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
