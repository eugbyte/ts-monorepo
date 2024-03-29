import * as notifyLib from "./notification";

// redeclare to prevent jest sypOn bug on index files (https://stackoverflow.com/a/53307822/6514532)
export const {
  subscribe,
  createSubscription,
  handlePush,
  register,
  requestPermission,
  getPermissionState,
  broadcast,
} = notifyLib;
