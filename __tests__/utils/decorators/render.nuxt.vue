<template>
    <div>
        {{ text_ }}
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Render } from '~/utils/decorators/render';

@Component
export default class TemplateClassWithRender extends Vue {
    @Prop({ type: String })
    @Render<TemplateClassWithRender>(t => `render ${t.text}`)
    text!: string;
}
</script>
