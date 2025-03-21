'use client';
import dynamic from 'next/dynamic';
import css from './Home.module.scss';
import Nav from './Nav';

import './GridLayout.module.scss';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const GridLayout = dynamic(() => import('./GridLayout'), {
  ssr: false,
  loading: () => <div>로딩중!!</div>,
});

/** desktop에서 지원되는 페이지 */
export default function Home() {
  return (
    <div className={css.wrap}>
      <GridLayout />
    </div>
  );
}
