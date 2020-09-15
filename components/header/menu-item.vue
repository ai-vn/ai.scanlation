<template>
    <div v-if="hr" class="menu-item-hr" />
    <li
        v-else
        ref="el"
        class="menu-item"
        :class="{ root: isRoot }"
        @mouseenter="enter"
        @dbclick="leave"
        @click="action_"
    >
        <div class="menu-item-title">
            <icon- v-if="!isRoot" :i="icon_" />
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
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api';
import { Instance, createPopper } from '@popperjs/core';
import { useAction, actionProps } from '~/utils';

export default defineComponent({
    name: 'menu-item-',
    props: {
        hr: { type: Boolean },
        ...actionProps,
    },
    setup(props, context) {
        const isRoot = ref(true);
        const el = ref<HTMLElement | null>(null);
        const ul = ref<HTMLElement | null>(null);
        let popperInstance: Instance | null = null;

        const enter = () => {
            if (!context.slots.default || !el.value || !ul.value) return;
            popperInstance = createPopper(
                el.value,
                ul.value,
                isRoot.value
                    ? { placement: 'bottom-start' }
                    : {
                          placement: 'right-start',
                          modifiers: [
                              {
                                  name: 'offset',
                                  options: { offset: [-4, 0] },
                              },
                          ],
                      },
            );
        };
        const leave = () => {
            if (!popperInstance) return;
            popperInstance.destroy();
            popperInstance = null;
        };

        onMounted(() => {
            isRoot.value = context.parent?.$options.name !== 'menu-item-';
        });

        return {
            ...{ isRoot, el, ul, enter, leave },
            ...useAction(props, context),
        };
    },
});
</script>
<style lang="postcss">
.menu-item > ul:not(.root) {
    @apply mt-1;
}

.menu-item {
    @apply cursor-pointer;

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
