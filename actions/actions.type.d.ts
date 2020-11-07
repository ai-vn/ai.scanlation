import { AIcon } from '~/assets/fonts/aicon';

export interface ActionItem {
    call: () => void | Promise<void>;
    condition?: () => boolean | Promise<boolean>;
    accelerator?: string;
    title?: string;
    icon?: AIcon;
}
export type ActionTree = ActionItem | { [key: string]: ActionTree };
