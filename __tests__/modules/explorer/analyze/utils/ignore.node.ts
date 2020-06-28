import { ignoreFilter } from '~/modules/explorer/analyze/utils/ignore';

describe('modules/explorer/analyze/utils/ignore', () => {
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
