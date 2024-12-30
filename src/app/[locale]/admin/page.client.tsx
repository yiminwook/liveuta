'use client';
import { Session } from 'next-auth';

type Props = {
  session: Session;
};

export default function Client({ session }: Props) {
  return (
    <div>
      <h2>관리자 홈</h2>
      <div>Email: {session.user.email}</div>
      <div>userLv: {session.user.userLv}</div>
    </div>
  );
}
