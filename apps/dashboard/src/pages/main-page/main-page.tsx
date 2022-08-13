import React, { useEffect, useState } from "react";
import {
  subscribe,
  requestPermission,
  broadcast,
} from "@browser-notify-ui/service-workers";
import { usePermission } from "~/hooks/permission";
import { useForm } from "react-hook-form";
import { FormValues } from "~/models/Notify";
import { PermissionSection } from "~/components/sections/section1";
import { SubscribeSection } from "~/components/sections/section2";
import { FormSection } from "~/components/sections/section3";
import { PushSection } from "~/components/sections/section4";
import cloneDeep from "lodash.clonedeep";
import { CREDENTIAL, QUERY_STATUS } from "~/models/enums";
import { useHttpQuery } from "~/hooks/http-query";
import { useLocalStorage } from "~/hooks/local-storage";
import { nanoid } from "nanoid";
import { About } from "~/components/sections/about";
import { handleSubmit } from "./handle-submit";
import { handleBroadcast } from "./handle-broadcast";

export const MainPage: React.FC = () => {
  // Get the user's permission to display notification
  const [permission, setPermission] = usePermission();
  const handlePermission = async () => {
    const perm: NotificationPermission = await requestPermission();
    setPermission(perm);
  };

  // Get mocked credentials from local storage. Defaults to ""
  const [userID, setUserId] = useLocalStorage(
    CREDENTIAL.BROWSER_NOTIFY_UI_USERID
  );
  const [company, setCompany] = useLocalStorage(
    CREDENTIAL.BROWSER_NOTIFY_UI_COMPANY
  );

  // Subscribe the user to our web push notification service
  const [subQueryStatus, makeSubQuery] = useHttpQuery(subscribe.bind(null));
  const handleSubscribe = async (): Promise<void> => {
    let newUserID = userID;
    let newCompany = company;

    if (newUserID === "") {
      newUserID = `${nanoid(5)}_@mail.com`;
      setUserId(newUserID);
    }
    if (newCompany === "") {
      newCompany = `${nanoid(5)}_company`;
      setCompany(newCompany);
    }
    await makeSubQuery(
      newCompany,
      newUserID,
      process.env.BROWSER_NOTIFY_SUBSCRIBE_URL ||
        "http://localhost:7071/api/subscriptions"
    );
  };

  // Check whether user has already subscribed by checking the local storage cache
  // If so, they can progress to the next few steps without having to subscribe again
  const isSubscribed =
    userID !== "" && company !== "" && subQueryStatus === QUERY_STATUS.SUCCESS;

  // Progress Stepper
  // user can only progress towards towards the next step if previous step is completed, and when certain conditions are fulfilled
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
  }, [steps[0], permission, isSubscribed]);

  // Dynamic Form to add and subtract rows containing the notification message info
  const formHook = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      notifications: [{ title: "", message: "" }],
    },
  });

  // Push notifications to the current browser
  // state to listen to whether the first notification has been received
  const [isPendingNotify, setPendingNotify] = useState(false);
  // retrieve the form values, submit them, and initialize the loading bar
  const onSubmit = () =>
    handleSubmit({ formHook, userID, company, setPendingNotify });

  // stop the loading bar once the notification is received
  useEffect(() => {
    broadcast.onmessage = handleBroadcast.bind(null, setPendingNotify);
    // apparently, this clean up runs at least once even before the component dismounts,
    // thereby permanently closing the channel
    // return () => broadcast.close();  // comment out for now
  }, []);

  return (
    <div className="flex flex-col justify-start items-center bg-slate-800 h-screen px-1 sm:px-0 overflow-auto">
      <About />
      {steps[0] && (
        <PermissionSection
          permission={permission}
          handlePermission={handlePermission}
        />
      )}
      {steps[1] && (
        <SubscribeSection
          handleSubscribe={handleSubscribe}
          isSubscribed={isSubscribed}
          subscriptionQueryStatus={subQueryStatus}
        />
      )}
      {steps[2] && <FormSection formHook={formHook} />}
      {steps[3] && (
        <PushSection
          onSubmit={onSubmit}
          isPendingNotification={isPendingNotify}
        />
      )}
    </div>
  );
};
