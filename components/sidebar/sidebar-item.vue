<template>
    <n-link v-tooltip="tooltip" class="sidebar-item" :to="path" exact>
        <icon- :i="action.icon" />
    </n-link>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { TooltipSettings } from 'v-tooltip';
import { ActionItem } from '~/actions/actions.type';
import { isAction, toShortcut, Render } from '~/utils';

@Component({ name: 'sidebar-item-' })
export default class SidebarItem extends Vue {
    @Prop({ type: Object, required: true, validator: isAction })
    @Render<SidebarItem, TooltipSettings>(
        t => ({
            content: [t.action.title, toShortcut(t.action.accelerator)]
                .filter(i => i)
                .join(' '),
            placement: 'right',
        }),
        'tooltip',
    )
    action!: ActionItem;

    tooltip!: TooltipSettings;

    @Prop({ type: String, required: true })
    path!: string;
}
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
