import { Button } from "@browser-notify-ui/components";
import React from "react";
import { BarLoader } from "react-spinners";

interface Props {
  onSubmit: () => Promise<void>;
  isPendingNotification: boolean;
}

export const PushSection: React.FC<Props> = ({
  onSubmit,
  isPendingNotification,
}) => {
  return (
    <section>
      <h1 className="text-xl text-white font-bold mt-10 text-center">
        4. Send!
      </h1>

      <div className="flex flex-row justify-center my-2">
        <Button className="mt-2 font-bold px-10 py-5" handleClick={onSubmit}>
          Send
        </Button>
      </div>
      <div>
        {isPendingNotification && (
          <p className="text-white text-center text-xs">
            This might take a while ...
          </p>
        )}
        <BarLoader
          loading={isPendingNotification}
          width={200}
          className="mt-2"
          color={"#FFFFFF"}
        />
      </div>
    </section>
  );
};
