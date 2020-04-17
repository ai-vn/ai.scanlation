<template>
    <span class="icon">{{ icon }}</span>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import aicon from '~/assets/fonts/aicon.json';

const map: { [key in string]: string } = aicon.icons.reduce(
    (obj, current) => ({
        ...obj,
        [current.properties.name]: String.fromCharCode(current.properties.code),
    }),
    {},
);

@Component({ name: 'icon-' })
export default class extends Vue {
    @Prop({ required: true, type: String })
    i?: string;

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
