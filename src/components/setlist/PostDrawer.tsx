import { Anchor } from '@mantine/core';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/common/Vaul';
import { useTranslations } from '@/libraries/i18n/client';
import css from './PostDrawer.module.scss';
import PostForm from './PostForm';

type PostDrawerProps = {
  session: TSession | null;
};

export default function PostDrawer({ session }: PostDrawerProps) {
  const { t } = useTranslations();

  return (
    <Drawer>
      <DrawerTrigger className={css.trigger}>{t('setlist.postDrawer.upload')}</DrawerTrigger>
      <DrawerContent className={css.content} classNames={{ wrapper: css.wrapper }}>
        <DrawerHeader className={css.header}>
          <DrawerTitle className={css.title}>{t('setlist.postDrawer.upload')}</DrawerTitle>
          <DrawerDescription className={css.description}>
            <Anchor href="/setlist/create" className={css.utaToolsLink} size="lg">
              {t('setlist.postDrawer.linkToCreateSetlist')}
            </Anchor>
          </DrawerDescription>
        </DrawerHeader>
        <PostForm session={session} />
      </DrawerContent>
    </Drawer>
  );
}
