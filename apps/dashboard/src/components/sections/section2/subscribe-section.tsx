import { Button } from "@browser-notify-ui/components";
import React from "react";
import { BarLoader } from "react-spinners";
import { QUERY_STATUS } from "~/models/enums";

interface Props {
  isSubscribed: boolean;
  handleSubscribe: () => Promise<void>;
  subscriptionQueryStatus: QUERY_STATUS;
}

export const SubscribeSection: React.FC<Props> = ({
  handleSubscribe,
  isSubscribed,
  subscriptionQueryStatus: subQueryStatus,
}) => {
  return (
    <section className="flex flex-col items-center mt-10">
      <h1 className="text-xl text-white font-bold text-center">2. Subscribe</h1>
      <Button className="mt-2" handleClick={handleSubscribe}>
        {isSubscribed ? "Subscribed ✔️" : "Subscribe"}
      </Button>
      <BarLoader
        loading={subQueryStatus === QUERY_STATUS.LOADING}
        width={200}
        className="mt-2"
        color={"#FFFFFF"}
      />
    </section>
  );
};
