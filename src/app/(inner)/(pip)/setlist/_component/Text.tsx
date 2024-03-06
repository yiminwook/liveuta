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
  const setVideoId = useSetAtom(player.playerVideoIdAtom);
  const setPlayer = useSetAtom(player.playerStatusAtom);
  const id = useId();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const videoId = href.split('?v=')[1];
    // if (isMobile) {
    return openWindow(href);
    // }
    // setVideoId(() => videoId);
    // setPlayer((pre) => ({ ...pre, videoId, isPlaying: true, hide: false }));
  };

  const replacedText = wrapTimeWithLink({ text, baseUrl: videoUrl });
  return (
    <p>
      {parse(replacedText, {
        transform: (domNode) => {
          if (domNode.name === 'a' && domNode.attribs) {
            return (
              <a key={`${videoId}_row_${index}_atag${id}`} {...domNode.attribs} onClick={onClick}>
                {domNode.children?.[0].data}
              </a>
            );
          }
        },
      })}
    </p>
  );
}
