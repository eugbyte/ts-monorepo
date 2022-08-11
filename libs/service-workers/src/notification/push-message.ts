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
  info: MessageInfo
): Promise<Record<string, string>> => {
  const url = "http://localhost:7071/api/notifications";

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
