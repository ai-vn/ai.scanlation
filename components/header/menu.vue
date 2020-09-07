<template>
    <ul class="flex menu">
        <menu-item- title="File">
            <menu-item- :action="open" />
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
    open!: ActionItem;

    @Action
    about!: ActionItem;

    @Action
    facebook!: ActionItem;

    @Action
    feedback!: ActionItem;

    @Action
    github!: ActionItem;

    @Action
    website!: ActionItem;

    @Action
    toggleDevTools!: ActionItem;
}
</script>
<style lang="postcss">
.menu {
    -webkit-app-region: no-drag;
}
</style>
