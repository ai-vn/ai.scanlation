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
/* eslint-disable no-underscore-dangle */
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { TooltipSettings } from 'v-tooltip';
import { ActionItem } from '~/actions/actions.type';
import { isAction, Render, toShortcut } from '~/utils';

@Component({ name: 'button-' })
export default class Button extends Vue {
    @Prop({ type: Object, validator: isAction })
    @Render<Button>(t => () => {
        t.action?.call();
        t.$emit('click');
    })
    action!: ActionItem;

    @Prop({ type: String })
    @Render<Button>(t => t.action?.title ?? t.title)
    title!: string;

    title_!: string;

    @Prop({ type: String })
    @Render<Button>(t => t.action?.accelerator ?? t.shortcut)
    shortcut!: string;

    shortcut_!: string;

    @Prop({ type: String })
    @Render<Button>(t => t.action?.icon ?? t.icon)
    icon!: string;

    @Prop({ type: [Boolean, String, Object] })
    @Render<Button>(t => {
        if (['string', 'object'].includes(typeof t.tooltip)) return t.tooltip;
        const shortcut = toShortcut(t.shortcut_);
        return t.tooltip
            ? [t.title_, shortcut].filter(i => i).join(' ')
            : shortcut;
    })
    tooltip!: boolean | string | TooltipSettings;
}
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
