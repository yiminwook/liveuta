'use client';
import wrapTimeWithLink from '@inner/_lib/wrapTimeWithLink';
import parse from 'react-html-parser';
import { useSetAtom } from 'jotai';
import { player } from '@inner/_lib/atom';
import { useId } from 'react';
import { generateVideoUrl } from '@/model/youtube/url';

type TextProps = {
  index: number;
  text: string;
  videoId: string;
};

export default function Text({ index, text, videoId }: TextProps) {
  const setPlayer = useSetAtom(player.playerStatusAtom);
  const id = useId();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const timeline = Number(href.split('&t=')[1]);
    if (isNaN(timeline)) return;
    setPlayer((pre) => ({ ...pre, timeline, isPlaying: true, hide: false }));
  };

  const videoUrl = generateVideoUrl(videoId);
  const replacedText = wrapTimeWithLink({ text, baseUrl: videoUrl });
  return (
    <p>
      {parse(replacedText, {
        transform: (domNode) => {
          if (domNode.name === 'a' && domNode.attribs) {
            return (
              <a
                {...domNode.attribs}
                style={{
                  color: '#0077b6',
                }}
                key={`${videoId}_row_${index}_atag${id}`}
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
