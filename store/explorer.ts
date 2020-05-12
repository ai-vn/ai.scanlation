import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({
    name: 'explorer',
    stateFactory: true,
    namespaced: true,
})
export default class extends VuexModule {
    folderPath = '';

    @Mutation
    setFolderPath(value: string) {
        this.folderPath = value;
    }
}
