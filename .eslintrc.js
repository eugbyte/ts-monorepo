module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'jest-dom', 'prettier', "testing-library"],
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: ['tsconfig.base.json', 'apps/*/tsconfig.json', 'libs/*/tsconfig.json'],
    },
    extends: [
      "plugin:prettier/recommended",
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      // 'plugin:@typescript-eslint/recommended-requiring-type-checking', // <-- too strict, commented out
      'prettier',
      'plugin:testing-library/react',
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
    ignorePatterns: [
      '.eslintrc.js', 
      'craco.config.js', 
      'reportWebVitals.ts', 
      'postcss.config.js', 
      'tailwind.config.js', 
      'serviceWorkerRegistration.ts', 
      'service-worker.ts',
      'jest.config.js',
      'build'
    ]
};
