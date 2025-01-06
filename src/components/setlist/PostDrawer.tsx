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
import { useTranslations } from 'next-intl';
import css from './PostDrawer.module.scss';
import PostForm from './PostForm';

type PostDrawerProps = {
  session: Session | null;
};

export default function PostDrawer({ session }: PostDrawerProps) {
  const t = useTranslations('setlist.postDrawer');

  return (
    <Drawer>
      <DrawerTrigger className={css.trigger}>{t('upload')}</DrawerTrigger>
      <DrawerContent className={css.content} classNames={{ wrapper: css.wrapper }}>
        <DrawerHeader className={css.header}>
          <DrawerTitle className={css.title}>{t('uploadSetlist')}</DrawerTitle>
          <DrawerDescription className={css.description}>
            <Anchor href="/setlist/create" className={css.utaToolsLink} size="lg">
              {t('linkToCreateSetlist')}
            </Anchor>
          </DrawerDescription>
        </DrawerHeader>
        <PostForm session={session} />
      </DrawerContent>
    </Drawer>
  );
}
