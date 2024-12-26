import { ActionIcon, SimpleGrid } from '@mantine/core';
import classNames from 'classnames';
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

const INTERNAL_ITEMS: DrawerItem[] = [
  { href: '/setting', text: '설정', icon: <IconTbSettings size="1.5rem" /> },
  { href: '/dev', text: '개발', icon: <IconTbDeviceDesktopCode size="1.5rem" /> },
];

const EXTERNAL_ITEMS: DrawerItem[] = [
  {
    href: 'https://gall.dcinside.com/mgallery/board/lists?id=kizunaai',
    text: '키갤',
    icon: <IconTbStar size="1.5rem" />,
  },
  {
    href: 'https://gall.dcinside.com/mini/board/lists?id=vuta',
    text: '버우갤',
    icon: <IconIonMusicNote size="1.5rem" />,
  },
  { href: 'https://uta-tools.vercel.app', text: '우타툴즈', icon: <IconTbTools size="1.5rem" /> },
];

type BottomDrawerProps = {
  onClose: () => void;
  isOpen: boolean;
};

export default function BottomDrawer({ isOpen, onClose }: BottomDrawerProps) {
  const pathname = usePathname();
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader className="blind">
          <DrawerTitle>사이트 맵</DrawerTitle>
          <DrawerDescription>링크를 선택해주세요</DrawerDescription>
        </DrawerHeader>
        <SimpleGrid cols={3} className={css.drawerGrid}>
          {INTERNAL_ITEMS.map(({ icon, href, text }) => (
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
          {EXTERNAL_ITEMS.map(({ icon, href, text }) => (
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
