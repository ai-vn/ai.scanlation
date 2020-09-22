/* eslint-disable @typescript-eslint/no-empty-function */
import { SetupContext } from '@nuxtjs/composition-api';
import { ActionProps, useAction } from '~/utils';

describe('utils/components/actions', () => {
    const context = {
        emit(event_: string, ...args_: any[]) {},
    } as SetupContext;
    const event = {} as MouseEvent;

    it.each<[ActionProps]>([
        [{ title: 'title', shortcut: 'q', icon: 'x' }],
        [
            {
                action: {
                    title: 'title',
                    accelerator: 'q',
                    icon: 'x',
                    call: jest.fn(),
                },
            },
        ],
    ])('should return action render with action', props => {
        expect.hasAssertions();

        const render = useAction(props, context);
        render.action_.value(event);

        if (props.action) expect(props.action.call).toHaveBeenCalledWith();
        expect(render.title_.value).toStrictEqual('title');
        expect(render.shortcut_.value).toStrictEqual('q');
        expect(render.icon_.value).toStrictEqual('x');
    });
});
