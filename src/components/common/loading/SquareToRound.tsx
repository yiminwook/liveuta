'use client';
import { motion } from 'framer-motion';
interface SquareToRoundProps {
  className?: string;
  children?: React.ReactNode;
}

export default function SquareToRound({ className, children }: SquareToRoundProps) {
  return (
    <motion.div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      animate={{
        scale: [1, 1.5, 1.5, 1, 1],
        rotate: [90, 90, 270, 225, 90],
        borderRadius: ['20%', '20%', '50%', '50%', '20%'],
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
    >
      {children}
    </motion.div>
  );
}
