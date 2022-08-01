import { getPermissionState } from "@browser-notify-ui/service-workers";
import { useState, useEffect } from "react";

export const usePermission = () => {
    const [permission, setPermission] = useState<NotificationPermission>(getPermissionState());

    /**
       * React's virtual dom diffing only updates the actual dom based on changes in the virtual dom
       * The permission API affects the windows object, not the dom, and affects the actual tree, not the virtual tree.
       * Thus, useEffect(() => {}, [Notification.permission]) does not work
       * Workaround is to use setInterval and periodically poll for the permission status
     */
      useEffect(() => {
        const id = setInterval(() => {
          setPermission(getPermissionState());
        }, 2000);
        setPermission(getPermissionState());
        return () => clearInterval(id);
      }, []);

      return [permission, setPermission];
}