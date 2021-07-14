<template>
    <tab- :value="currentTab" :tabs="ExplorerTabs">
        <template #redraw>
            <explorer-tab-redraw- />
        </template>
        <template #rename>
            <explorer-tab-rename- />
        </template>
        <template #convert>
            <explorer-tab-convert- />
        </template>
    </tab->
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { ExplorerTabs } from '~/modules/explorer';
import { explorer } from '~/store';
import { useStore } from '~/utils';

export default defineComponent({
    name: 'explorer-tabs-',
    setup: () => ({
        ExplorerTabs,
        ...useStore(explorer, ['currentTab']),
    }),
});
</script>
