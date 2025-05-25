import { TTheme } from '@/types';
import { isDarkModeEnabled } from '@/utils/helper';
import {
  ConvertCSSVariablesInput,
  DEFAULT_THEME,
  MantineColorScheme,
  MantineTheme,
  deepMerge,
  defaultCssVariablesResolver,
  keys,
} from '@mantine/core';

export function disableTransition(nonce: string | undefined) {
  const style = document.createElement('style');
  style.setAttribute('data-mantine-styles', 'inline');
  style.innerHTML = '*, *::before, *::after {transition: none !important;}';
  style.setAttribute('data-mantine-disable-transition', 'true');
  if (nonce) {
    style.setAttribute('nonce', nonce);
  }

  document.head.appendChild(style);
  const clear = () =>
    document
      .querySelectorAll('[data-mantine-disable-transition]')
      .forEach((element) => element.remove());
  return clear;
}

export function setColorSchemeAttribute(
  colorScheme: TTheme,
  getRootElement: () => HTMLElement | undefined,
) {
  const computedColorScheme = isDarkModeEnabled(colorScheme) ? 'dark' : 'light';
  getRootElement()?.setAttribute('color', colorScheme);
  getRootElement()?.setAttribute('data-mantine-color-scheme', computedColorScheme);
}

export function isMantineColorScheme(value: unknown): value is MantineColorScheme {
  return value === 'auto' || value === 'dark' || value === 'light';
}

export function getColorSchemeCssVariables(selector: string) {
  return `
  ${selector}[data-mantine-color-scheme="dark"] { --mantine-color-scheme: dark; }
  ${selector}[data-mantine-color-scheme="light"] { --mantine-color-scheme: light; }
`;
}

interface GetMergedVariablesInput {
  theme: MantineTheme;
  generator?: (theme: MantineTheme) => ConvertCSSVariablesInput;
}

export function getMergedVariables({ theme, generator }: GetMergedVariablesInput) {
  const defaultResolver = defaultCssVariablesResolver(theme);
  const providerGenerator = generator?.(theme);
  return providerGenerator ? deepMerge(defaultResolver, providerGenerator) : defaultResolver;
}

const defaultCssVariables = defaultCssVariablesResolver(DEFAULT_THEME);

export function removeDefaultVariables(input: ConvertCSSVariablesInput): ConvertCSSVariablesInput {
  const cleaned: ConvertCSSVariablesInput = {
    variables: {},
    light: {},
    dark: {},
  };

  keys(input.variables).forEach((key) => {
    if (defaultCssVariables.variables[key] !== input.variables[key]) {
      cleaned.variables[key] = input.variables[key];
    }
  });

  keys(input.light).forEach((key) => {
    if (defaultCssVariables.light[key] !== input.light[key]) {
      cleaned.light[key] = input.light[key];
    }
  });

  keys(input.dark).forEach((key) => {
    if (defaultCssVariables.dark[key] !== input.dark[key]) {
      cleaned.dark[key] = input.dark[key];
    }
  });

  return cleaned;
}
