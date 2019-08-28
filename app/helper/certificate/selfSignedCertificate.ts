import { promisify } from 'util';
import {
    CertificateCreationOptions,
    CertificateCreationResult,
    createCertificate,
} from 'pem';

export function selfSignedCertificate() {
    const certificate = promisify<
        CertificateCreationOptions,
        CertificateCreationResult
    >(createCertificate);

    return certificate({ days: 30, selfSigned: true });
}
