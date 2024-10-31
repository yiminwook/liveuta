'use client';
import { ReactNode, useCallback, useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import accordion from './accordion.module.scss';
import cx from 'classnames';

interface AccordionProps {
  title: string;
  children: ReactNode;
  buttonSize?: string;
}

export default function Accordion({ title, children, buttonSize = '1rem' }: AccordionProps) {
  const [show, setShow] = useState(false);

  const toggleShow = useCallback(() => {
    setShow((pre) => !pre);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <div className={cx(accordion['accordion'], show ? accordion['active'] : '')}>
      <div className={accordion['header']}>
        <button onClick={toggleShow}>
          <h3>{title}</h3>
          <GoTriangleDown size={buttonSize} color="inherit" />
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}
