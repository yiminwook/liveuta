import { SearchResponseType } from '@api/search/route';
import ScheduleCard from '@/components/scheduleCard/Card';
import * as cardStyles from '@/components/scheduleCard/card.css';
import search from './search.module.scss';
import { Session } from 'next-auth';
import CardPlaceHolders from '@/components/scheduleCard/CardPlaceHolders';

type ContentSectionProps = {
  contents: SearchResponseType['contents'];
  session: Session | null;
};

export default function ContentSection({ session, contents }: ContentSectionProps) {
  return (
    <section className={search['content-section']}>
      <div>
        <h1>일정 검색</h1>
        <span>{`(${contents.length} 개)`}</span>
      </div>
      <section className={cardStyles.cardList}>
        {contents.map((content) => (
          <ScheduleCard key={content.videoId} session={session} content={content} />
        ))}
        <CardPlaceHolders />
      </section>
    </section>
  );
}
