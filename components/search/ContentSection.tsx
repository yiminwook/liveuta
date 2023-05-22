import { SearchResponseType } from '@/pages/api/search';
import YoutubeContentCard from '@/components/common/YoutubeContentCard';
import search from '@/styles/search/Search.module.scss';

interface ContentSectionProps {
  contents: SearchResponseType['contents'];
}

const ContentSection = ({ contents }: ContentSectionProps) => {
  return (
    <section className={search['content-section']}>
      <div>
        <h1>일정 검색</h1>
        <span>{`(${contents.length} 개)`}</span>
      </div>
      <section>
        {contents.map((content, index) => (
          <YoutubeContentCard
            key={content.videoId}
            content={content}
            currentIndex={index}
            lastContentsIndex={contents.length - 1}
          />
        ))}
      </section>
    </section>
  );
};

export default ContentSection;
