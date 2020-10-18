import { AIcon } from '~/assets/fonts/aicon';

export type Tabs<T extends string> = {
    [key in T]: Tab;
};

export type Tab = {
    accelerator?: string;
    title: string;
    icon: AIcon;
};
