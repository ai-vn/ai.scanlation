<template>
    <group-space- :space="2">
        <group->
            <button- v-tooltip="'Previous folder'" icon="chevron-left" />
            <button- v-tooltip="'Next folder'" icon="chevron-right" />
            <button- tooltip :action="goToParent" />
            <button- tooltip :action="reload" />
        </group->
        <group- class="flex-1" :class="{ error: !isValid }">
            <button- tooltip :action="selectFolderPath" />
            <input-
                v-model="folderPath"
                type="text"
                class="flex-1 w-0 !px-0"
                @blur="updateFolderPath"
            />
            <button- icon="chevron-down" />
        </group->
    </group-space->
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { actions } from '~/actions';
import { explorer } from '~/store';
import { useStore } from '~/utils';

export default defineComponent({
    name: 'explorer-bar-folder-path-',
    setup: () => ({
        ...actions.explorer.folder,
        ...useStore(explorer, ['folderPath', 'updateFolderPath', 'isValid']),
    }),
});
</script>
