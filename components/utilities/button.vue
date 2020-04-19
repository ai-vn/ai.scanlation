<template>
    <div
        class="btn"
        :class="{
            'no-icon': !icon,
        }"
        @click="$emit('click', $event)"
    >
        <icon- v-if="icon" :i="icon" class="btn-icon" />
        <div v-if="text" class="btn-text">{{ text }}</div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({ name: 'button-' })
export default class extends Vue {
    @Prop({ type: String })
    icon!: string;

    @Prop({ type: String })
    text!: string;
}
</script>
<style lang="postcss">
.btn {
    @apply flex cursor-pointer rounded;

    height: var(--component-size);
    line-height: var(--component-size);
    background-color: var(--component-background-color);

    &:hover {
        color: #fff;
    }

    &-icon {
        @apply text-center;

        width: var(--component-size);
        font-size: calc(var(--component-size) * 0.5);

        + ^&-text {
            @apply pl-0;
        }
    }

    &-text {
        @apply px-2;
    }
}
</style>
