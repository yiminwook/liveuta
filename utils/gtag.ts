'use client';

//
//  GA 데이터 수집설정
//
//  https://www.codestates.com/blog/content/ga4-%EC%B4%88%EA%B8%B0%EC%84%B8%ED%8C%85
//  https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/lib/gtag.js
//  https://developers.google.com/analytics/devguides/collection/ga4/event-parameters?hl=ko&client_type=gtag

export const gtag = <T extends keyof Gtag.GtagCommands>(command: T, ...args: Gtag.GtagCommands[T]) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
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
export const gtagClick = ({ target, content, detail, action }: GtagClickProps) =>
  gtag('event', 'click', {
    target,
    content,
    detail,
    action,
  });
