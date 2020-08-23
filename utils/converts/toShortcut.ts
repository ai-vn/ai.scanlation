export const toShortcut = (accelerator?: string) =>
    accelerator
        ? `<span class="capitalize">(${accelerator})</span>`
        : undefined;
