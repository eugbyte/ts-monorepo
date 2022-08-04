// self refers to the the worker itself
declare const self: ServiceWorkerGlobalScope;

interface Notification {
  title: string;
  body: string;
  icon: string;
}

export const handlePush = (event: PushEvent, onComplete = () => {}) => {
  if (event == null || event.data == null) {
    return;
  }
  const data: Notification = event.data.json();
  const displayPromise: Promise<void> = self.registration.showNotification(data.title, {
    body: data.body,
  });
  const promiseChain = Promise.all([displayPromise, onComplete()]);
  event.waitUntil(promiseChain);
}
