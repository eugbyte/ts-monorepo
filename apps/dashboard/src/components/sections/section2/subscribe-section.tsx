import { Button } from "@browser-notify-ui/components";
import React from "react";
import { CREDENTIAL } from "~/models/enums";

interface Props {
    handleSubscribe: () => Promise<void>;
}

export const SubscribeSection: React.FC<Props> = ({handleSubscribe}) => {
    const userID = localStorage.getItem(CREDENTIAL.BROWSER_NOTIFY_UI_USERID) || "";
    const company = localStorage.getItem(CREDENTIAL.BROWSER_NOTIFY_UI_COMPANY) || "";

    const hasSubscribed: boolean = userID.trim().length > 0 && company.trim().length > 0;

    return <section className="flex flex-col items-center mt-10">
    <h1 className='text-xl text-white font-bold text-center'>2. Subscribe</h1>
    <Button className='mt-2' 
      handleClick={handleSubscribe}>
        {hasSubscribed ? "Subscribed ✔️" : "Subscribe"}          
    </Button>          
</section>   
}