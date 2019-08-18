import { promisify } from 'util';
import {
    CertificateCreationResult,
    createCertificate,
    CertificateCreationOptions,
} from 'pem';

export async function selfSignedCertificate() {
    const certificate = promisify<
        CertificateCreationOptions,
        CertificateCreationResult
    >(createCertificate);

    const keys = await certificate({ days: 30, selfSigned: true });

    return keys;
}
