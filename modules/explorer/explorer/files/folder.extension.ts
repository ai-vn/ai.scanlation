const folderTypes: [RegExp, string][] = [
    [/MEGA/, 'folder_cloud_mega'],
    [/OneDrive/i, 'folder_cloud'],
    [/^\[Ai Scans\]$/i, 'folder_ai_scans'],
    [/Complete/i, 'folder_complete'],
    [/Drop/i, 'folder_drop'],
    [/Redraw/i, 'folder_redraw'],
    //
    [/- RAW/i, 'folder_raw'],
    [/- PSD/i, 'folder_psd'],
    [/- PNG/i, 'folder_png'],
    [/- Trans/i, 'folder_trans'],
];

export const getFolderType = (name: string) =>
    folderTypes.find(line => line[0].test(name))?.[1] ?? 'folder';
