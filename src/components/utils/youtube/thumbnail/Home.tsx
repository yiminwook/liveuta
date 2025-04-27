/* eslint-disable @next/next/no-img-element */
'use client';
import ClearButton from '@/components/common/button/ClearButton';
import PasteButton from '@/components/common/button/PasteButton';
import For from '@/components/common/utils/For';
import Show from '@/components/common/utils/Show';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { generateThumbnail, getYoutubeVideoId } from '@/libraries/youtube/url';
import { Button, Input, InputLabel } from '@mantine/core';
import { useCallback, useMemo, useState } from 'react';
import css from './Home.module.scss';

export default function Home() {
  const locale = useLocale();
  const { t } = useTranslations(locale);
  const [input, setInput] = useState('');
  const [videoId, setVideoId] = useState('');

  const imageList = useMemo(
    () => [
      { label: 'maxresdefault', url: generateThumbnail(videoId, 'maxresdefault') },
      { label: 'sddedefault', url: generateThumbnail(videoId, 'sddefault') },
      { label: 'hqdefault', url: generateThumbnail(videoId, 'hqdefault') },
      { label: 'mqdefault', url: generateThumbnail(videoId, 'mqdefault') },
      { label: 'default', url: generateThumbnail(videoId, 'default') },
    ],
    [videoId],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.currentTarget.value),
    [],
  );

  const onSubmit = useCallback(() => {
    if (input === '') return;
    const res = getYoutubeVideoId(input);
    if (res === null) {
      return;
    }
    setVideoId(res);
  }, [input]);

  const clear = useCallback(() => setInput(''), []);
  const paste = useCallback((value: ClipboardItem) => {
    const text = value.getType('text/plain');
    if (text) {
      text.then((v) => v.text()).then((v) => setInput(v));
    }
  }, []);

  return (
    <div className={css.wrap}>
      <div className={css.form}>
        <Input
          id="youtube-url-input"
          type="url"
          placeholder="https://www.youtube.com/watch?v=pgXpM4l_MwI"
          value={input}
          onChange={handleInputChange}
        />
        <div className={css.buttons}>
          <div>
            <ClearButton clear={clear} buttonSize="lg" size={24} />
            <PasteButton paste={paste} buttonSize="lg" size={24} />
          </div>
          <Button type="button" onClick={onSubmit}>
            {t('utils.youtube.thumbnail.submit')}
          </Button>
        </div>
      </div>
      <Show when={videoId !== ''}>
        <div className={css.images}>
          <For each={imageList}>
            {(thumbnail, index) => (
              <div
                key={`thumbnail-${index}`}
                className={css.thumbnailItem}
                id={`thumbnail-${index}`}
              >
                <p className={css.thumbnailLabel}>{thumbnail.label}</p>
                <img
                  id={`thumbnail-${index}-img`}
                  src={thumbnail.url}
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.naturalWidth !== 120) {
                      document.getElementById(`thumbnail-${index}`)!.classList.remove('hidden');
                    }
                  }}
                />
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
