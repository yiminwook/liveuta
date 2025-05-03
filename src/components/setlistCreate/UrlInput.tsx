'use client';
import { useDebounce } from '@/hooks/use-debounce';
import { testYoutubeUrl } from '@/utils/regexp';
import { TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { usePlayerStore } from './Context';

export default function UrlInput() {
  const [input, setInput] = useState('');
  const debouncedUrl = useDebounce(input, 500);
  const { setUrl } = usePlayerStore((state) => state.actions);

  useEffect(() => {
    if (testYoutubeUrl(debouncedUrl)) {
      setUrl(debouncedUrl);
    }
  }, [debouncedUrl]);

  return (
    <TextInput
      label="YouTube URL"
      placeholder="https://www.youtube.com/watch?v=pgXpM4l_MwI"
      type="url"
      value={input}
      onInput={(e) => setInput(e.currentTarget.value)}
    />
  );
}
