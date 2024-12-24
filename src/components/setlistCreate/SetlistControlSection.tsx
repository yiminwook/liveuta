'use client';
import { secondsToHMS } from '@/utils/getTime';
import { testYoutubeUrl } from '@/utils/regexp';
import { ActionIcon, Button, Checkbox, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { TbCirclePlus } from 'react-icons/tb';
import { toast } from 'sonner';
import { timeToString, useSetlistStore } from './Context';
import css from './SetlistControlSection.module.scss';

export default function SetlistControlSection() {
  const [input, setInput] = useState('');
  const playerRef = useSetlistStore((state) => state.playerRef);
  const playerReady = useSetlistStore((state) => state.playerReady);
  const setUrl = useSetlistStore((state) => state.setUrl);
  const setlist = useSetlistStore((state) => state.setlist);
  const addSetlist = useSetlistStore((state) => state.addSetlist);
  const sortSetlist = useSetlistStore((state) => state.sortSetlist);
  const autoSort = useSetlistStore((state) => state.autoSort);
  const setAutoSort = useSetlistStore((state) => state.setAutoSort);

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

    addSetlist(time, input);
  }

  function handleAutoSortChecked(value: boolean) {
    if (value) {
      sortSetlist();
    }

    setAutoSort(value);
  }

  function copySetlist() {
    let str = '';

    for (const item of setlist) {
      str += `${timeToString(item.time)} ${item.value}\n`;
    }

    if (str === '') {
      toast('세트 리스트가 비어있습니다');
      return;
    }

    navigator.clipboard.writeText(str);
    toast('세트 리스트를 복사하였습니다');
  }

  return (
    <div className={css.wrap}>
      <div className={css.inputBox}>
        <TextInput
          className={css.input}
          value={input}
          onInput={(e) => setInput(e.currentTarget.value)}
        />
        <ActionIcon className={css.addButton} variant="ghost" onClick={handleAdd}>
          <TbCirclePlus size={16} />
        </ActionIcon>
      </div>
      <div className={css.controlBox}>
        <Button onClick={sortSetlist}>정렬</Button>
        <Button onClick={copySetlist}>복사</Button>
        <div>
          <Checkbox
            label="자동 정렬"
            checked={autoSort}
            onChange={(e) => handleAutoSortChecked(e.currentTarget.checked)}
          />
        </div>
      </div>
    </div>
  );
}
