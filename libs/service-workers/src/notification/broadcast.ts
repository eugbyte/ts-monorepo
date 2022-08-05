import { BroadcastChannel } from "broadcast-channel";
export const broadcast =
  process.env.NODE_ENV === "test"
    ? new BroadcastChannel("BROSWER_NOTIFY_UI")
    : new window.BroadcastChannel("BROSWER_NOTIFY_UI");
