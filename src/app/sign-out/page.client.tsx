'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocale } from '@/libraries/i18n/client';
import { useSession } from '@/stores/session';

export default function Client() {
  const router = useRouter();
  const locale = useLocale();
  const signOut = useSession((state) => state.actions.signOut);

  useEffect(() => {
    // 세션에서 에러발생시 로그아웃 처리
    signOut();
    router.replace(`/${locale}/sign-in`);
  }, [router, locale]);

  return null;
}
