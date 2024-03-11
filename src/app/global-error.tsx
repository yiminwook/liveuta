'use client';
import * as styles from '@/style/not-found.css';
import axios from 'axios';
import Image from 'next/image';
import { useEffect } from 'react';
import character from '/src/asset/image/character-6.png';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error-Boundary', process.env.NODE_ENV, error);
    axios({
      method: 'POST',
      url: '/api/log/error',
      data: { message: error.message, stack: error.stack, digest: error.digest },
    }).then((res) => res.status === 200 && console.log('에러 전송 성공'));
  }, [error]);

  return (
    <html>
      <title>500: Server Error</title>
      <body>
        <div className={styles.wrap}>
          <div className={styles.inner}>
            <div className={styles.imgBox}>
              <Image
                alt="에러가 발생하였습니다."
                src={character}
                width={200}
                height={300}
                unoptimized={true}
              />
            </div>
            <div className={styles.desc}>
              <div className={styles.descTop}>
                <h1>500: Server Error</h1>
                <h2>{error.message}</h2>
              </div>
              <div className={styles.descBottom}>
                <Link href="/" className={styles.button}>
                  홈으로 돌아가기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
