// the downside is that the API for getting permission recently changed from taking a callback to returning a Promise
const checkNotifyPromiseBrowserSupport = (): boolean => {
    try {
        Notification.requestPermission().then();
      } catch(e) {
        return false;
      }
      return true;
}

// get permission from user for push notification
export const getPermission = async() => {
    if (!('Notification' in window)) {
        return false;
    }

    let result = false;
    if (!checkNotifyPromiseBrowserSupport()) {
        await Notification.requestPermission((permission: NotificationPermission) => {
            result = permission === "granted";
            console.log({permission});
        })
        return result;
    }
    const permission: NotificationPermission = await Notification.requestPermission();
    console.log({permission});
    result = permission === "granted";
    return result;
}