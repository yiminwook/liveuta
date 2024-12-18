import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/common/Vaul';
import { Anchor } from '@mantine/core';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import css from './PostDrawer.module.scss';
import PostForm from './PostForm';

type PostDrawerProps = {
  session: Session | null;
};

export default function PostDrawer({ session }: PostDrawerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open === true) {
      document.documentElement.querySelector('.os-scrollbar-vertical')?.classList.add('hidden');
    } else {
      document.documentElement.querySelector('.os-scrollbar-vertical')?.classList.remove('hidden');
    }
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className={css.trigger}>세트리스트 작성</DrawerTrigger>
      <DrawerContent className={css.content} classNames={{ wrapper: css.wrapper }}>
        <DrawerHeader className={css.header}>
          <DrawerTitle className={css.title}>세트리스트 작성</DrawerTitle>
        </DrawerHeader>
        <Anchor
          href="https://uta-tools.vercel.app/ko/tools/youtube/timeline"
          className={css.utaToolsLink}
          size="lg"
        >
          우타툴즈 타임라인으로 이동
        </Anchor>
        <PostForm session={session} />
      </DrawerContent>
    </Drawer>
  );
}
