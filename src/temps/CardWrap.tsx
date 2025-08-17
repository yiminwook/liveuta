import { isMobile } from 'react-device-detect';
import clsx from 'clsx';
import * as styles from '@/components/common/scheduleCard/card.css';
import { Variants, motion } from 'motion/react';

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (index: number) => ({
    opacity: 1,
    transition: {
      delay: index > 20 ? 0.01 : index * 0.05,
    },
  }),
};

interface ScheduleCardProps {
  index: number;
  className?: string;
  children: React.ReactNode;
}

export default function CardWrap({ index, className, children }: ScheduleCardProps) {
  // 모바일에서 깜빡거림이 있어서 모바일일 경우에는 framer-motion을 사용하지 않는다.
  if (isMobile) {
    return <div className={clsx('scheduleCard', styles.card, className)}>{children}</div>;
  } else {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={index}
        viewport={{
          once: true,
        }}
        className={clsx('scheduleCard', styles.card, className)}
      >
        {children}
      </motion.div>
    );
  }
}
