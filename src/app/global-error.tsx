'use client';
import * as Sentry from '@sentry/nextjs';
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
 * 1. global.scss build 후 public 폴더 하위로 이동 css 파일 경로를 <Link href="/global.css" rel="stylesheet"/>로 연결 (과정이 복잡)
 * 2. inline style 사용
 * 3. style 태그 사용   ex) <style> body {} </style>
 */

// GlobalError 컴포넌트는 번역을 하지않음 기본적으로 영어로
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <head>
        <style>
          {`
            #app {
              height: 100%;
              width: 100%;
              flex-direction: column;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
              text-align: center;
              background-color: #f7f7f7;
            }

            .title {
              font-size: 2rem;
              color: #e53e3e;
              margin-bottom: 1rem;
            }

            .subtitle {
              color: #4a5568;
              margin-bottom: 1.5rem;
            }

            .refreshButton {
              background-color: #3182ce;
              color: white;
              padding: 0.5rem 1rem;
              border-radius: 0.375rem;
              border: none;
              cursor: pointer;
              font-size: 1rem;
            }

            .detailBox {
              margin-top: 2rem;
              padding: 1rem;
              background-color: #fff;
              border-radius: 0.5rem;
              max-width: 600px;


            }

            .detailBox p {
              color: #e53e3e;
              font-weight: bold;
            }

            .detailBox pre {
              white-space: pre-wrap;
              word-break: break-all;
              color: #4a5568;
            }
          `}
        </style>
      </head>
      <body>
        <div id="app">
          <h1 className="title">Something went wrong</h1>
          <p className="subtitle">Please refresh the page or try again later</p>
          {process.env.NODE_ENV === 'development' && (
            <div className="detailBox">
              <p>Error details:</p>
              <pre>{error.message}</pre>
            </div>
          )}
          <button onClick={() => window.location.reload()} className="refreshButton">
            Refresh Page
          </button>
        </div>
      </body>
    </html>
  );
}
