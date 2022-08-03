import { nanoid } from 'nanoid';
import { faker } from '@faker-js/faker';

interface Credential {
    userID: string;
    company: string;
}

export const generateCredentials = (): Credential => {
    let userID = localStorage.getItem("BROWSER_NOTIFY_UI_USERID");
    let company = localStorage.getItem("BROWSER_NOTIFY_UI_COMPANY");
    if (userID == null) {
        userID = `${nanoid()}_${faker.internet.email()}`;
        localStorage.setItem("BROWSER_NOTIFY_UI_USERID", userID);
    }
    if (company == null) {
        company = faker.company.companyName();
        localStorage.setItem("BROWSER_NOTIFY_UI_COMPANY", company)
    }

    return {userID, company};
}

export const sleep = (time: number) => new Promise((resolve, _) => setTimeout(resolve, time));
