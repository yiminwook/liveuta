'use client';
import ClearButton from '@/components/common/button/ClearButton';
import CopyButton from '@/components/common/button/CopyButton';
import PasteButton from '@/components/common/button/PasteButton';
import { useDebounce } from '@/hooks/useDebounce';
import { useTranslations } from '@/libraries/i18n/client';
import { MdiSwapVertical } from '@icons/mdi/swap-vertical';
import { ActionIcon, NumberInput, Switch, Textarea, Tooltip } from '@mantine/core';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
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
  const { t } = useTranslations();
  const { setIsEncode } = useBase64ActionsContext();
  const { isEncode } = useBase64Context();

  const handleIsEncodingChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsEncode(e.currentTarget.checked);
  }, []);

  return (
    <UtilsConfigItem>
      <UtilsConfigItemHeader
        title={t('utils.converters.base64.isEncodeTitle')}
        description={t('utils.converters.base64.isEncodeDescription')}
      />
      <UtilsConfigItemContents>
        <label className={css.isEncodeLabel}>
          <span className={css.isEncodeLabelText}>
            {isEncode ? t('utils.converters.base64.encode') : t('utils.converters.base64.decode')}
          </span>
          <Switch checked={isEncode} onChange={handleIsEncodingChange} size="lg" />
        </label>
      </UtilsConfigItemContents>
    </UtilsConfigItem>
  );
}

function Repeat() {
  const { t } = useTranslations();
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
      <UtilsConfigItemHeader
        title={t('utils.converters.base64.repeatTitle')}
        description={t('utils.converters.base64.repeatDescription')}
      />
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
  const { t } = useTranslations();
  const { input } = useBase64Context();
  const { setInput } = useBase64ActionsContext();
  const [uiInput, setUiInput] = useState('');
  const debouncedInput = useDebounce(uiInput, 200);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setUiInput(e.currentTarget.value);
  }, []);

  const clear = useCallback(() => {
    setInput('');
    setUiInput('');
  }, []);

  const paste = useCallback((value: ClipboardItem) => {
    const text = value.getType('text/plain');
    if (text) {
      text.then((v) => v.text()).then((v) => setUiInput(v));
    }
  }, []);

  useEffect(() => {
    setInput(debouncedInput);
  }, [debouncedInput]);

  return (
    <>
      <div className={css.inputWrap}>
        <label className={css.inputLabel} htmlFor="base64-input">
          {t('utils.converters.base64.input')}
        </label>
        <div>
          <ClearButton clear={clear} />
          <PasteButton paste={paste} />
          <CopyButton value={input} />
        </div>
      </div>
      <Textarea id="base64-input" value={uiInput} onChange={handleInputChange} rows={8} />
    </>
  );
}

function Swap() {
  const { t } = useTranslations();
  const { setInput } = useBase64ActionsContext();
  const { result } = useBase64Context();

  const handleSwap = useCallback(() => setInput(result.value), [result]);

  return (
    <Tooltip label={t('utils.converters.base64.swap')} withArrow position="right">
      <ActionIcon size={48} variant="outline" color="gray" onClick={handleSwap}>
        <MdiSwapVertical width={32} height={32} />
      </ActionIcon>
    </Tooltip>
  );
}

function Base64Output() {
  const { t } = useTranslations();
  const { result } = useBase64Context();

  return (
    <>
      <div className={css.inputWrap}>
        <label className={css.inputLabel} htmlFor="base64-output">
          {t('utils.converters.base64.output')}
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
  const { t } = useTranslations();
  const { setItems } = useUtilsBreadcrumbContext();

  useEffect(() => {
    setItems([
      {
        href: '/utils/converters',
        title: t('utils.converters.title'),
      },
      {
        href: '/utils/converters/base64',
        title: t('utils.converters.base64.title'),
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
