import { toSize } from '~/utils/converts/toSize';

describe('utils/convert/toSize', () => {
    it('should convert size to string', async () => {
        expect.hasAssertions();

        expect(toSize(123456789)).toStrictEqual('123,457 MB');
        expect(toSize(0)).toStrictEqual('0 Byte');
    });
});
