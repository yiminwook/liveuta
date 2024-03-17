import { useEffect, useRef } from 'react';
import * as styles from './interSectionTrigger.css';
import SquareToRound from './loading/SquareToRound';
import { LuLoader } from 'react-icons/lu';
import { global } from '@/style/globalTheme.css';

interface InterSectionTriggerProps {
  /** 페이지 끝에 도달여부 */
  isDone: boolean;
  onShow: () => void;
}

export default function InterSectionTrigger({ isDone, onShow }: InterSectionTriggerProps) {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentTarget = target.current;
    if (isDone || !currentTarget) return;

    const observer = new IntersectionObserver(
      (items, observer) => {
        const currentTarget = target.current;
        const isIntersecting = items[0].isIntersecting;
        if (!currentTarget || !isIntersecting) return;
        onShow();
        observer.unobserve(currentTarget);
      },
      { rootMargin: '100%' },
    );
    observer.observe(currentTarget);

    return () => observer.disconnect();
  }, [isDone, onShow]);

  return (
    <div ref={target} className={styles.wrap}>
      <div className={styles.inner}>
        {!isDone && (
          <SquareToRound className={styles.loading}>
            <LuLoader size="1rem" color={global.color.first.light} />
          </SquareToRound>
        )}
      </div>
    </div>
  );
}
