import { normalize } from 'path';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { reader } from '~/modules/reader';
import { FileReaderObject } from '~/modules/reader/types';
import { Payload } from '~/types/type';
import { StoreWatch } from '~/utils';

@Module({
    name: 'reader',
    stateFactory: true,
    namespaced: true,
})
export default class Reader extends VuexModule {
    folderPath = '';
    isValid = false;
    files: FileReaderObject[] = [];
    isSpace = true;
    isShowList = true;

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
    setData(data?: { files: FileReaderObject[] }) {
        if (!data) {
            this.files = [];
            this.isValid = false;
        } else {
            this.files = data.files;
            this.isValid = true;
        }
    }

    @Mutation
    updateFile({
        file,
        data,
    }: {
        file: FileReaderObject;
        data: Partial<FileReaderObject>;
    }) {
        Object.assign(file, data);
    }

    @Action
    @StoreWatch(Reader, 'reader', 'folderPath')
    async watchFolderPath({ value: folderPath, oldValue }: Payload<string>) {
        if (folderPath === oldValue) return;

        const normalizePath = normalize(folderPath)
            .replace(/:\.$/, ':\\')
            .replace(/^\.$/, '');

        if (normalizePath !== folderPath) {
            this.setFolderPath(normalizePath);
        }
        const data = await reader(folderPath);
        this.setData(data);
    }

    @Mutation
    toggleShowList() {
        this.isShowList = !this.isShowList;
    }

    @Mutation
    toggleSpace() {
        this.isSpace = !this.isSpace;
    }
}
