export const toShortcut = (accelerator?: string, brackets = true) =>
    accelerator
        ? `<span class="capitalize">${
              brackets ? `(${accelerator})` : accelerator
          }</span>`
        : undefined;
