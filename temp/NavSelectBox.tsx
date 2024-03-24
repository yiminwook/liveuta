'use client';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import cx from 'classnames';
import { BiArrowFromLeft } from 'react-icons/bi';
import { BsSliders } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler';
import { VideoType } from '@/type';
import { schedule } from '@inner/_lib/atom';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import * as styles from './navSelectBox.css';

enum SelectedText {
  total = '전체',
  stream = '방송',
  video = '동영상',
}

interface NavSelectBoxProps {}

export default function NavSelectBox({}: NavSelectBoxProps) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [select] = useAtom(schedule.selectAtom);
  const [selectedSchedule] = useAtom(schedule.selectedScheduleAtom);

  const handleSelect = async (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const li = target.closest('li')?.dataset.value as VideoType;

    if (!li || li === select) {
      setActive(() => false);
    } else {
      const selectCookie = new Cookies();
      selectCookie.set('select', li, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
      setActive(() => false);
      // select cache 삭제
      router.refresh();
    }
  };

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

  const selectedText = {
    all: `${SelectedText.total}: ${selectedSchedule.length.all}`,
    stream: `${SelectedText.stream}: ${selectedSchedule.length.stream}`,
    video: `${SelectedText.video}: ${selectedSchedule.length.video}`,
  };

  return (
    <div className={styles.navSelectBox}>
      <button className={styles.navButton} id="nav-selectbox-button" onClick={handleToggle}>
        <BsSliders size="1.25rem" />
        {selectedText[select]}
      </button>
      <OutsideClickHandler onOutsideClick={handleClose}>
        <div className={cx(styles.side, active && 'active')}>
          <button className={styles.sideButton} onClick={handleClose}>
            <BiArrowFromLeft size="1.25rem" />
          </button>
          <ul className={styles.sideList} onClick={handleSelect}>
            <li
              className={cx(styles.sideItem, select === VideoType.all && 'active')}
              data-value={VideoType.all}
            >
              {selectedText.all}
            </li>
            <li
              className={cx(styles.sideItem, select === VideoType.stream && 'active')}
              data-value={VideoType.stream}
            >
              {selectedText.stream}
            </li>
            <li
              className={cx(styles.sideItem, select === VideoType.video && 'active')}
              data-value={VideoType.video}
            >
              {selectedText.video}
            </li>
          </ul>
        </div>
      </OutsideClickHandler>
    </div>
  );
}
