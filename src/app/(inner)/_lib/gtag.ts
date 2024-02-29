'use client';

import { MouseEvent } from 'react';

//
//  GA 데이터 수집설정
//
//  https://www.codestates.com/blog/content/ga4-%EC%B4%88%EA%B8%B0%EC%84%B8%ED%8C%85
//  https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/lib/gtag.js
//  https://developers.google.com/analytics/devguides/collection/ga4/event-parameters?hl=ko&client_type=gtag

// Define a flag to check if gtag is available
const gtagAvailable = typeof window !== 'undefined' && typeof window.gtag === 'function';

export const gtag = <T extends keyof Gtag.GtagCommands>(
  command: T,
  ...args: Gtag.GtagCommands[T]
) => {
  if (!gtagAvailable) {
    console.warn('Google Analytics gtag function is not available.');
    return;
  }

  window.gtag(command, ...args);
};

interface GtagClickProps {
  /** 이벤트가 일어나는 곳 */
  target: string;
  /** title */
  content: string;
  detail: string;
  /** action 종류 */
  action: string;
}
export const gtagClick = (props: GtagClickProps) => gtag('event', 'click', props);

/**
 * atag 기본 이벤트 중지, gtag() 실행후 재실행
 *
 * a태그의 target이 _blank일 경우 새창으로 열기
 */
export const gtagClickAtag = (e: MouseEvent<HTMLAnchorElement>, props: GtagClickProps) => {
  e.preventDefault();
  const href = e.currentTarget.href;

  gtagClick(props);

  if (e.currentTarget.target === '_blank') {
    //새창으로 열기
    window.open(href);
    return;
  }

  window.location.href = href;
};
