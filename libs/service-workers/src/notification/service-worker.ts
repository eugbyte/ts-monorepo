// self refers to the the worker itself
declare const self: ServiceWorkerGlobalScope;

export const handlePush = (event: PushEvent) => {
  console.log("in handle push...")
  console.log({event});
  if (event == null || event.data == null) {
    return;
  }
  const data = event.data.text();
  const displayPromise: Promise<void> = self.registration.showNotification("Hi", {
    body: data,
  });
  const promiseChain = Promise.all([displayPromise]);
  event.waitUntil(promiseChain);
}
