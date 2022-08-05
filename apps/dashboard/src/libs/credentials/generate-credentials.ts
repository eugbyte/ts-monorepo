import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";
import { CREDENTIAL } from "~/models/enums";

export const generateCompany = (): string => {
  let company = localStorage.getItem(CREDENTIAL.BROWSER_NOTIFY_UI_COMPANY);
  if (company == null) {
    company = faker.company.companyName();
    localStorage.setItem(CREDENTIAL.BROWSER_NOTIFY_UI_COMPANY, company);
  }
  return company;
};

export const generateUserID = (): string => {
  let userID = localStorage.getItem(CREDENTIAL.BROWSER_NOTIFY_UI_USERID);
  if (userID == null) {
    userID = `${nanoid()}_${faker.internet.email()}`;
    localStorage.setItem(CREDENTIAL.BROWSER_NOTIFY_UI_USERID, userID);
  }
  return userID;
};
