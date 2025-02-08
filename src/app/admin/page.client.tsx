'use client';
import { useSession } from 'next-auth/react';

type Props = {};

export default function Client({}: Props) {
  const session = useSession().data!;
  return (
    <div>
      <h2>관리자 홈</h2>
      <div>Email: {session.user.email}</div>
      <div>userLv: {session.user.userLv}</div>
    </div>
  );
}
