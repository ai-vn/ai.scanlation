/* eslint-disable no-alert */
/* eslint-disable no-process-exit */
import { app } from 'electron';
import { getCertificate } from '~/utils/build/certificate';

export async function allowCertificate() {
    const keys = await getCertificate();

    const onCertificateError = (
        event: Electron.Event,
        webContents: Electron.WebContents,
        url: string,
        error: string,
        certificate: Electron.Certificate,
        trust: (isTrusted: boolean) => void,
    ) => {
        const newline = /\r?\n|\r/g;

        const fromPem = keys.cert.replace(newline, '');
        const fromElectron = certificate.data.replace(newline, '');
        if (fromPem !== fromElectron) {
            throw new Error('Certificate does not match');
        }
        event.preventDefault();
        trust(true);
    };
    if (app.listeners('certificate-error')[1] !== onCertificateError) {
        app.on('certificate-error', onCertificateError);
    }
}
