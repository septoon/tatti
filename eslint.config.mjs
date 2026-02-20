import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  },
];

export default eslintConfig;
