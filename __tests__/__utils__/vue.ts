import { computed } from '@nuxtjs/composition-api';

export const toComputed = <T>(data: T) => computed(() => data);
