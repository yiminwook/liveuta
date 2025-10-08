import { FlatCompat } from '@eslint/eslintrc';
import biome from 'eslint-config-biome';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  {
    ignores: ['src/temps/*', 'src/temps/', 'src/components/common/featured/*'],
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react/jsx-no-undef': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  }),
  biome,
];

export default eslintConfig;
