import React from "react";
import { Button } from "@browser-notify-ui/components";
import { subscribe } from '@browser-notify-ui/service-workers';
import { usePermission } from "~/hooks";
import { useForm, useFieldArray } from "react-hook-form";
import { Row } from "~/components/form";
import { Instruction } from "~/components/instruction";
import axios from "axios";

// TO DO - use faker.js to generate the info
const fakeCompany = "fakepanda";
const fakeUser = "abc@m.com";

export const MainPage: React.FC = () => {
  const [permission] = usePermission();

  const handleSubscribe = async (): Promise<void> => {
    try {
      const res = await subscribe(fakeCompany, fakeUser);
      console.log(res);
    } catch (err) {
      console.error(err);
    }    
  };

  const formHook = useForm({
    mode: "onBlur",
    defaultValues: {
      "notifications": [{"title": "", "message": "", "delay": ""}]
    }
  });
  const { control, getValues, formState, trigger } = formHook;
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "notifications", // unique name for your Field Array
  });
  
  const handleAddRow = () => {
    append({"title": "", "message": "", "delay": ""});
  }
  const handleDeleteRow = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  }

  const onSubmit = async() => {
    const isValid = await trigger();
    console.log(formState.errors);
    console.log(getValues());
    if (!isValid) {
      console.log("errors detected");
      return;
    }
    
    const url = "http://localhost:7071/api/notifications";
    const result = await axios.post(url, {
      "userID": fakeUser,
      "company": fakeCompany,
      "notification": {
          "title": "My title",
          "body": "My message",
          "icon": "My icon"
      }
    });
    console.log(result.data);
  }

  const buttonTextDict: Record<NotificationPermission , string> = {
    "granted": "Subscribed ✔️",
    "default": "Subscribe",
    "denied": "Blocked ❌"
  };

  return (
    <div className='flex flex-col justify-center items-center bg-slate-800 h-screen px-1 sm:px-0'>
      <h1 className='text-xl text-white font-bold'>1. Grant permission</h1>
      <Button className='mt-2' 
        handleClick={handleSubscribe}>
          {buttonTextDict[permission as NotificationPermission]}
      </Button>
      {permission === "denied" &&
        <Instruction />
      }
      {permission === "granted" &&
        <>
          <h1 className='text-xl text-white font-bold mt-10'>2. Create notifications</h1>
          <div className='mt-2'>
            <div className='flex flex-col' >
              {fields.map((field, index) => (
                <Row formHook={formHook} field={field} index={index} handleDeleteRow={handleDeleteRow} key={field.id}/>
              ))}
            </div>
            <Button className='mt-2' 
              handleClick={handleAddRow}>➕
            </Button>
          </div>
        </>
      }
      <>
        <h1 className='text-xl text-white font-bold mt-10'>3. Send!</h1>
        <div className="flex flex-row justify-center mt-2">
        <Button className='mt-2 font-bold px-10 py-5' 
          handleClick={onSubmit}>Send
        </Button>
        </div>
      </>
    </div>
  );
}