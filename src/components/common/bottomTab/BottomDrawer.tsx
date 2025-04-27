import { Link } from '@/libraries/i18n';
import { usePathname, useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import FaSolidStar from '@icons/fa-solid/Star';
import IonMusicNote from '@icons/ion/MusicNote';
import { IcBaselineHelpOutline } from '@icons/material-symbols/BaselineHelpOutline';
import TbDeviceDesktopCode from '@icons/tabler/DeviceDesktopCode';
import Diamond from '@icons/tabler/Diamond';
import TbSettings from '@icons/tabler/Settings';
import TbTools from '@icons/tabler/Tools';
import { ActionIcon, SimpleGrid } from '@mantine/core';
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
  onClose: () => void;
  isOpen: boolean;
};

export default function BottomDrawer({ isOpen, onClose }: BottomDrawerProps) {
  const { t, i18n } = useTranslations();
  const locale = i18n.language as TLocaleCode;
  const pathname = usePathname();

  const internalLinks: DrawerItem[] = [
    {
      href: '/featured',
      text: t('global.bottomTab.drawer.internalLinks.featured'),
      icon: <Diamond width="1.5rem" height="1.5rem" />,
    },
    {
      href: '/utils',
      text: t('global.bottomTab.drawer.internalLinks.utils'),
      icon: <TbTools width="1.5rem" height="1.5rem" />,
    },
    {
      href: '/setting',
      text: t('global.bottomTab.drawer.internalLinks.settings'),
      icon: <TbSettings width="1.5rem" height="1.5rem" />,
    },
    {
      href: '/dev',
      text: t('global.bottomTab.drawer.internalLinks.dev'),
      icon: <TbDeviceDesktopCode width="1.5rem" height="1.5rem" />,
    },
    {
      href: '/support',
      text: t('global.bottomTab.drawer.internalLinks.support'),
      icon: <IcBaselineHelpOutline width="1.5rem" height="1.5rem" />,
    },
  ];

  const externalLinks: DrawerItem[] = [
    {
      href: 'https://gall.dcinside.com/mgallery/board/lists?id=kizunaai',
      text: t('global.bottomTab.drawer.externalLinks.kizunaAiGallery'),
      icon: <FaSolidStar width="1.5rem" height="1.5rem" />,
    },
    {
      href: 'https://gall.dcinside.com/mini/board/lists?id=vuta',
      text: t('global.bottomTab.drawer.externalLinks.vutaGallery'),
      icon: <IonMusicNote width="1.5rem" height="1.5rem" />,
    },
    {
      href: 'https://uta-tools.vercel.app',
      text: t('global.bottomTab.drawer.externalLinks.utaTools'),
      icon: <TbTools width="1.5rem" height="1.5rem" />,
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
