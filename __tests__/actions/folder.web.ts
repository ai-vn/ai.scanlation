/* eslint-disable no-new */
import { remote } from 'electron';
import Vuex from 'vuex';
import Vue from 'vue';
import { actions } from '~/actions/actions.import';
import { explorer, plugins } from '~/store';
import Explorer from '~/store/explorer';

describe('actions/folder/**', () => {
    beforeAll(() => {
        Vue.use(Vuex);
        new Vuex.Store({ plugins, modules: { explorer: Explorer } });
    });

    it.each([
        [true, []],
        [false, ['folderPath']],
    ])('should not throw error', async (canceled, filePaths) => {
        expect.hasAssertions();
        jest.spyOn(
            remote.dialog,
            'showOpenDialog',
        ).mockImplementation(async () => ({ canceled, filePaths }));

        expect(actions.selectFolder.call).not.toThrow();
    });

    it.each([[''], ['C:/'], ['C:/manga']])(
        'should go to parent folder',
        async folderPath => {
            expect.hasAssertions();
            explorer.setFolderPath(folderPath);
            actions.goToParentFolder.call();
            expect(true).toBeTrue();
        },
    );
});
