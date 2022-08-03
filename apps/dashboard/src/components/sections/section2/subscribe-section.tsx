import { Button } from "@browser-notify-ui/components";
import React from "react";
import { CREDENTIAL } from "~/models/enums";

interface Props {
    handleSubscribe: () => Promise<void>;
}

export const SubscribeSection: React.FC<Props> = ({handleSubscribe}) => {
    let hasSubscribed: boolean = localStorage.getItem(CREDENTIAL.BROWSER_NOTIFY_UI_USERID) != null
        && localStorage.getItem(CREDENTIAL.BROWSER_NOTIFY_UI_COMPANY) != null;

    return <section className="flex flex-col items-center mt-10">
    <h1 className='text-xl text-white font-bold text-center'>2. Subscribe</h1>
    <Button className='mt-2' 
      handleClick={handleSubscribe}>
        {hasSubscribed ? "Subscribed ✔️" : "Subscribe"}          
    </Button>          
</section>   
}