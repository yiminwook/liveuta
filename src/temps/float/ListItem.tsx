import { Variants, motion } from 'motion/react';

const variants: Variants = {
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

export default function ListItem({ index }: { index: number }) {
  const style = { border: `2px solid ${colors[index]}` };
  return (
    <motion.li
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
    </motion.li>
  );
}
