<template>
    <group-space- :space="2" child-class="flex-wrap">
        <button- :tooltip="false" :action="createRedrawFolder" />
        <button- :tooltip="false" :action="moveToRedrawFolder" />
        <button- :tooltip="false" :action="toggleFilesAsRedraw" />
    </group-space->
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { actions } from '~/actions';

export default defineComponent({
    name: 'explorer-tab-redraw-',
    setup: () => ({
        ...actions.explorer.tabs.redraw,
    }),
});
</script>
