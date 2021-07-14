<template>
    <group->
        <button- :action="switchTabs" />
        <button-
            v-for="(action, tab) in tabs"
            :key="tab"
            :action="action"
            :active="currentTab === tab"
            tooltip
        />
    </group->
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { actions } from '~/actions';
import { explorer } from '~/store';
import { useStore } from '~/utils';

export default defineComponent({
    name: 'explorer-tabs-switch-',
    setup: () => ({
        ...actions.explorer.tabs.ui,
        ...useStore(explorer, ['currentTab']),
    }),
});
</script>
