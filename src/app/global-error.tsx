'use client';
import character from '@/assets/image/character-6.png';
import * as Sentry from '@sentry/nextjs';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

/*
 * global-error.tsx
 * global-error.tsx에서는 모든 컴포넌트가 client에서 동작합니다.
 * client에서 동작하기 때문에 서버컴포넌트, js/ts/css/scss 파일을 import 하더라도 동작하지 않을 수 있습니다.
 * RootLayout 랜더링중 에러가 발생하면 발생시점에 따라서 RootLayout에 import된 css/scss가 적용되지 않을 수 있습니다.
 * next-view-transitions Link를 import 해서 랜더링시 에러가 발생하여 화면이 깨집니다.
 *
 *
 * style 적용 가능한 방안
 *
 * 1. module.css / module.scss 사용, global.scss를 global.module.scss로 변경 또는 독립된 global-error.module.scss 스타일 생성
 * 2. global.scss build 후 public 폴더 하위로 이동 css 파일 경로를 <Link href="/global.css" rel="stylesheet"/>로 연결 (과정이 복잡)
 * 3. inline style 사용
 * 4. style 태그 사용   ex) <style> body {} </style>
 */

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error.globalError');

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
                alt={t('imageAlt')}
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
                <Link href="/">{t('linkToHome')}</Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
