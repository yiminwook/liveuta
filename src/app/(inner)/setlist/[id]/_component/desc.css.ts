import { BEZIER_CURVE } from '@/style/var';
import { keyframes, style } from '@vanilla-extract/css';

const leftIn = keyframes({
  from: {
    transform: 'translateX(0)',
  },
  to: {
    transform: 'translateX(-100%)',
  },
});

export const wrap = style({
  position: 'relative',
  fontSize: '1.1rem',
  lineHeight: 1.5,
  paddingTop: '2rem',
});

export const inner = style({
  marginTop: '1rem',
});

export const editButton = style({
  position: 'absolute',
  boxSizing: 'border-box',
  borderRadius: 5,
  padding: '0.25rem 0.5rem',
  fontSize: '1.25rem',
  backgroundColor: 'orange',
  fontWeight: 500,
  color: '#fff',
  transition: `all 0.3s ${BEZIER_CURVE}`,
  top: 0,
  right: 0,
  ':hover': {
    backgroundColor: '#ffae00d2',
  },
});

export const cancelButton = style([
  editButton,
  {
    right: '0.5rem',
    transform: 'translateX(-100%)',
    animation: `${leftIn} 0.3s ${BEZIER_CURVE}`,
    backgroundColor: '#ff5B00',
    ':hover': {
      backgroundColor: '#e34234',
    },
  },
]);

export const textarea = style({
  width: '100%',
  fontSize: '1.1rem',
});
