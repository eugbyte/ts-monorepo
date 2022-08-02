import React from "react";
import { Button } from "@browser-notify-ui/components";
import { subscribe } from '@browser-notify-ui/service-workers';
import { usePermission } from "~/hooks";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import { Row } from "~/components/form";
import { Instruction } from "~/components/instruction";
import axios from "axios";
import { generateCredentials, sleep } from "./util";
import { Notify } from "~/models/Notify";

type FormValues = {
  notifications: Notify[];
};

export const MainPage: React.FC = () => {
  const {userID: fakeUser, company: fakeCompany} = generateCredentials();
  
  const [permission] = usePermission();

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
      "notifications": [{"title": "", "message": "", "delay": undefined}]
    }
  });
  const { control, getValues, formState, trigger } = formHook;
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "notifications", // unique name for your Field Array
  });
  
  const handleAddRow = () => {
    append({"title": "", "message": "", "delay": 0});
  }
  const handleDeleteRow = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  }
  
  const onSubmit = async() => {
    const isValid = await trigger();
    if (!isValid) {
      console.log("errors detected");
      return;
    }
    
    const {notifications} = getValues();
    const url = "http://localhost:7071/api/notifications";

    for (const notify of notifications) {
      console.log("sleeping...");
      await sleep(notify.delay * 1000);
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

  const buttonTextDict: Record<NotificationPermission , string> = {
    "granted": "Subscribed ✔️",
    "default": "Subscribe",
    "denied": "Blocked ❌"
  };

  return (
    <div className='flex flex-col justify-center items-center bg-slate-800 h-screen px-1 sm:px-0'>
        <section className="flex flex-col items-center">
          <h1 className='text-xl text-white font-bold text-center'>1. Grant permission</h1>

          <Button className='mt-2' 
            handleClick={handleSubscribe}>
              {buttonTextDict[permission as NotificationPermission]}
          </Button>
          {permission === "denied" &&
            <Instruction />
          }
      </section>      
      {permission === "granted" &&
        <>
        <section>
          <h1 className='text-xl text-white font-bold mt-10 text-center'>2. Create notifications</h1>
          <div className='mt-2'>
            <div className='flex flex-col' >
              {fields.map((field, index) => (
                <div className="flex flex-col items-center">
                  <Row formHook={formHook} field={field} index={index} handleDeleteRow={handleDeleteRow} key={field.id}/>
                  
                  <p>⬇️</p>
                </div>
              ))}
            </div>
            <Button className='mt-2' 
              handleClick={handleAddRow}>➕
            </Button>
          </div>
          </section>
          <section>
          <h1 className='text-xl text-white font-bold mt-10 text-center'>3. Send!</h1>

            <div className="flex flex-row justify-center mt-2">
              <Button className='mt-2 font-bold px-10 py-5' 
                handleClick={onSubmit}>Send
              </Button>
            </div>
          </section>
        </>
      }
    </div>
  );
}