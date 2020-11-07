<template>
    <div class="group-space">
        <div :class="[`group-space-${space}`, childClass]">
            <slot />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'button-',
    props: {
        space: { required: true, type: Number },
        childClass: { default: '', type: String },
    },
});
</script>
<style lang="postcss">
.group-space {
    > div {
        @apply flex;
    }
}
</style>
