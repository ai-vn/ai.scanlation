<template>
    <div class="titlebar" :class="{ 'is-maximize': isMaximize }">
        <div class="titlebar-drag-region" />
        <div ref="menu" class="titlebar-menu">
            Menu & Logo
        </div>
        <div
            ref="title"
            class="titlebar-title"
            :class="{ 'titlebar-title-float': isTitlebarFloat }"
        >
            Ai Scanlation
        </div>
        <div ref="controls" class="titlebar-controls">
            <div class="titlebar-controls-minimize" @click="minimize">
                &#xE921;
            </div>
            <div class="titlebar-controls-maximize" @click="maximize">
                &#xE922;
            </div>
            <div class="titlebar-controls-unmaximize" @click="unmaximize">
                &#xE923;
            </div>
            <div class="titlebar-controls-close" @click="close">
                &#xE8BB;
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { remote } from 'electron';
import { Vue, Component } from 'nuxt-property-decorator';
@Component
export default class extends Vue {
    $refs!: {
        menu: Element;
        title: Element;
        controls: Element;
    };

    currentWindow = remote.getCurrentWindow();
    isTitlebarFloat = false;
    isMaximize = false;

    minimize() {
        this.currentWindow.minimize();
    }

    maximize() {
        this.currentWindow.maximize();
    }

    unmaximize() {
        this.currentWindow.unmaximize();
    }

    close() {
        this.currentWindow.close();
    }

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
    height: 32px;
    font-size: 12px;
    line-height: 32px;
    border-bottom-color: var(--line-color);

    @apply relative flex select-none border-b flex-no-wrap;

    > * {
        @apply whitespace-no-wrap;
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
        @apply pl-2 pr-4 mr-auto truncate;
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
                background-color: var(--hover-background-color);

                &^^&-close:hover {
                    color: var(--titlebar-exit-hover-color);
                    background-color: var(
                        --titlebar-exit-hover-background-color
                    );
                }
            }
        }
    }
}
</style>
