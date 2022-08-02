import {urlBase64ToUint8Array} from "./util";
import axios from "axios";

// create the subscription with a push service (chrome, firefox), 
// which will generate an endpoint associated with the browser's ip address,
// and return the endpoint to us
const createSubscription = async(vapidPublicKey: string, expirationTime = 60): Promise<PushSubscriptionJSON> => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("navigator does not have service worker");
    }

    const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;
    const subscription: PushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
    const json = subscription.toJSON();
    json.expirationTime = expirationTime;
    return json;
}

// save the user details and subscription to our database
const saveSubscription = async(url: string, companyName: string, userID: string, subscription: PushSubscriptionJSON): Promise<Record<string, string>> => {
    const result = await axios.post(url, {
        company: companyName,
        userID,
        ...subscription,
    });
    return result.data;
}

export const subscribe = async(companyName: string, userID: string): Promise<PushSubscriptionJSON> => {
    const vapidPublicKey = "BPlL5OTZwtW-0-4pQXmobTgX6URszc9-UKoTTvpvInhUlPHorlDM8y04J-rrErlQXMVH7_Us983mNmmwsb-z53U";
    const expirationTime = 60;
    const subscription: PushSubscriptionJSON = await createSubscription(vapidPublicKey, expirationTime);

    const url = "http://localhost:7071/api/subscriptions";
    const res = await saveSubscription(url, companyName, userID, subscription);
    console.log({"subscription save result": res});
    return subscription;
}