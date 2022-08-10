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

export const pushMessage = async (
  apiKey: string,
  notifySecretName: string,
  notifySecretValue: string,
  company: string,
  userID: string,
  title: string,
  body: string,
  icon?: string
): Promise<Record<string, string>> => {
  const url = "http://localhost:7071/api/notifications";

  const messageInfo: MessageInfo = {
    userID,
    company,
    notification: {
      title,
      body,
      icon,
    },
  };
  const headers: AxiosRequestHeaders = {
    "API-Key": apiKey,
    "Notify-Secret-Name": notifySecretName,
    "Notify-Secret-Value": notifySecretValue,
  };
  const result = await axios.post(url, messageInfo, { headers });
  return result.data;
};
