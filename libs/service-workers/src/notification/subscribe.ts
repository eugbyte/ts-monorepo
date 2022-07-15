import {generateVapidPublicKey} from "./auth";
import axios, { AxiosResponse } from "axios";

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

export const subscribe = async(message: string): Promise<AxiosResponse<any, any>> => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("navigator does not have service worker");
    }

    const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;
    const subscription: PushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: generateVapidPublicKey()
    });

    const json = subscription.toJSON();

    return axios.post('http://localhost:7071/api/notify', {
        message,
        ...json,
        expiration_time: json.expirationTime,
    });
}
