<template>
    <li
        class="menu-item"
        :class="{ root: isRoot }"
        @mouseenter="enter"
        @dbclick="leave"
        @click="$emit('click')"
    >
        <div class="menu-item-title">
            <icon- v-if="!isRoot" :i="icon" />
            <div class="flex-1">
                {{ title }}
            </div>
            <icon- v-if="!isRoot && this.$slots.default" i="chevron-right" />
        </div>
        <ul
            v-if="this.$slots.default"
            ref="ul"
            class="menu-item-ul"
            :class="{ root: isRoot }"
        >
            <slot />
        </ul>
    </li>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { createPopper, Instance } from '@popperjs/core';

@Component({ name: 'menu-item-' })
export default class extends Vue {
    @Prop({ required: true, type: String })
    title!: string;

    @Prop({ type: String })
    icon!: string;

    popperInstance: Instance | null = null;

    isRoot = true;

    mounted() {
        this.isRoot = this.$parent.$options.name !== 'menu-item-';
    }

    enter() {
        if (!this.$slots.default) return;
        this.popperInstance = createPopper(
            this.$el,
            this.$refs.ul as HTMLElement,
            this.isRoot
                ? { placement: 'bottom-start' }
                : {
                      placement: 'right-start',
                      modifiers: [
                          { name: 'offset', options: { offset: [-4, 0] } },
                      ],
                  },
        );
    }

    leave() {
        if (this.popperInstance) {
            this.popperInstance.destroy();
            this.popperInstance = null;
        }
    }
}
</script>
<style lang="postcss">
.menu-item > ul:not(.root) {
    @apply mt-1;
}

.menu-item {
    &:hover {
        background-color: var(--menu-background-color-hover);

        & > ^&-ul {
            @apply block;
        }
    }

    &.root {
        > ^&-title > div {
            @apply mx-1;
        }
    }

    &-title {
        @apply flex px-1 h-full;

        &:hover {
            background-color: var(--menu-background-color-hover);
        }

        > .icon {
            @apply text-center;

            width: var(--title-bar-size);
            font-size: calc(var(--title-bar-size) * 0.5);
        }

        > div {
            @apply mr-2;
        }
    }

    &-ul {
        @apply py-1 hidden absolute;

        min-width: 150px;
        background-color: var(--menu-background-color);
        box-shadow: 0 0 5px #000b;
    }
}
</style>
