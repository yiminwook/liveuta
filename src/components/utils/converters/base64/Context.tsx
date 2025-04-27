import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { Effect } from 'effect';
import type { ReactNode } from 'react';
import { createContext, memo, useContext, useMemo, useState } from 'react';
import { execute } from './convert';

type Base64ContextType = {
  isEncode: boolean;
  repeat: number;
  input: string;
  result: {
    value: string;
    error: boolean;
  };
};

type Base64ActionsContextType = {
  setIsEncode: (isEncode: boolean) => void;
  setRepeat: (repeat: number) => void;
  setInput: (input: string) => void;
};

const Base64Context = createContext<Base64ContextType | null>(null);
const Base64ActionsContext = createContext<Base64ActionsContextType | null>(null);

export function useBase64Context() {
  const context = useContext(Base64Context);
  if (context === null) {
    throw new Error('useBase64Context must be used within a Base64Provider');
  }
  return context;
}

export function useBase64ActionsContext() {
  const context = useContext(Base64ActionsContext);
  if (context === null) {
    throw new Error('useBase64ActionsContext must be used within a Base64Provider');
  }
  return context;
}

export function Base64Provider({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const { t } = useTranslations(locale);
  const [isEncode, setIsEncode] = useState(true);
  const [repeat, setRepeat] = useState(1);
  const [input, setInput] = useState('');

  const result = useMemo(() => {
    if (input === '') return { value: '', error: false };

    const res = Effect.runSync(
      execute(input, repeat, isEncode).pipe(
        Effect.map((v) => ({
          value: v.value,
          error: false,
        })),
        Effect.catchAll((e) =>
          Effect.succeed({
            value:
              e.type === 'decode'
                ? t('utils.converters.base64.decodeError')
                : t('utils.converters.base64.encodeError'),
            error: true,
          }),
        ),
      ),
    );

    return res;
  }, [input, repeat, isEncode]);

  const value = useMemo(
    () => ({
      isEncode,
      repeat,
      input,
      result,
    }),
    [isEncode, repeat, input, result],
  );

  const actions = useMemo(
    () => ({
      setIsEncode,
      setRepeat,
      setInput,
    }),
    [],
  );

  return (
    <Base64ActionsContext.Provider value={actions}>
      <Base64Context.Provider value={value}>{children}</Base64Context.Provider>
    </Base64ActionsContext.Provider>
  );
}
