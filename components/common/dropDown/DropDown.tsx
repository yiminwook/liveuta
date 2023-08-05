import { memo, MouseEvent, ReactNode, useEffect, useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import dropDown from '@/components/common/dropDown/DropDown.module.scss';
import { combineClassName } from '@/utils/combineClassName';

interface DropDownProps {
  title: string;
  children: ReactNode;
  width?: string;
  height?: string;
}

const DropDown = ({ children, width = 'auto', height = '2.5rem', title }: DropDownProps) => {
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

  useEffect(() => {
    window.addEventListener('click', onClose);
    return () => window.removeEventListener('click', onClose);
  }, []);

  return (
    <div className={combineClassName(dropDown['wrap'], isShow ? dropDown['active'] : '')} onClick={onClick}>
      <button onClick={handleToggle} style={{ height, width }}>
        <h3>{title}</h3>
        <span>
          <GoTriangleDown size="1rem" color="inherit" />
        </span>
      </button>
      <div className={combineClassName(dropDown['content'], isShow ? dropDown['active'] : '')}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default memo(DropDown);
