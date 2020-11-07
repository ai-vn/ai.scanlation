<template>
    <div class="sidebar">
        <sidebar-item- :action="goToHome" path="/" />
        <sidebar-item- :action="goToExplorer" path="/explorer" />
        <sidebar-item- :action="goToReader" path="/reader" />
        <sidebar-item- :action="goToSetting" path="/settings" class="mt-auto" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { actions } from '~/actions';

export default defineComponent({
    name: 'sidebar-',
    setup: () => ({ ...actions.routers }),
});
</script>
<style lang="postcss">
.sidebar {
    border-right-color: var(--line-color);
    border-right-width: var(--line-size);

    @apply flex flex-col;
}
</style>
