declare module 'tailwindcss' {
    import { Plugin } from 'postcss';
    import { TailwindPlugin } from 'tailwindcss/plugin';

    export type TailwindProperties =
        | 'accessibility'
        | 'alignContent'
        | 'alignItems'
        | 'alignSelf'
        | 'animation'
        | 'appearance'
        | 'backgroundAttachment'
        | 'backgroundColor'
        | 'backgroundOpacity'
        | 'backgroundPosition'
        | 'backgroundRepeat'
        | 'backgroundSize'
        | 'borderCollapse'
        | 'borderColor'
        | 'borderOpacity'
        | 'borderRadius'
        | 'borderStyle'
        | 'borderWidth'
        | 'boxShadow'
        | 'boxSizing'
        | 'clear'
        | 'container'
        | 'cursor'
        | 'display'
        | 'divideColor'
        | 'divideOpacity'
        | 'divideWidth'
        | 'fill'
        | 'flex'
        | 'flexDirection'
        | 'flexGrow'
        | 'flexShrink'
        | 'flexWrap'
        | 'float'
        | 'fontFamily'
        | 'fontSize'
        | 'fontSmoothing'
        | 'fontStyle'
        | 'fontWeight'
        | 'gap'
        | 'gridAutoFlow'
        | 'gridColumn'
        | 'gridColumnEnd'
        | 'gridColumnStart'
        | 'gridRow'
        | 'gridRowEnd'
        | 'gridRowStart'
        | 'gridTemplateColumns'
        | 'gridTemplateRows'
        | 'height'
        | 'inset'
        | 'justifyContent'
        | 'letterSpacing'
        | 'lineHeight'
        | 'listStylePosition'
        | 'listStyleType'
        | 'margin'
        | 'maxHeight'
        | 'maxWidth'
        | 'minHeight'
        | 'minWidth'
        | 'objectFit'
        | 'objectPosition'
        | 'opacity'
        | 'order'
        | 'outline'
        | 'overflow'
        | 'overscrollBehavior'
        | 'padding'
        | 'placeholderColor'
        | 'placeholderOpacity'
        | 'pointerEvents'
        | 'position'
        | 'resize'
        | 'rotate'
        | 'scale'
        | 'skew'
        | 'space'
        | 'stroke'
        | 'strokeWidth'
        | 'tableLayout'
        | 'textAlign'
        | 'textColor'
        | 'textDecoration'
        | 'textOpacity'
        | 'textTransform'
        | 'transform'
        | 'transformOrigin'
        | 'transitionDelay'
        | 'transitionDuration'
        | 'transitionProperty'
        | 'transitionTimingFunction'
        | 'translate'
        | 'userSelect'
        | 'verticalAlign'
        | 'visibility'
        | 'whitespace'
        | 'width'
        | 'wordBreak'
        | 'zIndex';

    type ThemeMapValue = (
        theme: <T extends keyof TailWindConfigTheme>(
            key: T,
        ) => TailWindConfigTheme[T],
    ) => any;

    type TailWindConfigThemeValue =
        | Record<string, string | number | string[] | number>
        | ThemeMapValue;

    type TailWindConfigTheme = Partial<
        Record<TailwindProperties, TailWindConfigThemeValue> & {
            screens: Record<string, string>;
            colors: Record<string, string | Record<string | number, string>>;
            spacing: Record<string, string>;
        }
    >;

    export type TailwindConfig = {
        purge: string[];
        prefix: string;
        important: boolean;
        separator: string;
        theme: TailWindConfigTheme & { extend?: TailWindConfigTheme };
        variants: Partial<Record<TailwindProperties, string[]>> &
            Record<string, string[]>;
        corePlugins: Record<string, boolean> | string[];
        plugins: TailwindPlugin[];
    };

    const tailwind: Plugin<Partial<TailwindConfig>>;

    export default tailwind;
}
