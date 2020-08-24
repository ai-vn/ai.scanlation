import { helpAbout } from '~/actions/help/about';

describe('actions/help/about', () => {
    it('should check for updates', () => {
        expect.assertions(0);
        helpAbout.call();
    });
});
