'use client';
import cx from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TfiArrowCircleUp } from 'react-icons/tfi';
import * as styles from './floatButton.css';
import Motion from '@/model/framer';
import { useCycle } from 'framer-motion';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

export default function FloatButton() {
  const [isTop, setIsTop] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current === null) return;
    dimensions.current.width = containerRef.current.offsetWidth;
    dimensions.current.height = containerRef.current.offsetHeight;
  }, []);

  // const scrollHandler = useMemo(() => {
  //   let timer: NodeJS.Timeout | null;
  //   return () => {
  //     if (timer) return;
  //     timer = setTimeout(() => {
  //       timer = null;
  //       setIsTop(() => (window.scrollY > 0 ? false : true));
  //     }, 300);
  //   };
  // }, []);

  // const scrollUp = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', scrollHandler);
  //   return () => {
  //     window.removeEventListener('scroll', scrollHandler);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '300px',
      }}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={dimensions.current.height}
      ref={containerRef}
    >
      <Motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '300px',
          background: '#fff',
        }}
        variants={sidebar}
      />
      <Motion.ul
        variants={{
          open: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
          },
          closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
          },
        }}
        style={{ padding: '25px', position: 'absolute', top: '100px', width: '230px' }}
      >
        {new Array(5).map((_, index) => (
          <Item key={`item_${index}`} index={index} />
        ))}
      </Motion.ul>
      <button
        className={cx(styles.button, 'right', 'hover', isTop && 'hide')}
        onClick={() => toggleOpen()}
      >
        <TfiArrowCircleUp size="3rem" color="inherit" />
      </button>
    </Motion.div>
  );
}

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF'];

function Item({ index }: { index: number }) {
  const style = { border: `2px solid ${colors[index]}` };
  return (
    <Motion.li
      variants={variants}
      style={{
        listStyle: 'none',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      list {index + 1}
      <div className="icon-placeholder" style={style} />
      <div className="text-placeholder" style={style} />
    </Motion.li>
  );
}
