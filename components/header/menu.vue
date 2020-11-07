<template>
    <ul class="flex menu">
        <menu-item- title="File">
            <menu-item- :action="selectFolderPath" />
            <menu-item- hr />
            <menu-item- :action="close" shortcut="alt+f4" />
        </menu-item->
        <menu-item- title="Help">
            <menu-item- icon="star" title="Webcome" />
            <menu-item- icon="package" title="Release Notes" />
            <menu-item- hr />
            <menu-item- :action="website" />
            <menu-item- :action="github" />
            <menu-item- :action="facebook" />
            <menu-item- :action="feedback" />
            <menu-item- hr />
            <menu-item- :action="toggleDevTools" />
            <menu-item- hr />
            <menu-item- :action="checkForUpdates" />
            <menu-item- :action="about" />
        </menu-item->
    </ul>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { actions } from '~/actions';

const { selectFolderPath } = actions.explorer.folder;
const { close } = actions.electron.windows;

export default defineComponent({
    name: 'menu-',
    setup: () => ({
        selectFolderPath,
        close,
        ...actions.electron.dev,
        ...actions.help.about,
        ...actions.help.open,
        ...actions.help.update,
    }),
});
</script>
<style lang="postcss">
.menu {
    -webkit-app-region: no-drag;
}
</style>
