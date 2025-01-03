'use client';
import { Divider } from '@mantine/core';
import { Session } from 'next-auth';

type Props = {
  session: Session;
};

export default function Client({}: Props) {
  return (
    <div>
      <h2>멤버관리</h2>
      <p>개발중...</p>

      <Divider mb={28} />
    </div>
  );
}
