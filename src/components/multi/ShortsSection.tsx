'use client';
import { multiListAtom } from '@/stores/player/multi';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import css from './Home.module.scss';

const Shorts = dynamic(() => import('./Shorts'), { ssr: false });

export default function ShortsSection() {
  const [urls] = useAtom(multiListAtom);

  return (
    <>
      {urls.map((url, index) => {
        return (
          <div className={css.playerBox} key={index}>
            <Shorts url={url} />
          </div>
        );
      })}
    </>
  );
}
