<template>
    <group-space- :space="2">
        <button- title="Rename" icon="rename" class="vertical" />
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
            </group-space->
            <group-space- :space="2" child-class="flex-wrap">
                <group- class="flex-1">
                    <input-
                        id="renameName"
                        v-model="projectId"
                        type="number"
                        :min="0"
                        :max="50"
                        class="square"
                    />
                    <div class="vr" />
                    <label for="renameName" class="span cursor-pointer flex-1">
                        Project Name
                    </label>
                </group->
                <group->
                    <label for="renameChap" class="span cursor-pointer">
                        Chap
                    </label>
                    <div class="vr" />
                    <input-
                        id="renameChap"
                        v-model="chapterId"
                        type="number"
                        :min="0"
                        :max="999"
                        class="square"
                        value="0"
                    />
                </group->
                <group->
                    <label for="renameStart" class="span cursor-pointer">
                        Start
                    </label>
                    <div class="vr" />
                    <input-
                        id="renameStart"
                        v-model="startNumber"
                        type="number"
                        :min="0"
                        :max="999"
                        class="square"
                        value="0"
                    />
                </group->
            </group-space->
        </group-space->
    </group-space->
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { explorer } from '~/store';
import { useStore } from '~/utils';

export default defineComponent({
    name: 'explorer-tab-rename-',
    setup: () => ({
        ...useStore(explorer, [
            'renamePattern',
            'projectId',
            'chapterId',
            'startNumber',
        ]),
    }),
});
</script>
