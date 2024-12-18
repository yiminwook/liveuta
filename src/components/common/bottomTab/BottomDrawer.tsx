import { ActionIcon, SimpleGrid } from '@mantine/core';
import variable from '@variable';
import classNames from 'classnames';
import { Link } from 'next-view-transitions';
import { JSX, useState } from 'react';
import { GrTest } from 'react-icons/gr';
import { LiaExchangeAltSolid, LiaMicrophoneAltSolid, LiaToolsSolid } from 'react-icons/lia';
import { LuSettings } from 'react-icons/lu';
import { TiStarOutline } from 'react-icons/ti';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../Vaul';
import css from './BottomTab.module.scss';

type DrawerItem = {
  icon: JSX.Element;
  href: string;
  text: string;
};

const INTERNAL_ITEMS: DrawerItem[] = [
  { href: '/setting', text: '설정', icon: <LuSettings size="1.5rem" /> },
  { href: '/dev', text: '개발', icon: <GrTest size="1.5rem" /> },
];

const EXTERNAL_ITEMS: DrawerItem[] = [
  {
    href: 'https://gall.dcinside.com/mgallery/board/lists?id=kizunaai',
    text: '키갤',
    icon: <TiStarOutline size="1.5rem" />,
  },
  {
    href: 'https://gall.dcinside.com/mini/board/lists?id=vuta',
    text: '버우갤',
    icon: <LiaMicrophoneAltSolid size="1.5rem" />,
  },
  { href: 'https://uta-tools.vercel.app', text: '우타툴즈', icon: <LiaToolsSolid size="1.5rem" /> },
];

type BottomDrawerProps = {
  onClose: () => void;
  isOpen: boolean;
};

export default function BottomDrawer({ isOpen, onClose }: BottomDrawerProps) {
  const [isExternal, setIsExternal] = useState(false);

  const toggleExternal = () => setIsExternal((prev) => !prev);

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent style={{ maxWidth: variable.breakpointSm }}>
        <DrawerHeader>
          <DrawerTitle className="blind">사이트 맵</DrawerTitle>
        </DrawerHeader>
        <SimpleGrid cols={3} className={css.drawerGrid}>
          {(isExternal ? EXTERNAL_ITEMS : INTERNAL_ITEMS).map(({ icon, href, text }) => (
            <div className={css.item}>
              <ActionIcon
                variant="default"
                key={`bottomDrawer_${text}`}
                className={classNames(css.roundBtn)}
                component={(isExternal ? 'a' : Link) as 'a'}
                href={href}
              >
                {icon}
                <span>{text}</span>
              </ActionIcon>
            </div>
          ))}
          <div className={css.item}>
            <ActionIcon
              variant="default"
              className={classNames(css.roundBtn, 'converter')}
              onClick={toggleExternal}
            >
              <LiaExchangeAltSolid size="1.5rem" />
              <span>전환</span>
            </ActionIcon>
          </div>
        </SimpleGrid>
      </DrawerContent>
    </Drawer>
  );
}
