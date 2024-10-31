import { globalStyle, style } from "@vanilla-extract/css"

export const categories = style({

})

export const categoryTabs = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '4rem',
  fontSize: '1.25rem',
})

export const categoryTab = style({
  padding: '0.8rem 0.4rem',
  selectors: {
    '&[data-selected="true"]': {
      fontWeight: 700,
      position: 'relative',
      zIndex: 500,
    },
    '&[data-selected="true"]:after': {
      content: '""',
      width: '80%',
      height: '25%',
      display: 'inline-block',
      backgroundColor: '#D9FCDBaa',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: '30%',
      zIndex: -1,
    }
  }
})

export const foldButton = style({
  position: 'absolute',
  top: '50%',
  right: 0,
  marginRight: '2rem',
})

globalStyle(`${foldButton} > svg`, {
  transition: 'transform 0.15s cubic-bezier(0.87, 0, 0.13, 1)',
  width: '1.5rem',
  height: '1.5rem',
})

globalStyle(`${foldButton}[data-fold="true"] > svg`, {
  transform: 'rotate(180deg)',
})

export const categoryContainer = style({
  selectors: {
    '&[data-fold="true"]': {
      display: 'none',
    }
  }
})