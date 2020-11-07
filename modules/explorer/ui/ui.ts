import { Tabs } from '~/components/utilities/tab/tab';

export type ExplorerTabsId = 'redraw' | 'rename' | 'convert';

export const ExplorerTabs: Tabs<ExplorerTabsId> = {
    redraw: {
        icon: 'brush',
        title: 'Redraw',
        accelerator: 'alt+1',
    },
    rename: {
        icon: 'rename',
        title: 'Rename',
        accelerator: 'alt+2',
    },
    convert: {
        icon: 'repeat',
        title: 'Convert',
        accelerator: 'alt+3',
    },
};
