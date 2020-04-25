<template>
    <ul class="flex menu">
        <menu-item- title="File">
            <menu-item- icon="folder" :action="selectFolder" />
            <menu-item- hr />
            <menu-item- icon="x" :action="close" shortcut="alt+f4" />
        </menu-item->
        <menu-item- title="Help">
            <menu-item- icon="star" title="Webcome" />
            <menu-item- icon="package" title="Release Note" />
            <menu-item- hr />
            <menu-item- icon="globe" title="Website" />
            <menu-item- icon="github" title="Github" />
            <menu-item- icon="facebook" title="Facebook" />
            <menu-item- icon="message-square" title="Feedback" />
            <menu-item- hr />
            <menu-item- icon="terminal" :action="toggleDevTools" />
            <menu-item- hr />
            <menu-item- icon="download-cloud" title="Check for Updates..." />
            <menu-item- icon="info" title="About" shortcut="alt+i" />
        </menu-item->
    </ul>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Action } from '~/utils';
import { ActionItem } from '~/modules/actions.type';

@Component({ name: 'menu-' })
export default class extends Vue {
    @Action
    close!: ActionItem;

    @Action
    selectFolder!: ActionItem;

    @Action
    toggleDevTools!: ActionItem;
}
</script>
<style lang="postcss">
.menu {
    -webkit-app-region: no-drag;
}
</style>
