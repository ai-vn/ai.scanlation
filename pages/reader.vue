<template>
    <group-space-
        :space="2"
        class="reader p-3 overflow-hidden flex"
        child-class="flex-col flex-1"
    >
        <div class="flex space-x-2">
            <group->
                <button-
                    tooltip
                    :action="toggleShowList"
                    :active="isShowList"
                />
                <button- v-tooltip="'Previous folder'" icon="chevron-left" />
                <button- v-tooltip="'Next folder'" icon="chevron-right" />
                <button- tooltip :action="reload" />
            </group->
            <group- class="flex-1" :class="{ error: !isValid }">
                <button- tooltip :action="selectFolderPath" />
                <input-
                    v-model="folderPath"
                    type="text"
                    class="flex-1 w-0 !px-0"
                    @blur="updateFolderPath"
                />
                <button- icon="chevron-down" />
            </group->
            <group->
                <button- tooltip :action="toggleSpace" :active="isSpace" />
            </group->
        </div>
        <div
            v-if="files.length !== 0"
            :class="[
                'flex flex-1 flex-row-reverse',
                'space-x-3 space-x-reverse',
                'overflow-x-hidden',
            ]"
        >
            <div class="reader-files scroll">
                <div
                    ref="images"
                    v-dragscroll
                    class="scroll-wrapper relative"
                    :class="{ 'space-y-3': isSpace }"
                    @scroll="onReaderScroll"
                >
                    <div
                        v-for="file in files"
                        :key="file.key"
                        class="reader-files-file"
                    >
                        <img :src="file.path" />
                    </div>
                </div>
            </div>
            <div class="reader-list scroll" :class="{ hidden: !isShowList }">
                <div class="scroll-wrapper">
                    <div
                        v-for="(file, index) in files"
                        :key="file.key"
                        class="reader-list-file"
                        @click="scrollToFile(index, images)"
                    >
                        {{ file.name }}
                        <div
                            v-show="!!file.scroll.top"
                            :style="{ width: file.scroll.top + '%' }"
                            class="reader-list-file-process"
                        />
                        <div
                            v-show="!!file.scroll.bottom"
                            :style="{ width: file.scroll.bottom + '%' }"
                            class="reader-list-file-process"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div
            v-else
            :class="[
                'reader-empty',
                'rounded p-5 flex-1',
                'flex items-center justify-center',
            ]"
        >
            {{ isValid ? 'This folder is empty' : 'In valid folder path' }}
        </div>
    </group-space->
</template>
<script lang="ts">
import {
    defineComponent,
    ref,
    Ref,
    onMounted,
    onUnmounted,
} from '@nuxtjs/composition-api';
import { actions } from '~/actions';
import { onReaderScroll, scrollToFile } from '~/modules/reader';
import { reader } from '~/store';
import { useStore } from '~/utils';

export default defineComponent({
    name: 'reader-',
    setup() {
        const images = ref<HTMLElement>() as Ref<HTMLElement>;

        const resizeListener = () => onReaderScroll({ target: images.value });
        onMounted(() => {
            window.addEventListener('resize', resizeListener);
            resizeListener();
        });
        onUnmounted(() => {
            window.removeEventListener('resize', resizeListener);
        });

        return {
            images,
            onReaderScroll,
            scrollToFile: scrollToFile(images),
            ...actions.reader.folder,
            ...actions.reader.ui,
            ...useStore(reader, [
                'files',
                'folderPath',
                'isShowList',
                'isSpace',
                'isValid',
                'updateFolderPath',
            ]),
        };
    },
});
</script>
<style lang="postcss">
.reader {
    &-list {
        max-width: 33%;
        background-color: var(--component-background-color);

        &-file {
            @apply relative truncate px-4 py-2 text-sm;
            @apply cursor-pointer;

            &:hover {
                background-color: var(--background-color-hover);
            }

            &-process {
                @apply absolute inset-0 border;

                background-color: var(--selected-background-color);
                border-color: var(--selected-line-color);
                border-width: 0 1px 1px;

                ^&:first-child & {
                    @apply border-t rounded-tl;
                }

                ^&:last-child & {
                    @apply rounded-bl;
                }
            }
        }
    }

    &-files {
        @apply flex-1;

        background-color: var(--component-background-color);

        &-file {
            > img {
                @apply mx-auto;

                cursor: grab;

                &:active {
                    cursor: grabbing;
                }
            }
        }
    }

    &-empty {
        background-color: var(--component-background-color);
    }
}
</style>
