import axios from "axios";

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
  userID: string,
  company: string,
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
  const result = await axios.post(url, messageInfo);
  return result.data;
};
