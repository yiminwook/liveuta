// @ts-nocheck
import { sendSignInLinkToEmail } from 'firebase/auth';
import { ActionCodeSettings } from 'firebase-admin/auth';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import BadReqError from '@/libraries/error/badRequestError';
import errorHandler from '@/libraries/error/handler';
import FirebaseClient from '@/libraries/firebase/client';
import { signInDto } from '@/types/dto';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const dto = signInDto.safeParse(json);

    if (dto.error) {
      throw new BadReqError(z.prettifyError(dto.error));
    }

    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL + `/${dto.data.locale}/auth/callback`);
    url.searchParams.set('email', dto.data.email);

    const actionCodeSettings: ActionCodeSettings = {
      url: url.toString(),
      handleCodeInApp: true,
    };

    console.log('actionCodeSettings', actionCodeSettings);

    await sendSignInLinkToEmail(
      FirebaseClient.getInstance().auth,
      dto.data.email,
      actionCodeSettings,
    );

    return NextResponse.json({ message: 'success' }, { status: 201 });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ error: message }, { status });
  }
}

('use client');

// auth/callback
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

export async function POST(
  _req: NextRequest,
  props: {
    params: Promise<{ channelId: string }>;
  },
) {
  const params = await props.params;
  try {
    const payload = await parseIdToken();

    if (!payload) {
      console.error('id token is not provided');
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }
  } catch (error) {
    console.error('POST /api/auth/callback', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

('use client');

import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import FirebaseClient from '@/libraries/firebase/client';
import { useSession } from '@/stores/session';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const auth = FirebaseClient.getInstance().auth;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('auth state changed', user);
      useSession.getState().signIn(user);
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};

export const clientApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_SITE_URL + '/api',
  hooks: {
    beforeRequest: [
      async (request) => {
        const idToken = await FirebaseClient.getInstance().auth.currentUser?.getIdToken();

        if (idToken) {
          request.headers.set('Authorization', `Bearer ${idToken}`);
        }
      },
    ],
    beforeRetry: [],
    afterResponse: [],
    beforeError: [
      async (error) => {
        const { response } = error;
        if (!response) return error;

        try {
          const body: { message?: string } = await response.json();

          if (body?.message) {
            error.message = body.message;
          }
        } catch (parseError) {
          console.log('[CLIENT] ky parseError');
        } finally {
          return error;
        }
      },
    ],
  },
});
