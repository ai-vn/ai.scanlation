/* eslint-disable no-param-reassign */
import { normalize } from 'path';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { explorer, analyzeImages } from '~/modules/explorer';
import { FileSystemObject } from '~/modules/explorer/types';
import { Payload } from '~/types/type';
import { StoreWatch } from '~/utils';

@Module({
    name: 'explorer',
    stateFactory: true,
    namespaced: true,
})
export default class Explorer extends VuexModule {
    folderPath = '';
    isValid = false;

    files: FileSystemObject[] = [];
    folders: FileSystemObject[] = [];

    @Mutation
    setFolderPath(value: string) {
        this.folderPath = value;
    }

    @Action
    updateFolderPath() {
        const normalizePath = normalize(this.folderPath).replace(/\\$/, '');
        this.setFolderPath(normalizePath);
    }

    @Mutation
    setData(data?: { files: FileSystemObject[]; folders: FileSystemObject[] }) {
        if (!data) {
            this.files = [];
            this.folders = [];
            this.isValid = false;
        } else {
            this.files = data.files;
            this.folders = data.folders;
            this.isValid = true;
        }
    }

    @Mutation
    updateFile({
        file,
        data,
    }: {
        file: FileSystemObject;
        data: Partial<FileSystemObject>;
    }) {
        Object.assign(file, data);
    }

    @Mutation
    toggleSelectedFile(file: FileSystemObject) {
        file.selected = !file.selected;
    }

    @Action
    @StoreWatch(Explorer, 'explorer', 'folderPath')
    async watchFolderPath({ value: folderPath, oldValue }: Payload<string>) {
        if (folderPath === oldValue) return;

        const normalizePath = normalize(folderPath)
            .replace(/:\.$/, ':\\')
            .replace(/^\.$/, '');

        if (normalizePath !== folderPath) {
            this.setFolderPath(normalizePath);
            return;
        }

        const data = await explorer(folderPath);
        this.setData(data);

        await analyzeImages(this.files, this.updateFile);
    }
}
