<template>
    <div class="explorer flex flex-col overflow-hidden">
        <div class="explorer-action-bar m-3 flex">
            <group- class="mr-2">
                <button- v-tooltip="'Previous folder'" icon="chevron-left" />
                <button- v-tooltip="'Next folder'" icon="chevron-right" />
                <button-
                    v-tooltip="'Parent folder'"
                    icon="corner-right-up"
                    @click="goToParentFolder.call"
                />
                <button-
                    v-tooltip="'Reload'"
                    icon="rotate-ccw"
                    @click="watchFolderPath({ value: folderPath })"
                />
            </group->
            <group- class="flex-1" :class="{ error: !isValid }">
                <button-
                    v-tooltip="'Select folder'"
                    icon="folder"
                    @click="selectFolder.call"
                />
                <input-
                    v-model="folderPath"
                    type="text"
                    class="flex-1 w-0 !px-0"
                    @blur="updateFolderPath"
                />
                <button- icon="chevron-down" />
            </group->
        </div>
        <table-
            class="mx-3 mb-3"
            :group-items="[folders, files]"
            :fields="tableFields"
            :options="tableOptions"
        >
            <template v-slot:name="{ item }">
                <div class="flex items-center">
                    <item-icon- class="mr-2" :ext="item.ext" />
                    <div class="truncate">{{ item.name }}</div>
                </div>
            </template>
            <template v-slot:empty>
                This folder is empty
            </template>
        </table->
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { tableFields, tableOptions } from '~/modules/explorer';
import { Action, StoreState, StoreAction } from '~/utils';
import { explorer } from '~/store';
import { ActionItem } from '~/actions/actions.type';
import { FileSystemObject } from '~/modules/explorer/types';

@Component({ name: 'explorer-' })
export default class extends Vue {
    @StoreState(explorer)
    isValid!: boolean;

    @StoreState(explorer)
    folderPath!: string;

    @StoreState(explorer)
    files!: FileSystemObject[];

    @StoreState(explorer)
    folders!: FileSystemObject[];

    @StoreAction(explorer)
    updateFolderPath!: Function;

    @StoreAction(explorer)
    watchFolderPath!: Function;

    @Action
    selectFolder!: ActionItem;

    @Action
    goToParentFolder!: ActionItem;

    tableFields = tableFields;
    tableOptions = tableOptions;

    mounted() {
        // console.log(this.folderPath, this.isValid);
        // if (this.folderPath !== '' || this.isValid) return;
        // this.watchFolderPath({ value: this.folderPath });
    }
}
</script>
<style lang="postcss">
.explorer {
    &-status-bar {
        height: 1.75rem;
        border-top-color: var(--line-color);

        @apply border-t;
    }

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
        }
    }
}
</style>
