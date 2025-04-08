'use client';
import ClearButton from '@/components/common/button/ClearButton';
import CopyButton from '@/components/common/button/CopyButton';
import PasteButton from '@/components/common/button/PasteButton';
import { MdiSwapVertical } from '@icons/mdi/swap-vertical';
import { ActionIcon, NumberInput, Switch, Textarea, Tooltip } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { useUtilsBreadcrumbContext } from '../../common/BreadcrumbContext';
import {
  UtilsConfigItem,
  UtilsConfigItemContents,
  UtilsConfigItemHeader,
  UtilsConfigRoot,
} from '../../common/Config';
import { Base64Provider, useBase64ActionsContext, useBase64Context } from './Context';
import css from './Home.module.scss';

function IsEncode() {
  const t = useTranslations('utils.converters.base64');
  const { setIsEncode } = useBase64ActionsContext();
  const { isEncode } = useBase64Context();

  const handleIsEncodingChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsEncode(e.currentTarget.checked);
  }, []);

  return (
    <UtilsConfigItem>
      <UtilsConfigItemHeader title={t('isEncodeTitle')} description={t('isEncodeDescription')} />
      <UtilsConfigItemContents>
        <label className={css.isEncodeLabel}>
          <span className={css.isEncodeLabelText}>{isEncode ? t('encode') : t('decode')}</span>
          <Switch checked={isEncode} onChange={handleIsEncodingChange} size="lg" />
        </label>
      </UtilsConfigItemContents>
    </UtilsConfigItem>
  );
}

function Repeat() {
  const t = useTranslations('utils.converters.base64');
  const { setRepeat } = useBase64ActionsContext();
  const { repeat } = useBase64Context();

  const handleRepeatChange = useCallback((value: number | string) => {
    if (typeof value === 'number') {
      setRepeat(value);
    } else {
      setRepeat(Number.parseInt(value));
    }
  }, []);
  return (
    <UtilsConfigItem>
      <UtilsConfigItemHeader title={t('repeatTitle')} description={t('repeatDescription')} />
      <UtilsConfigItemContents>
        <NumberInput
          min={1}
          value={repeat}
          onChange={handleRepeatChange}
          classNames={{
            input: css.repeatInput,
          }}
        />
      </UtilsConfigItemContents>
    </UtilsConfigItem>
  );
}

function Base64Input() {
  const t = useTranslations('utils.converters.base64');
  const { setInput } = useBase64ActionsContext();
  const { input } = useBase64Context();

  const paste = useCallback((value: ClipboardItem) => {
    const text = value.getType('text/plain');
    if (text) {
      text.then((v) => v.text()).then((v) => setInput(v));
    }
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.currentTarget.value);
  }, []);

  const clear = useCallback(() => setInput(''), []);
  return (
    <>
      <div className={css.inputWrap}>
        <label className={css.inputLabel} htmlFor="base64-input">
          {t('input')}
        </label>
        <div>
          <ClearButton clear={clear} />
          <PasteButton paste={paste} />
          <CopyButton value={input} />
        </div>
      </div>
      <Textarea id="base64-input" value={input} onChange={handleInputChange} rows={8} />
    </>
  );
}

function Swap() {
  const t = useTranslations('utils.converters.base64');
  const { setInput } = useBase64ActionsContext();
  const { result } = useBase64Context();

  const handleSwap = useCallback(() => setInput(result.value), [result]);

  return (
    <Tooltip label={t('swap')} withArrow position="right">
      <ActionIcon size={48} variant="outline" color="gray" onClick={handleSwap}>
        <MdiSwapVertical width={32} height={32} />
      </ActionIcon>
    </Tooltip>
  );
}

function Base64Output() {
  const t = useTranslations('utils.converters.base64');
  const { result } = useBase64Context();

  return (
    <>
      <div className={css.inputWrap}>
        <label className={css.inputLabel} htmlFor="base64-output">
          {t('output')}
        </label>
        <div>
          <CopyButton value={result.value} />
        </div>
      </div>
      <Textarea
        value={result.value}
        readOnly
        onClick={(e) => e.currentTarget.select()}
        error={result.error}
        rows={8}
      />
    </>
  );
}

export default function Base64Home() {
  const t = useTranslations('utils.converters');
  const { setItems } = useUtilsBreadcrumbContext();

  useEffect(() => {
    setItems([
      {
        href: '/utils/converters',
        title: t('title'),
      },
      {
        href: '/utils/converters/base64',
        title: t('base64.title'),
      },
    ]);
  }, []);

  return (
    <Base64Provider>
      <main className={css.wrap}>
        <UtilsConfigRoot>
          <IsEncode />
          <Repeat />
        </UtilsConfigRoot>
        <div>
          <Base64Input />
        </div>
        <div className={css.swapWrap}>
          <Swap />
        </div>
        <div>
          <Base64Output />
        </div>
      </main>
    </Base64Provider>
  );
}
