import { getPermissionState } from "@browser-notify-ui/service-workers";
import { useState, useEffect } from "react";

export const usePermission = (): [NotificationPermission,  (perm: NotificationPermission) => void] => {
    const [permission, setPermission] = useState<NotificationPermission>(getPermissionState());

    /**
       * React's virtual dom diffing only updates the actual dom based on changes in the virtual dom
       * The permission API affects the windows object, not the dom, and affects the actual tree, not the virtual tree.
       * Thus, useEffect(() => {}, [Notification.permission]) does not work
       * Workaround is to use setInterval and periodically poll for the permission status
     */
     let id = setInterval(() => {
      setPermission(getPermissionState());
    }, 1000);

      useEffect(() => {
        setPermission(getPermissionState());
        return () => clearInterval(id);
      }, []);

      // To avoid race conditions between setting the updated permission and the polling
      const setPerm = (perm: NotificationPermission) => {
        clearInterval(id);
        setPermission(perm);
        id = setInterval(() => {
          setPermission(getPermissionState());
        }, 1000);
      }

      return [permission, setPerm];
}