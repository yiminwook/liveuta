import { SearchResponseType } from '@/app/api/search/route';
import ScheduleCard from '@/components/common/scheduleCard/Card';
import search from '@/components/search/Search.module.scss';
import { CardSection } from '@/components/common/scheduleCard/Style';
import CardPlaceHolders from '@/components/common/scheduleCard/CardPlaceHolder';

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
      <CardSection>
        {contents.map((content, index) => (
          <ScheduleCard
            key={content.videoId}
            content={content}
            currentIndex={index}
            lastContentsIndex={contents.length - 1}
          />
        ))}
        <CardPlaceHolders />
      </CardSection>
    </section>
  );
};

export default ContentSection;
