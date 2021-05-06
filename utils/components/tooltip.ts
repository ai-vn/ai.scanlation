import { computed } from '@nuxtjs/composition-api';
import { TooltipSettings } from 'v-tooltip';
import { ActionProps, useAction } from './actions';
import { defineProp } from '~/utils/components/vue';
import { toShortcut } from '~/utils/converts/toShortcut';

type TypeTooltip = boolean | string | TooltipSettings;

export const tooltipProp = defineProp<TypeTooltip>({
    type: [Boolean, String, Object],
});

export const useTooltip = (
    props: ActionProps & { tooltip?: TypeTooltip },
    render: ReturnType<typeof useAction>,
) => ({
    tooltip_: computed(() => {
        const { shortcut_, title_ } = render;
        const { tooltip } = props;

        switch (tooltip) {
            case true:
                return [title_.value, toShortcut(shortcut_.value)]
                    .filter(i => i)
                    .join(' ');
            case false:
                return toShortcut(shortcut_.value, false);
            default:
                return tooltip;
        }
    }),
});