'use client';
import Show from '@/components/common/utils/Show';
import { secondsToHMS } from '@/utils/getTime';
import { testYoutubeUrl } from '@/utils/regexp';
import { ActionIcon, Button, Checkbox, TextInput } from '@mantine/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { TbCirclePlus } from 'react-icons/tb';
import { toast } from 'sonner';
import {
  setlistItemToString,
  usePlayerActions,
  usePlayerStore,
  useSetlistActions,
  useSetlistStore,
} from './Context';
import css from './SetlistControlSection.module.scss';

export default function SetlistControlSection() {
  const [input, setInput] = useState('');

  const playerRef = usePlayerStore((state) => state.playerRef);
  const playerReady = usePlayerStore((state) => state.playerReady);
  const { setUrl } = usePlayerActions();

  const setlist = useSetlistStore((state) => state.setlist);
  const autoSort = useSetlistStore((state) => state.autoSort);
  const { addItem: addSetlist, setAutoSort, sortSetlist } = useSetlistActions();

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

  function handleAutoSortChecked(e: ChangeEvent<HTMLInputElement>) {
    setAutoSort(e.currentTarget.checked);

    if (e.currentTarget.checked) {
      sortSetlist();
    }
  }

  function copySetlist() {
    let str = '';

    for (const item of setlist) {
      str += `${setlistItemToString(item)}\n`;
    }

    str.trimEnd();

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
          placeholder="Ado / Show"
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <ActionIcon className={css.addButton} variant="ghost" onClick={handleAdd}>
          <TbCirclePlus size={16} />
        </ActionIcon>
      </div>
      <div className={css.controlBox}>
        <div>
          <Checkbox label="자동 정렬" checked={autoSort} onChange={handleAutoSortChecked} />
        </div>
        <div className={css.buttons}>
          <Show when={autoSort === false}>
            <Button onClick={sortSetlist}>정렬</Button>
          </Show>
          <Button onClick={copySetlist}>복사</Button>
        </div>
      </div>
    </div>
  );
}
