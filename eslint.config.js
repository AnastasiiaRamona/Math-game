import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      quotes: ['error', 'single'],
      'prettier/prettier': 'error',
    },
  },
  pluginJs.configs.recommended,
];
