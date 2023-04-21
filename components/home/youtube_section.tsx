import { UpcomingData } from '@/models/sheet/in_sheet';
import home from '@/styles/Home.module.scss';
import YoutubeContent from '../youtube_content';

interface YoutubeSectionProps {
  contents: UpcomingData[];
}

const YoutubeSection = ({ contents }: YoutubeSectionProps) => {
  return (
    <section className={home['contents-section']}>
      {contents.map((data) => (
        <YoutubeContent key={data.videoId} contents={data} />
      ))}
    </section>
  );
};

export default YoutubeSection;
