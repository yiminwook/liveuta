'use client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { useState } from 'react';
import BottomDrawer from './BottomDrawer';
import BottomInner from './BottomInner';
import css from './BottomTab.module.scss';

type BottomTabProps = {
  locale: TLocaleCode;
};

export default function BottomTab({ locale }: BottomTabProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(() => true);
  const closeDrawer = () => setIsOpen(() => false);

  return (
    <div className={css.wrap}>
      <BottomInner openDrawer={openDrawer} locale={locale} />
      <BottomDrawer isOpen={isOpen} onClose={closeDrawer} locale={locale} />
    </div>
  );
}
