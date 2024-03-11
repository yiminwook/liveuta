import wrapTimeWithLink from '@inner/_lib/wrapTimeWithLink';
import parse from 'react-html-parser';
import { useId } from 'react';
import { generateVideoUrl } from '@/model/youtube/url';

type TimestampTextProps = {
  index: number;
  text: string;
  videoId: string;
  onClickTimestamp: ({ videoId, timestamp }: { videoId: string; timestamp: number }) => void;
};

export default function TimelineText({
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
