/*
MIT License

Copyright (c) 2021 Ibrahim Cesar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/*
Copyright 2019 Paul Irish

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

		http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import clsx from 'clsx';
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import Show from '@/components/common/utils/Show';
import YouTubeIFrameCtrl from './iframe-controller';
import css from './player.module.scss';
import { ThumbnailSize } from './type';

const YOUTUBE_URL = 'https://www.youtube.com';

type TRel = 'prefetch' | 'preload';

type TVolumeState = {
  muted: boolean;
  volume: number;
};

export type YoutubePlayerProps = {
  videoId: string;

  wrapperClass?: string;
  playerClass?: string;
  iframeClass?: string;
  /** player load시 적용되는 클래스 */
  activatedClass?: string;

  autoLoad?: boolean;
  muted?: boolean;
  params?: string;

  /** 사전 로드 여부 */
  rel?: TRel;
  thumbnailSize?: ThumbnailSize['type'];
  onIframeAdded?: () => void;
  /**
   * aria-label 속성 값
   *
   * 웹 접근성을 위해 사용되는 속성 값
   */
  label?: string;

  mode: 'default' | 'pip';
};

export function YoutubePlayer({
  videoId,

  wrapperClass = css['lite-youtube'],
  playerClass = css['lty-playbtn'],
  iframeClass,
  activatedClass = css['lyt-activated'],

  autoLoad = false,
  muted = false,
  params,
  rel = 'prefetch',
  thumbnailSize = 'mqdefault',

  onIframeAdded = () => {},
  label = 'Watch Youtube Video',
  mode,
}: YoutubePlayerProps) {
  const iframeWrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [isPreConnected, setIsPreConnected] = useState(false);
  const [isIframeAdded, setIsIframeAdded] = useState(false);

  const [controller, setController] = useState<YouTubeIFrameCtrl | null>(null);
  const [volumeState, setVolumeState] = useState<TVolumeState>({
    muted: false,
    volume: -1,
  });

  const setVolume = (volume: number) => {
    if (!controller) return;

    controller.setVolume(volume).then(() => {
      setVolumeState((prev) => ({ ...prev, volume }));
    });
  };

  const setMuted = (muted: boolean) => {
    if (!controller) return;

    if (muted) {
      controller.mute().then(() => {
        setVolumeState((prev) => ({ ...prev, muted }));
      });
    } else {
      controller.unMute().then(() => {
        setVolumeState((prev) => ({ ...prev, muted }));
      });
    }
  };

  const incrementVolume = () => setVolume(Math.min(volumeState.volume + 5, 100));

  const decrementVolume = () => setVolume(Math.max(volumeState.volume - 5, 0));

  const toggleMuted = () => setMuted(!volumeState.muted);

  const warmConnections = () => {
    if (isPreConnected) return;

    setIsPreConnected(() => true);
  };

  const addIframe = () => {
    if (isIframeAdded) return;

    setIsIframeAdded(() => true);
    onIframeAdded();
  };

  const volumeListener = async (event: MessageEvent) => {
    try {
      const string = await event.data;

      const data: {
        event: string;
        info: Record<string, unknown>;
        channel: string;
      } = JSON.parse(string);

      if (data.event === 'infoDelivery' && data.info.volume !== undefined) {
        setVolumeState(() => ({
          volume: data.info.volume as number,
          muted: data.info.muted as boolean,
        }));
        window.removeEventListener('message', volumeListener);
      }
    } catch (error) {
      console.log('volumeListener event debug:', event);
      console.error('volumeListener error:', error);
    }
  };

  useEffect(() => {
    if (autoLoad) {
      addIframe();
    }
  }, []);

  useEffect(() => {
    if (!isIframeAdded) {
      window.removeEventListener('message', volumeListener);
      setVolumeState(() => ({ muted: false, volume: -1 }));
      setController(() => null);
    }
  }, [isIframeAdded]);

  const thumbnailUrl = useMemo(() => {
    // JPG - `https://i.ytimg.com/vi/${videoId}/${thumbnailSize}.jpg`,
    // 무조건 webp로 가져오는걸로
    return `https://i.ytimg.com/vi_webp/${videoId}/${thumbnailSize}.webp`;
  }, [thumbnailSize, videoId]);

  const iframeSource = useMemo(() => {
    const mutedApi = muted ? '&mute=1' : '';
    const paramsApi = params !== undefined && params !== '' ? `&${params}` : '';
    return `${YOUTUBE_URL}/embed/${videoId}?enablejsapi=1&state=1&autoplay=1${mutedApi}${paramsApi}`;
  }, [videoId]);

  return (
    <>
      <link rel={rel} href={thumbnailUrl} as="image" />
      <Show when={isPreConnected}>
        <link rel="preconnect" href={YOUTUBE_URL} />
        <link rel="preconnect" href="https://www.google.com" />
      </Show>
      <div
        ref={iframeWrapperRef}
        className={clsx(wrapperClass, {
          [css.playerBase]: mode === 'default',
          [css.pipBase]: mode === 'pip',
          [activatedClass]: isIframeAdded,
        })}
        style={
          {
            backgroundImage: `url(${thumbnailUrl})`,
          } as CSSProperties
        }
        onPointerOver={warmConnections}
        onClick={addIframe}
      >
        <button type="button" className={playerClass} aria-label={label} />
        <Show when={isIframeAdded}>
          <iframe
            id="youtube-player"
            ref={iframeRef}
            src={iframeSource}
            className={iframeClass}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={(e) => {
              if (!iframeRef.current) return;
              const ctrl = new YouTubeIFrameCtrl(iframeRef.current);
              setController(() => ctrl);
              e.currentTarget.contentWindow?.postMessage(
                '{"event":"command","func":"getVolume"}',
                '*',
              );
              window.addEventListener('message', volumeListener);
            }}
            // @ts-expect-error youtube-embed
            credentialless="true"
          />
        </Show>
      </div>
    </>
  );
}
