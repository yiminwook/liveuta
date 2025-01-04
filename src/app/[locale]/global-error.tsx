'use client';
import character from '@/assets/image/character-6.png';
import * as Sentry from '@sentry/nextjs';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global-Error-Boundary', process.env.NODE_ENV, error);
    axios({
      method: 'POST',
      url: '/api/v1/log/error',
      data: { message: error.message, stack: error.stack, digest: error.digest },
    }).then((res) => res.status === 200 && console.log('에러 전송 성공'));
  }, [error]);

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <title>500: Server Error</title>
      <body>
        <div>
          <div>
            <div>
              <Image
                alt="에러가 발생하였습니다."
                src={character}
                width={200}
                height={300}
                unoptimized={true}
              />
            </div>
            <div>
              <div>
                <h1>500: Server Error</h1>
                <h2>{error.message}</h2>
              </div>
              <div>
                {/* next/link 사용 */}
                <Link href="/">홈으로 돌아가기</Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
