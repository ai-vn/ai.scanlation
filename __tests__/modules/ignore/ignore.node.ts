import { ignoreFilter } from '~/modules/ignore/ignore';

describe('modules/ignore/ignore', () => {
    it('should return folder type', () => {
        expect.hasAssertions();

        const results = [
            'normal file',
            '$RECYCLE.BIN',
            'debug.log',
            'desktop.ini',
        ].filter(ignoreFilter);

        expect(results).not.toContain('$RECYCLE.BIN');
        expect(results).toHaveLength(1);
    });
});
