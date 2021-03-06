<template>
    <div class="titlebar" :class="{ 'is-maximize': isMaximize }">
        <div class="titlebar-drag-region" />
        <img class="titlebar-logo" src="~/assets/icons/desk-lamp.svg" />
        <menu- ref="menu" class="titlebar-menu" />
        <div
            ref="title"
            class="titlebar-title"
            :class="{ 'titlebar-title-float': isTitlebarFloat }"
        >
            Ai Scanlation
        </div>
        <div ref="controls" class="titlebar-controls">
            <div class="titlebar-controls-minimize" @click="minimize.call">
                &#xE921;
            </div>
            <div class="titlebar-controls-maximize" @click="maximize.call">
                &#xE922;
            </div>
            <div class="titlebar-controls-unmaximize" @click="unmaximize.call">
                &#xE923;
            </div>
            <div class="titlebar-controls-close" @click="close.call">
                &#xE8BB;
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { remote } from 'electron';
import { Vue, Component } from 'nuxt-property-decorator';
import { Action } from '~/utils';
import { ActionItem } from '~/actions/actions.type';

@Component({ name: 'title-bar-' })
export default class extends Vue {
    $refs!: {
        menu: Element;
        title: Element;
        controls: Element;
    };

    currentWindow = remote.getCurrentWindow();
    isTitlebarFloat = false;
    isMaximize = false;

    @Action
    minimize!: ActionItem;

    @Action
    maximize!: ActionItem;

    @Action
    unmaximize!: ActionItem;

    @Action
    close!: ActionItem;

    resizeListener() {
        const { menu, title, controls } = this.$refs;
        const halfAvailableSpace =
            window.innerWidth / 2 -
            Math.max(menu.clientWidth, controls.clientWidth);
        this.isTitlebarFloat = title.clientWidth < halfAvailableSpace * 2;
    }

    mounted() {
        window.addEventListener('resize', this.resizeListener);
        this.resizeListener();

        const calcIsMaximize = () => {
            this.isMaximize = this.currentWindow.isMaximized();
        };
        this.currentWindow
            .on('unmaximize', calcIsMaximize)
            .on('maximize', calcIsMaximize)
            .on('ready-to-show', calcIsMaximize);
    }

    destroyed() {
        window.removeEventListener('resize', this.resizeListener);
    }
}
</script>
<style lang="postcss">
.titlebar {
    --title-bar-size: 2rem;
    --title-bar-font-size: 0.75rem;

    @apply relative flex select-none flex-no-wrap box-content;

    height: var(--title-bar-size);
    font-size: var(--title-bar-font-size);
    line-height: var(--title-bar-size);
    border-bottom-color: var(--line-color);
    border-bottom-width: var(--line-size);

    > * {
        @apply whitespace-no-wrap;
    }

    &-logo {
        @apply px-2 border-r box-content;

        width: 2rem;
        padding-top: 6px;
        padding-bottom: 6px;
        border-right-color: var(--line-color);
        border-right-width: var(--line-size);
    }

    &-drag-region {
        -webkit-app-region: drag;
        z-index: -1;

        @apply absolute top-0 bottom-0 left-0 right-0 m-1;

        .titlebar.is-maximize & {
            @apply m-0;
        }
    }

    &-menu {
        @apply mr-auto;
    }

    &-title {
        width: fit-content;

        @apply px-2 text-center mx-auto truncate;

        &-float {
            @apply absolute left-0 right-0;
        }
    }

    &-controls {
        -webkit-app-region: no-drag;
        font-size: 10px;
        font-family: 'Segoe MDL2 Assets', sans-serif;

        @apply text-center flex ml-auto;

        .titlebar.is-maximize &-maximize,
        .titlebar:not(.is-maximize) &-unmaximize {
            @apply hidden;
        }

        > div {
            width: 46px;

            &:hover {
                background-color: var(--main-background-color-hover);

                &^^&-close:hover {
                    color: var(--titlebar-exit-color-hover);
                    background-color: var(
                        --titlebar-exit-background-color-hover
                    );
                }
            }
        }
    }
}
</style>
