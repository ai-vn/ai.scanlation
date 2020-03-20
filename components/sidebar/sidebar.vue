<template>
    <div class="sidebar">
        <n-link v-tooltip.right="'Home'" to="/" exact>
            <icon- i="home" />
        </n-link>
        <n-link v-tooltip.right="'Explorer'" to="/explorer" exact>
            <icon- i="file" />
        </n-link>
        <n-link v-tooltip.right="'Reader'" to="/reader">
            <icon- i="book-open" />
        </n-link>
        <n-link v-tooltip.right="'Setting'" to="/settings" class="mt-auto">
            <icon- i="settings" />
        </n-link>
    </div>
</template>
<style lang="postcss">
.sidebar {
    $sidebar-size: 3rem;

    border-right-color: var(--line-color);

    @apply flex flex-col border-r;

    > a {
        width: $sidebar-size;
        height: $sidebar-size;
        min-height: $sidebar-size;
        line-height: $sidebar-size;
        cursor: pointer;

        @apply text-center text-xl;

        &.nuxt-link-active {
            background-color: var(--active-background-color);
        }

        &:hover {
            background-color: var(--hover-background-color);
        }
    }
}
</style>
