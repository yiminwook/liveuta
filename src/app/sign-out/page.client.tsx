'use client';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import FirebaseClient from '@/libraries/firebase/client';
import { useLocale } from '@/libraries/i18n/client';

export default function Client() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    // 세션에서 에러발생시 로그아웃 처리
    signOut(FirebaseClient.getInstance().auth).finally(() => router.replace(`/${locale}/sign-in`));
  }, [router, locale]);

  return null;
}
