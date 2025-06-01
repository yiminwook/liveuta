'use client';
import { useTranslations } from '@/libraries/i18n/client';
import { useCustomMantineColorScheme } from '@/libraries/mantine/custom-theme-hook';
import { openWindow } from '@/utils/window-event';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import css from './iframe.module.scss';

interface IframeProps {
  url: string;
}

export default function Iframe({ url }: IframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { colorScheme: appTheme } = useCustomMantineColorScheme();
  const { t } = useTranslations();

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    openWindow(url);
  };

  const postMsgToChild = () => {
    const childWindow = iframeRef.current?.contentWindow;
    if (!childWindow) return;

    const msg = {
      action: 'themeChange',
      theme: appTheme,
    };

    childWindow.postMessage(msg, url);
  };

  const receiveMsgFromChild = (event: MessageEvent) => {
    if (event.origin !== url) return;
    console.log('receiveFromChild', event.data);
  };

  useEffect(() => {
    if (isLoaded === false) return;
    window.addEventListener('message', receiveMsgFromChild);
    return () => window.removeEventListener('message', receiveMsgFromChild);
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded === false) return;
    postMsgToChild();
  }, [isLoaded, appTheme]);

  return (
    <div className={css.wrap}>
      <div className={css.inner}>
        <iframe
          ref={iframeRef}
          id="liveuta-iframe"
          className={css.iframe}
          src={url}
          scrolling="auto"
          allow="clipboard-write;"
          onLoad={() => {
            setIsLoaded(() => true);
          }}
        />
      </div>
      <button className={css.openButton} onClick={onClick}>
        + {t('global.iframe.open')}
      </button>
    </div>
  );
}
