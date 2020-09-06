import { tooltipRender } from '~/utils';

describe('utils/components/tooltip', () => {
    it.each([[true], [false], [undefined]])(
        'should render tooltip',
        tooltip => {
            expect.assertions(0);

            tooltipRender(
                { tooltip },
                { action_: jest.fn(), icon_: '', shortcut_: '', title_: '' },
            );
        },
    );
});
