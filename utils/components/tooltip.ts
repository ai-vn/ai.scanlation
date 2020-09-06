import { TooltipSettings } from 'v-tooltip';
import { ActionProps, actionRender } from './actions';
import { toShortcut } from '~/utils/converts/toShortcut';

export const tooltipRender = (
    { tooltip }: ActionProps & { tooltip?: boolean | string | TooltipSettings },
    { shortcut_, title_ }: ReturnType<typeof actionRender>,
) => ({
    tooltip_: (() => {
        const shortcut = toShortcut(shortcut_);
        switch (tooltip) {
            case true:
                return [title_, shortcut].filter(i => i).join(' ');
            case false:
                return shortcut;
            default:
                return tooltip;
        }
    })(),
});
