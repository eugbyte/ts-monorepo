import React from "react";
import { Button } from "@browser-notify-ui/components";
import { subscribe, requestPermission } from '@browser-notify-ui/service-workers';
import { usePermission } from "~/hooks";
import { useForm } from "react-hook-form";
import axios from "axios";
import { generateCredentials, sleep } from "./util";
import { Notify } from "~/models/Notify";
import { PermissionSection } from "~/components/sections/section1";
import { SubscribeSection } from "~/components/sections/section2";
import { FormSection } from "~/components/sections/section3";
import { PushSection } from "~/components/sections/section4";

type FormValues = {
  notifications: Notify[];
};

export const MainPage: React.FC = () => {

  const steps = new Map<number, boolean>([[0, true], [1, false], [2, false], [3, false]]);


  const {userID: fakeUser, company: fakeCompany} = generateCredentials();
  
  const [permission, setPermission] = usePermission();

  const handlePermission = async() => {
    const perm = await requestPermission();
    setPermission(perm);
  }

  const handleSubscribe = async (): Promise<void> => {
    try {
      const res = await subscribe(fakeCompany, fakeUser);
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
  const { getValues, trigger } = formHook;

  
  const onSubmit = async() => {
    const isValid = await trigger();
    if (!isValid) {
      console.log("errors detected");
      return;
    }
    
    const {notifications} = getValues();
    const url = "http://localhost:7071/api/notifications";

    for (let i = 0; i < notifications.length; i++) {
      const notify: Notify = notifications[i];
      const sleepDuration = i > 0 ? 2500 : 0;
      console.log(`sleeping for ${sleepDuration}`);
      await sleep(sleepDuration);

      try {
        const result = await axios.post(url, {
          "userID": fakeUser,
          "company": fakeCompany,
          "notification": {
              "title": notify.title,
              "body": notify.message,
              "icon": "My icon"
          }
        });
        console.log(result);
      } catch (err) {
        console.error(err);
      }
    }   
  }

  return (
    <div className='flex flex-col justify-center items-center bg-slate-800 h-screen px-1 sm:px-0'>
      <PermissionSection permission={permission} handlePermission={handlePermission} />       
      {permission === "granted" &&
        <>
          <SubscribeSection handleSubscribe={handleSubscribe} />   
          <FormSection formHook={formHook}/>
          <PushSection onSubmit={onSubmit}/>
        </>
      }
    </div>
  );
}