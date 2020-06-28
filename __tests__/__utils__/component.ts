export async function importComponents() {
    const register = await import('babel-plugin-require-context-hook/register');
    register.default();

    await import('~/plugins/components-auto');
}
