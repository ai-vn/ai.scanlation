<template>
    <div class="sidebar">
        <n-link v-tooltip="tooltip('Home')" to="/" exact>
            <icon- i="home" />
        </n-link>
        <n-link v-tooltip="tooltip('Explorer')" to="/explorer" exact>
            <icon- i="file" />
        </n-link>
        <n-link v-tooltip="tooltip('Reader')" to="/reader" exact>
            <icon- i="book-open" />
        </n-link>
        <n-link v-tooltip="tooltip('Setting')" to="/settings" class="mt-auto">
            <icon- i="settings" />
        </n-link>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { TooltipSettings } from 'v-tooltip';

@Component({ name: 'sidebar-' })
export default class extends Vue {
    tooltip = (content: string): TooltipSettings => {
        return {
            content,
            placement: 'right',
            trigger: 'hover',
        };
    };
}
</script>
<style lang="postcss">
.sidebar {
    $sidebar-size: 3rem;

    border-right-color: var(--line-color);
    border-right-width: var(--line-size);

    @apply flex flex-col;

    > a {
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
}
</style>
