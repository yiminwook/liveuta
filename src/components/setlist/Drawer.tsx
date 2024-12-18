/* eslint-disable @next/next/no-img-element */
'use client';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/common/Vaul';
import Link from 'next/link';
import { useEffect } from 'react';
import css from './Drawer.module.scss';
import { useDrawer, useDrawerActions } from './DrawerContext';

export default function Setlist() {
  const drawer = useDrawer();
  const drawerActions = useDrawerActions();

  useEffect(() => {
    if (drawer.open === true) {
      document.body.classList.add('overflow-hidden');
      document.documentElement.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
    }
  }, [drawer.open]);

  return (
    <Drawer open={drawer.open} onOpenChange={drawerActions.onOpenChange}>
      <DrawerContent className={css.content} classNames={{ wrapper: css.wrapper }}>
        <DrawerHeader className={css.header}>
          <DrawerTitle>{drawer.setlist?.title}</DrawerTitle>
          <DrawerDescription>
            <Link href={`https://youtu.be/${drawer.setlist?.videoId}`}>
              https://youtu.be/{drawer.setlist?.videoId}
            </Link>
          </DrawerDescription>
          <div className={css.description}>
            <div className={css.thumbnailBox}>
              <img src={drawer.thumbnailUrl} alt="setlist thumbnail"></img>
            </div>
            <div className={css.descriptionBox}>
              <div className={css.channelName}>{drawer.channel?.nameKor}</div>
            </div>
          </div>
          <DrawerClose />
        </DrawerHeader>
        <div className={css.setlist}>
          {drawer.setlist?.description
            .split('\n')
            .filter((value) => value !== '')
            .map((line, index) => (
              <div key={`${drawer.setlist!.videoId}_row_${index}`} className={css.row}>
                <span className={css.index}>{index}.</span>
                <p className={css.line}>{line}</p>
              </div>
            ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
