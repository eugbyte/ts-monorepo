import { getPermissionState } from "@browser-notify-ui/service-workers";
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
  if (!("permissions" in navigator)) {
    console.warn("permission not supported in navigator");
    return [permission, setPermission];
  }

  const handleSetPermission = async () => {
    const permStatus: PermissionStatus = await navigator.permissions.query({
      name: "notifications",
    });
    const state: PermissionState = permStatus.state;
    // PermissionState != NotificationPermission, although they have overlapping states of "denied" and "granted"
    if (state === "prompt") {
      setPermission("default");
    } else {
      setPermission(state);
    }
  };

  const addObserver = async () => {
    const permStatus: PermissionStatus = await navigator.permissions.query({
      name: "notifications",
    });
    permStatus.addEventListener("change", handleSetPermission);
  };
  const removeObserver = async () => {
    const permStatus: PermissionStatus = await navigator.permissions.query({
      name: "notifications",
    });
    permStatus.removeEventListener("change", handleSetPermission);
  };

  useEffect(() => {
    addObserver();
    return () => void removeObserver();
  }, []);

  return [permission, setPermission];
};
