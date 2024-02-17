import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from './sprinkles.css';

// 특정상황에 따라 템플릿을 만들고 스타일을 사용하고 싶을때 사용
// https://vanilla-extract.style/documentation/packages/recipes

export const button = recipe({
  base: [sprinkles({ color: 'blue-50' })],

  variants: {
    color: {
      neutral: sprinkles({ color: 'blue-100' }),
      brand: sprinkles({ color: 'blue-200' }),
      accent: sprinkles({ color: 'gray-900' }),
    },
    size: {
      small: sprinkles({ padding: 'small' }),
      medium: sprinkles({ padding: 'medium' }),
      large: sprinkles({ padding: 'large' }),
    },
  },

  defaultVariants: {
    color: 'brand',
    size: 'medium',
  },
});
