declare module 'nuxt' {
    import { IncomingMessage, ServerResponse } from 'http';
    import NuxtConfiguration from '@nuxt/config';

    export class Nuxt {
        public constructor(config: NuxtConfiguration);

        public render(req: IncomingMessage, res: ServerResponse): Promise<void>;
    }

    export class Builder {
        public constructor(nuxt: Nuxt);

        public build(): Promise<void>;
    }
}
