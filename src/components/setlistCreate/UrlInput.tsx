'use client';
import { useDebounce } from '@/hooks/useDebounce';
import { testYoutubeUrl } from '@/utils/regexp';
import { TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSetlistStore } from './Context';
import css from './UrlInput.module.scss';

export default function UrlInput() {
  const setUrl = useSetlistStore((state) => state.setUrl);
  const [input, setInput] = useState('');
  const debouncedUrl = useDebounce(input, 500);

  useEffect(() => {
    if (testYoutubeUrl(debouncedUrl)) {
      setUrl(debouncedUrl);
    }
  }, [debouncedUrl]);

  return (
    <div>
      <TextInput
        className={css.urlInput}
        label="YouTube URL"
        placeholder="https://www.youtube.com/watch?v=pgXpM4l_MwI"
        type="url"
        value={input}
        onInput={(e) => setInput(e.currentTarget.value)}
      />
    </div>
  );
}
