import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import { cyan, green } from 'chalk';
import { dest, parallel, series, src, task } from 'gulp';
// import packageJson from './package.json';
import { safeLoad } from 'js-yaml';

const copy = (from: string, to: string) => {
    return () => {
        console.log(`Copy file from ${green(from)} to ${green(to)}`);
        return src(from).pipe(dest(to));
    };
};

task('build:check-asar', callback => {
    const { asar } = safeLoad(readFileSync('./electron-builder.yml', 'utf8'));
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
