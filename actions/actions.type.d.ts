export interface ActionItem {
    call: () => void | Promise<void>;
    accelerator?: string;
    title?: string;
}
