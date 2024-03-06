'use client';
import wrapTimeWithLink from '@inner/_lib/wrapTimeWithLink';
import parse from 'react-html-parser';
import { isMobile } from 'react-device-detect';
import { openWindow } from '@inner/_lib/windowEvent';
import { useSetAtom } from 'jotai';
import { player } from '@inner/_lib/atom';
import { useId } from 'react';

interface TextProps {
  index: number;
  text: string;
  videoId: string;
}

export default function Text({ index, text, videoId }: TextProps) {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const setPlayer = useSetAtom(player.playerStatusAtom);
  const id = useId();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const timeline = Number(href.split('&t=')[1]);
    if (isNaN(timeline)) return;
    if (isMobile) return openWindow(href);
    setPlayer((pre) => ({ ...pre, timeline, isPlaying: true, hide: false }));
  };

  const replacedText = wrapTimeWithLink({ text, baseUrl: videoUrl });
  return (
    <p>
      {parse(replacedText, {
        transform: (domNode) => {
          if (domNode.name === 'a' && domNode.attribs) {
            return (
              <a
                style={{
                  color: '#0077b6',
                }}
                key={`${videoId}_row_${index}_atag${id}`}
                {...domNode.attribs}
                onClick={onClick}
              >
                {domNode.children?.[0].data}
              </a>
            );
          }
        },
      })}
    </p>
  );
}
