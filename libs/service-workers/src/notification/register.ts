// swURI refers to the file path of the service worker file in the production build
export const register = async (
  swURI: string
): Promise<ServiceWorkerRegistration> => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("navigator does not have service worker");
  }
  if (!("PushManager" in window)) {
    // Push isn't supported on this browser, disable or hide UI.
    throw new Error("window does not have PushManager");
  }

  // note it is .js instead of .ts as the .ts files will be compiled to .js files during build
  return navigator.serviceWorker.register(swURI, {
    scope: "/",
  });
};
