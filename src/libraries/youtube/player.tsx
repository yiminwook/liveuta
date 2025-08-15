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

import {
  CSSProperties,
  createContext,
  JSX,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Show from '@/components/common/utils/Show';
import YouTubeIFrameCtrl from './iframe-controller';
import { ThumbnailSize } from './type';
import './player.css';

type Rel = 'prefetch' | 'preload';

export type iframeStatus = 'off' | 'on';

type VolumeState = {
  muted: boolean;
  volume: number;
};

type YoutubePlayerContextType = {
  iframeState: iframeStatus;
  setIframeState: (status: iframeStatus) => void;
  controller: YouTubeIFrameCtrl | null;
  setController: (controller: YouTubeIFrameCtrl | null) => void;
  volumeState: VolumeState;
  setVolumeState: (state: VolumeState) => void;
  setVolume: (volume: number) => void;
  incrementVolume: () => void;
  decrementVolume: () => void;
  setMuted: (muted: boolean) => void;
  toggleMuted: () => void;
};

const YoutubePlayerControllerContext = createContext<YoutubePlayerContextType | null>(null);

export function useYoutubePlayerControllerContext() {
  const context = use(YoutubePlayerControllerContext);

  if (!context) {
    throw new Error(
      'useYoutubePlayerControllerContext must be used within a PlayerControllerProvider',
    );
  }

  return context;
}

export function YoutubePlayerControllerProvider(props: { children: JSX.Element }) {
  const [controller, setController] = useState<YouTubeIFrameCtrl | null>(null);
  const [iframeState, setIframeState] = useState<iframeStatus>('off');
  const [volumeState, setVolumeState] = useState<VolumeState>({
    muted: false,
    volume: -1,
  });

  const setVolume = (volume: number) => {
    if (!controller) return;
    controller?.setVolume(volume).then(() => {
      setVolumeState((prev) => ({ ...prev, volume }));
    });
  };

  const incrementVolume = () => {
    const targetVolume = volumeState.volume + 5 > 100 ? 100 : volumeState.volume + 5;
    setVolume(targetVolume);
  };

  const decrementVolume = () => {
    const targetVolume = volumeState.volume - 5 < 0 ? 0 : volumeState.volume - 5;
    setVolume(targetVolume);
  };

  const setMuted = (muted: boolean) => {
    if (!controller) return;
    if (muted) {
      controller?.mute().then(() => {
        setVolumeState((prev) => ({ ...prev, muted }));
      });
    } else {
      controller?.unMute().then(() => {
        setVolumeState((prev) => ({ ...prev, muted }));
      });
    }
  };

  const toggleMuted = () => setMuted(!volumeState.muted);

  return (
    <YoutubePlayerControllerContext
      value={{
        controller,
        setController,
        iframeState,
        setIframeState,
        volumeState,
        setVolumeState,
        setVolume,
        incrementVolume,
        decrementVolume,
        setMuted,
        toggleMuted,
      }}
    >
      {props.children}
    </YoutubePlayerControllerContext>
  );
}

export type YoutubePlayerProps = {
  videoId: string;
  title: string;
  channelName: string;
  // scheduledTime: Temporal.PlainDateTime;
  channelId: string;
  // channelName: Schema.String,
  // scheduledTime: Schema.String,
  // broadcastStatus: Schema.UndefinedOr(Schema.Boolean),
  // hide: Schema.Boolean,
  // isVideo: Schema.Boolean,
  // concurrentViewers: Schema.Number,
  // channelId: Schema.String,
  // tag: Schema.UndefinedOr(Schema.String),
  activatedClass?: string;
  announce?: string;
  aspectWidth?: number;
  aspectHeight?: number;
  autoLoad?: boolean;
  autoPlay?: boolean;
  fullPage?: boolean;
  iframeClass?: string;
  muted?: boolean;
  params?: string;
  playerClass?: string;
  rel?: Rel;
  thumbnailSize?: ThumbnailSize['type'];
  thumbnailWebp?: boolean;
  wrapperClass?: string;
  onIframeAdded?: () => void;
};

export function YoutubePlayer({
  activatedClass = 'lyt-activated',
  announce = 'Watch',
  aspectWidth = 16,
  aspectHeight = 9,
  autoLoad = false,
  autoPlay = false,
  iframeClass,
  muted = false,
  params,
  playerClass = 'lty-playbtn',
  rel = 'prefetch' as Rel,
  title = '',
  thumbnailSize = 'maxresdefault',
  thumbnailWebp = false,
  wrapperClass = 'lite-youtube',
  videoId,
  onIframeAdded = () => {},
}: YoutubePlayerProps) {
  const youtubeUrl = 'https://www.youtube-nocookie.com';

  const iframeWrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { setController, iframeState, setIframeState, setVolumeState } =
    useYoutubePlayerControllerContext();
  const [preConnected, setPreConnected] = useState(false);
  const [iframeAdded, setIframeAdded] = useState(false);

  const thumbnailUrl = useMemo(
    () =>
      thumbnailWebp
        ? `https://i.ytimg.com/vi_webp/${videoId}/${thumbnailSize}.webp`
        : `https://i.ytimg.com/vi/${videoId}/${thumbnailSize}.jpg`,
    [thumbnailWebp, thumbnailSize, videoId],
  );
  const mutedApi = useMemo(() => (muted ? '&mute=1' : ''), [muted]);
  const paramsApi = useMemo(
    () => (params !== undefined && params !== '' ? `&${params}` : ''),
    [params],
  );
  const autoPlayApi = useMemo(() => (autoPlay ? '&autoplay=1' : ''), [autoPlay]);
  const iframeSource = useMemo(
    () => `${youtubeUrl}/embed/${videoId}?enablejsapi=1&state=1${autoPlayApi}${muted}${params}`,
    [mutedApi, paramsApi, videoId],
  );

  const warmConnections = () => {
    if (preConnected) return;
    setPreConnected(true);
  };

  const addIframe = () => {
    if (iframeAdded) return;
    setIframeAdded(() => true);
    setIframeState('on');
    onIframeAdded();
  };

  const volumeListener = async (event: MessageEvent) => {
    const data = (await JSON.parse(event.data)) as {
      event: string;
      info: Record<string, unknown>;
      channel: string;
    };

    if (data.event === 'infoDelivery') {
      if (data.info.volume !== undefined) {
        setVolumeState({
          volume: data.info.volume as number,
          muted: data.info.muted as boolean,
        });
        window.removeEventListener('message', volumeListener);
      }
    }
  };

  useEffect(() => {
    if (autoLoad) {
      addIframe();
    }
  }, []);

  useEffect(() => {
    if (!iframeAdded) {
      window.removeEventListener('message', volumeListener);
      setVolumeState({ muted: false, volume: -1 });
      setController(null);
    }
  }, [iframeAdded]);

  return (
    <>
      <link rel={rel} href={thumbnailUrl} as="image" />
      <Show when={preConnected}>
        <link rel="preconnect" href={youtubeUrl} />
        <link rel="preconnect" href="https://www.google.com" />
      </Show>
      <div
        className={`${wrapperClass} ${iframeState === 'on' ? activatedClass : ''}`}
        ref={iframeWrapperRef}
        data-title={title}
        onPointerOver={warmConnections}
        onClick={addIframe}
        style={
          {
            backgroundImage: `url(${thumbnailUrl})`,
            '--aspect-ratio': `${(aspectHeight / aspectWidth) * 100}%`,
          } as CSSProperties
        }
      >
        <button type="button" className={playerClass} aria-label={`${announce} ${title}`} />
        <Show when={iframeAdded}>
          <iframe
            id="youtube-player"
            ref={iframeRef}
            title={title}
            width="560"
            height="315"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={iframeSource}
            className={iframeClass}
            onLoad={async (e) => {
              if (!iframeRef.current) return;
              setController(new YouTubeIFrameCtrl(iframeRef.current));
              e.currentTarget.contentWindow?.postMessage(
                '{"event":"command","func":"getVolume"}',
                '*',
              );
              window.addEventListener('message', volumeListener);
            }}
            // @ts-expect-error youtube-embed
            credentialless
          />
        </Show>
      </div>
    </>
  );
}
