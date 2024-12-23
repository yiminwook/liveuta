'use client';
import { useState } from 'react';
import BottomDrawer from './BottomDrawer';
import BottomInner from './BottomInner';
import css from './BottomTab.module.scss';

export default function BottomTab() {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(() => true);
  const closeDrawer = () => setIsOpen(() => false);

  return (
    <div className={css.wrap}>
      <BottomInner openDrawer={openDrawer} />
      <BottomDrawer isOpen={isOpen} onClose={closeDrawer} />
    </div>
  );
}
