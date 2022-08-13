import { MessageInfo } from "@eugbyte-ts-monorepo/service-workers";
import { sleep } from "@eugbyte-ts-monorepo/utils";
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
      // send to mock backend, which will call the
      const { data } = await axios.post(
        "http://localhost:7071/api/sample-push",
        info
      );
      console.log(data);
    } catch (err) {
      setPendingNotify(false);
      console.error(err);
    }
  }
};
