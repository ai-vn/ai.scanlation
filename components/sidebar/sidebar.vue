<template>
    <div class="sidebar">
        <sidebar-item- :action="goToHome" path="/" />
        <sidebar-item- :action="goToExplorer" path="/explorer" />
        <sidebar-item- :action="goToReader" path="/reader" />
        <sidebar-item- :action="goToSetting" path="/settings" class="mt-auto" />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { ActionItem } from '~/actions/actions.type';
import { Action } from '~/utils';

@Component({ name: 'sidebar-' })
export default class extends Vue {
    @Action
    goToHome!: ActionItem;

    @Action
    goToExplorer!: ActionItem;

    @Action
    goToReader!: ActionItem;

    @Action
    goToSetting!: ActionItem;
}
</script>
<style lang="postcss">
.sidebar {
    border-right-color: var(--line-color);
    border-right-width: var(--line-size);

    @apply flex flex-col;
}
</style>
