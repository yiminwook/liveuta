import FaSolidStar from '@icons/fa-solid/Star';
import IonMusicNote from '@icons/ion/MusicNote';
import TbDeviceDesktopCode from '@icons/tabler/DeviceDesktopCode';
import TbSettings from '@icons/tabler/Settings';
import TbTools from '@icons/tabler/Tools';
import { ActionIcon, SimpleGrid } from '@mantine/core';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const t = useTranslations('global.bottomTab.drawer');
  const pathname = usePathname();
  const internalLinks: DrawerItem[] = [
    {
      href: '/setting',
      text: t('internalLinks.settings'),
      icon: <TbSettings width="1.5rem" height="1.5rem" />,
    },
    {
      href: '/dev',
      text: t('internalLinks.dev'),
      icon: <TbDeviceDesktopCode width="1.5rem" height="1.5rem" />,
    },
  ];
  const externalLinks: DrawerItem[] = [
    {
      href: 'https://gall.dcinside.com/mgallery/board/lists?id=kizunaai',
      text: t('externalLinks.kizunaAiGallery'),
      icon: <FaSolidStar width="1.5rem" height="1.5rem" />,
    },
    {
      href: 'https://gall.dcinside.com/mini/board/lists?id=vuta',
      text: t('externalLinks.vutaGallery'),
      icon: <IonMusicNote width="1.5rem" height="1.5rem" />,
    },
    {
      href: 'https://uta-tools.vercel.app',
      text: t('externalLinks.utaTools'),
      icon: <TbTools width="1.5rem" height="1.5rem" />,
    },
  ];

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader className="blind">
          <DrawerTitle>{t('title')}</DrawerTitle>
          <DrawerDescription>{t('description')}</DrawerDescription>
        </DrawerHeader>
        <SimpleGrid cols={3} className={css.drawerGrid}>
          {internalLinks.map(({ icon, href, text }) => (
            <div className={css.item} key={`bottomDrawer_${text}`}>
              <ActionIcon
                variant="default"
                className={classNames(css.roundBtn)}
                component={Link}
                href={href}
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
