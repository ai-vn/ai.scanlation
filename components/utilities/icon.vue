<template>
    <span class="icon">{{ icon }}</span>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import map from '~/assets/fonts/aicon.map.json';

@Component({ name: 'icon-' })
export default class extends Vue {
    @Prop({ type: String })
    i!: keyof typeof map;

    get icon(): string {
        if (!this.i) return '';

        const character = map[this.i];
        if (character === undefined) {
            // eslint-disable-next-line no-console
            console.error(`Not found name [${this.i}] in map`);
            return '';
        }
        return character;
    }
}
</script>
<style lang="postcss">
.icon {
    font-weight: normal;
    font-family: 'aicon', serif !important;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    user-select: none;
}
</style>
