<template>
    <div class="group">
        <slot />
    </div>
</template>
<style lang="postcss">
.group {
    @apply flex;

    &.focus {
        outline: -webkit-focus-ring-color solid 1px;
    }

    &.error {
        outline: var(--error-color) solid 1px;
    }

    > .vr {
        @apply w-px;

        background-color: var(--main-background-color);
    }

    > .span {
        @apply px-2 rounded truncate;

        height: var(--component-size);
        line-height: var(--component-size);
        background-color: var(--component-background-color);
    }

    > :not(:first-child) {
        @apply rounded-l-none;
    }

    > :not(:last-child) {
        @apply rounded-r-none;
    }
}
</style>
