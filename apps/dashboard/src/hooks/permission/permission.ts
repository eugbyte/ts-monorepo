import { getPermissionState } from "@browser-notify-ui/service-workers";
import { useState, useEffect } from "react";

export const usePermission = (): [NotificationPermission,  (perm: NotificationPermission) => void] => {
    const [permission, setPermission] = useState<NotificationPermission>(getPermissionState());
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

    /**
       * React's virtual dom diffing only updates the actual dom based on changes in the virtual dom
       * The permission API affects the windows object, not the dom, and affects the actual tree, not the virtual tree.
       * Thus, useEffect(() => {}, [Notification.permission]) does not work
       * Workaround is to use setInterval and periodically poll for the permission status
     */
      useEffect(() => {
        const id = setInterval(() => {
          navigator.permissions.query
          setPermission(getPermissionState());
        }, 1000);
        setIntervalId(id);
        setPermission(getPermissionState());
        // clean up the interval
        return () => clearInterval(intervalId);
      }, []);


      // To avoid race conditions between setting the updated permission and the polling
      const setPermSafely = (perm: NotificationPermission) => {
        clearInterval(intervalId);
        setPermission(perm);
        const id = setInterval(() => {
          setPermission(getPermissionState());
        }, 1000);
        setIntervalId(intervalId);
      }

      return [permission, setPermSafely];
}