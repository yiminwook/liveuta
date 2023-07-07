import { SearchResponseType } from '@/pages/api/search';
import ChannelCard from '@/components/common/channelCard/ChannelCard';
import search from '@/components/search/Search.module.scss';
import { SEARCH_ITEMS_SIZE } from '@/consts';

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
          <ChannelCard key={channel.uid} content={channel} />
        ))}
      </section>
      {channels.length >= SEARCH_ITEMS_SIZE ? <p>*최대 {SEARCH_ITEMS_SIZE}개까지 검색가능합니다</p> : null}
    </section>
  );
};

export default ChannelSection;
