import { global } from '@/styles/globalTheme.css';
import { flexCenter } from '@/styles/var';
import { style } from '@vanilla-extract/css';

export const wrap = style([
  flexCenter,
  {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    width: '3rem',
    height: '3rem',
    backgroundColor: global.color.third.light,
    color: '#fff',
    borderRadius: '50%',
    fontSize: '2.5rem',
    border: '3px solid #fff',
  },
]);
