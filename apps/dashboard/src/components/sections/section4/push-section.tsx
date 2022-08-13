import { Button } from "@browser-notify-ui/components";
import React, { useRef } from "react";
import { BarLoader } from "react-spinners";

interface Props {
  onSubmit: () => Promise<void>;
  isPendingNotification: boolean;
}

export const PushSection: React.FC<Props> = ({
  onSubmit,
  isPendingNotification,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (ref.current != null && ref.current.scrollIntoView != null) {
      ref.current.scrollIntoView(true);
    }
    onSubmit();
  };
  return (
    <section className="my-4 mb-10">
      <h1 className="text-xl text-white font-bold text-center">4. Send!</h1>

      <div className="flex flex-row justify-center my-2">
        <Button className="mt-2 font-bold px-10 py-5" handleClick={handleClick}>
          Send
        </Button>
      </div>
      <div ref={ref}>
        {isPendingNotification && (
          <p className="text-white text-center text-xs">
            This might take a while ... ( ≈ 10 sec )
          </p>
        )}
        <BarLoader
          loading={isPendingNotification}
          width={200}
          className="mt-2 mb-4"
          color={"#FFFFFF"}
        />
      </div>
    </section>
  );
};
