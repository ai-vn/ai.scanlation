import { app } from 'electron';
import { CertificateCreationResult } from 'pem';

export function allowCertificate(keys: CertificateCreationResult) {
    const onCertificateError = (
        event: Electron.Event,
        webContents: Electron.WebContents,
        url: string,
        error: string,
        certificate: Electron.Certificate,
        trust: (isTrusted: boolean) => void,
    ) => {
        const newline = /\r?\n|\r/g;

        const fromPem = keys.certificate.replace(newline, '');
        const fromElectron = certificate.data.replace(newline, '');
        if (fromPem !== fromElectron) {
            throw new Error('Certificate does not match ');
        }
        event.preventDefault();
        trust(true);
    };
    if (app.listeners('certificate-error')[1] !== onCertificateError) {
        app.on('certificate-error', onCertificateError);
    }
}
