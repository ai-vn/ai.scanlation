<template>
    <div class="group">
        <slot />
    </div>
</template>
<style lang="postcss">
.group {
    @apply flex;

    > :not(:first-child) {
        @apply rounded-l-none;
    }

    > :not(:last-child) {
        @apply rounded-r-none;
    }
}
</style>
