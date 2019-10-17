import { Router } from 'express';
import FCM from 'fcm-call';
import Papa from 'papaparse';

import { pushSchema } from './validator';

const router = Router();
// const serverKey = 'firebase server key';

router.post('/push', async (req, res) => {

  // validating request body
  const {
    userList,
    title,
    message,
    serverKey
  } = await pushSchema.validate(req.body);

  // parsing csv list
  const parsedList = Papa.parse(userList, {
    dynamicTyping: true,
    skipEmptyLines: true,
    header: true
  });

  let list = [];
  let incorrectUsers = [];

  // getting user Ids, and save users with undefined/not number Ids
  parsedList.data.forEach((item) => {
    if (typeof(item.id) != "number" || typeof(item.id) == "undefined") {
      incorrectUsers.push(item);
    } else {
      list.push(item.id);
    }
  });

  // creating push message
  const notification = {    
    "notification": {
      "title": title,
      "body": message
    },
    "registration_ids": list
  }

  // sending push notification
  FCM.FCM(serverKey, notification);

  // if there was incorrect users, send them as a response
  if (incorrectUsers.length != 0) {
    const list = Papa.unparse(incorrectUsers);
    res.json({
      list
    })
  } else {
    res.end()
  }
});

export default router;
