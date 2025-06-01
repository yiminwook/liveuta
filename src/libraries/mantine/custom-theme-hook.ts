import { TTheme } from '@/types';
import { gtagClick } from '@/utils/gtag';
import { isDarkModeEnabled } from '@/utils/helper';
import { MantineContext, noop, useMantineStyleNonce } from '@mantine/core';
import { useIsomorphicEffect } from '@mantine/hooks';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CustomColorSchemeManager } from './custom-theme-manager';
import { disableTransition, setColorSchemeAttribute } from './util';

interface UseRespectReduceMotionOptions {
  respectReducedMotion: boolean;
  getRootElement: () => HTMLElement | undefined;
}

export function useRespectReduceMotion({
  respectReducedMotion,
  getRootElement,
}: UseRespectReduceMotionOptions) {
  useIsomorphicEffect(() => {
    if (respectReducedMotion) {
      getRootElement()?.setAttribute('data-respect-reduced-motion', 'true');
    }
  }, [respectReducedMotion]);
}

// https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/core/src/core/MantineProvider/use-mantine-color-scheme/use-mantine-color-scheme.ts
export function useCustomMantineColorScheme({
  keepTransitions,
}: { keepTransitions?: boolean } = {}) {
  const clearStylesRef = useRef<() => void>(noop);
  const timeoutRef = useRef<number>(-1);
  const ctx = useContext(MantineContext);
  const nonce = useMantineStyleNonce();
  const nonceValue = useRef(nonce?.());

  if (!ctx) {
    throw new Error('[@mantine/core] MantineProvider was not found in tree');
  }

  const setColorScheme = (value: TTheme) => {
    gtagClick({
      target: 'themeSelect',
      content: value,
      detail: value,
      action: 'themeChange',
    });

    ctx.setColorScheme(value);
    clearStylesRef.current = keepTransitions ? () => {} : disableTransition(nonceValue.current);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      clearStylesRef.current?.();
    }, 10);
  };

  useEffect(
    () => () => {
      clearStylesRef.current?.();
      window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  return {
    colorScheme: ctx.colorScheme,
    mantineColorScheme: isDarkModeEnabled(ctx.colorScheme) ? 'dark' : 'light',
    setColorScheme,
  };
}

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void;

interface UseProviderColorSchemeOptions {
  manager: CustomColorSchemeManager;
  defaultColorScheme: TTheme;
  getRootElement: () => HTMLElement | undefined;
}

// https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/core/src/core/MantineProvider/use-mantine-color-scheme/use-provider-color-scheme.ts
export function useCustomProviderColorScheme({
  manager,
  defaultColorScheme,
  getRootElement,
}: UseProviderColorSchemeOptions) {
  const media = useRef<MediaQueryList>(null);
  const [value, setValue] = useState(() => manager.get('theme1'));

  const setColorScheme = useCallback(
    (colorScheme: TTheme) => {
      setColorSchemeAttribute(colorScheme, getRootElement);
      setValue(colorScheme);
      manager.set(colorScheme);
    },
    [manager.set, value],
  );

  const clearColorScheme = useCallback(() => {
    setValue(defaultColorScheme);
    setColorSchemeAttribute(defaultColorScheme, getRootElement);
    manager.clear();
  }, [manager.clear, defaultColorScheme]);

  useIsomorphicEffect(() => {
    setColorSchemeAttribute(manager.get(defaultColorScheme), getRootElement);
  }, []);

  useEffect(() => {
    manager.subscribe(setColorScheme);
    return manager.unsubscribe;
  }, [manager.subscribe, manager.unsubscribe]);

  useEffect(() => {
    setColorSchemeAttribute(value, getRootElement);

    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      media.current = window.matchMedia('(prefers-color-scheme: dark)');
    }

    const listener: MediaQueryCallback = (event) => {
      // if (value === 'auto') {
      //   setColorSchemeAttribute(event.matches ? 'dark' : 'light', getRootElement);
      // }
    };

    media.current?.addEventListener('change', listener);
    return () => media.current?.removeEventListener('change', listener);
  }, [value]);

  return {
    colorScheme: value,
    setColorScheme,
    clearColorScheme,
  };
}
