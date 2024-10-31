import { style } from '@vanilla-extract/css';

export const inner = style({
  padding: '0.5rem',
  color: '#000',
});

export const formHeader = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  marginTop: '0.5rem',
  marginBottom: '1rem',
});

export const headerPlaceholder = style({
  width: '1.8rem',
});

export const utaToolsLink = style({
  color: '#5DADEC',
  fontWeight: 500,
  fontSize: '1.25rem',
});

export const backLink = style({
  display: 'inline-flex',
  alignItems: 'center',
});

export const formBox = style({
  maxWidth: '50rem',
  minHeight: '40rem',
  padding: '1rem 2rem',
  margin: '0 auto',
  borderRadius: '0.5rem',
  backgroundColor: '#fff',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05), inset 0 0 0 1px rgb(0 0 0 / 0.1)',
});

export const desc = style({
  margin: '0 auto',
  fontSize: '1.2rem',
  lineHeight: '1.5rem',
});

export const descTitle = style({
  fontSize: '1.5rem',
  fontWeight: 500,
  textAlign: 'center',
});
