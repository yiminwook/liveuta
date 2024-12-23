'use client';
import { useMultiViewStore } from '@/stores/multiView';
import dynamic from 'next/dynamic';
import css from './Home.module.scss';

const Shorts = dynamic(() => import('./Shorts'), { ssr: false });

export default function ShortsSection() {
  const list = useMultiViewStore((state) => state.list);

  return (
    <>
      {list.map((url, index) => {
        return (
          <div className={css.playerBox} key={index}>
            <Shorts url={url} />
          </div>
        );
      })}
    </>
  );
}
