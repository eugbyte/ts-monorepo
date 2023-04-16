# TS monorepo
Monorepo in Typescript, using npm workspaces

## `apps` vs `libs`
`libs` are meant to be published to npm and installed, `apps` are meant to be executed.

--- 

## List of Apps
| Apps                                                                  | Description                                                                                                                                        |
| :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| [web-notification-SaaS-dashboard](apps/webnotify-dashboard/README.md) | UI to showcase Web Notification SaaS. Web Notification SaaS allows you to easily send web push notifications to users with just a single API call. |
| [react-ts-webpack-starter](apps/react-ts-webpack-starter/README.md)   | React starter template with manually configured webpack, without Create React App                                                                  |

## List of Libs
| Libraries                                          | Description                                        |
| :------------------------------------------------- | :------------------------------------------------- |
| [web-notification](libs/service-workers/README.md) | Service worker functions for web push notification |
|                                                    |                                                    |


---

## Development Guide
- Execute commands specific to a workspace with the `--workspace` flag option, [see here](https://docs.npmjs.com/cli/v7/using-npm/workspaces#running-commands-in-the-context-of-workspaces)
```
npm --workspace=@eugbyte-monorepo/webnotify-dashboard run test
```
- npm workspace is only available from npm -v > @16. Enforce the version via the `engine` field of `package.json`
- Refer to [this guide](https://github.com/NiGhTTraX/ts-monorepo#integrations) for resolving path resolutions outside a workspace root directory.
    * For CRA, need to [configure babel loader to recognise such paths](https://frontend-digest.com/using-create-react-app-in-a-monorepo-a4e6f25be7aa)
- Remember to do `npm i` to symlink the workspaces each time you create a new workspace.
- In order for the monorepo linting to work, need to have a `.eslintrc.js` file in each workspace, that `extends` the base `.eslintrc.js`. 
```
module.exports = {
    extends: ["../../.eslintrc.js"],
    ignorePatterns: [
        "service-worker.js"
    ]
};
```
- To share the tailwind theme config, load the `presets` with the base config like so
```
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // for tailwind to work in the workspace
    "../../libs/components/**/*.{jsx,tsx}"  // for tailwind to work for directories outside the workspace root dir
  ],
  presets: [require("../../tailwind.base.config.js")]   // inherit the base tailwind config
}
```
- For the respective repo CI to run only when the corresponding repo's files change, use Github's Action [`paths field`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onpushpull_requestpull_request_targetpathspaths-ignore) to configure a workflow to run based on what file paths are changed
