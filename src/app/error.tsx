// https://nextjs.org/docs/app/building-your-application/routing/error-handling
//에러 페이지는 클라이언트에서만 렌더링되어야 합니다.
'use client';
import { useEffect } from 'react';
import character from '@/assets/image/character-6.png';
import axios from 'axios';
import Image from 'next/image';
import * as styles from './not-found.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void; //세그먼트를 다시 렌더링하여 복구 시도
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
    <>
      <title>500: Server Error</title>
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
              <button className={styles.button} onClick={reset}>
                재시도
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
