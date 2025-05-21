import { serverApi } from '@/apis/fetcher';
import { WAITING_TAG } from '@/constants/revalidate-tag';
import { Spinner180Ring } from '@/icons';
import type { WaitingListItem } from '@/libraries/mongodb/type';
import { ActionIcon } from '@mantine/core';
import { IconArrowBack, IconArrowBigLeftFilled } from '@tabler/icons-react';
import { Suspense } from 'react';
import css from './Home.module.scss';
import RequestForm from './RequestFrom';
import WaitingList from './WaitingList';
import GoBack from './GoBack';

export default async function Home() {
  const waitingList = await serverApi
    .get<{ data: WaitingListItem[] }>(`v1/channel/waiting`, {
      next: { revalidate: 1800, tags: [WAITING_TAG] },
    })
    .json()
    .then((json) => json.data);

  return (
    <div className={css.wrap}>
      <div>
        <div className={css.requestFormHeader}>
          <GoBack />
          <p className={css.requestChannel}>채널 등록</p>
        </div>
        <RequestForm />
      </div>
      <div>
        <div>
          <p className={css.waitingChannels}>대기중인 채널</p>
        </div>
        <Suspense
          fallback={
            <div>
              <Spinner180Ring />
            </div>
          }
        >
          <WaitingList waitingList={waitingList} />
        </Suspense>
      </div>
    </div>
  );
}
