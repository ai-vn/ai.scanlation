import { nonNull } from '~/utils/converts/nonNull';

describe('utils/convert/nonNull', () => {
    const object: { a: { b: string }; c?: string } = {
        a: { b: 'data' },
    };

    type NonNullReturn<T> = (obj: T) => string | number;

    it('should return data', async () => {
        expect.hasAssertions();

        const method: NonNullReturn<typeof object> = nonNull(
            o => o.a,
            a => a.b,
        );
        expect(method(object)).toStrictEqual('data');
    });

    it('should return empty string', async () => {
        expect.hasAssertions();

        const method: NonNullReturn<typeof object> = nonNull(
            o => o.c,
            c => c.length,
        );
        expect(method(object)).toStrictEqual('');
    });
});
