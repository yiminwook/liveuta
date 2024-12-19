import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/common/Vaul';
import { Anchor } from '@mantine/core';
import { Session } from 'next-auth';
import css from './PostDrawer.module.scss';
import PostForm from './PostForm';

type PostDrawerProps = {
  session: Session | null;
};

export default function PostDrawer({ session }: PostDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger className={css.trigger}>세트리스트 작성</DrawerTrigger>
      <DrawerContent className={css.content} classNames={{ wrapper: css.wrapper }}>
        <DrawerHeader className={css.header}>
          <DrawerTitle className={css.title}>세트리스트 작성</DrawerTitle>
          <DrawerDescription className={css.description}>
            <Anchor
              href="https://uta-tools.vercel.app/ko/tools/youtube/timeline"
              className={css.utaToolsLink}
              size="lg"
            >
              우타툴즈 타임라인으로 이동
            </Anchor>
          </DrawerDescription>
        </DrawerHeader>
        <PostForm session={session} />
      </DrawerContent>
    </Drawer>
  );
}
