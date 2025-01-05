import { ActionIcon, SimpleGrid } from '@mantine/core';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';
import IonMusicNote from '~icons/ion/music-note.jsx';
import TbDeviceDesktopCode from '~icons/tabler/device-desktop-code.jsx';
import TbSettings from '~icons/tabler/settings.jsx';
import TbStar from '~icons/tabler/star.jsx';
import TbTools from '~icons/tabler/tools.jsx';
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
  const t = useTranslations();
  const pathname = usePathname();
  const internalLinks: DrawerItem[] = [
    {
      href: '/setting',
      text: t('settings.title'),
      icon: <TbSettings width="1.5rem" height="1.5rem" />,
    },
    {
      href: '/dev',
      text: t('dev.title'),
      icon: <TbDeviceDesktopCode width="1.5rem" height="1.5rem" />,
    },
  ];
  const externalLinks: DrawerItem[] = [
    {
      href: 'https://gall.dcinside.com/mgallery/board/lists?id=kizunaai',
      text: t('global.externalLink.kizunaAiGallery'),
      icon: <TbStar width="1.5rem" height="1.5rem" />,
    },
    {
      href: 'https://gall.dcinside.com/mini/board/lists?id=vuta',
      text: t('global.externalLink.vutaGallery'),
      icon: <IonMusicNote width="1.5rem" height="1.5rem" />,
    },
    {
      href: 'https://uta-tools.vercel.app',
      text: t('global.externalLink.utaTools'),
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
