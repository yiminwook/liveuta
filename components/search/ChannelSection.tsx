import { SearchResponseType } from '@/pages/api/search';
import ChannelItem from '../common/ChannelCard';
import search from '@/styles/search/Search.module.scss';

interface ChannelSectionProps {
  channels: SearchResponseType['channels'];
}
const ChannelSection = ({ channels }: ChannelSectionProps) => {
  return (
    <section className={search['channel-section']}>
      <div>
        <h1>채널 검색</h1>
        <span>{`(${channels.length} 개)`}</span>
      </div>
      <section>
        {channels.map((channel) => (
          <ChannelItem key={channel.uid} content={channel} />
        ))}
      </section>
    </section>
  );
};

export default ChannelSection;
