'use client';
import { Divider } from '@mantine/core';
import { useSession } from 'next-auth/react';

type Props = {};

export default function Client({}: Props) {
  const session = useSession().data!;

  return (
    <div>
      <h2>멤버관리</h2>
      <p>개발중...</p>

      <Divider mb={28} />
    </div>
  );
}
