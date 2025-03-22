'use client';
import { Loader } from '@mantine/core';
import variable from '@variable';
import dynamic from 'next/dynamic';
import css from './Home.module.scss';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import './grid/Grid.module.scss';
import './grid/GridNav.module.scss';

const Grid = dynamic(() => import('./grid'), {
  ssr: false,
  loading: () => (
    <div className={css.gridLoadingBox}>
      <Loader color={variable.thirdColorDefault} />
    </div>
  ),
});

/** desktop에서 지원되는 페이지 */
export default function Home() {
  return (
    <div className={css.wrap}>
      <Grid />
    </div>
  );
}
