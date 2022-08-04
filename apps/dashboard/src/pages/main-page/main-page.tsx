import React, { useEffect, useState } from "react";
import { subscribe, requestPermission, pushMessage } from '@browser-notify-ui/service-workers';
import { useLocalStorage, usePermission } from "~/hooks";
import { useForm } from "react-hook-form";
import { generateUserID, generateCompany, sleep } from "./util";
import { Notify } from "~/models/Notify";
import { PermissionSection } from "~/components/sections/section1";
import { SubscribeSection } from "~/components/sections/section2";
import { FormSection } from "~/components/sections/section3";
import { PushSection } from "~/components/sections/section4";
import cloneDeep from "lodash.clonedeep";
import { CREDENTIAL, QUERY_STATUS } from "~/models/enums";
import { BarLoader } from "react-spinners";
import { useHttpQuery } from "~/hooks";

type FormValues = {
  notifications: Notify[];
};

export const MainPage: React.FC = () => {

  // Get credentials from local storage. Otherwise, generate new credentials
  const userID = generateUserID();
  const company = generateCompany();
  
  // Get the user's permission to display notification
  const [permission, setPermission] = usePermission();
  const handlePermission = async() => {
    const perm: NotificationPermission = await requestPermission();
    setPermission(perm);
  }

  // Subscribe the user to our web push notification service
  const [subQueryStatus, makeSubQuery] = useHttpQuery(subscribe.bind(null, company, userID));
  const handleSubscribe = (): Promise<void> => makeSubQuery(company, userID);
  useEffect(() => {
    if (subQueryStatus === QUERY_STATUS.SUCCESS) {
      localStorage.setItem(CREDENTIAL.BROWSER_NOTIFY_UI_SUBSCRIBED, true.toString());
      // need to manually dispatch the storage event, because, by default,
      // the storage event only get picked up (by the listener) if the localStorage was changed in a different browser's tab/window (of the same app)
      window.dispatchEvent(new Event("storage"));
    } else if (subQueryStatus === QUERY_STATUS.ERROR) {
      localStorage.setItem(CREDENTIAL.BROWSER_NOTIFY_UI_SUBSCRIBED, false.toString());
      window.dispatchEvent(new Event("storage"));
    }
  }, [subQueryStatus]);  

  // Check whether user has already subscribed by checking the local storage cache
  // If so, they can progress to the next few steps without having to subscribe again
  const [_isSubscribed] = useLocalStorage(CREDENTIAL.BROWSER_NOTIFY_UI_SUBSCRIBED);
  const isSubscribed: boolean = _isSubscribed === "true";

  // Progress Stepper
  // user can only progress towards towards the next step if previous step is completed, and when certain conditions are fulfilled
  // user can only progress towards towards the next step if certain conditions are fulfilled
  const [steps, setSteps] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false,
  });

  useEffect(() => {
    const stepsCopy = cloneDeep(steps);
    stepsCopy[1] = stepsCopy[0] && permission === "granted";
    stepsCopy[2] = stepsCopy[1] && isSubscribed;
    stepsCopy[3] = stepsCopy[2];
    setSteps(stepsCopy);
  }, [permission, isSubscribed]);

  // Dynamic Form to add and subtract rows containing the notification message info
  const formHook = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      "notifications": [{"title": "", "message": ""}]
    }
  });
  const { getValues, formState } = formHook;
  const { isValid } = formState;

  // When the user submits the form, we add a delay in between the notification messages submitted
  const [pushQueryStatus, makePushQuery] = useHttpQuery(pushMessage.bind(null, userID, company));   // bind and fix the credentials arguments as they remain the same
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
        const result = await makePushQuery(notify.title, notify.message);
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
      <>
          <SubscribeSection handleSubscribe={handleSubscribe} />   
          <BarLoader loading={subQueryStatus === QUERY_STATUS.LOADING} width={200} className="mt-2" color={"#FFFFFF"}/>
      </>
      }      
      {steps[2] &&
        <FormSection formHook={formHook}/>
      }    
      {steps[3] &&
      <>
        <PushSection onSubmit={onSubmit}/>
        <BarLoader loading={pushQueryStatus === QUERY_STATUS.LOADING} width={200} className="mt-2" color={"#FFFFFF"}/>
      </>
      } 
    </div>
  );
}