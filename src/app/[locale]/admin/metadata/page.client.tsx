'use client';
import CurrentMetadata from '@/components/adminMetadata/CurrentMetadata';
import Form from '@/components/adminMetadata/Form';
import { Divider } from '@mantine/core';
import { Session } from 'next-auth';
import css from './page.module.scss';

type Props = {
  session: Session;
};

export default function Client({ session }: Props) {
  return (
    <div>
      <h2>메타데이터</h2>
      <p className="essential">과도하게 선정적인 이미지 및 영상은 저장금지입니다.</p>
      <p className="essential">업데이트가 성공될시 캐시는 자동으로 초기화됩니다.</p>
      <p className="essential">
        초기화후 캐시된 페이지를 두세번 새로고침하면 변경이 확인 가능합니다.
      </p>

      <Divider mb={32} />

      <section className={css.section}>
        <CurrentMetadata />
      </section>

      <section className={css.section}>
        <Form session={session} />
      </section>
    </div>
  );
}
