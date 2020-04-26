import { Module, VuexModule, Mutation } from 'vuex-module-decorators';

@Module({
    name: 'explorer',
    stateFactory: true,
    namespaced: true,
})
export default class extends VuexModule {
    filePath = '';

    @Mutation
    setFilePath(value: string) {
        this.filePath = value;
    }
}
