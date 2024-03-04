'use client';
import Motion from '@/model/framer';
import { Variants, useCycle } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  BrowserTypes,
  OsTypes,
  browserName,
  getUA,
  isIOS,
  isMobile,
  osName,
  osVersion,
} from 'react-device-detect';
import { RxPinTop } from 'react-icons/rx';
import ListItem from './ListItem';
import ToggleButton from './ToggleButton';
import * as styles from './floatButton.css';
import { RemoveScroll } from 'react-remove-scroll';
import Backdrop from '../Backdrop';

// nav height = 240px
// circle 0.5r = 26px
const floatVariants: Variants = {
  open: () => ({
    y: -60,
    clipPath: `circle(1000px at 214px calc(env(safe-area-inset-bottom) + 214px))`,
    transition: {
      duration: 0.2,
      type: 'spring',
      stiffness: 20,
    },
  }),
  closed: {
    y: 0,
    clipPath: `circle(0px at 214px calc(env(safe-area-inset-bottom) + 214px))`,
    transition: {
      duration: 0.15,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const floatListVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export default function FloatButton() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (load) return;
    // 디버깅용 디바이스정보
    setLoad(true);
    console.table({
      getUA,
      isMobile,
      isIOS,
      osName,
      OsTypes,
      osVersion,
      browserName,
      BrowserTypes,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toggleOpen(0);
  };

  return (
    <RemoveScroll enabled={isOpen} removeScrollBar={false}>
      {isOpen && <Backdrop onClick={() => toggleOpen(0)} />}
      <Motion.div
        className={styles.floatNav}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={floatVariants}
      >
        <Motion.div className={styles.floatNavInner}>
          <Motion.ul variants={floatListVariants} className={styles.floatList}>
            <ListItem index={0} />
            <ListItem index={1} />
            <ListItem index={2} />
          </Motion.ul>
        </Motion.div>
        <button className={styles.scrollUpButton} onClick={scrollUp}>
          <RxPinTop size="28px" color="inherit" />
        </button>
      </Motion.div>
      <ToggleButton isOpen={isOpen} onClick={() => toggleOpen()} />
    </RemoveScroll>
  );
}
