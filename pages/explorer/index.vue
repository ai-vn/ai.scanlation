<template>
    <group-space-
        :space="2"
        class="explorer p-3 overflow-hidden flex"
        child-class="flex-col flex-1"
    >
        <group-space- :space="2">
            <explorer-bar-actions- />
            <explorer-tabs-switch- />
        </group-space->
        <explorer-tabs- />
        <explorer-bar-folder-path- />
        <explorer-table- />
    </group-space->
</template>
