import { Vue } from 'nuxt-property-decorator';

export interface ActionItem {
    call: (this: Vue) => void;
    accelerator?: string;
    title?: string;
}
