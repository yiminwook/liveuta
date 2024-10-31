import { global } from '@/styles/globalTheme.css';
import { leftIn } from '@/styles/keyframe.css';
import { BEZIER_CURVE } from '@/styles/var';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  position: 'relative',
  fontSize: '1.1rem',
  lineHeight: 1.5,
  paddingTop: '2rem',
  color: global.color.text.default,
});

export const inner = style({
  marginTop: '1rem',
});

export const editButton = style({
  position: 'absolute',
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
});
