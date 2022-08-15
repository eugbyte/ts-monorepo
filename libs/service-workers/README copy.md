# Service workers
Library for service worker functions

## Services
| Service      | Description                                        |
|--------------|----------------------------------------------------|
| notification | Service worker functions for web push notification |
|              |                                                    |


### Notification service worker
1. Install
```
npm i @eugbyte-monorepo/service-workers
```

2. Request permission
```
import {
  subscribe,
  requestPermission,
  broadcast,
} from "@eugbyte-monorepo/service-workers";

const perm: NotificationPermission = await requestPermission();
```

3. Subscribe with your company name. and the user's unique ID, whatever you assigned it to be
```
if (perm === "granted") {
    await subscribe(<company_name>, <userID>);
}
```

4. At the backend, send notification to the users
```
curl --location --request POST 'http://localhost:7071/api/notifications' \
--header 'Content-Type: application/json' \
--header 'Connection: close' \
--header 'Notify-Secret-Name: <your_secret_name>' \
--header 'Notify-Secret-Value: <your_secret_value>' \
--data-raw '{
    "userID": "abc@m.com",
    "company": "fakepanda",
    "notification": {
        "title": "My title",
        "body": "My message",
        "icon": "My icon"
    }
}'
```