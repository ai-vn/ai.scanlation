<template>
    <group-space- :space="2" child-class="flex-col">
        <group-space- :space="2">
            <button- title="Convert" icon="repeat" class="vertical" />
            <group-space- :space="2" class="flex-1" child-class="flex-col">
                <group-space- :space="2">
                    <group- class="flex-1">
                        <button- icon="star" />
                        <div class="vr" />
                        <input-
                            v-model="renamePattern"
                            type="text"
                            class="flex-1"
                        />
                        <button- icon="chevron-down" />
                    </group->
                    <button-
                        :title="`Format: ${convertFormat}`"
                        @click="toggleConvertFormat"
                    />
                </group-space->
                <group-space- :space="2" child-class="flex-wrap">
                    <group- class="flex-1">
                        <input-
                            id="convertName"
                            v-model="projectId"
                            type="number"
                            :min="0"
                            :max="50"
                            class="square"
                        />
                        <div class="vr" />
                        <label
                            for="convertName"
                            class="span cursor-pointer flex-1"
                        >
                            Project Name
                        </label>
                    </group->
                    <group->
                        <label for="convertChap" class="span cursor-pointer">
                            Chap
                        </label>
                        <div class="vr" />
                        <input-
                            id="convertChap"
                            v-model="chapterId"
                            type="number"
                            :min="0"
                            :max="999"
                            class="square"
                        />
                    </group->
                    <group->
                        <label for="convertStart" class="span cursor-pointer">
                            Start
                        </label>
                        <div class="vr" />
                        <input-
                            id="convertStart"
                            v-model="startNumber"
                            type="number"
                            :min="0"
                            :max="999"
                            class="square"
                        />
                    </group->
                </group-space->
            </group-space->
        </group-space->
        <group-space- :space="2">
            <group- class="flex-1">
                <button- icon="star" />
                <button- :action="selectTargetFolderPath" />
                <div class="vr" />
                <input-
                    v-model="convertTargetFolderPath"
                    type="text"
                    class="flex-1"
                />
                <div class="vr" />
                <button-
                    :title="convertSubFolder ? `Sub folder` : ''"
                    :class="{ expanded: convertSubFolder }"
                    class="convert-sub-folder"
                    @click="toggleConvertSubFolder"
                />
                <div class="vr" />
                <button- icon="chevron-down" />
            </group->
        </group-space->
    </group-space->
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { actions } from '~/actions';
import { explorer } from '~/store';
import { useStore } from '~/utils';

export default defineComponent({
    name: 'explorer-tab-convert-',
    setup: () => ({
        ...actions.explorer.tabs.convert,
        ...useStore(explorer, [
            'renamePattern',
            'projectId',
            'chapterId',
            'startNumber',

            'convertFormat',
            'convertSubFolder',
            'convertTargetFolderPath',
            'toggleConvertFormat',
            'toggleConvertSubFolder',
        ]),
    }),
});
</script>
<style lang="postcss">
.explorer {
    .convert-sub-folder {
        flex: 0;
        min-width: var(--component-size);
        transition: flex 0.5s, background-color 0.2s;

        &.expanded {
            @apply flex-1;
        }

        &:not(.expanded) {
            &:hover {
                background-color: var(--main-background-color-hover);
            }
        }
    }
}
</style>
