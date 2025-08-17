'use client';
import { MouseEvent, ReactNode, useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import dropDown from './dropDown.module.scss';
import clsx from 'clsx';
import OutsideClickHandler from 'react-outside-click-handler';

interface DropDownProps {
  title: string;
  children: ReactNode;
  width?: string;
  height?: string;
}

export default function DropDown({
  children,
  width = 'auto',
  height = '2.5rem',
  title,
}: DropDownProps) {
  const [isShow, setIsShow] = useState(false);

  const handleToggle = (e: MouseEvent) => {
    e.stopPropagation();
    setIsShow((pre) => !pre);
  };

  const onClose = () => {
    setIsShow(() => false);
  };

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className={clsx(dropDown['wrap'], isShow && dropDown['active'])} onClick={onClick}>
      <OutsideClickHandler onOutsideClick={onClose}>
        <button onClick={handleToggle} style={{ height, width }}>
          <h3>{title}</h3>
          <span>
            <GoTriangleDown size="1rem" color="inherit" />
          </span>
        </button>
      </OutsideClickHandler>
      <div className={clsx(dropDown['content'], isShow ? dropDown['active'] : '')}>
        <div>{children}</div>
      </div>
    </div>
  );
}
