declare module 'v-tooltip' {
    import { PluginObject } from 'vue';

    type Triggers =
        | 'hover'
        | 'click'
        | 'focus'
        | 'hover click'
        | 'hover focus'
        | 'click focus'
        | 'click hover focus'
        | 'manual';

    export interface TooltipSettings {
        content: string;
        loadingContent?: string;
        classes?: string[];
        targetClasses?: string[];
        loadingClass?: string[];
        html?: boolean;
        show?: boolean;
        trigger?: Triggers;
        autoHide?: boolean;
        hideOnTargetClick?: boolean;
        delay?:
            | number
            | {
                  show: number;
                  hide: number;
              };
        offset?: number;
        container?: string;
        arrowSelector?: string;
        innerSelector?: string;
        popperOptions?: any;
    }

    const plugin: PluginObject<{}>;

    export default plugin;
}
