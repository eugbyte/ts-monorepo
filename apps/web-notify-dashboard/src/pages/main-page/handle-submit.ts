import { MessageInfo } from "@eugbyte-monorepo/service-workers";
import { sleep } from "@eugbyte-monorepo/utils";
import { UseFormReturn } from "react-hook-form";
import { Notify } from "~/models/Notify";
import axios, { AxiosRequestConfig } from "axios";

interface Props {
  formHook: UseFormReturn<
    {
      notifications: Notify[];
    },
    any
  >;
  userID: string;
  company: string;
  setPendingNotify: (arg: boolean) => void;
}

export const handleSubmit = async ({
  formHook,
  userID,
  company,
  setPendingNotify,
}: Props) => {
  const {
    trigger,
    formState: { errors },
    getValues,
  } = formHook;
  await trigger();
  // formState.isValid is buggy
  if (Object.keys(errors).length > 0) {
    console.error("errors in the form detected", errors);
    return;
  }
  setPendingNotify(true);

  const { notifications } = getValues();
  for (let i = 0; i < notifications.length; i++) {
    const { title, message } = notifications[i];
    const sleepDuration = i > 0 ? 2000 : 0;
    await sleep(sleepDuration);

    try {
      const info: MessageInfo = {
        userID,
        company,
        notification: {
          title,
          body: message,
          icon: "",
        },
      };

      const submitURL: string =
        process.env.REACT_APP_STAGE === "dev"
          ? "http://localhost:7071/api/subscriptions"
          : "https://func-webnotify-stg-ea.azurewebsites.net/api/sample-push";

      const config: AxiosRequestConfig = {
        headers: {
          "x-functions-key":
            "x2dC9b-WLtu93xiogy2XZM_wUOQ0KYyAy8nK1Pf2A97wAzFuJaIJRQ==",
        },
      };

      // send to mock backend, which will call the
      const { data } = await axios.post(submitURL, info, config);
      console.log(data);
    } catch (err) {
      setPendingNotify(false);
      console.error(err);
    }
  }
};
