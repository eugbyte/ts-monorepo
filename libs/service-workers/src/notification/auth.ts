const vapidKey = process.env.VAPID_PUBLIC_KEY || "";

// Copied from the https://gist.github.com/Klerith/80abd742d726dd587f4bd5d6a0ab26b6
const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

export const generateVapidPublicKey = () => urlBase64ToUint8Array(vapidKey);
