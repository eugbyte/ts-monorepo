import { getPermissionState } from "@eugbyte-monorepo/service-workers";
import { useState, useEffect } from "react";

/**
 * Detects the permission state of the user
 * React's virtual dom diffing only updates the actual dom based on changes in the virtual dom
 * The permission API affects the windows object, not the dom, and affects the actual tree, not the virtual tree.
 * Thus, useEffect(() => {}, [Notification.permission]) does not work
 * Workaround is to use setInterval and periodically poll for the permission status
 */
export const usePermission = (): [
  NotificationPermission,
  (perm: NotificationPermission) => void
] => {
  const [permission, setPermission] = useState<NotificationPermission>(
    getPermissionState()
  );

  const onChange = () => {
    const status: NotificationPermission = getPermissionState();
    setPermission(status);
  };

  if (navigator.permissions == null || navigator.permissions.query == null) {
    return [permission, setPermission];
  }

  const addObserver = async () => {
    const permStatus: PermissionStatus = await navigator.permissions.query({
      name: "notifications",
    });
    permStatus.addEventListener("change", onChange);
  };
  const removeObserver = async () => {
    const permStatus: PermissionStatus = await navigator.permissions.query({
      name: "notifications",
    });
    permStatus.removeEventListener("change", onChange);
  };

  useEffect(() => {
    addObserver();
    return () => void removeObserver();
  }, []);

  return [permission, setPermission];
};
