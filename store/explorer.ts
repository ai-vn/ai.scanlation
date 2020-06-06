import { normalize } from 'path';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { explorer, analyzeImages } from '~/modules/explorer';
import { FileSystemObject } from '~/modules/explorer/types';
import { Payload } from '~/types/type';
import { Watch } from '~/utils';

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
    updateFile(file: Partial<FileSystemObject>) {
        const findedFile = this.files.filter(f => f.path === file.path);
        if (findedFile.length !== 1) return;
        Object.assign(findedFile[0], file);
    }

    @Action
    @Watch(Explorer, 'folderPath', 0)
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
