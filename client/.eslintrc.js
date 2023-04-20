module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard-with-typescript', 'react-app/jest', 'plugin:jest-dom/recommended'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
    },
    plugins: ['react', 'jest-dom'],
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/indent': 'off',
        'multiline-ternary': 'off'
    }
}
