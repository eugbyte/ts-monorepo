# browser-notify/ui

Front-end monorepo in Typescript, with `npm workspaces`

## Gotchas
1. To import JSX and TSX from paths outside a workspace root directory, need to [configure babel loader to recognise such paths](https://frontend-digest.com/using-create-react-app-in-a-monorepo-a4e6f25be7aa)
2. Remember to do `npm i` to symlink the workspaces each time you create a new workspace.
3. In order for the monorepo linting to work, need to have a child `.eslintrc.js` file in each workspace, that `extends` the base `.eslintrc.js`. This is so even though the [official docs did not specify such a requirement](https://typescript-eslint.io/docs/linting/monorepo)
4. If importing a workspace, remember to [update the `package.json` of the importing workspace](https://www.robinwieruch.de/javascript-monorepos/) with the imported workspace package name.
