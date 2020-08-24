<template>
    <ul class="flex menu">
        <menu-item- title="File">
            <menu-item- :action="selectFolder" />
            <menu-item- hr />
            <menu-item- :action="close" shortcut="alt+f4" />
        </menu-item->
        <menu-item- title="Help">
            <menu-item- icon="star" title="Webcome" />
            <menu-item- icon="package" title="Release Notes" />
            <menu-item- hr />
            <menu-item- :action="openWebsite" />
            <menu-item- :action="openGithub" />
            <menu-item- :action="openFacebook" />
            <menu-item- :action="openFeedback" />
            <menu-item- hr />
            <menu-item- :action="toggleDevTools" />
            <menu-item- hr />
            <menu-item- :action="checkForUpdates" />
            <menu-item- :action="helpAbout" />
        </menu-item->
    </ul>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { ActionItem } from '~/actions/actions.type';
import { Action } from '~/utils';

@Component({ name: 'menu-' })
export default class extends Vue {
    @Action
    checkForUpdates!: ActionItem;

    @Action
    close!: ActionItem;

    @Action
    selectFolder!: ActionItem;

    @Action
    helpAbout!: ActionItem;

    @Action
    openFacebook!: ActionItem;

    @Action
    openFeedback!: ActionItem;

    @Action
    openGithub!: ActionItem;

    @Action
    openWebsite!: ActionItem;

    @Action
    toggleDevTools!: ActionItem;
}
</script>
<style lang="postcss">
.menu {
    -webkit-app-region: no-drag;
}
</style>
