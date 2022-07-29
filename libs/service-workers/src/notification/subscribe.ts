import {urlBase64ToUint8Array} from "./util";
import axios from "axios";

const fetchPublicKey = async (): Promise<string> => {
    // TO DO
    // api  to backend 
    return "BPlL5OTZwtW-0-4pQXmobTgX6URszc9-UKoTTvpvInhUlPHorlDM8y04J-rrErlQXMVH7_Us983mNmmwsb-z53U";
}

const _subscribe = async(companyName: string, userID: string, vapidPublicKey: string): Promise<Record<string, string>> => {
    const url = "http://localhost:7071/api/subscriptions";

    if (!('serviceWorker' in navigator)) {
        throw new Error("navigator does not have service worker");
    }

    const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;
    console.log({vapidPublicKey});
    const subscription: PushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    });
    console.log({subscription});

    const json = subscription.toJSON();
    json.expirationTime = 60;
    console.log(json);

    const result = await axios.post(url, {
        company: companyName,
        userID,
        ...json,
    });

    return result.data
}

export const subscribe = async(companyName: string, userID: string): Promise<Record<string, string>> => {
    const vapidPublicKey = await fetchPublicKey();
    return _subscribe(companyName, userID, vapidPublicKey);
}