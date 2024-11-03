import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		ignores: ['dist', 'node_modules'],

		plugins: {
			'@typescript-eslint': typescriptEslintPlugin,
			prettier: prettierPlugin,
		},

		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 2021,
				sourceType: 'module',
			},
		},

		rules: {
			...eslintConfigPrettier.rules,
			indent: ['error', 'tab'],
			'no-console': 'off',
			'no-debugger': 'warn',
			semi: ['error', 'always'],
			quotes: ['error', 'single'],
			'@typescript-eslint/no-unused-vars': 'warn',
			'prettier/prettier': 'error',
		},

		settings: {
			'import/resolver': {
				webpack: {
					config: 'webpack.config.dev.js',
				},
			},
		},
	},
];
