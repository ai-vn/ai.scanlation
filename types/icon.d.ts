export interface Icons {
    IcoMoonType: string;
    icons: IconElement[];
    height: number;
    metadata: PokedexMetadata;
    preferences: Preferences;
}

export interface IconsMap {
    [key: string]: string;
}

export interface IconElement {
    icon: IconIcon;
    attrs: Attr[];
    properties: Properties;
    setIdx: number;
    setId: number;
    iconIdx: number;
}

export interface Attr {}

export interface IconIcon {
    paths: string[];
    attrs: Attr[];
    isMulticolor: boolean;
    isMulticolor2: boolean;
    grid: number;
    tags: string[];
    colorPermutations?: Attr;
}

export interface Properties {
    order: number;
    id: number;
    name: string;
    prevSize: number;
    code: number;
}

export interface PokedexMetadata {
    name: string;
}

export interface Preferences {
    showGlyphs: boolean;
    showCodes: boolean;
    showQuickUse: boolean;
    showQuickUse2: boolean;
    showSVGs: boolean;
    fontPref: FontPref;
    imagePref: ImagePref;
    historySize: number;
    gridSize: number;
    showGrid: boolean;
}

export interface FontPref {
    prefix: string;
    metadata: FontPrefMetadata;
    metrics: Metrics;
    includeMetadata: boolean;
    embed: boolean;
    cssVars: boolean;
    cssVarsFormat: string;
}

export interface FontPrefMetadata {
    fontFamily: string;
    description: string;
    majorVersion: number;
    minorVersion: number;
}

export interface Metrics {
    emSize: number;
    baseline: number;
    whitespace: number;
}

export interface ImagePref {
    prefix: string;
    png: boolean;
    useClassSelector: boolean;
    color: number;
    bgColor: number;
}
