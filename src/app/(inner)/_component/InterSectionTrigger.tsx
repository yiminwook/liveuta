import { useEffect, useRef } from 'react';
import * as styles from './interSectionTrigger.css';

interface InterSectionTriggerProps {
  /** 페이지 끝에 도달여부 */
  done: boolean;
  onShow: () => void;
}

export default function InterSectionTrigger({ done, onShow }: InterSectionTriggerProps) {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentTarget = target.current;
    if (done || !currentTarget) return;

    const observer = new IntersectionObserver(
      (items, observer) => {
        const currentTarget = target.current;
        const isIntersecting = items[0].isIntersecting;
        console.log('show', isIntersecting);
        if (!currentTarget || !isIntersecting) return;
        onShow();
        observer.unobserve(currentTarget);
      },
      { rootMargin: '100%' },
    );
    observer.observe(currentTarget);

    return () => {
      console.log('disconnect');
      observer.disconnect();
    };
  }, [target, done, onShow]);

  return (
    <div ref={target} className={styles.wrap}>
      <div className={styles.inner}>로딩...</div>
    </div>
  );
}
