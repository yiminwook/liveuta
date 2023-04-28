import { SearchResponseType } from '@/pages/api/search';

interface ContentSectionProps {
  contents: SearchResponseType['contents'];
}

const ContentSection = ({ contents }: ContentSectionProps) => {
  return <section></section>;
};

export default ContentSection;
