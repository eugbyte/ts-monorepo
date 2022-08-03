import React, { useEffect, useState } from "react";
import { subscribe, requestPermission, pushMessage as push } from '@browser-notify-ui/service-workers';
import { usePermission } from "~/hooks";
import { useForm } from "react-hook-form";
import axios from "axios";
import { generateCredentials, sleep } from "./util";
import { Notify } from "~/models/Notify";
import { PermissionSection } from "~/components/sections/section1";
import { SubscribeSection } from "~/components/sections/section2";
import { FormSection } from "~/components/sections/section3";
import { PushSection } from "~/components/sections/section4";
import cloneDeep from "lodash.clonedeep";

type FormValues = {
  notifications: Notify[];
};

export const MainPage: React.FC = () => {

  // user can only progress towards towards the next step if certain conditions are fulfilled
  const [steps, setSteps] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false,
  });

  const {userID, company} = generateCredentials();
  
  const [permission, setPermission] = usePermission();

  const handlePermission = async() => {
    const perm = await requestPermission();
    setPermission(perm);
  }

  const handleSubscribe = async (): Promise<void> => {
    try {
      const res = await subscribe(company, userID);
      console.log(res);
    } catch (err) {
      console.error(err);
    }    
  };

  const formHook = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      "notifications": [{"title": "", "message": ""}]
    }
  });
  const { getValues, formState } = formHook;
  const { isValid } = formState;

  const pushMessage = push.bind(null, userID, company);

  // user can only progress towards towards the next step if previous step is completed, and when certain conditions are fulfilled
  useEffect(() => {
    const stepsCopy = cloneDeep(steps);
    stepsCopy[1] = stepsCopy[0] && permission === "granted";
    stepsCopy[2] = stepsCopy[1] && userID.trim().length > 0 && company.trim().length > 0;
    stepsCopy[3] = stepsCopy[2];
    setSteps(stepsCopy);
  }, [permission, userID, company]);

  const onSubmit = async() => {
    if (!isValid) {
      console.log("errors detected");
      return;
    }
    
    const {notifications} = getValues();

    for (let i = 0; i < notifications.length; i++) {
      const notify: Notify = notifications[i];
      const sleepDuration = i > 0 ? 2500 : 0;
      console.log(`sleeping for ${sleepDuration}`);
      await sleep(sleepDuration);

      try {
        const result = await pushMessage(notify.title, notify.message);
        console.log(result);
      } catch (err) {
        console.error(err);
      }
    }   
  }

  return (
    <div className='flex flex-col justify-center items-center bg-slate-800 h-screen px-1 sm:px-0'>
      {steps[0] &&
        <PermissionSection permission={permission} handlePermission={handlePermission} />
      }
      {steps[1] &&
        <SubscribeSection handleSubscribe={handleSubscribe} />   
      }      
      {steps[2] &&
        <FormSection formHook={formHook}/>
      }    
      {steps[3] &&
        <PushSection onSubmit={onSubmit}/>
      } 
    </div>
  );
}