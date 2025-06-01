import { Link } from '@/libraries/i18n';
import { usePathname, useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { ActionIcon, SimpleGrid } from '@mantine/core';
import classNames from 'classnames';
import { CircleHelp, Gem, MonitorDot, Music, Settings, Star, Wrench } from 'lucide-react';
import { JSX } from 'react';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../Vaul';
import css from './BottomTab.module.scss';

type DrawerItem = {
  icon: JSX.Element;
  href: string;
  text: string;
};

type BottomDrawerProps = {
  locale: TLocaleCode;
  onClose: () => void;
  isOpen: boolean;
};

export default function BottomDrawer({ isOpen, onClose, locale }: BottomDrawerProps) {
  const { t } = useTranslations();
  const pathname = usePathname();

  const internalLinks: DrawerItem[] = [
    {
      href: '/featured',
      text: t('global.bottomTab.drawer.internalLinks.featured'),
      icon: <Gem />,
    },
    {
      href: '/utils',
      text: t('global.bottomTab.drawer.internalLinks.utils'),
      icon: <Wrench />,
    },
    {
      href: '/setting',
      text: t('global.bottomTab.drawer.internalLinks.settings'),
      icon: <Settings />,
    },
    {
      href: '/dev',
      text: t('global.bottomTab.drawer.internalLinks.dev'),
      icon: <MonitorDot />,
    },
    {
      href: '/support',
      text: t('global.bottomTab.drawer.internalLinks.support'),
      icon: <CircleHelp />,
    },
  ];

  const externalLinks: DrawerItem[] = [
    {
      href: 'https://gall.dcinside.com/mgallery/board/lists?id=kizunaai',
      text: t('global.bottomTab.drawer.externalLinks.kizunaAiGallery'),
      icon: <Star />,
    },
    {
      href: 'https://gall.dcinside.com/mini/board/lists?id=vuta',
      text: t('global.bottomTab.drawer.externalLinks.vutaGallery'),
      icon: <Music />,
    },
    {
      href: 'https://uta-tools.vercel.app',
      text: t('global.bottomTab.drawer.externalLinks.utaTools'),
      icon: <Wrench />,
    },
  ];

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader className="blind">
          <DrawerTitle>{t('global.bottomTab.drawer.title')}</DrawerTitle>
          <DrawerDescription>{t('global.bottomTab.drawer.description')}</DrawerDescription>
        </DrawerHeader>
        <SimpleGrid cols={3} className={css.drawerGrid}>
          {internalLinks.map(({ icon, href, text }) => (
            <div className={css.item} key={`bottomDrawer_${text}`}>
              <ActionIcon
                variant="default"
                className={classNames(css.roundBtn)}
                component={Link}
                href={href}
                locale={locale}
                data-active={pathname === href}
              >
                {icon}
                <span>{text}</span>
              </ActionIcon>
            </div>
          ))}
        </SimpleGrid>
        <SimpleGrid cols={3} className={css.drawerGrid}>
          {externalLinks.map(({ icon, href, text }) => (
            <div className={css.item} key={`bottomDrawer_${text}`}>
              <ActionIcon
                variant="default"
                className={classNames(css.roundBtn)}
                component={'a'}
                href={href}
              >
                {icon}
                <span>{text}</span>
              </ActionIcon>
            </div>
          ))}
        </SimpleGrid>
      </DrawerContent>
    </Drawer>
  );
}
