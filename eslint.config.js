import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		ignores: ['dist', 'node_modules'],

		plugins: {
			prettier: prettierPlugin,
		},

		languageOptions: {
			parserOptions: {
				ecmaVersion: 2021,
				sourceType: 'module',
			},
		},

		rules: {
			...eslintConfigPrettier.rules,
			indent: ['error', 'tab'],
			'no-unused-vars': 'warn',
			'no-console': 'off',
			'no-debugger': 'warn',
			semi: ['error', 'always'],
			quotes: ['error', 'single'],
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
