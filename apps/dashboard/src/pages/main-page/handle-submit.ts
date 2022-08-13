import { MessageInfo } from "@browser-notify-ui/service-workers";
import { sleep } from "@browser-notify-ui/utils";
import { UseFormReturn } from "react-hook-form";
import { Notify } from "~/models/Notify";
import axios from "axios";

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
    formState: { errors, isValid },
    getValues,
  } = formHook;
  await trigger();
  console.log({ errors });
  if (!isValid) {
    console.error("errors in the form detected");
    return;
  }
  setPendingNotify(true);

  const { notifications } = getValues();
  for (let i = 0; i < notifications.length; i++) {
    const { title, message } = notifications[i];
    const sleepDuration = i > 0 ? 2000 : 0;
    await sleep(sleepDuration);

    const info: MessageInfo = {
      userID,
      company,
      notification: {
        title,
        body: message,
        icon: "",
      },
    };

    try {
      // send to mock backend, which will call the
      const { data } = await axios.post(
        process.env.BROWSER_NOTIFY_SAMPLE_PUSH_URL ||
          "http://localhost:7071/api/sample-push", // TO DO - change to stg url
        info
      );
      console.log(data);
    } catch (err) {
      setPendingNotify(false);
      console.error(err);
    }
  }
};
