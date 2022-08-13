# TS monorepo
Monorepo in Typescript

## `apps` vs `libs`
`libs` are meant to be published to npm and installed, `apps` are meant to be executed.

## Gotchas
1. Refer to [this guide](https://github.com/NiGhTTraX/ts-monorepo#integrations) for resolving path resolutions w.r.t CRA, webpack etc.
1. For CRA, to import JSX and TSX from paths outside a workspace root directory, need to [configure babel loader to recognise such paths](https://frontend-digest.com/using-create-react-app-in-a-monorepo-a4e6f25be7aa)
2. Remember to do `npm i` to symlink the workspaces each time you create a new workspace.
3. In order for the monorepo linting to work, need to have a child `.eslintrc.js` file in each workspace, that `extends` the base `.eslintrc.js`. This is so even though the [official docs did not specify such a requirement](https://typescript-eslint.io/docs/linting/monorepo)
4. If importing a workspace, remember to [update the `package.json` of the importing workspace](https://www.robinwieruch.de/javascript-monorepos/) with the imported workspace package name.
5. Execute commands specific to a workspace with the --workspace flag option, [see here](https://docs.npmjs.com/cli/v7/using-npm/workspaces#running-commands-in-the-context-of-workspaces)
6. To share the tailwind theme config, under `tailwind.config.js` -> `theme`, export a theme object under the `libs/utils` package
