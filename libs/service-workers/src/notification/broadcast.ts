import { BroadcastChannel } from "broadcast-channel";
export const broadcast =
  process.env.NODE_ENV === "test"
    ? new BroadcastChannel("BROSWER_NOTIFY_UI", {
        type: "native",
        webWorkerSupport: true,
      })
    : new window.BroadcastChannel("BROSWER_NOTIFY_UI");