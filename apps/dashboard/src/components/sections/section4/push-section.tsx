import { Button } from "@browser-notify-ui/components";
import React from "react";

interface Props {
    onSubmit: () => Promise<void>;
}

export const PushSection: React.FC<Props> = ({onSubmit}) => {

    return (
        <section>
            <h1 className='text-xl text-white font-bold mt-10 text-center'>4. Send!</h1>

                <div className="flex flex-row justify-center mt-2">
                <Button className='mt-2 font-bold px-10 py-5' 
                    handleClick={onSubmit}>Send
                </Button>
                </div>
        </section>
    );
}