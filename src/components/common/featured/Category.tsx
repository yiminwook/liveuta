import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';

import { ContentsDataType } from '@/types/api/mongoDB';
import { SCROLL_PER_YOUTUBE_CARD } from '@/constants';
import useScheduleStatus from '@/hooks/useScheduleStatus';
import { queryAtom } from '@/stores/schedule';
import ScheduleCard from '../scheduleCard/Card';
import InterSectionTrigger from '../InterSectionTrigger';
import Nodata from '../Nodata';
import CardPlaceHolders from '../scheduleCard/CardPlaceHolders';

import * as styles from '../scheduleCard/card.css';

type CategoryProps = {
  contents: ContentsDataType[];
  session: Session | null;
  filter: string;
  category: number;
};

export default function Category({ contents, session, filter, category }: CategoryProps) {
  const status = useScheduleStatus();
  const [query] = useAtom(queryAtom);
  const [loadContents, setLoadContents] = useState<ContentsDataType[]>([]);
  const [scrollPage, setScrollPage] = useState(1);

  const isDone = loadContents.length >= contents.length;

  const handleInfinityScroll = () => {
    if (isDone) return;
    setScrollPage((pre) => pre + 1);
  };

  useEffect(() => {
    // 페이지가 바뀌면 데이터 추가로 로드
    if (isDone) return;
    const nextContents = contents.slice(0, SCROLL_PER_YOUTUBE_CARD * scrollPage);
    setLoadContents(() => [...nextContents]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPage]);

  useEffect(() => {
    // 스케쥴 데이터가 바뀌면 최신화
    const resetContent = contents.slice(0, SCROLL_PER_YOUTUBE_CARD * scrollPage);
    setLoadContents(() => [...resetContent]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contents]);

  useEffect(() => {
    // 필터가 바뀌면 페이지를 리셋
    const resetContent = contents.slice(0, SCROLL_PER_YOUTUBE_CARD);
    setScrollPage(() => 1);
    setLoadContents(() => [...resetContent]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    // 카테고리가 바뀌면 페이지를 리셋
    const resetContent = contents.slice(0, SCROLL_PER_YOUTUBE_CARD);
    setScrollPage(() => 1);
    setLoadContents(() => [...resetContent]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  if (status === 'success' && query && contents.length === 0) {
    // 검색 결과가 없을 때
    return (
      <section>
        <Nodata />
        <div className={styles.nodataLinkBox}>
          <Link className={styles.nodataLink} href={`/channel?q=${query}`}>
            {`채널페이지에서 검색`}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div>
      <div className={styles.cardList}>
        {contents.map((data) => (
          <ScheduleCard session={session} key={`scheduleCard_${data.videoId}`} content={data} />
        ))}
        <CardPlaceHolders />
      </div>
      <InterSectionTrigger isDone={isDone} onShow={handleInfinityScroll} />
    </div>
  );
}
