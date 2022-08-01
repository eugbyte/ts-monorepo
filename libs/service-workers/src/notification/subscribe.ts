import {urlBase64ToUint8Array} from "./util";
import axios from "axios";

const fetchPublicKey = async (): Promise<string> => {
    // TO DO
    // api  to backend 
    return "BPlL5OTZwtW-0-4pQXmobTgX6URszc9-UKoTTvpvInhUlPHorlDM8y04J-rrErlQXMVH7_Us983mNmmwsb-z53U";
}

const _subscribe = async(companyName: string, userID: string, vapidPublicKey: string): Promise<PushSubscriptionJSON> => {
    const url = "http://localhost:7071/api/subscriptions";

    if (!('serviceWorker' in navigator)) {
        throw new Error("navigator does not have service worker");
    }

    const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;
    const subscription: PushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    });

    const json: PushSubscriptionJSON = subscription.toJSON();
    json.expirationTime = 60;

    const result = await axios.post(url, {
        company: companyName,
        userID,
        ...json,
    });
    console.log(result.data);

    return json
}

export const subscribe = async(companyName: string, userID: string): Promise<PushSubscriptionJSON> => {
    const vapidPublicKey = await fetchPublicKey();
    return _subscribe(companyName, userID, vapidPublicKey);
}