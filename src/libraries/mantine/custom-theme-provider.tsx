import { TTheme } from '@/types';
import {
  CSSVariablesResolver,
  MantineContext,
  MantineStylesTransform,
  MantineThemeOverride,
  MantineThemeProvider,
  convertCssVariables,
  em,
  keys,
  px,
  useMantineCssVariablesResolver,
  useMantineStyleNonce,
  useMantineTheme,
} from '@mantine/core';
import { useCustomProviderColorScheme, useRespectReduceMotion } from './custom-theme-hook';
import {
  CustomColorSchemeManager,
  customLocalStorageColorSchemeManager,
} from './custom-theme-manager';
import { getColorSchemeCssVariables, getMergedVariables, removeDefaultVariables } from './util';

import '@mantine/core/styles/baseline.css';
import '@mantine/core/styles/default-css-variables.css';
import '@mantine/core/styles/global.css';

export interface MantineProviderProps {
  /** Theme override object */
  theme?: MantineThemeOverride;

  /** Used to retrieve/set color scheme value in external storage, by default uses `window.localStorage` */
  colorSchemeManager?: CustomColorSchemeManager;

  /** Default color scheme value used when `colorSchemeManager` cannot retrieve value from external storage, `light` by default */
  defaultColorScheme?: TTheme;

  /** CSS selector to which CSS variables should be added, `:root` by default */
  cssVariablesSelector?: string;

  /** Determines whether theme CSS variables should be added to given `cssVariablesSelector`, `true` by default */
  withCssVariables?: boolean;

  /** Determines whether CSS variables should be deduplicated: if CSS variable has the same value as in default theme, it is not added in the runtime. `true` by default. */
  deduplicateCssVariables?: boolean;

  /** Function to resolve root element to set `data-mantine-color-scheme` attribute, must return undefined on server, `() => document.documentElement` by default */
  getRootElement?: () => HTMLElement | undefined;

  /** A prefix for components static classes (for example {selector}-Text-root), `mantine` by default */
  classNamesPrefix?: string;

  /** Function to generate nonce attribute added to all generated `<style />` tags */
  getStyleNonce?: () => string;

  /** Function to generate CSS variables based on theme object */
  cssVariablesResolver?: CSSVariablesResolver;

  /** Determines whether components should have static classes, for example, `mantine-Button-root`. `true` by default */
  withStaticClasses?: boolean;

  /** Determines whether global classes should be added with `<style />` tag. Global classes are required for `hiddenFrom`/`visibleFrom` and `lightHidden`/`darkHidden` props to work. `true` by default. */
  withGlobalClasses?: boolean;

  /** An object to transform `styles` and `sx` props into css classes, can be used with CSS-in-JS libraries */
  stylesTransform?: MantineStylesTransform;

  /** Your application */
  children?: React.ReactNode;

  /** Environment at which the provider is used, `'test'` environment disables all transitions and portals */
  env?: 'default' | 'test';
}

export function CustomMantineProvider({
  theme,
  children,
  getStyleNonce,
  withStaticClasses = true,
  withGlobalClasses = true,
  deduplicateCssVariables = true,
  withCssVariables = true,
  cssVariablesSelector = ':root',
  classNamesPrefix = 'mantine',
  colorSchemeManager = customLocalStorageColorSchemeManager(),
  defaultColorScheme = 'theme1',
  getRootElement = () => document.documentElement,
  cssVariablesResolver,
  stylesTransform,
  env,
}: MantineProviderProps) {
  const { colorScheme, setColorScheme, clearColorScheme } = useCustomProviderColorScheme({
    defaultColorScheme,
    manager: colorSchemeManager,
    getRootElement,
  });

  useRespectReduceMotion({
    respectReducedMotion: theme?.respectReducedMotion || false,
    getRootElement,
  });

  return (
    <MantineContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        clearColorScheme,
        getRootElement,
        classNamesPrefix,
        getStyleNonce,
        cssVariablesResolver,
        cssVariablesSelector,
        withStaticClasses,
        stylesTransform,
        env,
      }}
    >
      <MantineThemeProvider theme={theme}>
        {withCssVariables && (
          <MantineCssVariables
            cssVariablesSelector={cssVariablesSelector}
            deduplicateCssVariables={deduplicateCssVariables}
          />
        )}
        {withGlobalClasses && <MantineClasses />}
        {children}
      </MantineThemeProvider>
    </MantineContext.Provider>
  );
}

CustomMantineProvider.displayName = '@mantine/core/MantineProvider';

interface MantineCssVariablesProps {
  cssVariablesSelector: string;
  deduplicateCssVariables: boolean;
}

export function MantineCssVariables({
  cssVariablesSelector,
  deduplicateCssVariables,
}: MantineCssVariablesProps) {
  const theme = useMantineTheme();
  const nonce = useMantineStyleNonce();
  const generator = useMantineCssVariablesResolver();
  const mergedVariables = getMergedVariables({ theme, generator });
  const shouldCleanVariables = cssVariablesSelector === ':root' && deduplicateCssVariables;
  const cleanedVariables = shouldCleanVariables
    ? removeDefaultVariables(mergedVariables)
    : mergedVariables;
  const css = convertCssVariables(cleanedVariables, cssVariablesSelector);

  if (css) {
    return (
      <style
        data-mantine-styles
        nonce={nonce?.()}
        dangerouslySetInnerHTML={{
          __html: `${css}${
            shouldCleanVariables ? '' : getColorSchemeCssVariables(cssVariablesSelector)
          }`,
        }}
      />
    );
  }

  return null;
}

MantineCssVariables.displayName = '@mantine/CssVariables';

export function MantineClasses() {
  const theme = useMantineTheme();
  const nonce = useMantineStyleNonce();

  const classes = keys(theme.breakpoints).reduce<string>((acc, breakpoint) => {
    const isPxBreakpoint = theme.breakpoints[breakpoint].includes('px');
    const pxValue = px(theme.breakpoints[breakpoint]) as number;
    const maxWidthBreakpoint = isPxBreakpoint ? `${pxValue - 0.1}px` : em(pxValue - 0.1);
    const minWidthBreakpoint = isPxBreakpoint ? `${pxValue}px` : em(pxValue);

    return `${acc}@media (max-width: ${maxWidthBreakpoint}) {.mantine-visible-from-${breakpoint} {display: none !important;}}@media (min-width: ${minWidthBreakpoint}) {.mantine-hidden-from-${breakpoint} {display: none !important;}}`;
  }, '');

  return (
    <style
      data-mantine-styles="classes"
      nonce={nonce?.()}
      dangerouslySetInnerHTML={{ __html: classes }}
    />
  );
}

MantineClasses.displayName = '@mantine/core/MantineClasses';
