export const isDev = process.env.NODE_ENV === 'development';
export const isSecurityCheck =
    !isDev || process.env.ELECTRON_SECURITY_CHECK === 'strict';

export function disableSecurity() {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
}
