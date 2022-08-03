import { nanoid } from 'nanoid';
import { faker } from '@faker-js/faker';
import { CREDENTIAL } from '~/models/enums';

interface Credential {
    userID: string;
    company: string;
}

export const generateCredentials = (): Credential => {
    let userID = localStorage.getItem(CREDENTIAL.BROWSER_NOTIFY_UI_USERID);
    let company = localStorage.getItem(CREDENTIAL.BROWSER_NOTIFY_UI_COMPANY);
    if (userID == null) {
        userID = `${nanoid()}_${faker.internet.email()}`;
        localStorage.setItem(CREDENTIAL.BROWSER_NOTIFY_UI_USERID, userID);
    }
    if (company == null) {
        company = faker.company.companyName();
        localStorage.setItem(CREDENTIAL.BROWSER_NOTIFY_UI_COMPANY, company)
    }

    return {userID, company};
}

export const sleep = (time: number) => new Promise((resolve, _) => setTimeout(resolve, time));
