<template>
    <div class="item-icon" :data-ext="ext" />
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'item-icon-',
    props: { ext: { required: true, type: String } },
});
</script>
<style lang="postcss">
@define-mixin item-icon $ext, $file: $ext {
    &[data-ext='$(ext)'] {
        background-image: url('../../assets/icons/$(file).svg');
    }
}

.item-icon {
    width: 20px;
    min-width: 20px;
    height: 20px;
    background-image: url('../../assets/icons/file.svg');

    /* folder */

    @mixin item-icon disk;
    @mixin item-icon folder;
    @mixin item-icon folder_cloud;
    @mixin item-icon folder_cloud_mega;
    @mixin item-icon folder_ai_scans, desk-lamp;
    @mixin item-icon folder_complete;
    @mixin item-icon folder_drop;
    @mixin item-icon folder_raw;
    @mixin item-icon folder_redraw;
    @mixin item-icon folder_psd;
    @mixin item-icon folder_png;
    @mixin item-icon folder_trans;

    /* image */

    @mixin item-icon psd;
    @mixin item-icon png, photo;
    @mixin item-icon jpeg, photo;
    @mixin item-icon jpg, photo;
    @mixin item-icon gif, photo;

    /* document */

    @mixin item-icon aiscans, desk-lamp;
    @mixin item-icon txt, text;
    @mixin item-icon pdf;
    @mixin item-icon doc, office-word;
    @mixin item-icon docx, office-word;
    @mixin item-icon xls, office-excel;
    @mixin item-icon xlsx, office-excel;

    /** */

    @mixin item-icon lnk, link;
    @mixin item-icon mp3;
    @mixin item-icon mp4;
    @mixin item-icon zip;
    @mixin item-icon 7zip, zip;
    @mixin item-icon rar, zip;
}
</style>
