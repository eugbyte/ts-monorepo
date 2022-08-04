import { getPermissionState } from "@browser-notify-ui/service-workers";
import { useState, useEffect } from "react";

export const usePermission = (): [NotificationPermission,  (perm: NotificationPermission) => void] => {
    const [permission, setPermission] = useState<NotificationPermission>(getPermissionState());
    if (!("permissions" in navigator)) {
      console.error("permission not supported in navigator");
      return [permission, setPermission];
    }

    /**
       * React's virtual dom diffing only updates the actual dom based on changes in the virtual dom
       * The permission API affects the windows object, not the dom, and affects the actual tree, not the virtual tree.
       * Thus, useEffect(() => {}, [Notification.permission]) does not work
       * Workaround is to use setInterval and periodically poll for the permission status
    */
    const handlePermission = async() => {
      const permStatus: PermissionStatus = await navigator.permissions.query({ name: 'notifications' });
      const state: PermissionState =  permStatus.state;   
      // PermissionState != NotificationPermission
      if (state === "prompt") {
        setPermission("default");
      } else {
        setPermission(state);
      }
    };

    const addObserver = async() => {
      const permStatus: PermissionStatus = await navigator.permissions.query({ name: 'notifications' });
      permStatus.addEventListener("change", handlePermission);
    }
    const removeObserver = async() => {
      const permStatus: PermissionStatus = await navigator.permissions.query({ name: 'notifications' });
      permStatus.removeEventListener("change", handlePermission)
    }

    useEffect(() => {
      addObserver();
      return () => {
        removeObserver();
      }
    }, []);


    return [permission, setPermission];
}