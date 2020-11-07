/* eslint-disable no-param-reassign */
import { normalize } from 'path';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { explorer, analyzeImages, ExplorerTabsId } from '~/modules/explorer';
import { FileExplorerObject } from '~/modules/explorer/types';
import { convertFormats, ImageFormat } from '~/modules/images';
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
    folders: FileExplorerObject[] = [];
    files: FileExplorerObject[] = [];

    currentTab: ExplorerTabsId = 'redraw';

    projectId = 0;
    chapterId = 0;
    startNumber = 0;

    renamePattern = '';
    convertFormat: ImageFormat = 'PNG';

    convertSubFolder = true;
    convertTargetFolderPath = '';

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
    setData(data?: {
        files: FileExplorerObject[];
        folders: FileExplorerObject[];
    }) {
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
        file: FileExplorerObject;
        data: Partial<FileExplorerObject>;
    }) {
        Object.assign(file, data);
    }

    @Mutation
    toggleSelectedFile(file: FileExplorerObject) {
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

        await analyzeImages(this);
    }

    @Mutation
    setCurrentTab(value: ExplorerTabsId) {
        this.currentTab = value;
    }

    @Mutation
    setProjectId(value: number) {
        this.projectId = value;
    }

    @Mutation
    setChapterId(value: number) {
        this.chapterId = value;
    }

    @Mutation
    setStartNumber(value: number) {
        this.startNumber = value;
    }

    @Mutation
    setRenamePattern(value: string) {
        this.renamePattern = value;
    }

    @Mutation
    setConvertFormat(value: ImageFormat) {
        this.convertFormat = value;
    }

    @Mutation
    toggleConvertFormat() {
        const index = convertFormats.indexOf(this.convertFormat);
        this.convertFormat =
            convertFormats[(index + 1) % convertFormats.length];
    }

    @Mutation
    setConvertSubFolder(value: boolean) {
        this.convertSubFolder = value;
    }

    @Mutation
    toggleConvertSubFolder() {
        this.convertSubFolder = !this.convertSubFolder;
    }

    @Mutation
    setConvertTargetFolderPath(value: string) {
        this.convertTargetFolderPath = value;
    }
}
