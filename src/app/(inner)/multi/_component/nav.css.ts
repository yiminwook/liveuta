import { global } from '@/style/globalTheme.css';
import { zIndex, flexCenter } from '@/style/var';
import { style } from '@vanilla-extract/css';

export const wrap = style([
  flexCenter,
  zIndex.float,
  {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    width: '3rem',
    height: '3rem',
    backgroundColor: global.color.third.light,
    color: '#fff',
    borderRadius: '50%',
    fontSize: '2.5rem',
    border: '3px solid #fff',
  },
]);

const button = style([{}]);
