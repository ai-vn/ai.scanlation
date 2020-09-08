/* eslint-disable @typescript-eslint/no-empty-function */
import { SetupContext } from '@nuxtjs/composition-api';
import { actionRender } from '~/utils';

describe('utils/components/actions', () => {
    const context = { emit(...args_: any[]) {} } as SetupContext;
    const event = {} as MouseEvent;

    it('should return action render without action', () => {
        expect.assertions(0);

        const action = actionRender(
            { title: '', shortcut: '', icon: '' },
            context,
        );
        action.action_(event);
    });

    it('should return action render with action', () => {
        expect.assertions(0);

        const action = actionRender(
            {
                action: {
                    title: '',
                    accelerator: '',
                    icon: 'x',
                    call: jest.fn(),
                },
            },
            context,
        );
        action.action_(event);
    });
});
