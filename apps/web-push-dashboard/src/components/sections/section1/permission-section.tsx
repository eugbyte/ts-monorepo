import { Button } from "@eugbyte-monorepo/components";
import React from "react";
import { Instruction } from "./instruction";

interface Props {
  permission: NotificationPermission;
  handlePermission: () => Promise<void>;
}

export const PermissionSection: React.FC<Props> = ({
  permission,
  handlePermission,
}) => {
  const buttonTextDict: Record<NotificationPermission, string> = {
    granted: "Granted ✔️",
    default: "Allow",
    denied: "Blocked ❌",
  };

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-xl text-white font-bold text-center">
        1. Grant permission
      </h1>
      <p className="text-white text-sm">
        Customer grants permission to receive notification
      </p>
      <Button className="mt-2" handleClick={handlePermission}>
        {buttonTextDict[permission]}
      </Button>
      {permission === "denied" && <Instruction />}
    </section>
  );
};
