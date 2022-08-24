import { nanoid } from "nanoid";
import { QueryFn } from "~/hooks/http-query/use-http-query";

interface Props {
  userID: string;
  setUserId: (item: string) => void;
  company: string;
  setCompany: (item: string) => void;
  makeSubQuery: QueryFn;
}

export const handleSubscribe = async ({
  userID,
  setUserId,
  company,
  setCompany,
  makeSubQuery,
}: Props): Promise<void> => {
  let newUserID = userID;
  let newCompany = company;

  if (newUserID === "") {
    newUserID = `${nanoid(5)}_@mail.com`;
  }
  if (newCompany === "") {
    newCompany = `${nanoid(5)}_company`;
  }

  const subscriptionURL: string | undefined =
    process.env.REACT_APP_STAGE === "dev"
      ? "http://localhost:7071/api/subscriptions"
      : undefined;
  await makeSubQuery(newCompany, newUserID, subscriptionURL);
  setUserId(newUserID);
  setCompany(newCompany);
};
