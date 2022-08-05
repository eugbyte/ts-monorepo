import { Button } from "@browser-notify-ui/components";
import React from "react";
import { useLocalStorage } from "~/hooks/local-storage";
import { CREDENTIAL } from "~/models/enums";

interface Props {
  handleSubscribe: () => Promise<void>;
}

export const SubscribeSection: React.FC<Props> = ({ handleSubscribe }) => {
  const [_isSubscribed] = useLocalStorage(
    CREDENTIAL.BROWSER_NOTIFY_UI_SUBSCRIBED
  );
  const isSubscribed: boolean = _isSubscribed === "true";

  return (
    <section className="flex flex-col items-center mt-10">
      <h1 className="text-xl text-white font-bold text-center">2. Subscribe</h1>
      <Button className="mt-2" handleClick={handleSubscribe}>
        {isSubscribed ? "Subscribed ✔️" : "Subscribe"}
      </Button>
    </section>
  );
};
