import axios, { AxiosRequestHeaders } from "axios";

export interface MessageInfo {
  userID: string;
  company: string;
  notification: {
    title: string;
    body: string;
    icon?: string;
  };
}

export interface Props {
  apiKey: string;
  notifySecretName: string;
  notifySecretValue: string;
  info: MessageInfo;
  url: string;
}

/**
 *
 * @param apiKey api key to access web push's api. Will be issued to you
 * @param notifySecretName Name of the secret. Will be issued to you
 * @param notifySecretValue Value of the secret. Will be issued to you
 * @param info the message info which must fulfill the MessageInfo interface
 * @param url Optional, defaults to web notify's production api
 * @returns
 */
export const pushMessage = async ({
  apiKey,
  notifySecretName,
  notifySecretValue,
  info,
  url = "http://localhost:7071/api/subscriptions", // TO DO - replace with stg url
}: Props): Promise<Record<string, string>> => {
  if (
    apiKey.trim() === "" ||
    notifySecretName.trim() === "" ||
    notifySecretValue.trim() === ""
  ) {
    throw new Error("keys, secrets cannot be empty");
  }
  if (info.userID.trim() === "" || info.company.trim() === "") {
    throw new Error("fields cannot be empty");
  }
  if (
    info.notification == null ||
    info.notification.title.trim() === "" ||
    info.notification.body.trim() === ""
  ) {
    throw new Error("fields cannot be empty");
  }

  const headers: AxiosRequestHeaders = {
    "API-Key": apiKey,
    "Notify-Secret-Name": notifySecretName,
    "Notify-Secret-Value": notifySecretValue,
  };
  const result = await axios.post(url, info, { headers });
  return result.data;
};
