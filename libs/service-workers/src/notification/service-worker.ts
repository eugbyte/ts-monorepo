// self refers to the the worker itself
declare const self: ServiceWorkerGlobalScope;

export const handlePush = (event: PushEvent) => {
  if (event == null || event.data == null) {
    return;
  }
  const data = event.data.json();
  const displayPromise: Promise<void> = self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
  });
  const promiseChain = Promise.all([displayPromise]);
  event.waitUntil(promiseChain);
}
