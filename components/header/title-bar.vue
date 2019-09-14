<template>
    <div class="titlebar">
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
            <div>&#xE921;</div>
            <!-- <div >&#xE922;</div> -->
            <div>&#xE923;</div>
            <div class="close">&#xE8BB;</div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
@Component
export default class extends Vue {
    $refs!: {
        menu: Element;
        title: Element;
        controls: Element;
    };

    isTitlebarFloat = false;
    resizeHandle() {
        const { menu, title, controls } = this.$refs;
        const halfAvailableSpace =
            window.innerWidth / 2 -
            Math.max(menu.clientWidth, controls.clientWidth);
        this.isTitlebarFloat = title.clientWidth < halfAvailableSpace * 2;
    }

    mounted() {
        window.addEventListener('resize', this.resizeHandle);
        this.resizeHandle();
    }

    destroyed() {
        window.removeEventListener('resize', this.resizeHandle);
    }
}
</script>
<style lang="postcss">
.titlebar {
    height: 32px;
    color: $main-color;
    font-size: 12px;
    line-height: 32px;
    background-color: $main-background;
    border-bottom-color: $titlebar-border-color;
    @apply relative flex select-none border-b flex-no-wrap;

    > * {
        @apply whitespace-no-wrap;
    }

    &-drag-region {
        -webkit-app-region: drag;
        z-index: -1;
        margin: 4px;
        @apply absolute top-0 bottom-0 left-0 right-0;
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
        @apply flex ml-auto;

        > div {
            width: 46px;
            font-size: 10px;
            font-family: 'Segoe MDL2 Assets', sans-serif;
            @apply text-center;

            &:hover {
                &:not(.close) {
                    background-color: $titlebar-button-hover-background;
                }

                &.close {
                    color: $titlebar-exit-color;
                    background-color: $titlebar-exit-background;
                }
            }
        }
    }
}
</style>
