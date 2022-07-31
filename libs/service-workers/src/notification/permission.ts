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
export const requestPermission = async(): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
        return 'denied';
    }

    let result: NotificationPermission = 'denied';
    if (!checkNotifyPromiseBrowserSupport()) {
        await Notification.requestPermission((permission: NotificationPermission) => {
            result = permission;
            console.log({permission});
        })
        return result;
    }
    result = await Notification.requestPermission();
    return result;
}

export const getPermissionState = (): NotificationPermission => {
    if (!('Notification' in window)) {
        return 'denied';
    }
    return Notification.permission

}
