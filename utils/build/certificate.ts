/* eslint-disable no-console */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import {
    CertificateCreationOptions as Options,
    CertificateCreationResult as Results,
    createCertificate,
} from 'pem';

const dir = join(__dirname, '../../.certificate');
const getPath = (name: 'key' | 'crt') => join(dir, `nuxt.${name}`);

type CertificateResult = {
    key: Results['clientKey'];
    cert: Results['certificate'];
};

export async function getCertificate(): Promise<CertificateResult> {
    try {
        // Use signed certificate.;
        if (!existsSync(dir)) mkdirSync(dir);
        const key = readFileSync(getPath('key'), 'utf8');
        const cert = readFileSync(getPath('crt'), 'utf8');

        return { key, cert };
    } catch (e) {
        // Create a new self-signed certificate.;
        const certificate = promisify<Options, Results>(createCertificate);
        const keys = await certificate({ days: 30, selfSigned: true });

        writeFileSync(getPath('key'), keys.clientKey);
        writeFileSync(getPath('crt'), keys.certificate);

        return { key: keys.clientKey, cert: keys.certificate };
    }
}
