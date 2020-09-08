import map from '~/assets/fonts/aicon.map.json';

export interface ActionItem {
    call: () => void | Promise<void>;
    condition?: () => boolean | Promise<boolean>;
    accelerator?: string;
    title?: string;
    icon?: keyof typeof map;
}
export type ActionTree = ActionItem | { [key: string]: ActionTree };
