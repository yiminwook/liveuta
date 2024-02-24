import { SearchResponseType } from '@/app/api/search/route';
import ScheduleCard from '@inner/_component/scheduleCard/Card';
import * as cardStyles from '@inner/_component/scheduleCard/card.css';
import search from './search.module.scss';
import dynamic from 'next/dynamic';

const CardPlaceHolders = dynamic(() => import('@inner/_component/scheduleCard/CardPlaceHolders'), {
  ssr: false,
});

interface ContentSectionProps {
  contents: SearchResponseType['contents'];
}

export default function ContentSection({ contents }: ContentSectionProps) {
  return (
    <section className={search['content-section']}>
      <div>
        <h1>일정 검색</h1>
        <span>{`(${contents.length} 개)`}</span>
      </div>
      <section className={cardStyles.cardList}>
        {contents.map((content, index) => (
          <ScheduleCard key={content.videoId} content={content} index={index} />
        ))}
        <CardPlaceHolders />
      </section>
    </section>
  );
}
