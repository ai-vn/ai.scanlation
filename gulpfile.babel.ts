import { spawn } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { cyan, green } from 'chalk';
import { dest, parallel, series, src, task } from 'gulp';
import { safeLoad } from 'js-yaml';
import { Icons } from './types/icon';

const copy = (from: string, to: string) => {
    return () => {
        console.log(`Copy file from ${green(from)} to ${green(to)}`);
        return src(from).pipe(dest(to));
    };
};

task('build:check-asar', callback => {
    const { asar } = safeLoad(
        readFileSync('./electron-builder.yml', 'utf8'),
    ) as { asar: boolean } & Record<string, any>;
    if (asar !== false)
        throw new Error(
            `The config ${cyan('build.asar')} must be ${cyan('false')}`,
        );
    callback();
});

task(
    'build:electron:fast',
    series(
        'build:check-asar',
        callback => {
            console.log(`Run: ${green('electron-webpack main')}`);
            spawn('yarn.cmd', ['electron-webpack', 'main'], {
                stdio: 'inherit',
            }).on('close', code => callback(code));
        },
        copy('./dist/main/**/*', './dist/win-unpacked/resources/app/'),
    ),
);

task(
    'build:nuxt:fast',
    series(
        'build:check-asar',
        callback => {
            console.log(`Run: ${green('nuxt-ts build')}`);
            spawn('yarn.cmd', ['nuxt-ts', 'build'], {
                stdio: 'inherit',
            }).on('close', code => callback(code));
        },
        copy('./dist/renderer/**/*', './dist/win-unpacked/resources/app/'),
    ),
);

task('build:fast', parallel('build:nuxt:fast', 'build:electron:fast'));

task('util:icon', async () => {
    const json: Icons = JSON.parse(
        readFileSync('./assets/fonts/aicon.json', 'utf8'),
    );
    const map = json.icons.reduce(
        (obj, current) => ({
            ...obj,
            [current.properties.name]: String.fromCharCode(
                current.properties.code,
            ),
        }),
        {},
    );
    const mapString = JSON.stringify(map, undefined);
    writeFileSync('./assets/fonts/aicon.map.json', mapString);
});
