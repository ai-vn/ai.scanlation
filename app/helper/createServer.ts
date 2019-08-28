import https from 'https';
import { join } from 'path';
import { format } from 'url';
import { CertificateCreationResult } from 'pem';
import { isDev } from '../env';
import { createNuxtInstance } from './createNuxtInstance';
import { selfSignedCertificate } from './certificate/selfSignedCertificate';

export async function getServer(): Promise<{
    url: string;
    keys?: CertificateCreationResult;
}> {
    if (!isDev) {
        const url = format({
            pathname: join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true,
        });
        return { url };
    }

    const nuxt = createNuxtInstance();

    const keys = await selfSignedCertificate();

    const options = { key: keys.clientKey, cert: keys.certificate };
    const address = https
        .createServer(options, nuxt.render)
        .listen()
        .address();

    if (address === null) throw new Error('Address is null');

    const url =
        typeof address !== 'string'
            ? `https://localhost:${address.port}`
            : address;
    return { url, keys };
}
