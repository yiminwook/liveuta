'use client';
import dynamic from 'next/dynamic';
import * as styles from './home.css';
import { useAtom } from 'jotai';
import { listAtom } from '../_lib/atom';

const Shorts = dynamic(() => import('./Shorts'), { ssr: false });

export default function ShortsSection() {
  const [urls] = useAtom(listAtom);

  return (
    <>
      {urls.map((url, index) => {
        return (
          <div className={styles.playerBox} key={index}>
            <Shorts url={url} />
          </div>
        );
      })}
    </>
  );
}
