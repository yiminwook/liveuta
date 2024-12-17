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
import { useEffect } from 'react';
import css from './Drawer.module.scss';
import { useDrawer, useDrawerActions } from './DrawerContext';

export default function Setlist() {
  const drawer = useDrawer();
  const drawerActions = useDrawerActions();

  useEffect(() => {
    if (drawer.open === true) {
      document.documentElement.querySelector('.os-scrollbar-vertical')?.classList.add('hidden');
    } else {
      document.documentElement.querySelector('.os-scrollbar-vertical')?.classList.remove('hidden');
    }
  }, [drawer.open]);

  return (
    <Drawer open={drawer.open} onOpenChange={drawerActions.onOpenChange}>
      <DrawerContent>
        <div className={css.contentWrapper}>
          <div className={css.content}>
            <DrawerHeader className={css.header}>
              <DrawerTitle>{drawer.setlist?.title}</DrawerTitle>
              <DrawerDescription className={css.description}>
                <div className={css.thumbnailBox}>
                  <img src={drawer.thumbnailUrl} alt="setlist thumbnail"></img>
                </div>
                <div className={css.descriptionBox}>
                  <div className={css.channelName}>{drawer.channel?.nameKor}</div>
                </div>
              </DrawerDescription>
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
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
