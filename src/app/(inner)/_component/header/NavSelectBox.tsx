'use client';
import home from '../home.module.scss';
import React, { useState } from 'react';
//import useSheet from '@/queries/sheet';
import Cookies from 'universal-cookie';
//import { SheetAPIReturntype } from '@/types/inSheet';
import cx from 'classnames';
import { BiArrowFromLeft } from 'react-icons/bi';
import { BsSliders } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler';
import { useSelectAtom } from '@/app/_lib/atom';
import { SelectType } from '@/type';
import useMongoDB from '@inner/_lib/getMongoDB';
import { MongoDBAPIReturntype } from '@/type/api/mongoDB';

interface NavSelectBoxProps {
  filter: keyof MongoDBAPIReturntype;
}

export default function NavSelectBox({ filter }: NavSelectBoxProps) {
  const [active, setActive] = useState(false);
  const [select, setSelect] = useSelectAtom();
  const { refetchSheet, sheetData } = useMongoDB(filter);

  const handleSelect = async (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const li = target.closest('li')?.dataset.value as SelectType;

    if (!li || li === select) {
      setActive(() => false);
    } else {
      const selectCookie = new Cookies();
      selectCookie.set('select', li, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
      await refetchSheet();
      setSelect(() => li);
      setActive(() => false);
    }
  };

  // didnt explicitly change name sheetData in... somewhere
  const totalText = `전체: ${sheetData?.[filter]?.length?.total || 0}`;
  const streamText = `방송: ${sheetData?.[filter]?.length?.stream || 0}`;
  const videoText = `동영상: ${sheetData?.[filter]?.length?.video || 0}`;

  const selectedText = () => {
    switch (select) {
      case 'stream':
        return streamText;
      case 'video':
        return videoText;
      default:
        return totalText;
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

  return (
    <div className={home['nav-selectbox']}>
      <button id="nav-selectbox-button" onClick={handleToggle}>
        <BsSliders size="1.25rem" />
        {selectedText()}
      </button>
      <OutsideClickHandler onOutsideClick={handleClose}>
        <div className={cx(home['side'], active ? home['active'] : '')}>
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
}
