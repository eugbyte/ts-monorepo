import { BroadcastChannel as PolyFilledBroadcastChannel } from "broadcast-channel";

let broadcast: BroadcastChannel;
if ("BroadcastChannel" in window) {
  broadcast = new BroadcastChannel("BROSWER_NOTIFY_UI");
} else {
  broadcast = new PolyFilledBroadcastChannel("BROSWER_NOTIFY_UI", {
    type: "native",
    webWorkerSupport: true,
  }) as any;
}

export { broadcast };
