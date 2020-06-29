export interface ActionItem {
    call: () => void | Promise<void>;
    condition?: () => boolean | Promise<boolean>;
    accelerator?: string;
    title?: string;
}
