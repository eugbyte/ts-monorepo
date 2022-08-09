import * as notifyLib from "./notification";
export type { MessageInfo } from "./notification";

// redeclare to prevent jest sypOn bug on index files (https://stackoverflow.com/a/53307822/6514532)
export const {
  subscribe,
  createSubscription,
  SUBSCIRBE_URL,
  handlePush,
  register,
  requestPermission,
  getPermissionState,
  pushMessage,
  broadcast,
} = notifyLib;
