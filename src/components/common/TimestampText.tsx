import { generateVideoUrl } from '@/libraries/youtube/url';
import wrapTimeWithLink from '@/utils/wrapTimeWithLink';
import { useId } from 'react';
import parse from 'react-html-parser';
import css from './TimestampText.module.scss';

type TimestampTextProps = {
  index: number;
  text: string;
  videoId: string;
  onClickTimestamp: ({ videoId, timestamp }: { videoId: string; timestamp: number }) => void;
};

export default function TimestampText({
  index,
  text,
  videoId,
  onClickTimestamp,
}: TimestampTextProps) {
  const id = useId();

  const videoUrl = generateVideoUrl(videoId);
  const replacedText = wrapTimeWithLink({ text, baseUrl: videoUrl });

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const timestamp = Number(href.split('&t=')[1]);
    if (isNaN(timestamp)) return;
    onClickTimestamp({ videoId, timestamp });
  };

  return (
    <p>
      <span className={css.index}>{index + 1}. </span>
      {parse(replacedText, {
        transform: (domNode) => {
          if (domNode.name === 'a' && domNode.attribs) {
            return (
              <a
                key={`${videoId}_row_${index}_atag${id}`}
                {...domNode.attribs}
                style={{
                  color: '#0077b6',
                }}
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
