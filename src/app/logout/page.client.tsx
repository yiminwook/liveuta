'use client';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function Client() {
  useEffect(() => {
    // 세션에서 에러발생시 로그아웃 처리
    signOut({
      callbackUrl: '/',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
