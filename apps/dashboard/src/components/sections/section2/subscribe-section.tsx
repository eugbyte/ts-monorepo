import { Button } from "@browser-notify-ui/components";
import React, { useEffect, useState } from "react";
import { CREDENTIAL } from "~/models/enums";

interface Props {
    handleSubscribe: () => Promise<void>;
}

export const SubscribeSection: React.FC<Props> = ({handleSubscribe}) => {
    const [hasSubscribed, setHasSubscribed] = useState<boolean>(localStorage.getItem(CREDENTIAL.BROWSER_NOTIFY_UI_SUBSCRIBED) === "true");
    useEffect(() => {
        setHasSubscribed(localStorage.getItem(CREDENTIAL.BROWSER_NOTIFY_UI_SUBSCRIBED) === "true")
    }, [localStorage.getItem(CREDENTIAL.BROWSER_NOTIFY_UI_SUBSCRIBED)])

    return <section className="flex flex-col items-center mt-10">
    <h1 className='text-xl text-white font-bold text-center'>2. Subscribe</h1>
    <Button className='mt-2' 
      handleClick={handleSubscribe}>
        {hasSubscribed ? "Subscribed ✔️" : "Subscribe"}          
    </Button>          
</section>   
}