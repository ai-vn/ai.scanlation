<template>
    <ul class="flex menu">
        <menu-item- title="Tệp">
            <menu-item- icon="folder" title="Mở" />
            <menu-item- icon="folder" title="Mở">
                <menu-item- icon="circle" title="Quần què 1" />
                <menu-item- icon="x" title="Quần què 2" />
            </menu-item->
            <div class="menu-hr" />
            <menu-item- icon="x" title="Thoát" @click="exit" />
        </menu-item->
    </ul>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({ name: 'dropdown-menu-' })
export default class extends Vue {
    exit() {
        //
    }
}
</script>
<style lang="postcss">
.menu {
    -webkit-app-region: no-drag;

    &-hr {
        @apply mx-2 my-1;

        height: 1px;
        background-color: var(--color);
        opacity: 0.5;
    }
}
</style>
