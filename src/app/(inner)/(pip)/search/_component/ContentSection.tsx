import { SearchResponseType } from '@/app/api/search/route';
import ScheduleCard from '@inner/_component/scheduleCard/Card';
import CardPlaceHolders from '@inner/_component/scheduleCard/CardPlaceHolders';
import * as cardStyles from '@inner/_component/scheduleCard/card.css';
import search from './search.module.scss';

interface ContentSectionProps {
  isMobile: boolean;
  contents: SearchResponseType['contents'];
}

export default function ContentSection({ isMobile, contents }: ContentSectionProps) {
  return (
    <section className={search['content-section']}>
      <div>
        <h1>일정 검색</h1>
        <span>{`(${contents.length} 개)`}</span>
      </div>
      <section className={cardStyles.cardSection}>
        {contents.map((content, index) => (
          <ScheduleCard
            key={content.videoId}
            content={content}
            currentIndex={index}
            lastContentsIndex={contents.length - 1}
          />
        ))}
        <CardPlaceHolders isMobile={isMobile} />
      </section>
    </section>
  );
}
