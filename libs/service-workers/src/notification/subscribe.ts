import { urlBase64ToUint8Array } from "./util";
import axios, { AxiosRequestConfig } from "axios";

// create the subscription with a push service (chrome, firefox),
// which will generate an endpoint associated with the browser's ip address,
// and return the endpoint to us
export const createSubscription = async (
  vapidPublicKey: string,
  expirationTime = 60
): Promise<PushSubscriptionJSON> => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("navigator does not have service worker");
  }

  const registration: ServiceWorkerRegistration = await navigator.serviceWorker
    .ready;
  const subscription: PushSubscription =
    await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
  const json = subscription.toJSON();
  json.expirationTime = expirationTime;
  return json;
};

// save the user details and subscription to our database
const saveSubscription = async (
  companyName: string,
  userID: string,
  subscriberUrl: string,
  apiKey: string,
  subscription: PushSubscriptionJSON
): Promise<Record<string, string>> => {
  const requestConfig: AxiosRequestConfig = {
    headers: {
      "x-functions-key": apiKey,
    },
  };
  const result = await axios.post(
    subscriberUrl,
    {
      company: companyName,
      userID,
      ...subscription,
    },
    requestConfig
  );
  return result.data;
};

/**
 *
 * @param companyName Name of your company
 * @param userID Identity of the user to push the web notification to
 * @param subscribeUrl Optional, defaults to web notify's production url
 * @param apiKey The api key for web notify's production url. Defaults to the demo
 * @returns
 */
export const subscribe = async (
  companyName: string,
  userID: string,
  subscribeUrl = "https://func-webnotify-stg-ea.azurewebsites.net/api/subscriptions", // TO DO - change to stg url
  apiKey = "i5An4NBTQ53Po43aj5lc_y3JYu3ZIDYtiZyo5ylS5agKAzFuAVlbIA=="
): Promise<PushSubscriptionJSON> => {
  const vapidPublicKey =
    "BPlL5OTZwtW-0-4pQXmobTgX6URszc9-UKoTTvpvInhUlPHorlDM8y04J-rrErlQXMVH7_Us983mNmmwsb-z53U"; // TO DO - change to process.env.VAPID_PUBLIC_KEY depending on stg
  const expirationTime = 60;
  const subscription: PushSubscriptionJSON = await createSubscription(
    vapidPublicKey,
    expirationTime
  );

  const res = await saveSubscription(
    companyName,
    userID,
    subscribeUrl,
    apiKey,
    subscription
  );
  console.log({ "subscription save result": res });
  return subscription;
};
