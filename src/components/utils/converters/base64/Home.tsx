import ClearButton from '@/components/common/button/ClearButton';
import CopyButton from '@/components/common/button/CopyButton';
import PasteButton from '@/components/common/button/PasteButton';
import UtilsBreadcrumb from '@/components/utils/common/breadcrumb';
import { MdiSwapVertical } from '@icons/mdi/swap-vertical';
import { ActionIcon, NumberInput, Switch, Textarea, Tooltip } from '@mantine/core';
import { Effect } from 'effect';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { execute } from './convert';

export default function Base64Home() {
  const t = useTranslations('utils.converters');
  const [repeat, setRepeat] = useState(1);
  const [isEncoding, setIsEncoding] = useState(true);
  const [input, setInput] = useState('');
  const result = useMemo(() => {
    if (input === '') return { value: '', error: false };

    const res = Effect.runSync(
      execute(input, repeat, isEncoding).pipe(
        Effect.map((v) => ({
          value: v.value,
          error: false,
        })),
        Effect.catchAll((e) =>
          Effect.succeed({
            value: e.type === 'decode' ? t('base64.decodeError') : t('base64.encodeError'),
            error: true,
          }),
        ),
      ),
    );

    return res;
  }, [input, repeat, isEncoding]);

  const handleIsEncodingChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsEncoding(e.currentTarget.checked);
  }, []);

  const handleRepeatChange = useCallback((value: number | string) => {
    if (typeof value === 'number') {
      setRepeat(value);
    } else {
      setRepeat(Number.parseInt(value));
    }
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.currentTarget.value);
  }, []);

  const handleSwap = useCallback(() => setInput(result.value), [result]);

  const paste = useCallback((value: ClipboardItem) => {
    const text = value.getType('text/plain');
    if (text) {
      text.then((v) => v.text()).then((v) => setInput(v));
    }
  }, []);

  const clear = useCallback(() => setInput(''), []);

  return (
    <div>
      <UtilsBreadcrumb
        items={[
          {
            href: '/utils/converters',
            title: t('title'),
          },
          {
            href: '/utils/converters/base64',
            title: t('base64.title'),
          },
        ]}
      />
      <div>
        <Switch
          checked={isEncoding}
          onChange={handleIsEncodingChange}
          label={isEncoding ? '인코딩' : '디코딩'}
        />
      </div>
      <div>
        <NumberInput min={1} value={repeat} onChange={handleRepeatChange} />
      </div>
      <div>
        <ClearButton clear={clear} />
        <PasteButton paste={paste} />
        <CopyButton value={input} />
        <Textarea value={input} onChange={handleInputChange} rows={8} />
      </div>
      <div>
        <Tooltip label={t('base64.swap')} withArrow position="right">
          <ActionIcon size={48} variant="outline" color="gray" onClick={handleSwap}>
            <MdiSwapVertical width={32} height={32} />
          </ActionIcon>
        </Tooltip>
      </div>
      <div>
        <Textarea
          value={result.value}
          readOnly
          onClick={(e) => e.currentTarget.select()}
          error={result.error}
          rows={8}
        />
      </div>
    </div>
  );
}
