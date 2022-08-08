import { BroadcastChannel as PolyFilledBroadcastChannel } from "broadcast-channel";

const broadcastName = "BROSWER_NOTIFY_UI";

// for some reason, if an if else statement is used,
// e.g. window.BroadcastChannel != null ? new BroadcastChannel(broadcastName) : new PolyFilledBroadcastChannel(broadcastName)
// the service worker scripter evaluation fails
let broadcast: BroadcastChannel;
try {
  broadcast = new BroadcastChannel(broadcastName);
} catch (err) {
  broadcast = new PolyFilledBroadcastChannel(broadcastName) as any;
}

export { broadcast };
