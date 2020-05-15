<template>
    <div v-if="hr" class="menu-item-hr" />
    <li
        v-else
        class="menu-item"
        :class="{ root: isRoot }"
        @mouseenter="enter"
        @dbclick="leave"
        @click="action_"
    >
        <div class="menu-item-title">
            <icon- v-if="!isRoot" :i="icon" />
            <div class="menu-item-title-text flex-1">
                {{ title_ }}
            </div>
            <icon- v-if="!isRoot && $slots.default" i="chevron-right" />
            <div
                v-if="!$slots.default && shortcut_"
                class="menu-item-title-shortcut"
            >
                {{ shortcut_ }}
            </div>
        </div>
        <ul
            v-if="$slots.default"
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
import { isAction, Render } from '~/utils';
import { ActionItem } from '~/modules/actions.type';

@Component({ name: 'menu-item-' })
export default class MenuItem extends Vue {
    @Prop({ type: Object, validator: isAction })
    @Render<MenuItem>(t => () => {
        t.action?.call();
        t.$emit('click');
    })
    action!: ActionItem;

    @Prop({ type: String })
    @Render<MenuItem>(t => t.action?.title ?? t.title)
    title!: string;

    @Prop({ type: String })
    @Render<MenuItem>(t => t.action?.accelerator ?? t.shortcut)
    shortcut!: string;

    @Prop({ type: String })
    icon!: string;

    @Prop({ type: Boolean })
    hr!: boolean;

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
        > ^&-title {
            > ^^&-title-text {
                @apply mx-2;
            }

            > ^^&-title-shortcut {
                @apply hidden;
            }
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

        &-text {
            @apply mr-2;
        }

        &-shortcut {
            @apply ml-2 mr-3 capitalize;
        }
    }

    &-ul {
        @apply py-1 hidden absolute z-50;

        min-width: 150px;
        background-color: var(--menu-background-color);
        box-shadow: 0 0 5px #000b;
    }

    &-hr {
        @apply mx-2 my-1;

        border-bottom: 1px solid var(--main-text-color);
        opacity: 0.5;
    }
}
</style>
