import { ButtonVariant, DefaultMantineColor, MantineColorsTuple } from '@mantine/core';

type ExtendedCustomColors = 'first' | 'second' | 'third' | DefaultMantineColor;
type ExtendedButtonVariant = 'ghost' | ButtonVariant;

declare module '@mantine/core' {
  export interface MantineContextValue {
    colorScheme: TTheme;
    setColorScheme: (colorScheme: TTheme) => void;
    clearColorScheme: () => void;
    getRootElement: () => HTMLElement | undefined;
    classNamesPrefix: string;
    getStyleNonce?: () => string | undefined;
    cssVariablesResolver?: (theme: MantineTheme) => ConvertCSSVariablesInput;
    cssVariablesSelector: string;
    withStaticClasses: boolean;
    headless?: boolean;
    stylesTransform?: MantineStylesTransform;
    env?: 'default' | 'test';
  }

  export declare const MantineContext: import('react').Context<MantineContextValue | null>;

  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }

  export interface ButtonProps {
    variant?: ExtendedButtonVariant;
  }

  export interface ActionIconProps {
    variant?: ExtendedButtonVariant;
  }
}
