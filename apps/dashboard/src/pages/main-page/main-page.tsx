import React, { useEffect, useState } from "react";
import {
  subscribe,
  requestPermission,
  pushMessage,
  broadcast,
} from "@browser-notify-ui/service-workers";
import { usePermission } from "~/hooks/permission";
import { useForm } from "react-hook-form";
import { Notify } from "~/models/Notify";
import { PermissionSection } from "~/components/sections/section1";
import { SubscribeSection } from "~/components/sections/section2";
import { FormSection } from "~/components/sections/section3";
import { PushSection } from "~/components/sections/section4";
import cloneDeep from "lodash.clonedeep";
import { CREDENTIAL, QUERY_STATUS } from "~/models/enums";
import { BarLoader } from "react-spinners";
import { useHttpQuery } from "~/hooks/http-query";
import { useLocalStorage } from "~/hooks/local-storage";
import { sleep } from "@browser-notify-ui/utils";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";

type FormValues = {
  notifications: Notify[];
};

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
      newUserID = faker.company.companyName();
      setUserId(newUserID);
    }
    if (newCompany === "") {
      newCompany = `${nanoid()}_${faker.internet.email()}`;
      setCompany(newCompany);
    }
    await makeSubQuery(company, userID);
  };

  // Check whether user has already subscribed by checking the local storage cache
  // If so, they can progress to the next few steps without having to subscribe again
  const isSubscribed = userID !== "" && company !== "";

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
      notifications: [{ title: "", message: "" }],
    },
  });
  const { getValues, formState } = formHook;
  const { isValid } = formState;

  // When the user submits the form, we add a delay in between the notification messages submitted
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, makePushQuery] = useHttpQuery(
    pushMessage.bind(null, userID, company)
  ); // bind and fix the credentials arguments as they remain the same
  const [isPushLoading, setPushLoading] = useState(false);
  const onSubmit = async () => {
    if (!isValid) {
      console.error("errors in the form detected");
      return;
    }
    setPushLoading(true);

    const { notifications } = getValues();
    for (let i = 0; i < notifications.length; i++) {
      const notify: Notify = notifications[i];
      const sleepDuration = i > 0 ? 2000 : 0;
      console.log(`sleeping for ${sleepDuration}`);
      await sleep(sleepDuration);

      try {
        const result = await makePushQuery(notify.title, notify.message);
        console.log(result);
      } catch (err) {
        setPushLoading(false);
        console.error(err);
      }
    }
  };

  useEffect(() => {
    broadcast.onmessage = (event) => {
      if (event.data != null) {
        const data = event.data as Record<string, string>;
        if (data["type"] === "BROSWER_NOTIFY_UI") {
          console.log(
            `message detected: ${new Date().getSeconds()}.${new Date().getMilliseconds()}s`
          );
          setPushLoading(false);
        }
      }
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-slate-800 h-screen px-1 sm:px-0">
      {steps[0] && (
        <PermissionSection
          permission={permission}
          handlePermission={handlePermission}
        />
      )}
      {steps[1] && (
        <>
          <SubscribeSection handleSubscribe={handleSubscribe} />
          <BarLoader
            loading={subQueryStatus === QUERY_STATUS.LOADING}
            width={200}
            className="mt-2"
            color={"#FFFFFF"}
          />
        </>
      )}
      {steps[2] && <FormSection formHook={formHook} />}
      {steps[3] && (
        <>
          <PushSection onSubmit={onSubmit} />
          <BarLoader
            loading={isPushLoading}
            width={200}
            className="mt-2"
            color={"#FFFFFF"}
          />
        </>
      )}
    </div>
  );
};
