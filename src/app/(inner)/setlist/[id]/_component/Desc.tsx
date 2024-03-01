import Text from '@inner/(pip)/setlist/_component/Text';

interface DescProps {
  videoId: string;
  description: string;
}

export default function Desc({ videoId, description }: DescProps) {
  return (
    <div>
      {description.split('\n').map((line, index) => (
        <Text key={`${videoId}_row_${index}`} text={line} />
      ))}
    </div>
  );
}
