# TS monorepo
Monorepo in Typescript

## `apps` vs `libs`
`libs` are meant to be published to npm and installed, `apps` are meant to be executed.

--- 

## List of projects
| Service            | Description                                                                                                                        |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------|
| web-push-dashboard | ui to showcase Web Push SaaS. Web Push SaaS allows you to easily send web push notifications to users with just a single API call. |
|                    |                                                                                                                                    |

---

## Development Gotchas
1. Refer to [this guide](https://github.com/NiGhTTraX/ts-monorepo#integrations) for resolving path resolutions w.r.t CRA, webpack etc.
2. For CRA, to import JSX and TSX from paths outside a workspace root directory, need to [configure babel loader to recognise such paths](https://frontend-digest.com/using-create-react-app-in-a-monorepo-a4e6f25be7aa)
3. Remember to do `npm i` to symlink the workspaces each time you create a new workspace.
4. In order for the monorepo linting to work, need to have a child `.eslintrc.js` file in each workspace, that `extends` the base `.eslintrc.js`. This is so even though the [official docs did not specify such a requirement](https://typescript-eslint.io/docs/linting/monorepo)
5. If importing a workspace, remember to [update the `package.json` of the importing workspace](https://www.robinwieruch.de/javascript-monorepos/) with the imported workspace package name.
6. Execute commands specific to a workspace with the --workspace flag option, [see here](https://docs.npmjs.com/cli/v7/using-npm/workspaces#running-commands-in-the-context-of-workspaces)
7. To share the tailwind theme config, under `tailwind.config.js` -> `theme`, export a theme object under the `libs/utils` package
