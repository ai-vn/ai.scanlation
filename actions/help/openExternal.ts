import { shell } from 'electron';
import { ActionItem } from '~/actions/actions.type';

const open = (path: string) => () => {
    shell.openExternal(path);
};

export const openWebsite: ActionItem = {
    call: open('https://ai-vn.net'),
    title: 'Website',
    icon: 'globe',
};

export const openGithub: ActionItem = {
    call: open('https://github.com/ai-vn/ai.scanlation'),
    title: 'Github',
    icon: 'github',
};

export const openFacebook: ActionItem = {
    call: open('https://www.facebook.com/ai.scanlation'),
    title: 'Facebook',
    icon: 'facebook',
};

export const openFeedback: ActionItem = {
    call: open('https://github.com/ai-vn/ai.scanlation/issues/new'),
    title: 'Feedback',
    icon: 'message-square',
};
