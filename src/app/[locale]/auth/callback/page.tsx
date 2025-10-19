'use client';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FirebaseClient from '@/libraries/firebase/client';
import { Link } from '@/libraries/i18n';
import { useLocale } from '@/libraries/i18n/client';

export default function Page() {
  const router = useRouter();
  const locale = useLocale();

  const [state, setState] = useState<'loading' | 'success' | 'failed'>('loading');

  useEffect(() => {
    const auth = FirebaseClient.getInstance().auth;

    if (isSignInWithEmailLink(auth, window.location.href)) {
      const query = new URLSearchParams(window.location.search);
      const email = query.get('email')!;

      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          console.log('signin success', result);
          setState(() => 'success');
          router.replace('/');
        })
        .catch((error) => {
          console.error('signin failed', error);
          setState(() => 'failed');
        });
    } else {
      setState(() => 'failed');
    }
  }, [router]);

  if (state === 'loading') {
    return <div>로그인 중입니다...</div>;
  }

  if (state === 'failed') {
    return (
      <div>
        <div>유효하지 않은 링크입니다.</div>
        <Link locale={locale} href="/sign-in">
          로그인 페이지로 이동
        </Link>
      </div>
    );
  }

  return <div>로그인에 성공했습니다. 잠시후 홈페이지로 이동합니다.</div>;
}
