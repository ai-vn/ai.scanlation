import ignore from 'ignore';

export const ignoreFilter = ignore()
    .add([
        '.*',
        '!.aiscans',
        '$SysReset',
        '*.sys',
        'System Volume Information',
        '$RECYCLE.BIN',
        'Config.Msi',
        'bootmgr',
        'debug.log',
        'desktop.ini',
        'Recovery',
        'OneDriveTemp',
    ])
    .createFilter();
