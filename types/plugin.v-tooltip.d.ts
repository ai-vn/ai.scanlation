declare module 'v-tooltip' {
    import { Options as PopperOptions } from '@popperjs/core';
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

    type Placement =
        | 'auto'
        | 'auto-start'
        | 'auto-end'
        | 'top'
        | 'top-start'
        | 'top-end'
        | 'right'
        | 'right-start'
        | 'right-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end'
        | 'left'
        | 'left-start'
        | 'left-end';

    export interface TooltipSettings {
        content: string;
        classes?: string[];
        targetClasses?: string[];
        html?: boolean;
        delay?:
            | number
            | {
                  show: number;
                  hide: number;
              };
        placement?: Placement;
        trigger?: Triggers;
        show?: boolean;
        offset?: number;
        container?: string;
        boundariesElement?: HTMLElement;
        template?: string;
        arrowSelector?: string;
        innerSelector?: string;
        autoHide?: boolean;
        hideOnTargetClick?: boolean;
        loadingClass?: string[];
        loadingContent?: string;
        popperOptions?: PopperOptions;
    }

    interface PluginPopoverOptions {
        defaultPlacement: Placement;
        defaultClass: string;
        defaultBaseClass: string;
        defaultWrapperClass: string;
        defaultInnerClass: string;
        defaultArrowClass: string;
        defaultOpenClass: string;
        defaultDelay: number;
        defaultTrigger: Triggers;
        defaultOffset: number;
        defaultContainer: string;
        defaultBoundariesElement: undefined | HTMLElement;
        defaultPopperOptions: Record<string, unknown>;
        defaultAutoHide: boolean;
        defaultHandleResize: boolean;
    }

    export interface PluginOptions {
        defaultPlacement?: Placement;
        defaultClass?: string;
        defaultTargetClass?: string;
        defaultHtml?: boolean;
        defaultTemplate?: string;
        defaultArrowSelector?: string;
        defaultInnerSelector?: string;
        defaultDelay?: 0;
        defaultTrigger?: Triggers;
        defaultOffset?: 0;
        defaultContainer?: string;
        defaultBoundariesElement?: HTMLElement;
        defaultPopperOptions?: PopperOptions;
        defaultLoadingClass?: string;
        defaultLoadingContent?: string;
        autoHide?: boolean;
        defaultHideOnTargetClick?: true;
        disposeTimeout?: boolean;
        popover?: Partial<PluginPopoverOptions>;
    }

    const plugin: PluginObject<PluginOptions>;

    export default plugin;
}
