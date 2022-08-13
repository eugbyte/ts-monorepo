export const handleBroadcast = (
  setPendingNotify: (arg: boolean) => void,
  event: MessageEvent<any>
) => {
  if (event.data != null) {
    const data = event.data as Record<string, string>;
    if (data["type"] === "BROSWER_NOTIFY_UI") {
      console.log(
        `message detected: ${new Date().getSeconds()}.${new Date().getMilliseconds()}s`
      );
      setPendingNotify(false);
    }
  }
};
