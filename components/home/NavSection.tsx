import home from '@/components/home/Home.module.scss';
import NavLink from '@/components/common/NavLink';
import React, { ReactNode, useMemo, useState } from 'react';
import HorizonScrollBox from '@/components/common/HorizonScrollBox';
import useSheet from '@/hooks/api/useSheet';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import { SheetAPIReturntype } from '@/types/inSheet';
import { combineClassName } from '@/utils/combineClassName';
import { BiArrowFromLeft } from 'react-icons/bi';
import { BsSliders } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler';

const NavTapLink = ({ href, text }: { href: string; text: ReactNode }) => {
  return (
    <NavLink modifier={home['active']} href={href} shallow={true}>
      {text}
    </NavLink>
  );
};

const NavTap = () => {
  return (
    <ul className={home['nav-tab']}>
      <NavTapLink href="/" text="예정" />
      <NavTapLink href="/live" text="라이브" />
      <NavTapLink href="/daily" text="24시" />
      <NavTapLink href="/all" text="전체" />
    </ul>
  );
};

const NavSelectBox = ({ select }: { select: string }) => {
  const [active, setActive] = useState(false);
  const filter = (usePathname()?.split('/')[1] || 'scheduled') as keyof SheetAPIReturntype;
  const router = useRouter();

  const { mutate, data } = useSheet();

  const handleSelect = async (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const li = target.closest('li')?.dataset.value;

    if (!li || li === select) {
      setActive(() => false);
    } else {
      const selectCookie = new Cookies();
      selectCookie.set('select', li, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
      await mutate();
      setActive(() => false);
      router.refresh(); //select 최신화
    }
  };

  const totalText = `전체: ${data?.[filter]?.length?.total || 0}`;
  const streamText = `방송: ${data?.[filter]?.length?.stream || 0}`;
  const videoText = `동영상: ${data?.[filter]?.length?.video || 0}`;

  const selectedText = useMemo(() => {
    switch (select) {
      case 'stream':
        return streamText;
      case 'video':
        return videoText;
      default:
        return totalText;
    }
  }, [select]);

  const handleToggle = (e: MouseEvent | React.MouseEvent) => {
    e.stopPropagation();
    setActive((pre) => !pre);
  };

  const handleClose = (e: MouseEvent | React.MouseEvent) => {
    e.stopPropagation();
    const tartget = e.target as HTMLElement;
    const id = tartget.id;
    if (id === 'nav-selectbox-button') return;
    setActive(() => false);
  };

  return (
    <div className={home['nav-selectbox']}>
      <button id="nav-selectbox-button" onClick={handleToggle}>
        <BsSliders size="1.25rem" />
        {selectedText}
      </button>
      <OutsideClickHandler onOutsideClick={handleClose}>
        <div className={combineClassName(home['side'], active ? home['active'] : '')}>
          <button onClick={handleClose}>
            <BiArrowFromLeft size="1.25rem" />
          </button>
          <ul onClick={handleSelect}>
            <li className={select === 'all' ? home['active'] : ''} data-value={'all'}>
              {totalText}
            </li>
            <li className={select === 'stream' ? home['active'] : ''} data-value={'stream'}>
              {streamText}
            </li>
            <li className={select === 'video' ? home['active'] : ''} data-value={'video'}>
              {videoText}
            </li>
          </ul>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

interface NavSectionProps {
  select: string;
}

const NavSection = ({ select }: NavSectionProps) => {
  return (
    <section className={home['nav-section']}>
      <HorizonScrollBox className={home['nav-scroll-box']}>
        <NavTap />
        <NavSelectBox select={select} />
      </HorizonScrollBox>
    </section>
  );
};

export default NavSection;
