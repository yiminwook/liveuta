'use client';
import Show from '@/components/common/utils/Show';
import { secondsToHMS } from '@/utils/getTime';
import { testYoutubeUrl } from '@/utils/regexp';
import { ActionIcon, Button, TextInput } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import { ChangeEvent, createRef, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  copy,
  usePlayerActions,
  usePlayerStore,
  useSetlistActions,
  useSetlistStore,
} from './Context';
import css from './SetlistControlSection.module.scss';

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
        <IconTbCirclePlus />
      </ActionIcon>
    </>
  );
}

export function AutoSort() {
  const autoSort = useSetlistStore((state) => state.autoSort);
  const { setAutoSort, sortSetlist } = useSetlistActions();

  function handleAutoSortChecked(e: ChangeEvent<HTMLInputElement>) {
    setAutoSort(e.currentTarget.checked);

    if (e.currentTarget.checked) {
      sortSetlist();
    }
  }

  return <Checkbox label="자동 정렬" checked={autoSort} onChange={handleAutoSortChecked} />;
}

export function SetlistControlButtons() {
  const setlist = useSetlistStore(useShallow((state) => state.setlist));
  const autoSort = useSetlistStore((state) => state.autoSort);
  const { sortSetlist } = useSetlistActions();

  return (
    <>
      <Show when={autoSort === false}>
        <Button onClick={sortSetlist}>정렬</Button>
      </Show>
      <Button onClick={() => copy(setlist)}>복사</Button>
    </>
  );
}
