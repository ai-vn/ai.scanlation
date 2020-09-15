import { toComputed } from '~/__tests__/__utils__';
import { useTooltip } from '~/utils';

describe('utils/components/tooltip', () => {
    it.each([[true], [false], [undefined]])(
        'should render tooltip',
        tooltip => {
            expect.assertions(0);

            useTooltip(
                { tooltip },
                {
                    action_: toComputed(jest.fn()),
                    icon_: toComputed(''),
                    shortcut_: toComputed(''),
                    title_: toComputed(''),
                },
            );
        },
    );
});
