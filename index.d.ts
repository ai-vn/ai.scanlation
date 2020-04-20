export {};

declare global {
    interface Window {
        onNuxtReady: (callback: () => void) => void;
    }
}
