import { promisify } from 'util';
import {
    createCertificate,
    CertificateCreationResult,
    CertificateCreationOptions,
} from 'pem';

describe('certificate', () => {
    it('will create certificate', async () => {
        expect.hasAssertions();

        const certificate = promisify<
            CertificateCreationOptions,
            CertificateCreationResult
        >(createCertificate);

        const keys = await certificate({ days: 30, selfSigned: true });

        expect(keys.certificate).toBeString();
        expect(keys.clientKey).toBeString();
    });
});
