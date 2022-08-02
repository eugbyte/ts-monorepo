import { nanoid } from 'nanoid';
import { faker } from '@faker-js/faker';

interface Credential {
    userID: string;
    company: string;
}

export const generateCredentials = (): Credential => {

    return {
        userID: localStorage.getItem("BROWSER_NOTIFY_UI_USERID") || nanoid() + faker.internet.email(),
        company: localStorage.getItem("BROWSER_NOTIFY_UI_COMPANY") || faker.company.companyName(),
    }
}