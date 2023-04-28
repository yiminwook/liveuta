import { SearchResponseType } from '@/pages/api/search';

interface ChannelSectionProps {
  channels: SearchResponseType['channels'];
}
const ChannelSection = ({ channels }: ChannelSectionProps) => {
  return <section></section>;
};

export default ChannelSection;
