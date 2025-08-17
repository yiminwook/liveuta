'use client';
import { ActionIcon, Button, Checkbox, TextInput } from '@mantine/core';
import { CirclePlus } from 'lucide-react';
import { ChangeEvent, createRef, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Show from '@/components/common/utils/Show';
import { useTranslations } from '@/libraries/i18n/client';
import { testYoutubeUrl } from '@/utils/regexp';
import { secondsToHMS } from '@/utils/time';
import {
  copy,
  usePlayerActions,
  usePlayerStore,
  useSetlistActions,
  useSetlistStore,
} from './context';
import css from './setlist-control-section.module.scss';

export function SetlistItemInput() {
  const [input, setInput] = useState('');
  const inputRef = createRef<HTMLInputElement>();
  const playerRef = usePlayerStore((state) => state.playerRef);
  const playerReady = usePlayerStore((state) => state.playerReady);
  const { setUrl } = usePlayerActions();
  const { addItem } = useSetlistActions();

  useEffect(() => {
    if (playerReady) {
      return;
    }

    if (testYoutubeUrl(input)) {
      setUrl(input);
      setInput('');
    }
  });

  function handleAdd() {
    if (!playerReady || playerRef.current === null) {
      return;
    }

    const currentTime = playerRef.current.getCurrentTime();
    const time = secondsToHMS(currentTime);

    addItem(time, input);
    setInput('');
    console.log(inputRef.current);
    inputRef.current?.focus();
  }

  return (
    <>
      <TextInput
        className={css.input}
        placeholder="Ado / Show"
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      <ActionIcon className={css.addButton} variant="ghost" onClick={handleAdd}>
        <CirclePlus />
      </ActionIcon>
    </>
  );
}

export function AutoSort() {
  const autoSort = useSetlistStore((state) => state.autoSort);
  const { setAutoSort, sortSetlist } = useSetlistActions();
  const { t } = useTranslations();

  function handleAutoSortChecked(e: ChangeEvent<HTMLInputElement>) {
    setAutoSort(e.currentTarget.checked);

    if (e.currentTarget.checked) {
      sortSetlist();
    }
  }

  return (
    <Checkbox
      label={t('setlistCreate.setlistControlSection.automaticSort')}
      checked={autoSort}
      onChange={handleAutoSortChecked}
    />
  );
}

export function SetlistControlButtons() {
  const setlist = useSetlistStore(useShallow((state) => state.setlist));
  const autoSort = useSetlistStore((state) => state.autoSort);
  const { sortSetlist } = useSetlistActions();
  const { t } = useTranslations();

  return (
    <>
      <Show when={autoSort === false}>
        <Button onClick={sortSetlist}>{t('setlistCreate.setlistControlSection.sort')}</Button>
      </Show>
      <Button onClick={() => copy(setlist)}>{t('setlistCreate.setlistControlSection.copy')}</Button>
    </>
  );
}
