export default [
	{
	  files: ['**/*.{js,jsx,ts,tsx}'],
	  languageOptions: {
			parserOptions: {
		  ecmaVersion: 2021, 
		  sourceType: 'module',
			},
	  },
	  rules: {
			'indent': ['error', 'tab'],
			'no-unused-vars': 'warn',
			'no-console': 'off',
			'no-debugger': 'warn',
			'semi': ['error', 'always'],
			'quotes': ['error', 'single'],
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