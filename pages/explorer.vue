<template>
    <div class="explorer flex flex-col overflow-hidden space-y-3 p-3">
        <div class="flex space-x-2">
            <group->
                <button- v-tooltip="'Previous folder'" icon="chevron-left" />
                <button- v-tooltip="'Next folder'" icon="chevron-right" />
                <button- tooltip :action="goToParent" />
                <button- tooltip :action="reload" />
            </group->
            <group- class="flex-1" :class="{ error: !isValid }">
                <button- tooltip :action="open" />
                <input-
                    v-model="folderPath"
                    type="text"
                    class="flex-1 w-0 !px-0"
                    @blur="updateFolderPath"
                />
                <button- icon="chevron-down" />
            </group->
        </div>
        <div class="flex space-x-2">
            <group->
                <button- tooltip :action="readCurrentFolder" />
            </group->
        </div>
        <table-
            :group-items="[folders, files]"
            :fields="tableFields"
            :options="tableOptions"
        >
            <template #name="{ item }">
                <div class="flex items-center">
                    <item-icon- class="mr-2" :ext="item.ext" />
                    <div class="truncate">{{ item.name }}</div>
                </div>
            </template>
            <template #empty>
                {{ isValid ? 'This folder is empty' : 'In valid folder path' }}
            </template>
        </table->
    </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { actions } from '~/actions';
import { tableFields, tableOptions } from '~/modules/explorer';
import { explorer } from '~/store';
import { useStore } from '~/utils';

export default defineComponent({
    name: 'explorer-',
    setup: () => ({
        ...{ tableFields, tableOptions },
        ...actions.explorer.folder,
        ...actions.explorer.item,
        ...useStore(explorer, [
            'updateFolderPath',
            'folderPath',
            'isValid',
            'folders',
            'files',
        ]),
    }),
});
</script>
<style lang="postcss">
.explorer {
    table {
        th,
        td {
            &[data='index'] {
                min-width: 2rem;
            }

            &[data='name'] {
                width: 100%;
                max-width: 0;
            }

            &[data='size'],
            &[data='dimensions'],
            &[data='color'],
            &[data='time'] {
                @apply hidden;

                @screen sm {
                    @apply table-cell;
                }
            }
        }
    }
}
</style>
