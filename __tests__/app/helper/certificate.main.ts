/* eslint-disable @typescript-eslint/no-empty-function */
import { app, App } from 'electron';
import { allowCertificate } from '~/app/helper/certificate';
import { getCertificate } from '~/utils/build/certificate';

describe('app/helper/certificate', () => {
    function onCertificateError(
        data: string,
    ): ((event: 'window-all-closed', listener: Function) => App) | undefined {
        return function listenerFn(this: App, event: string, listener) {
            if (event === 'certificate-error') {
                const listen = listener as (
                    event: Electron.Event,
                    webContents: Electron.WebContents,
                    url: string,
                    error: string,
                    certificate: Electron.Certificate,
                    trust: (isTrusted: boolean) => void,
                ) => void;
                listen(
                    { preventDefault() {} } as Electron.Event,
                    {} as Electron.WebContents,
                    '',
                    '',
                    { data } as Electron.Certificate,
                    () => {},
                );
            }
            return this;
        };
    }

    beforeAll(async () => {});

    it('should ignore certificate error', async () => {
        expect.assertions(0);
        const keys = await getCertificate();
        jest.spyOn(app, 'on').mockImplementation(onCertificateError(keys.cert));
        await allowCertificate();
    });

    it('should not ignore certificate error', async () => {
        expect.hasAssertions();
        jest.spyOn(app, 'on').mockImplementation(onCertificateError(''));
        await expect(allowCertificate).rejects.toThrow(
            'Certificate does not match',
        );
    });
});
