import { join } from 'path';
import { promisify } from 'util';
import {
    CertificateCreationOptions,
    CertificateCreationResult,
    createCertificate,
} from 'pem';
import rimraf from 'rimraf';
import { getCertificate } from '~/utils/build/certificate';

const dir = join(__dirname, '../../../.certificate');

describe('certificate', () => {
    it('should create certificate without write', async () => {
        expect.hasAssertions();

        const certificate = promisify<
            CertificateCreationOptions,
            CertificateCreationResult
        >(createCertificate);

        const keys = await certificate({ days: 30, selfSigned: true });

        expect(keys.certificate).toBeString();
        expect(keys.clientKey).toBeString();
    });

    describe('getCertificate', () => {
        const cleanCertificate = () => rimraf.sync(dir);

        it('should create folder & certificate', async () => {
            expect.hasAssertions();
            cleanCertificate();
            await getCertificate();
            const keys = await getCertificate();
            expect(keys.cert).toBeString();
            expect(keys.key).toBeString();
        });
    });
});
