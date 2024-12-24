import { ButtonVariant, DefaultMantineColor, MantineColorsTuple } from '@mantine/core';

type ExtendedCustomColors = 'first' | 'second' | 'third' | DefaultMantineColor;
type ExtendedButtonVariant = 'ghost' | ButtonVariant;

declare module '@mantine/core' {
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
