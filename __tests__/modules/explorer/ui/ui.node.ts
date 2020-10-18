import { every } from 'lodash';
import { ExplorerTabs } from '~/modules/explorer';

describe('modules/explorer/ui/ui', () => {
    it('should have three tabs', () => {
        expect.hasAssertions();

        const result = every(
            ExplorerTabs,
            tab =>
                typeof tab.icon === 'string' &&
                typeof tab.title === 'string' &&
                typeof tab.accelerator === 'string',
        );
        expect(result).toBeTrue();
    });
});
