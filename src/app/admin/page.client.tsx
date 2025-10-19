'use client';
import { useUserInfo } from '@/hooks/use-user-info';
import { useSession } from '@/stores/session';

type Props = {};

export default function Client({}: Props) {
  const session = useSession();
  const userInfo = useUserInfo({ user: session.user });

  return (
    <div>
      <h2>관리자 홈</h2>
      <div>Email: {userInfo.data?.email}</div>
      <div>userLv: {userInfo.data?.userLv}</div>
    </div>
  );
}
