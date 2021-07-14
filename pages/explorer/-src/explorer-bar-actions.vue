<template>
    <group-space-
        :space="2"
        class="flex-1 overflow-hidden"
        child-class="flex-wrap"
    >
        <button- :tooltip="false" :action="readCurrentFolder" />
        <button- :tooltip="false" :action="revealInFileExplorer" />
        <button- :tooltip="false" :action="openInPhotoshop" />
    </group-space->
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { actions } from '~/actions';

export default defineComponent({
    name: 'explorer-bar-actions-',
    setup: () => ({
        ...actions.explorer.item,
    }),
});
</script>
