import { Session } from 'next-auth';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { LuChevronDown } from 'react-icons/lu';
import { Collapsible } from '@ark-ui/react';
import { TContentsData } from '@/types/api/mongoDB';
import { SCROLL_PER_YOUTUBE_CARD } from '@/constants';
import useScheduleStatus from '@/hooks/useScheduleStatus';
import { StreamCategory } from '@/types';
import Nodata from '@/components/common/Nodata';
import ScheduleCard from '@/components/common/scheduleCard/Card';
import * as styles from './category.css';
import { Button } from '@mantine/core';

type CategoryProps = {
  contents: TContentsData[];
  session: Session | null;
  category: StreamCategory;
};

export default function Category({ contents, session, category }: CategoryProps) {
  const status = useScheduleStatus();
  const [loadContents, setLoadContents] = useState<TContentsData[]>([]);
  const [scrollPage, setScrollPage] = useState(1);
  const taggedContents = useMemo(() => {
    const tagged: Record<string, TContentsData[]> = { '': [] };

    contents.forEach((data) => {
      if (!tagged[data.tag]) tagged[data.tag] = [];
      tagged[data.tag].push(data);
    });

    return tagged;
  }, [contents]);

  const isDone = loadContents.length >= contents.length;

  useEffect(() => {
    // 페이지가 바뀌면 데이터 추가로 로드
    if (isDone) return;
    const nextContents = contents.slice(0, SCROLL_PER_YOUTUBE_CARD * scrollPage);
    setLoadContents(() => [...nextContents]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPage]);

  useEffect(() => {
    // 스케줄 데이터가 바뀌면 최신화
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
  }, []);

  useEffect(() => {
    // 카테고리가 바뀌면 페이지를 리셋
    const resetContent = contents.slice(0, SCROLL_PER_YOUTUBE_CARD);
    setScrollPage(() => 1);
    setLoadContents(() => [...resetContent]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // if (status === 'success' && query && contents.length === 0) {
  //   // 검색 결과가 없을 때
  //   return (
  //     <section>
  //       <Nodata />
  //       {/* <div className={css.nodataLinkBox}> */}
  //       <Button component={Link} href={`/channel?q=${query}`}>
  //         채널페이지에서 검색
  //       </Button>
  //       {/* </div> */}
  //     </section>
  //   );
  // }

  return (
    <div>
      {Object.keys(taggedContents)
        .sort((a, b) => (a === '' ? -1 : b === '' ? 1 : a.localeCompare(b)))
        .map((tag) => (
          <Collapsible.Root key={tag} defaultOpen className={styles.collapsible}>
            <Collapsible.Trigger className={styles.trigger}>
              <LuChevronDown />
              <h3>{tag || '기본'}</h3>
            </Collapsible.Trigger>
            <Collapsible.Content className={styles.content}>
              <div className={styles.cardList}>
                {taggedContents[tag].map((data) => (
                  <ScheduleCard
                    session={session}
                    key={`scheduleCard_${data.videoId}`}
                    content={data}
                  />
                ))}
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        ))}
    </div>
  );
}
