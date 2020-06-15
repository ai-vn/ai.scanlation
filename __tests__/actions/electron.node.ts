describe('actions/electron/**', () => {
    beforeAll(() => {
        jest.mock('electron', () => ({
            remote: {
                getCurrentWindow: () => ({
                    unmaximize: jest.fn(),
                    minimize: jest.fn(),
                    maximize: jest.fn(),
                    close: jest.fn(),
                    webContents: {
                        toggleDevTools: jest.fn(),
                    },
                }),
            },
        }));
    });

    describe('windows', () => {
        it('should not throw error', async () => {
            expect.hasAssertions();

            const { actions } = await import('~/actions/actions.import');

            expect(actions.unmaximize.call).not.toThrow();
            expect(actions.minimize.call).not.toThrow();
            expect(actions.maximize.call).not.toThrow();
            expect(actions.close.call).not.toThrow();
        });
    });

    describe('dev', () => {
        it('should not throw error', async () => {
            expect.hasAssertions();

            const { actions } = await import('~/actions/actions.import');

            expect(actions.toggleDevTools.call).not.toThrow();
        });
    });
});
