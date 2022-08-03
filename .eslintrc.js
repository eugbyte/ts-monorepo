module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: ['tsconfig.base.json', 'apps/*/tsconfig.json', 'libs/*/tsconfig.json'],
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'prettier',
    ],
    rules: {
    },
    ignorePatterns: ['.eslintrc.js', 'craco.config.js', 'reportWebVitals.ts', 'postcss.config.js', 'tailwind.config.js', 'serviceWorkerRegistration.ts', 'service-worker.ts']
};
