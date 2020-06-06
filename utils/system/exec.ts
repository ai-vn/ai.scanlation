import { exec } from 'child_process';

export const execute = (cmd: string) =>
    new Promise<string>((resolve, reject) =>
        exec(cmd, (error, stdout, stderr) => {
            if (error) reject(error);
            else resolve(stdout || stderr);
        }),
    );
