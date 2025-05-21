'use client';

import Show from '@/components/common/utils/Show';
import { CodiconClearAll } from '@/icons';
import { useLocale } from '@/libraries/i18n/client';
import { useTranslations } from '@/libraries/i18n/client';
import { Button, TextInput } from '@mantine/core';
import { IconSend2 } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';
import { ChangeEvent, useCallback, useState } from 'react';
import css from './RequestForm.module.scss';

function ClearButton() {
  const locale = useLocale();
  const { t } = useTranslations();

  const [cleared, setCleared] = useState(false);
  const [clearTimeout, setClearTimeout] = useState<number | null>(null);

  const handleClearResult = useCallback(
    (value: boolean) => {
      window.clearTimeout(clearTimeout!);
      setClearTimeout(window.setTimeout(() => setCleared(false), 2000));
      setCleared(value);
    },
    [clearTimeout],
  );

  const handleClear = useCallback(() => {
    handleClearResult(true);
  }, []);

  return (
    <Button
      onClick={handleClear}
      variant="outline"
      color={cleared ? 'teal' : 'gray'}
      size="md"
      type="reset"
    >
      <div className={css.buttonInner}>
        <Show when={cleared} fallback={<CodiconClearAll width="1.2rem" height="1.2rem" />}>
          <IconCheck size="1.2rem" />
        </Show>
        <span>{t('global.clearButton.clear')}</span>
      </div>
    </Button>
  );
}

export default function RequestForm() {
  const { t } = useTranslations();
  const [channelName, setChannelName] = useState('');
  const [channelAddress, setChannelAddress] = useState('');

  const onChannelNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.currentTarget.value);
  }, []);

  const onChannelAddressChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setChannelAddress(e.currentTarget.value);
  }, []);

  const onSubmit = useCallback(() => {}, [channelName, channelAddress]);

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <div className={css.inputs}>
        <TextInput
          label={t('request.requestForm.channelNameInputLabel')}
          placeholder="Ado"
          value={channelName}
          onChange={onChannelNameChange}
          required
        />
        <TextInput
          label={t('request.requestForm.channelAddressInputLabel')}
          placeholder="https://www.youtube.com/@Ado1024"
          value={channelAddress}
          onChange={onChannelAddressChange}
          required
          type="url"
        />
      </div>
      <div className={css.buttons}>
        <ClearButton />
        <Button variant="filled" size="md" type="submit">
          <div className={css.buttonInner}>
            <IconSend2 width="1.2rem" height="1.2rem" />
            <span>제출</span>
          </div>
        </Button>
      </div>
    </form>
  );
}
