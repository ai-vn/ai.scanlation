<template>
    <table-
        class="explorer-table"
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
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { tableFields, tableOptions } from '~/modules/explorer';
import { explorer } from '~/store';
import { useStore } from '~/utils';

export default defineComponent({
    name: 'explorer-table-',
    setup: () => ({
        ...{ tableFields, tableOptions },
        ...useStore(explorer, ['folders', 'files', 'isValid']),
    }),
});
</script>
<style lang="postcss">
.explorer-table {
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
</style>
