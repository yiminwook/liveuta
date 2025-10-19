'use client';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FirebaseClient from '@/libraries/firebase/client';

export default function Page() {
  const router = useRouter();
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
        });
    } else {
      setState(() => 'failed');
    }
  }, [router]);

  if (state === 'loading') {
    return <div>loading...</div>;
  }

  if (state === 'failed') {
    return <div>signin failed</div>;
  }

  return <div>signin success</div>;
}
