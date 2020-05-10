import { session } from 'electron';

export const partition = 'ai-scanlation:partition';
export const appSession = session.fromPartition(partition);
