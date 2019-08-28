/* eslint-disable no-process-exit */
import { Builder, Nuxt } from 'nuxt';
import config from '../../nuxt.config';

export function createNuxtInstance() {
    const nuxt = new Nuxt({ ...config, dev: true });

    new Builder(nuxt).build().catch(err => {
        console.error(err);
        process.exit(1);
    });

    return nuxt;
}
