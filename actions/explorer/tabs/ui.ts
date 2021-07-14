import { mapValues } from 'lodash';
import { ActionItem } from '~/actions/actions.type';
import { isExplorer } from '~/actions/conditions';
import { ExplorerTabs, ExplorerTabsId } from '~/modules/explorer';
import { explorer } from '~/store';

export const tabs = mapValues(
    ExplorerTabs,
    ({ icon, title, accelerator }, key) => ({
        call: () => explorer.setCurrentTab(key as ExplorerTabsId),
        condition: isExplorer,
        title,
        icon,
        accelerator,
    }),
);

export const switchTabs: ActionItem = {
    call() {
        const tabsId = Object.keys(ExplorerTabs) as ExplorerTabsId[];
        const currentIndex = tabsId.indexOf(explorer.currentTab);
        const nextTab = tabsId[(currentIndex + 1) % tabsId.length];
        explorer.setCurrentTab(nextTab);
    },
    title: 'Layout',
    accelerator: 'alt+`',
};
