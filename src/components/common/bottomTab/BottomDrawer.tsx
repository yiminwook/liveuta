import { Link } from '@/libraries/i18n';
import { usePathname, useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { ActionIcon, SimpleGrid } from '@mantine/core';
import { IconHelpCircle, IconMusic } from '@tabler/icons-react';
import {
  IconDeviceDesktopCode,
  IconDiamond,
  IconSettings,
  IconStarFilled,
  IconTools,
} from '@tabler/icons-react';
import classNames from 'classnames';
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
      icon: <IconDiamond size="1.5rem" />,
    },
    {
      href: '/utils',
      text: t('global.bottomTab.drawer.internalLinks.utils'),
      icon: <IconTools size="1.5rem" />,
    },
    {
      href: '/setting',
      text: t('global.bottomTab.drawer.internalLinks.settings'),
      icon: <IconSettings size="1.5rem" />,
    },
    {
      href: '/dev',
      text: t('global.bottomTab.drawer.internalLinks.dev'),
      icon: <IconDeviceDesktopCode size="1.5rem" />,
    },
    {
      href: '/support',
      text: t('global.bottomTab.drawer.internalLinks.support'),
      icon: <IconHelpCircle size="1.5rem" />,
    },
  ];

  const externalLinks: DrawerItem[] = [
    {
      href: 'https://gall.dcinside.com/mgallery/board/lists?id=kizunaai',
      text: t('global.bottomTab.drawer.externalLinks.kizunaAiGallery'),
      icon: <IconStarFilled size="1.5rem" />,
    },
    {
      href: 'https://gall.dcinside.com/mini/board/lists?id=vuta',
      text: t('global.bottomTab.drawer.externalLinks.vutaGallery'),
      icon: <IconMusic size="1.5rem" />,
    },
    {
      href: 'https://uta-tools.vercel.app',
      text: t('global.bottomTab.drawer.externalLinks.utaTools'),
      icon: <IconTools size="1.5rem" />,
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
