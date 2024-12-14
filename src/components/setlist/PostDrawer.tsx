'use client';
import { Anchor } from '@mantine/core';
import { Session } from 'next-auth';
import { Drawer } from 'vaul';
import css from './PostDrawer.module.scss';
import PostForm from './PostForm';

type PostDrawerProps = {
  session: Session | null;
};

export default function PostDrawer({ session }: PostDrawerProps) {
  return (
    <Drawer.Root>
      <Drawer.Trigger className={css.trigger}>작성</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className={css.overlay} />
        <Drawer.Content className={css.content}>
          <div className={css.handle}></div>
          <div className={css.setListWrap}>
            <div className={css.setList}>
              <Drawer.Title className={css.title}>세트리스트 작성</Drawer.Title>
              <Anchor
                href="https://uta-tools.vercel.app/ko/tools/youtube/timeline"
                className={css.utaToolsLink}
                size="lg"
              >
                우타툴즈 타임라인으로 이동
              </Anchor>
              <PostForm session={session} />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
