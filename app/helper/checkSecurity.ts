export function disableSecurity() {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
}
