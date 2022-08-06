import { BroadcastChannel as PolyFilledBroadcastChannel } from "broadcast-channel";

let broadcast: BroadcastChannel; 
if ("BroadcastChannel" in window) {
  console.log("browser supports BroadcastChannel");
  broadcast = new BroadcastChannel("BROSWER_NOTIFY_UI");
} else {
  broadcast = new PolyFilledBroadcastChannel("BROSWER_NOTIFY_UI", {
    webWorkerSupport: true,
  }) as any;
}

export { broadcast };
